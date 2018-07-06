{ config, pkgs, ... }:
with import <nixpkgs/lib>;
let
	cfg = config.joankaZ;
	joankaz_pl = import ../../private/website/joankaz_pl.nix;
in
{
	imports = [
    ../web-server.nix
	];
	options.joankaZ = {
		vhost = mkOption {
			type = types.str;
			default = "";
		};
	};
  config = (mkMerge [
		(mkIf (cfg.vhost != "") {
			webServer.virtualHosts."${cfg.vhost}" = {
					root = "/var/www/pl.joanka-z";
					locations = {
						"/".extraConfig = ''
							try_files $uri $uri/ /index.php?$args;
							index index.php;
						'';
						"/favicon.ico".extraConfig = ''
							log_not_found off;
							access_log off;
						'';
						"/robots.txt".extraConfig = ''
							allow all;
							log_not_found off;
							access_log off;
						'';
						"~ \.php$".extraConfig  = ''
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
			};
			services.mysql = {
				enable = true;
				initialScript = pkgs.writeText "start.sql" ''
					CREATE DATABASE ${joankaz_pl.database};
					CREATE USER '${joankaz_pl.user}'@'localhost' IDENTIFIED BY '${joankaz_pl.password}';
					GRANT ALL on ${joankaz_pl.database}.* TO '${joankaz_pl.user}'@'localhost';
				'';
			};
		})
	]);
}
