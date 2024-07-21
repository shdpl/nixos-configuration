{ config, pkgs, lib, ... }:
with lib;
let
	cfg = config.dagmarawojtanowiczPl;
	credentials = import ../../private/website/dagmarawojtanowicz_pl.nix;
in
{
	options.dagmarawojtanowiczPl = {
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
			type = types.str;
			default = "/var/www/dagmarawojtanowicz.pl";
		};
		backup = mkOption {
			type = types.path;
			default = /var/backup/mysql/dagmarawojtanowicz.pl.gz;
		};
		backup2 = mkOption {
			type = types.str;
			default = "/var/backup/wordpress/dagmarawojtanowicz.pl.tar";
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
			services.mysqlBackup = {
				enable = true;
				databases = [ credentials.database ];
				user = cfg.backupUser;
			};
			systemd = {
				timers.dagmarawojtanowiczPlBackup = {
					wantedBy = [ "timers.target" ];
					timerConfig = {
						OnCalendar = "01:15:00";
						AccuracySec = "5m";
						Unit = "dagmarawojtanowiczPlBackup.service";
					};
				};
				services."dagmarawojtanowiczPlBackup" = {
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
				services.dagmarawojtanowiczPl = {
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
						if [ ! -d "/var/lib/mysql/${credentials.database}" ]
						then
							echo "Creating initial database: ${credentials.database}"
							( echo 'create database `${credentials.database}`;'
								echo 'use `${credentials.database}`;'
								${pkgs.gzip}/bin/gzip -cd "${cfg.backup}"
							) | ${pkgs.mysql}/bin/mysql -u root -N
							echo "Creating user: ${credentials.user}"
							( echo "CREATE USER '${credentials.user}'@'localhost' IDENTIFIED BY '${credentials.password}';";
								echo "GRANT ALL on ${credentials.database}.* TO '${credentials.user}'@'localhost';";
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
