{ config, pkgs, lib, ... }:

with lib;

let
  cfg = config.work.welfare;
in
{
  options = {

    work.welfare = {
      # prod = {
      #   enable = lib.mkEnableOption "Welfare Prod";
      # };
      dev = {
        enable = lib.mkEnableOption "Welfare Dev";
        runtimeDirectory = lib.mkOption {
          type = with lib.types; str;
          default="welfare-dev";
        };
        package = mkPackageOption pkgs "welfare" { } // {
          default = pkgs.callPackage ../../pkgs/fr.welfare/default.nix {
            ref = "master";
            rev = "HEAD";
          };
        };
        environment = mkOption {
          default = {};
          type = with types; attrsOf (nullOr (oneOf [ str path package ]));
          description = "Environment variables passed to the Welfare Service.";
        };
      };
    };

  };

  config = mkIf (config.work.welfare.dev.enable) {
    systemd = {
      services = {
        welfare = {
          wantedBy = [ "multi-user.target" ];
          after = [ "network.target" "docker.service" "docker.socket" ];
          environment = config.work.welfare.dev.environment // {
            HOME="/run/${config.work.welfare.dev.runtimeDirectory}";
            BUILDKIT_PROGRESS="plain";
          };
          serviceConfig = {
            DynamicUser = true;
            SupplementaryGroups = [
              "docker"
              ];
              ExecStartPre = [
              "${pkgs.coreutils}/bin/cp -r ${config.work.welfare.dev.package}/. /run/${config.work.welfare.dev.runtimeDirectory}/"
            ];
            ExecStart = "${pkgs.bash}/bin/bash -c '${pkgs.docker}/bin/docker compose --verbose -f compose.yaml -f compose.dev.yaml up --build'";
            ExecStop="${pkgs.docker}/bin/docker compose -f compose.yaml -f compose.dev.yaml down";
            ExecStopPost = [
              "${pkgs.bash}/bin/bash -c '${pkgs.docker}/bin/docker volume rm ${builtins.replaceStrings ["-"] ["_"] config.work.welfare.dev.runtimeDirectory}_website_modules ${builtins.replaceStrings ["-"] ["_"] config.work.welfare.dev.runtimeDirectory}_server_modules ${builtins.replaceStrings ["-"] ["_"] config.work.welfare.dev.runtimeDirectory}_client_modules || exit 0'"
              "${pkgs.docker}/bin/docker image rm ${config.work.welfare.dev.runtimeDirectory}-client ${config.work.welfare.dev.runtimeDirectory}-server ${config.work.welfare.dev.runtimeDirectory}-keycloak ${config.work.welfare.dev.runtimeDirectory}-website"
            ];
            TimeoutStopSec=30;
            RuntimeDirectory=config.work.welfare.dev.runtimeDirectory;
            WorkingDirectory = "/run/${config.work.welfare.dev.runtimeDirectory}";
            Restart = "always";
          };
        };
      };
    };

    networking.firewall.allowedTCPPorts = [
      80
    ];

  };
}
