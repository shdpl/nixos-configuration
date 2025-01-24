{ config, pkgs, lib, ... }:
with lib;
let
  cfg = config.rss;
in
  {
    imports = [
      ../modules/web-server.nix
    ];
    options.rss = {
    enable = mkEnableOption {};
    # todo: consider using selfoss instead of tt-rss
    vhost = mkOption {
      type = types.str;
    };
    path = mkOption {
      type = types.str;
      default = "/rss/";
    };
    sslCertificate = mkOption {
      type = types.path;
      example = "/var/host.cert";
      description = "Path to server SSL certificate.";
    };
    sslCertificateKey = mkOption {
      type = types.path;
      example = "/var/host.key";
      description = "Path to server SSL certificate key.";
    };
  };
  config = (mkMerge [
    (mkIf (cfg != null && cfg.enable == true) {
      services.tt-rss = {
        enable = true;
        selfUrlPath = "http://${cfg.vhost}${cfg.path}";
        singleUserMode = true;
        virtualHost = cfg.vhost;
        logDestination = "syslog";
        # database = "mysql";
      };
    })
    # (mkIf (cfg.vhost != "" && cfg.enable == true) {
    #   webServer.virtualHosts."${cfg.vhost}" = {
    #     # forceSSL = true;
    #     # sslCertificate  = cfg.sslCertificate;
    #     # sslCertificateKey = cfg.sslCertificateKey;
    #   };
    # })
    # TTRSS_AUTH_OIDC_URL=https://keycloak.example.com/realms/YourRealm
    # TODO: ratt
  ]);
}
