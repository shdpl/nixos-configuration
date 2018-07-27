{ config, pkgs, ... }:
with import <nixpkgs/lib>;
let
	cfg = config.serwisRtvGdansk;
	serwisrtvgdansk_pl = import ../../private/website/serwisrtvgdansk_pl.nix;
in
{
	options.serwisRtvGdansk = {
		vhost = mkOption {
			type = types.str;
		};
		dbName = mkOption {
			type = types.str;
		};
		dbUser = mkOption {
			type = types.str;
		};
		dbPassword = mkOption {
			type = types.str;
		};
		dbHost = mkOption {
			type = types.str;
      default = "localhost";
		};
		extraConfig = mkOption {
			type = types.str;
      default = "";
		};
    package = mkOption {
      type = types.path;
      default = pkgs.wordpress;
    };
		root = mkOption {
			type = types.string;
			default = "/var/www/pl.serwisrtvgdansk";
		};
		backup = mkOption {
			type = types.path;
			default = /var/backup/mysql/4iS5BzFnzsos.gz;
		};
		backup2 = mkOption {
			type = types.string;
			default = "/var/backup/wordpress/4iS5BzFnzsos.tar";
		};
		backupUser = mkOption {
			type = types.str;
      default = "shd";
		};
	};
  config = (mkMerge [
		(mkIf (cfg.vhost != "") {
			webServer.virtualHosts."${cfg.vhost}" = {
				root = cfg.root;
        enableACME = true;
        addSSL = true;
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
          "~ style-custom\.css$".extraConfig = ''
						include ${pkgs.nginx}/conf/fastcgi_params;
						fastcgi_param SCRIPT_FILENAME $document_root/index.php;
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
			services.mysqlBackup = {
				enable = true;
				databases = [ serwisrtvgdansk_pl.database ];
				user = cfg.backupUser;
			};
			systemd = {
				timers.plSerwisrtvgdanskBackup = {
					wantedBy = [ "timers.target" ];
					timerConfig = {
						OnCalendar = "01:15:00";
						AccuracySec = "5m";
						Unit = "plSerwisrtvgdanskBackup.service";
					};
				};
				services."plSerwisrtvgdanskBackup" = {
					enable = true;
					serviceConfig = {
						User = cfg.backupUser;
						PermissionsStartOnly = true;
					};
					script = ''
						mkdir -p $(dirname "${cfg.backup2}")
						${pkgs.gnutar}/bin/tar -cvf "${cfg.backup2}" "${cfg.root}"
						chown -R "${cfg.backupUser}" $(dirname "${cfg.backup2}")
					'';
				};
				services.plSerwisrtvgdansk = {
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
						if [ ! -d "/var/lib/mysql/${serwisrtvgdansk_pl.database}" ]
						then
							echo "Creating initial database: ${serwisrtvgdansk_pl.database}"
							( echo 'create database `${serwisrtvgdansk_pl.database}`;'
								echo 'use `${serwisrtvgdansk_pl.database}`;'
								${pkgs.gzip}/bin/gzip -cd "${cfg.backup}"
							) | ${pkgs.mysql}/bin/mysql -u root -N
							echo "Creating user: ${serwisrtvgdansk_pl.user}"
							( echo "CREATE USER '${serwisrtvgdansk_pl.user}'@'localhost' IDENTIFIED BY '${serwisrtvgdansk_pl.password}';";
								echo "GRANT ALL on ${serwisrtvgdansk_pl.database}.* TO '${serwisrtvgdansk_pl.user}'@'localhost';";
							) | ${pkgs.mysql}/bin/mysql -u root -N
						fi
						if [ ! -d "${cfg.root}" ]
						then
							mkdir -m 700 -p "${cfg.root}"
							chown nginx:nginx "${cfg.root}"
							cd /
							${pkgs.gnutar}/bin/tar xvf "${cfg.backup2}"
						fi
					'';
				};
			};
		})
	]);
}
