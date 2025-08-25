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
    activeRecordPrimaryKey = mkOption {
      type = types.path;
    };
    activeRecordDeterministicKey = mkOption {
      type = types.path;
    };
    activeRecordSalt = mkOption {
      type = types.path;
    };
    port = mkOption {
      type = types.int;
      default = 443;
    };
    oauthLabel = mkOption {
      type = types.str;
    };
    oauthIssuer = mkOption {
      type = types.str;
    };
    oauthClientIdentifier = mkOption {
      type = types.str;
    };
    oauthClientSecret = mkOption {
      type = types.path;
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
          activeRecordPrimaryKeyFile = config.scm.activeRecordPrimaryKey;
          activeRecordDeterministicKeyFile = config.scm.activeRecordDeterministicKey;
          activeRecordSaltFile = config.scm.activeRecordSalt;
        };
        # FIXME: permissions (currently need to # chmod +x /var/backup && chown gitlab:syncthing /var/backup/gitlab)
        backup.path = "/var/backup/gitlab";
        smtp.enable = false;
        extraConfig.omniauth = {
          enabled = true;
          auto_sign_in_with_provider = "openid_connect";
          allow_single_sign_on = ["openid_connect"];
          block_auto_created_users = false;
          providers = [
            {
              name = "openid_connect";
              label = config.scm.oauthLabel;
              args = {
                name = "openid_connect";
                scope = ["openid" "profile" "email"];
                response_type = "code";
                issuer = config.scm.oauthIssuer;
                discovery = true;
                client_auth_method = "query";
                uid_field = "preferred_username";
                client_options = {
                  identifier = config.scm.oauthClientIdentifier;
                  secret = {
                    _secret = config.scm.oauthClientSecret;
                  };
                  redirect_uri = "https://${config.scm.vhost}/users/auth/openid_connect/callback";
                };
              };
            }
          ];
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
