{ config, pkgs, lib, ... }:
with lib;
let
	cfg = config.search;
  #searxConfigFile = toString (builtins.toFile "searx.yml" (builtins.readFile ../private/searx.yml));
  searxConfigFile = ../../private/searx.yml;
in
{
	imports = [
    ../../modules/web-server.nix
	];
	options.search = {
		vhost = mkOption {
			type = types.str;
		};
		path = mkOption {
			type = types.str;
			default = "/";
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
      services.searx = {
        enable = true;
        configFile = searxConfigFile;
      };
		})
# FIXME: /search
		(mkIf (cfg.vhost != "") {
			webServer.virtualHosts."${cfg.vhost}" = {
				forceSSL = true;
				sslCertificate  = cfg.sslCertificate;
				sslCertificateKey = cfg.sslCertificateKey;
				#extraConfig = ''
				#	ssl_client_certificate ${cfg.sslCertificate};
				#	ssl_verify_client on;
				#'';
				locations."${cfg.path}".extraConfig  = ''
					proxy_pass http://127.0.0.1:8888;
					proxy_set_header Host $host;
					proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
					proxy_set_header X-Scheme $scheme;
					proxy_set_header X-Script-Name /search;
					proxy_buffering off;
				'';
			};
		})
	]);
}
