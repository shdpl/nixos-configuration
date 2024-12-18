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
    (mkIf (cfg != null) {
      services.tt-rss = {
        enable = true;
        # database = "mysql";
      };
    })
    (mkIf (cfg.vhost != "") {
      webServer.virtualHosts."${cfg.vhost}" = {
        forceSSL = true;
        sslCertificate  = cfg.sslCertificate;
        sslCertificateKey = cfg.sslCertificateKey;
      };
    })
    # TODO: ratt
  ]);
}
