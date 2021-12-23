{ config, pkgs, ... }:
with import <nixpkgs/lib>;
let
  user = config.dataSharing.user;
  host = config.dataSharing.host;
in
{
	imports = [
    ../modules/web-server.nix
	];
	options.dataSharing = {
		host = mkOption {
			type = types.str;
		};
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
    devices = mkOption {
      default = {};
      description = ''
        Peers/devices which syncthing should communicate with.
      '';
      example = {
        bigbox = {
          id = "7CFNTQM-IMTJBHJ-3UWRDIU-ZGQJFR6-VCXZ3NB-XUH3KZO-N52ITXR-LAIYUAU";
          addresses = [ "tcp://192.168.0.10:51820" ];
        };
      };
      type = types.attrsOf (types.submodule ({ name, ... }: {
        options = {

          name = mkOption {
            type = types.str;
            default = name;
            description = ''
              Name of the device
            '';
          };

          addresses = mkOption {
            type = types.listOf types.str;
            default = [];
            description = ''
              The addresses used to connect to the device.
              If this is let empty, dynamic configuration is attempted
            '';
          };

          id = mkOption {
            type = types.str;
            description = ''
              The id of the other peer, this is mandatory. It's documented at
              https://docs.syncthing.net/dev/device-ids.html
            '';
          };

          introducer = mkOption {
            type = types.bool;
            default = false;
            description = ''
              If the device should act as an introducer and be allowed
              to add folders on this computer.
            '';
          };

        };
      }));
    };
    # folders = services.syncthing.declarative.folders;
    folders = mkOption {
      default = {};
      description = ''
        folders which should be shared by syncthing.
      '';
      example = {
        "/home/user/sync" = {
          id = "syncme";
          devices = [ "bigbox" ];
        };
      };
      type = types.attrsOf (types.submodule ({ name, ... }: {
        options = {

          enable = mkOption {
            type = types.bool;
            default = true;
            description = ''
              share this folder.
              This option is useful when you want to define all folders
              in one place, but not every machine should share all folders.
            '';
          };

          path = mkOption {
            type = types.str;
            default = name;
            description = ''
              The path to the folder which should be shared.
            '';
          };

          id = mkOption {
            type = types.str;
            default = name;
            description = ''
              The id of the folder. Must be the same on all devices.
            '';
          };

          label = mkOption {
            type = types.str;
            default = name;
            description = ''
              The label of the folder.
            '';
          };

          devices = mkOption {
            type = types.listOf types.str;
            default = [];
            description = ''
              The devices this folder should be shared with. Must be defined
              in the <literal>declarative.devices</literal> attribute.
            '';
          };

          versioning = mkOption {
            default = null;
            description = ''
              How to keep changed/deleted files with syncthing.
              There are 4 different types of versioning with different parameters.
              See https://docs.syncthing.net/users/versioning.html
            '';
            example = [
              {
                versioning = {
                  type = "simple";
                  params.keep = "10";
                };
              }
              {
                versioning = {
                  type = "trashcan";
                  params.cleanoutDays = "1000";
                };
              }
              {
                versioning = {
                  type = "staggered";
                  params = {
                    cleanInterval = "3600";
                    maxAge = "31536000";
                    versionsPath = "/syncthing/backup";
                  };
                };
              }
              {
                versioning = {
                  type = "external";
                  params.versionsPath = pkgs.writers.writeBash "backup" ''
                    folderpath="$1"
                    filepath="$2"
                    rm -rf "$folderpath/$filepath"
                  '';
                };
              }
            ];
            type = with types; nullOr (submodule {
              options = {
                type = mkOption {
                  type = enum [ "external" "simple" "staggered" "trashcan" ];
                  description = ''
                    Type of versioning.
                    See https://docs.syncthing.net/users/versioning.html
                  '';
                };
                params = mkOption {
                  type = attrsOf (either str path);
                  description = ''
                    Parameters for versioning. Structure depends on versioning.type.
                    See https://docs.syncthing.net/users/versioning.html
                  '';
                };
              };
            });
          };



              rescanInterval = mkOption {
                type = types.int;
                default = 3600;
                description = ''
                  How often the folders should be rescaned for changes.
                '';
              };

              type = mkOption {
                type = types.enum [ "sendreceive" "sendonly" "receiveonly" ];
                default = "sendreceive";
                description = ''
                  Whether to send only changes from this folder, only receive them
                  or propagate both.
                '';
              };

              watch = mkOption {
                type = types.bool;
                default = true;
                description = ''
                  Whether the folder should be watched for changes by inotify.
                '';
              };

              watchDelay = mkOption {
                type = types.int;
                default = 10;
                description = ''
                  The delay after an inotify event is triggered.
                '';
              };

              ignorePerms = mkOption {
                type = types.bool;
                default = true;
                description = ''
                  Whether to propagate permission changes.
                '';
              };

            };
          }));
        };
      };

      #       versioning = mkOption {
      #         default = null;
      #         description = ''
      #           How to keep changed/deleted files with syncthing.
      #           There are 4 different types of versioning with different parameters.
      #           See https://docs.syncthing.net/users/versioning.html
      #         '';
      #         example = [
      #           {
      #             versioning = {
      #               type = "simple";
      #               params.keep = "10";
      #             };
      #           }
      #           {
      #             versioning = {
      #               type = "trashcan";
      #               params.cleanoutDays = "1000";
      #             };
      #           }
      #           {
      #             versioning = {
      #               type = "staggered";
      #               params = {
      #                 cleanInterval = "3600";
      #                 maxAge = "31536000";
      #                 versionsPath = "/syncthing/backup";
      #               };
      #             };
      #           }
      #           {
      #             versioning = {
      #               type = "external";
      #               params.versionsPath = pkgs.writers.writeBash "backup" ''
      #                 folderpath="$1"
      #                 filepath="$2"
      #                 rm -rf "$folderpath/$filepath"
      #               '';
      #             };
      #           }
      #         ];
      #         type = with types; nullOr (submodule {
      #           options = {
      #             type = mkOption {
      #               type = enum [ "external" "simple" "staggered" "trashcan" ];
      #               description = ''
      #                 Type of versioning.
      #                 See https://docs.syncthing.net/users/versioning.html
      #               '';
      #             };
      #             params = mkOption {
      #               type = attrsOf (either str path);
      #               description = ''
      #                 Parameters for versioning. Structure depends on versioning.type.
      #                 See https://docs.syncthing.net/users/versioning.html
      #               '';
      #             };
      #           };
      #         });
      #       };



      #       rescanInterval = mkOption {
      #         type = types.int;
      #         default = 3600;
      #         description = ''
      #           How often the folders should be rescaned for changes.
      #         '';
      #       };

      #       type = mkOption {
      #         type = types.enum [ "sendreceive" "sendonly" "receiveonly" ];
      #         default = "sendreceive";
      #         description = ''
      #           Whether to send only changes from this folder, only receive them
      #           or propagate both.
      #         '';
      #       };

      #       watch = mkOption {
      #         type = types.bool;
      #         default = true;
      #         description = ''
      #           Whether the folder should be watched for changes by inotify.
      #         '';
      #       };

      #       watchDelay = mkOption {
      #         type = types.int;
      #         default = 10;
      #         description = ''
      #           The delay after an inotify event is triggered.
      #         '';
      #       };

      #       ignorePerms = mkOption {
      #         type = types.bool;
      #         default = true;
      #         description = ''
      #           Whether to propagate permission changes.
      #         '';
      #       };

      #     };
      #   }));
      # };
    # };
	# };
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
          folders = config.dataSharing.folders;
          devices = config.dataSharing.devices;
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

  # TODO: make configuration simpler
  # dataSharing = {
  #   user = user.name;
  #   host = "caroline";
		# vhost = hostname;
  #   sslCertificate  = personalCert;
  #   sslCertificateKey = personalCertKey;
  #   folders = {
  #     "/var/backup" = {
  #         id = "backup";
  #         label = "backup";
  #         devices = [ "daenerys" "magdalene" ];
  #         versioning = {
  #           params.cleanoutDays = "0";
  #           type = "trashcan";
  #         };
  #     };
  #     "/home/shd/books" = {
  #       id = "books";
  #       label = "books";
  #       devices = [ "daenerys" "magdalene" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/home/shd/camera" = {
  #       id = "camera";
  #       label = "camera";
  #       ignorePerms = false;
  #       devices = [ "daenerys" "magdalene" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/home/shd/documents" = {
  #       id = "documents";
  #       label = "documents";
  #       devices = [ "daenerys" "magdalene" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/run/media/shd/Windows/backup/nawia" = {
  #       id = "nawia";
  #       label = "nawia";
  #       devices = [ "magdalene" "daenerys" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/home/shd/notes" = {
  #       id = "notes";
  #       label = "notes";
  #       devices = [ "daenerys" "magdalene" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/run/media/shd/Windows/backup/photos" = {
  #       id = "photos";
  #       label = "photos";
  #       devices = [ "daenerys" "magdalene" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #   };
  #   devices = {
  #     cynthia =  {
  #       "addresses" = ["dynamic"];
  #       "id" = "BC7RERN-SKZBSGX-EHC3OV3-ZXMU7UY-SYZ7DK3-LV6XQDQ-CJTUPVB-Y5AOLQT";
  #     };
  #     daenerys = {
  #       "addresses" = ["dynamic"];
  #       "id" = "XUXFUUE-KSB3STD-ROAJL7C-KRLRPID-TVY6LTZ-ZGLKLCR-NUURL5B-6ZUKYAS";
  #     };
  #     magdalene = {
  #       "addresses" = ["dynamic"];
  #       "id" = "5S2XTLZ-77GPGEK-U7MC4PP-ALT6RIZ-G5VEZNA-YRHMPVA-2YHYAML-GEETKQL";
  #     };
  #   };
  # };
  # TODO: daenerys
  # dataSharing = {
  #   host = "daenerys";
		# vhost = "data.${domain}";
  #   path = "/";
  #   user = user.name;
  #   sslCertificate  = ../private/ca/data.nawia.net/ca.crt;
  #   sslCertificateKey = ../private/ca/data.nawia.net/ca.key;
  #   folders = {
  #     "/var/backup" = {
  #         id = "backup";
  #         label = "backup";
  #         devices = [ "caroline" "magdalene" ];
  #         versioning = {
  #           params.cleanoutDays = "0";
  #           type = "trashcan";
  #         };
  #     };
  #     "/home/shd/books" = {
  #       id = "books";
  #       label = "books";
  #       devices = [ "magdalene" "caroline" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/home/shd/camera" = {
  #       id = "camera";
  #       label = "camera";
  #       ignorePerms = false;
  #       devices = [ "magdalene" "caroline" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/home/shd/documents" = {
  #       id = "documents";
  #       label = "documents";
  #       devices = [ "magdalene" "caroline" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/home/shd/nawia" = {
  #       id = "nawia";
  #       label = "nawia";
  #       devices = [ "caroline" "magdalene" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/home/shd/notes" = {
  #       id = "notes";
  #       label = "notes";
  #       devices = [ "magdalene" "caroline" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/home/shd/photos" = {
  #       id = "photos";
  #       label = "photos";
  #       devices = [ "magdalene" "caroline" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #   };
  #   devices = {
  #     cynthia =  {
  #       "addresses" = ["dynamic"];
  #       "id" = "BC7RERN-SKZBSGX-EHC3OV3-ZXMU7UY-SYZ7DK3-LV6XQDQ-CJTUPVB-Y5AOLQT";
  #     };
  #     caroline = {
  #       "addresses" = ["dynamic"];
  #       "id" = "JBOS6PP-WX5NNYZ-VAKWLEO-LVUPZ4B-H6DC47G-4BOF5PP-FGFPZHX-5HLMZAX";
  #     };
  #     magdalene = {
  #       "addresses" = ["dynamic"];
  #       "id" = "5S2XTLZ-77GPGEK-U7MC4PP-ALT6RIZ-G5VEZNA-YRHMPVA-2YHYAML-GEETKQL";
  #     };
  #   };
  # };
}
