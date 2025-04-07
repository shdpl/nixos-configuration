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
          # sslCertificate = "/var/lib/acme/auth.nawia.pl/cert.pem";
          # sslCertificateKey = "/var/lib/acme/auth.nawia.pl/key.pem";
          settings = {
            hostname = cfg.vhost;
            http-port = 8080;
            https-port = 8443;
            proxy = "edge";
            features = "docker";
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
