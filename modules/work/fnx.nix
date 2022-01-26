{ config, pkgs, lib, ... }:
let
  cfg = config.fnx;
	dir = "/home/${cfg.user}/src/pl.nawia/fnx/introduction";
in
with lib; 
{
  imports =
    [
      ../programming.nix
    ];

  options = {
    fnx = {
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
        default = true;
      };
    };
  };

  config = (mkMerge [
    {
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
    }
		(mkIf (cfg.enable == true) {
      programming = {
        enable = true;
        user = cfg.user;
        gitlabAccessTokens = cfg.gitlabAccessTokens;
        js = true;
        php = true;
        docker = true;
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
      # virtualisation.virtualbox.host = {
      #   enable = true;
      #   enableExtensionPack = true;
      # };
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
			system.userActivationScripts.fnx-introduction = ''
			if [ ! -d "/var/lib/httpd/pl.nawia.fnx.introduction" ]; then
				mkdir -p /var/lib/httpd/pl.nawia.fnx.introduction
				${pkgs.git}/bin/git clone -v git@github.com:TYPO3/typo3.git -b 10.4 /var/lib/httpd/pl.nawia.fnx.introduction
        setfacl user:wwwrun:rx /var/lib/httpd/pl.nawia.fnx.introduction
        ln -s /var/lib/httpd/pl.nawia.fnx.introduction /home/${cfg.user}/src/pl.nawia/fnx/introduction/target
			fi;
			'';
      services.httpd = {
        enable = true;
        enablePHP = true;
        adminAddr = "shd@nawia.net";
        virtualHosts.localhost = {
          documentRoot = "/var/lib/httpd/pl.nawia.fnx.introduction";
          # listen.*.port = "8080"
        };
      };
    })
  ]);
}
