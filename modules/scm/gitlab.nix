{ config, pkgs, lib, ... }:
with lib;
{
  imports = [
    ../../modules/web-server.nix
  ];
  options.git = {
    vhost = mkOption {
      type = types.str;
    };
    path = mkOption {
      type = types.str;
      default = "/gitlab/";
    };
    databasePassword = mkOption {
      type = types.str;
    };
    initialRootEmail = mkOption {
      type = types.str;
    };
    initialRootPassword = mkOption {
      type = types.str;
    };
    dbSecret = mkOption {
      type = types.str;
    };
    secretSecret = mkOption {
      type = types.str;
    };
    otpSecret = mkOption {
      type = types.str;
    };
    jwsSecret = mkOption {
      type = types.str;
    };
    port = mkOption {
      type = types.int;
      default = 8082;
    };
  };
  # TODO: semantic versioning + https://www.conventionalcommits
  config = (mkMerge [
    (mkIf (config.git != null) {
      services.gitlab = {
        enable = true;
        # databasePassword = config.git.databasePassword;
        host = config.git.vhost;
        https = true;
        initialRootEmail = config.git.initialRootEmail;
        initialRootPasswordFile = (builtins.toFile "root.password" config.git.initialRootPassword);
        port = config.git.port;
        secrets = {
          dbFile = (builtins.toFile "db.file" config.git.dbSecret);
          secretFile = (builtins.toFile "secret.file" config.git.secretSecret);
          otpFile = (builtins.toFile "otp.file" config.git.otpSecret);
          jwsFile = (builtins.toFile "jws.file" config.git.jwsSecret);
        };
        # FIXME: permissions (currently need to # chmod +x /var/backup && chown gitlab:syncthing /var/backup/gitlab)
        backupPath = "/var/backup/gitlab";
        smtp = {
          enable = true;
          # username = "gitlab";
          port = 25;
        };
      };
    })
    (mkIf (config.git.vhost != "") {
      webServer.virtualHosts.${config.git.vhost} = {
        enableACME = true;
        forceSSL = true;
        locations.${config.git.path} = {
          proxyPass = "http://unix:/run/gitlab/gitlab-workhorse.socket";
          extraConfig = ''
            proxy_set_header    Host                $host;
            proxy_set_header    X-Real-IP           $remote_addr;
            proxy_set_header    X-Forwarded-Ssl     on;
            proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
            proxy_set_header    X-Forwarded-Proto   $scheme;
          '';
        };
      };
    })
  ]);
}
