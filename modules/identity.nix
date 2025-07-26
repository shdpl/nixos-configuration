{ config, lib, ... }:
with lib;
let
  cfg = config.identity;
in
  {
    options.identity = {
      enable = mkEnableOption {};
      vhost = mkOption {
        type = types.str;
      };
      # path = mkOption {
      #   type = types.str;
      #   default = "/identity/";
      # };
  };
  config = (mkMerge [
    (mkIf (cfg != null && cfg.enable == true) {
      services = {
        keycloak = {
          enable = true;
          initialAdminPassword = builtins.readFile ../private/keycloak/daenerys/admin_password;
          settings = {
            hostname = cfg.vhost;
            http-enabled = true;
            http-port = 8080;
            proxy-headers = "xforwarded";
            # features = "docker";
          };
          database.passwordFile = builtins.toFile "database_password" (
            builtins.readFile ../private/postgresql/daenerys/keycloak/database_password
          );
        };
      };
    })
    (mkIf (cfg.vhost != "" && cfg.enable == true) {
      services.nginx.virtualHosts.${cfg.vhost} = {
        forceSSL = true;
        enableACME = true;
        locations."/" = {
          proxyPass = "http://localhost:8080";
        };
      };
    })
  ]);
}
