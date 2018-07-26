{ config, pkgs, ... }:
with import <nixpkgs/lib>;
let
	cfg = config.nixCache;
in
{
	imports = [
    #../modules/web-server.nix
	];
	options.nixCache = {
		vhost = mkOption {
			type = types.str;
		};
		path = mkOption {
			type = types.str;
			default = "/";
		};
    secretKeyFile = mkOption {
			type = types.nullOr types.str;
      example = "/var/host.cert";
      description = "Path to server SSL key.";
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
		(mkIf (cfg.vhost != "") {
			services.nix-serve = {
				enable = true;
				/*secretKeyFile = toString cfg.secretKeyFile;*/
				secretKeyFile = null; #FIXME
			};
			webServer.virtualHosts.${config.nixCache.vhost} = {
        forceSSL = true;
        sslCertificate  = cfg.sslCertificate;
        sslCertificateKey = cfg.sslCertificateKey;
        extraConfig = ''
ssl_client_certificate ${cfg.sslCertificate};
ssl_verify_client on;
        '';
				locations.${config.nixCache.path} = {
					proxyPass = "http://127.0.0.1:5000";
					extraConfig = ''
						proxy_set_header Host localhost;
						proxy_set_header X-Real-IP $remote_addr;
						proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
						proxy_set_header X-Forwarded-Proto $scheme;
          '';
				};
			};
		})
	]);
}
