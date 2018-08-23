{ config, pkgs, ... }:
with import <nixpkgs/lib>;
let
	cfg = config.mailNawiaNet;
	credentials = import ../../private/website/mail_nawia_net.nix;
	version = "1.3.7";
	src = fetchFromGitHub {
		owner = "roundcube";
		repo = "roundcubemail";
		rev = version;
		sha256 = "0ks6dgcrhbks73nn3x8zj7lwbkf5alr97ii6v6chy2x2q19h30kv";
	};
  conf = ''
worker_processes  2;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

    server {
                #listen      80;
                root        /usr/local/www/roundcubemail;

                # Logs
                access_log  /usr/home/webmail/roundcube-access.log;
                error_log   /usr/home/webmail/roundcube-error.log;

                # Default location settings
                location / {
                        index   index.php;
                        try_files $uri $uri/ /index.php?$args;
                }

                # Redirect server error pages to the static page /50x.html
                error_page 500 502 503 504 /50x.html;
                        location = /50x.html {
                        root /usr/share/nginx/html;
                }

                # Pass the PHP scripts to FastCGI server (locally with unix: param to avoid network overhead)
                location ~ \.php$ {
                        # Prevent Zero-day exploit
                        try_files $uri =404;

                        fastcgi_keep_conn on;
                        fastcgi_split_path_info       ^(.+\.php)(.*)$;
                        fastcgi_param PATH_INFO       $fastcgi_path_info;
                        fastcgi_param SCRIPT_FILENAME    $document_root$fastcgi_script_name;
                        fastcgi_pass    unix:/var/run/php-fpm.sock;
                        fastcgi_index   index.php;
                        include         fastcgi_params;
                }

                # Deny access to .htaccess files, if Apache's document root
                location ~ /\.ht {
                    deny  all;
                }

                # Exclude favicon from the logs to avoid bloating when it's not available
                location /favicon.ico {
                        log_not_found   off;
                        access_log      off;
                }
        }
}
  '';
in
{
	options.mailNawiaNet = {
		vhost = mkOption {
			type = types.str;
		};
		dbName = mkOption {
			type = types.str;
		};
		backup = mkOption {
			type = types.path;
			default = /var/backup/mysql/net.nawia.mail.gz;
		};
		dbUser = mkOption {
			type = types.str;
		};
		dbPassword = mkOption {
			type = types.str;
		};
		root = mkOption {
			type = types.string;
			default = "/var/www/roundcubeemail";
		};
	};
  config = (mkMerge [
		(mkIf (cfg.vhost != "") {
			webServer.virtualHosts."${cfg.vhost}" = {
				root = cfg.root;
        # enableACME = true;
        # addSSL = true;
        locations = {
					"/favicon.ico".extraConfig = ''
						log_not_found off;
					  access_log off;
					'';
					"/robots.txt".extraConfig = ''
						allow all;
					  log_not_found off;
						access_log off;
					'';
          "/".extraConfig = ''
						try_files $uri $uri/ /index.php?$args;
						index index.php;
					'';
          "~ \.php$".extraConfig = ''
						try_files $uri $uri/ =404;
						include ${pkgs.nginx}/conf/fastcgi_params;
						fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
						fastcgi_pass unix:/run/phpfpm/nginx;
						fastcgi_index index.php;
          '';
					"~* \.(js|css|png|jpg|jpeg|gif|ico)$".extraConfig = ''
						expires max;
					  log_not_found off;
					'';
        };
        extraConfig = ''
        access_log syslog:server=unix:/dev/log;
        error_log syslog:server=unix:/dev/log;
        '';
			};
			systemd = {
				services.netNawiaMail = {
					after = [ "mysql.service" ];
					wantedBy = [ "multi-user.target" ];
					unitConfig = {
						type = "oneshot";
						RemainAfterExit = true;
					};
					serviceConfig.TimeoutStartSec = 600;
					script = ''
						# Wait until the MySQL server is available for use
						count=0
						while [ ! -e /run/mysqld/mysqld.sock ]
						do
								if [ $count -eq 30 ]
								then
										echo "Tried 30 times, giving up..."
										exit 1
								fi

								echo "MySQL daemon not yet started. Waiting for 1 second..."
								count=$((count++))
								sleep 1
						done
						if [ ! -d "/var/lib/mysql/${cfg.dbName}" ]
						then
							echo "Creating initial database: ${cfg.dbName}"
							( echo 'create database `${cfg.dbName}`;'
								echo 'use `${cfg.dbName}`;'
								${pkgs.gzip}/bin/gzip -cd "${cfg.backup}"
							) | ${pkgs.mysql}/bin/mysql -u root -N
							echo "Creating user: ${cfg.dbUser}"
							( echo "CREATE USER '${cfg.dbUser}'@'localhost' IDENTIFIED BY '${cfg.dbPassword}';";
								echo "GRANT ALL on ${cfg.dbName}.* TO '${cfg.dbUser}'@'localhost';";
							) | ${pkgs.mysql}/bin/mysql -u root -N
						fi
					'';
				};
			};
			environment.systemPackages = with pkgs;
			[
				php56Packages.composer
				php56Packages.imagick
				wget unzip
			];
		})
	]);
}
