{ config, pkgs, ... }:
with import <nixpkgs/lib>;
let
  host = "magdalene";
  user = config.dataSharing.user;
in
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
        user = user;
				openDefaultPorts = true;
				package = pkgs.syncthing;
        dataDir = "/home/"+user;
        configDir =  "/home/shd/.config/syncthing";
        declarative = {
          key = toString (
            builtins.toFile "key.pem" (
              builtins.readFile (../. + "/private/syncthing/${host}/key.pem")
            )
          );
          cert = toString (
            builtins.toFile "cert.pem" (
              builtins.readFile (../. + "/private/syncthing/${host}/cert.pem")
            )
          );
          folders = {
            "/var/backup" = {
                id = "backup";
                label = "backup";
                devices = [ "daenerys" "caroline" ];
                versioning = {
                  params.cleanoutDays = "0";
                  type = "trashcan";
                };
            };
            "/home/shd/books" = {
              id = "books";
              label = "books";
              devices = [ "daenerys" "caroline" "cynthia" ];
              versioning = {
                params.cleanoutDays = "0";
                type = "trashcan";
              };
            };
            "/home/shd/camera" = {
              id = "camera";
              label = "camera";
              ignorePerms = false;
              devices = [ "daenerys" "caroline" "cynthia" ];
              versioning = {
                params.cleanoutDays = "0";
                type = "trashcan";
              };
            };
            "/home/shd/documents" = {
              id = "documents";
              label = "documents";
              devices = [ "daenerys" "caroline" "cynthia" ];
              versioning = {
                params.cleanoutDays = "0";
                type = "trashcan";
              };
            };
            "/home/shd/nawia" = {
              id = "nawia";
              label = "nawia";
              devices = [ "daenerys" ];
              versioning = {
                params.cleanoutDays = "0";
                type = "trashcan";
              };
            };
            "/home/shd/notes" = {
              id = "notes";
              label = "notes";
              devices = [ "daenerys" "caroline" "cynthia" ];
              versioning = {
                params.cleanoutDays = "0";
                type = "trashcan";
              };
            };
            "/run/media/shd/Windows/backup/photos" = {
              id = "photos";
              label = "photos";
              devices = [ "daenerys" ];
              versioning = {
                params.cleanoutDays = "0";
                type = "trashcan";
              };
            };
          };
          devices = {
            cynthia =  {
              "addresses" = ["dynamic"];
              "id" = "BC7RERN-SKZBSGX-EHC3OV3-ZXMU7UY-SYZ7DK3-LV6XQDQ-CJTUPVB-Y5AOLQT";
            };
            caroline = {
              "addresses" = ["dynamic"];
              "id" = "JBOS6PP-WX5NNYZ-VAKWLEO-LVUPZ4B-H6DC47G-4BOF5PP-FGFPZHX-5HLMZAX";
            };
            daenerys = {
              "addresses" = ["dynamic"];
              "id" = "XUXFUUE-KSB3STD-ROAJL7C-KRLRPID-TVY6LTZ-ZGLKLCR-NUURL5B-6ZUKYAS";
            };
          };
        };
			};
      systemd.services.backup-folder = {
        serviceConfig.Type = "oneshot";
        script = ''
          mkdir -m 700 -p "${config.dataSharing.backupDir}"
          chown "${user}" "${config.dataSharing.backupDir}"
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
