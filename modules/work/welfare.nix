{ config, lib, pkgs, ... }:
let
  welfareCfg = config.work.welfare;
  welfare = builtins.fetchGit {
    url = "gitlab@scm.nawia.pl:shd/fr.welfarecard.git";
    submodules = true;
    ref = "master";
    rev = "43e8ca19503f02b34d1e6aca79dd91f134052f8b";
  };
  portOverride = builtins.toFile "work-welfare-port_override.yaml" ''
services:
  reverse_proxy:
    ports: !reset []
  '';
in
{
  options.work.welfare = {
    uat = {
      enable = lib.mkEnableOption "uat instance";
      env = lib.mkOption {
        type = lib.types.path;
      };
    };
  };

  config = lib.mkMerge [
    (lib.mkIf welfareCfg.uat.enable {
      virtualisation.docker.enable = true;
      systemd = {
        services = {
          welfare = {
            wantedBy = [ "multi-user.target" ];
            after = [ "network.target" "docker.service" "docker.socket" ];
            environment = {
              HOME="/run/welfare";
              BUILDKIT_PROGRESS="plain";
            };
            serviceConfig = {
              DynamicUser = true;
              SupplementaryGroups = [
                "docker"
              ];
              ExecStartPre = [
                "${pkgs.coreutils}/bin/cp -r ${welfare}/. \${RUNTIME_DIRECTORY}"
              ];
              ExecStart = "${pkgs.docker}/bin/docker compose --verbose --env-file \${CREDENTIALS_DIRECTORY}/.env -f compose.yaml -f compose.prod.yaml -f ${portOverride} up";
              ExecStop = "${pkgs.docker}/bin/docker compose --env-file \${CREDENTIALS_DIRECTORY}/.env -f compose.yaml -f compose.prod.yaml -f ${portOverride} down";
              TimeoutStopSec=30;
              RuntimeDirectory="welfare";
              WorkingDirectory = "/run/welfare";
              Restart = "always";
              LoadCredential = ".env:${welfareCfg.uat.env}";
            };
            unitConfig = {
              StartLimitIntervalSec = 240;
            };
          };
        };
      };
    })
  ];
}
