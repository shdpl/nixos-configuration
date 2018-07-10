{ config, pkgs, ... }:
with import <nixpkgs/lib>;
{
	imports = [
    ../modules/web-server.nix
	];
	options.dataSharing = {
		vhost = mkOption {
			type = types.str;
		};
		path = mkOption {
			type = types.str;
			default = "/syncthing/";
		};
		user = mkOption {
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
		backupDir = mkOption {
			type = types.str;
      default = "/var/backup";
		};
	};
  config = (mkMerge [
		(mkIf (config.dataSharing != null) {
			services.syncthing = {
				enable = true;
        user = config.dataSharing.user;
        dataDir = "/home/"+config.dataSharing.user+"/.config/syncthing";
				openDefaultPorts = true;
				package = pkgs.syncthing;
			};
      systemd.services.backup-folder = {
        serviceConfig.Type = "oneshot";
        script = ''
          mkdir -m 700 -p "${config.dataSharing.backupDir}"
          chown "${config.dataSharing.user}" "${config.dataSharing.backupDir}"
        '';
        wantedBy = [ "syncthing.service" ];
      };
		})
		(mkIf (config.dataSharing.vhost != "") {
			webServer.virtualHosts.${config.dataSharing.vhost} = {
        forceSSL = true;
				sslCertificate = config.dataSharing.sslCertificate;
				sslCertificateKey = config.dataSharing.sslCertificateKey;
				extraConfig = ''
					ssl_verify_client on;
					ssl_client_certificate ${config.dataSharing.sslCertificate};
				'';
				locations.${config.dataSharing.path} = {
					extraConfig = ''
						proxy_set_header Host localhost;
						proxy_set_header X-Real-IP $remote_addr;
						proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
						proxy_set_header X-Forwarded-Proto $scheme;
						proxy_pass http://localhost:8384/;
						proxy_read_timeout      600s;
						proxy_send_timeout      600s;
					'';
				};
			};
		})
	]);
}
