{ config, lib, ... }:
with lib;
let
  cfg = config.scm;
in
{
  # imports = [
  #   ../../modules/web-server.nix
  # ];
  options.scm = {
    vhost = mkOption {
      type = types.str;
    };
    # path = mkOption {
    #   type = types.str;
    #   default = "/gitlab/";
    # };
    # databasePassword = mkOption {
    #   type = types.str;
    # };
    initialRootEmail = mkOption {
      type = types.str;
    };
    initialRootPassword = mkOption {
      type = types.path;
    };
    dbSecret = mkOption {
      type = types.path;
    };
    secretSecret = mkOption {
      type = types.path;
    };
    otpSecret = mkOption {
      type = types.path;
    };
    jwsSecret = mkOption {
      type = types.path;
    };
    port = mkOption {
      type = types.int;
      default = 443;
    };
  };
  # TODO: semantic versioning + https://www.conventionalcommits
  config = (mkMerge [
    (mkIf (config.scm != null) {
      services.gitlab = {
        enable = true;
        # databasePassword = config.scm.databasePassword;
        host = config.scm.vhost;
        https = true;
        initialRootEmail = config.scm.initialRootEmail;
        initialRootPasswordFile = config.scm.initialRootPassword;
        port = config.scm.port;
        secrets = {
          dbFile = config.scm.dbSecret;
          secretFile = config.scm.secretSecret;
          otpFile = config.scm.otpSecret;
          jwsFile = config.scm.jwsSecret;
        };
        # FIXME: permissions (currently need to # chmod +x /var/backup && chown gitlab:syncthing /var/backup/gitlab)
        backup.path = "/var/backup/gitlab";
        smtp = {
          enable = true;
          # username = "gitlab";
          port = 25;
        };
      };
    })
    (mkIf (cfg.vhost != "") {
      services.nginx.virtualHosts.${cfg.vhost} = {
        forceSSL = true;
        enableACME = true;
        locations."/" = {
          proxyPass = "http://unix:/run/gitlab/gitlab-workhorse.socket";
        };
      };
    })
  ]);
}
