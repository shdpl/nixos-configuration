{ config, pkgs, lib, ... }:
with lib;
let
  cfg = config.ntop;
in
  {
    imports = [
      ../modules/web-server.nix
    ];
    options.ntop = {
      vhost = mkOption {
        type = types.str;
      };
      path = mkOption {
        type = types.str;
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
        services.ntopng = {
          enable = true;
          extraConfig = ''
                                        --http-prefix=${cfg.path}
                                        --disable-login=1
                                        --interface=1
          '';
        };
      })
      (mkIf (cfg.vhost != "") {
        webServer.virtualHosts."${cfg.vhost}" = {
          forceSSL = true;
          sslCertificate  = cfg.sslCertificate;
          sslCertificateKey = cfg.sslCertificateKey;
          locations."${cfg.path}".extraConfig = ''
                                        proxy_pass http://localhost:3000/;
          '';
          extraConfig = ''
            ssl_client_certificate ${cfg.sslCertificate};
            ssl_verify_client on;
          '';
        };
      })
    ]);
  }
