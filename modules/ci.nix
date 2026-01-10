{ config, lib, ... }:
with lib;
let
  cfg = config.ci;
in
{
  options.ci = {
    enable = mkEnableOption {};
  };
  config = (mkMerge [
    (mkIf (cfg.enable == true) {
      services.gitlab-runner = {
        enable = true;
        settings = {};
        gracefulTermination = true;
        gracefulTimeout = "5min";
        services = {
          default = {
            authenticationTokenConfigFile = builtins.toFile "defaultEnv" (
              builtins.readFile ../private/ci/default.env
            );
            dockerImage = "docker:stable";
            dockerVolumes = [
              "/var/run/docker.sock:/var/run/docker.sock"
            ];
          };
        };
      };
    })
  ]);
}

