{ config, pkgs, lib, ... }:
let
  cfg = config.work.fnx;
	dir = "/home/${cfg.user}/src/pl.nawia/fnx/introduction";
in
with lib; 
{
  imports =
    [
      ../programming.nix
    ];

  options = {
    work.fnx = {
      enable = mkOption {
        type = with types; bool;
        default = false;
      };
      user = mkOption {
        type = with types; str;
      };
      gitlabAccessTokens = mkOption {
        type = with types; str;
      };
      recrutation = mkOption {
        type = with types; bool;
        default = false;
      };
      introduction = mkOption {
        type = with types; bool;
        default = false;
      };
    };
  };

  config = (mkMerge [
		(mkIf (cfg.enable == true) {
      programming = {
        enable = true;
        user = cfg.user;
        gitlabAccessTokens = cfg.gitlabAccessTokens;
        js = true;
        php = true;
      };
      environment.systemPackages = with pkgs;
      [
        (pkgs.pidgin.override { plugins = [pkgs.pidgin-skypeweb]; })
        teams
      ];
      services.openvpn.servers = {
        # updateResolvConf = true;
        client = {
          config = ''
            client
            dev tun
            proto tcp
            remote 46.248.162.115 1194
            resolv-retry infinite
            nobind
            user nobody
            group nobody
            persist-key
            persist-tun
            ca ${../../private/fnx/vpn/ca.crt}
            cert ${../../private/fnx/vpn/fnx.crt}
            key ${../../private/fnx/vpn/fnx.key}
            ns-cert-type server
            tls-auth ${../../private/fnx/vpn/ta.key} 1
            comp-lzo
          '';
        };
      };
    })
		(mkIf (cfg.recrutation == true) {
			system.userActivationScripts.fnx-recrutation = ''
			if [ ! -d "${dir}" ]; then
				mkdir -p ${dir}
				${pkgs.git}/bin/git clone git@gitlab.com:shdpl/fnx.git ${dir}
				cd ${dir} && ${pkgs.phpPackages.composer}/bin/composer install
				${pkgs.php80}/bin/php ${dir}/bin/migrate.php
			fi;
			'';
			services.phpfpm = {
				phpPackage = pkgs.php80.withExtensions ({ all, ... }: with all; [ session pdo pdo_sqlite ]);
				pools.fnx-recrutation = {
					user = "${cfg.user}";
					group = "users";
					phpOptions = ''
						error_log = "syslog";
						log_errors = 1;
					'';
					settings = {
						"pm" = "dynamic";
						"pm.max_children" = 32;
						"pm.start_servers" = 2;
						"pm.min_spare_servers" = 2;
						"pm.max_spare_servers" = 4;
						"pm.max_requests" = 500;
						"listen.owner" = "nginx";
						"listen.group" = "nginx";
						"access.log" = "/var/log/fpm-access.log";
					};
				};
			};
			services.nginx = {
				enable = true;
				virtualHosts.localhost = {
					serverName = "localhost";
					root = dir;
					extraConfig= "index index.php;";
					locations = {
						"~* /(css|js|html)/.*" = {
						  priority = 700;
							extraConfig = ''
							expires max;
							log_not_found off;
              '';
						};
						"~ /" = {
              priority = 800;
							extraConfig = ''
								fastcgi_pass unix:${config.services.phpfpm.pools.fnx-recrutation.socket};
								fastcgi_index index.php;
								include "${config.services.nginx.package}/conf/fastcgi.conf";
								fastcgi_param   SCRIPT_FILENAME    ${dir}/index.php;
								fastcgi_param   SCRIPT_NAME        index.php;

								# Mitigate https://httpoxy.org/ vulnerabilities
								fastcgi_param HTTP_PROXY "";
								fastcgi_intercept_errors off;
								fastcgi_buffer_size 16k;
								fastcgi_buffers 4 16k;
								fastcgi_connect_timeout 300;
								fastcgi_send_timeout 300;
								fastcgi_read_timeout 300;
							'';
						};
					};
				};
			};
    })
		(mkIf (cfg.introduction == true) {
      # TODO: domain
      # virtualisation.docker = {
      #   enable = true;
      #   storageDriver = "overlay2";
      #   # extraOptions = ''--userns-remap="shd:users"'';
      # };
      virtualisation.oci-containers = {
        # backend = "docker";
        backend = "podman";
        containers = {
          mysql = {
            image = "mysql:8.0"; #FIXME: download time exceeds TimeoutStartSec
            imageFile = pkgs.dockerTools.pullImage {
              imageName = "mysql";
              imageDigest = "sha256:c2e99ad580f5f03f4e0f09f22169d90c561da383781531fe712f6eb0e494d332";
              finalImageName = "mysql";
              finalImageTag = "8.0";
              sha256 = "sha256-GpkZCbdYFXyfwvmGBoE4GgYllAcoG+1yWqaIaqOiBkQ=";
              os = "linux";
              arch = "x86_64";
            };
            environment = import ../../private/fnx/introduction/.env.nix;
            user = "100033";
            ports = [ "3306:3306" ];
          };
          typo3 = {
            image = "martinhelmich/typo3:10.4"; #FIXME: download time exceeds TimeoutStartSec
            imageFile = pkgs.dockerTools.pullImage {
              imageName = "martinhelmich/typo3";
              imageDigest = "sha256:07f17dadaba317caa75d5b9e0a893473973143fa3828e025dbeae13bce9fbfbf";
              finalImageName = "martinhelmich/typo3";
              finalImageTag = "10.4";
              sha256 = "sha256-9qzs5U2HK0FTT2aPthY+Q/bnVj4AvEIleMMzBS/binY";
              os = "linux";
              arch = "x86_64";
            };
            volumes = [
              "/home/${cfg.user}/src/pl.nawia/fnx/introduction/fileadmin:/var/www/html/fileadmin"
              "/home/${cfg.user}/src/pl.nawia/fnx/introduction/typo3conf:/var/www/html/typo3conf"
              "/home/${cfg.user}/src/pl.nawia/fnx/introduction/uploads:/var/www/html/uploads"
            ];
            user = "100033";
            ports = [ "8080:80" ];
            dependsOn = [ "mysql" ];
          };
        };
      };

			# services.phpfpm = {
			# 	phpPackage = pkgs.php80.withExtensions ({ all, ... }: with all; [ session pdo pdo_sqlite ]);
			# 	pools.fnx-introduction = {
			# 		user = "${cfg.user}";
			# 		group = "users";
			# 		phpOptions = ''
			# 			error_log = "syslog";
			# 			log_errors = 1;
			# 		'';
			# 		settings = {
			# 			"pm" = "dynamic";
			# 			"pm.max_children" = 32;
			# 			"pm.start_servers" = 2;
			# 			"pm.min_spare_servers" = 2;
			# 			"pm.max_spare_servers" = 4;
			# 			"pm.max_requests" = 500;
			# 			"listen.owner" = "nginx";
			# 			"listen.group" = "nginx";
			# 			"access.log" = "/var/log/fpm-access.log";
			# 		};
			# 	};
			# };
			# system.userActivationScripts.fnx-introduction = ''
			# if [ ! -d "/var/lib/httpd/pl.nawia.fnx.introduction" ]; then
			# 	mkdir -p /var/lib/httpd/pl.nawia.fnx.introduction
			# 	${pkgs.git}/bin/git clone -v git@github.com:TYPO3/typo3.git -b 10.4 /var/lib/httpd/pl.nawia.fnx.introduction
        # setfacl user:wwwrun:rx /var/lib/httpd/pl.nawia.fnx.introduction
        # cd /var/lib/httpd/pl.nawia.fnx.introduction
			# 	${pkgs.phpPackages.composer}/bin/composer install
        # ln -s /var/lib/httpd/pl.nawia.fnx.introduction /home/${cfg.user}/src/pl.nawia/fnx/introduction/target
			# fi;
			# '';
      #services.httpd = {
      #  enable = true;
      #  enablePHP = true;
      #  adminAddr = "shd@nawia.net";
      # TODO: assert mod_rewrite, mod_authz_core, mod_alias, mod_autoindex, mod_headers enabled
      #  extraModules = [
      #    "headers"
      #  ];
      #};
    })
  ]);
}
