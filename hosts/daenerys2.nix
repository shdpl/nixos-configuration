{ config, pkgs, ... }:
let
  host = "daenerys";
	domain = "nawia.net";
  hostname = "${host}.${domain}";
  shd = (import ../users/shd.nix);
  cacheVhost = "cache.nix.nawia.net";
  wwwVhost = "www.nawia.net";
in
{
	/*
	imports = [
		../modules/users.nix
		../modules/pl.nix
		../modules/data-sharing.nix
		../modules/ssh.nix
		../modules/common.nix
		../modules/mail-server.nix
		../modules/web-server.nix
    ../modules/torrent/transmission.nix
    ../modules/searx.nix # seeks?
    ../modules/teamspeak.nix
    ../modules/ntopng.nix
	];

	aaa = {
		enable = true;
		wheelIsRoot = true;
		users = [ shd ];
	};

	networking = {
		hostName = host;
		domain = domain;
		firewall = {
			enable = true;
		};

		extraHosts = "127.0.0.1 www.serwisrtvgdansk.pl";
	};

  dataSharing = {
    vhost = wwwVhost;
    user = shd.name;
  };

  ssh.vhost = wwwVhost;

  webServer = {
    vhosts = {
      "${wwwVhost}" = {
        ssl = true;
        root = "/var/www";
        paths = {
          "/dl".config = ''
            autoindex on;
          '';
        };
      };
      "${cacheVhost}" = {
        paths."/" = {
          config = "proxy_pass http://localhost:5000/;";
        };
      };
      "www.serwisrtvgdansk.pl" = {
        root = "/var/www/pl.serwisrtvgdansk";
        paths = {
					"/favicon.ico".config = ''
						log_not_found off;
					  access_log off;
					'';
					"/robots.txt".config = ''
						allow all;
					  log_not_found off;
						access_log off;
					'';
          "/".config = ''
						try_files $uri $uri/ /index.php?$args;
						index index.php;
					'';
          "~ \.php$".config = ''
						try_files $uri $uri/ =404;
						include ${pkgs.nginx}/conf/fastcgi_params;
						fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
						fastcgi_pass unix:/run/phpfpm/nginx;
						fastcgi_index index.php;
          '';
					"~* \.(js|css|png|jpg|jpeg|gif|ico)$".config = ''
						expires max;
					  log_not_found off;
					'';
        };
      };
    };
  };
	services = {
		mailpile.enable = true;
		nix-serve = {
			enable = true;
			secretKeyFile = toString ../private/nix-store/private.key;
		};

		phpfpm.poolConfigs.nginx = ''
			listen = /run/phpfpm/nginx
			listen.owner = nginx
			listen.group = nginx
			listen.mode = 0660
			user = nginx
			pm = dynamic
			pm.max_children = 75
			pm.start_servers = 10
			pm.min_spare_servers = 5
			pm.max_spare_servers = 20
			pm.max_requests = 500
			php_flag[display_errors] = off
			php_admin_value[error_log] = "/run/phpfpm/php-fpm.log"
			php_admin_flag[log_errors] = on
			php_value[date.timezone] = "UTC"
			php_value[upload_max_filesize] = 10G
			env[PATH] = /var/www/bin:/var/setuid-wrappers:/var/www/.nix-profile/bin:/var/www/.nix-profile/sbin:/nix/var/nix/profiles/default/bin:/nix/var/nix/profiles/default/sbin:/run/current-system/sw/bin/run/current-system/sw/sbin
	'';
		mysql = {
			enable = true;
			package = pkgs.mysql;
		};
		bitcoind = {
			enable = true;
			user = "shd";
			txindex = true;
			configFile = (builtins.toFile "bitcoin.conf" (builtins.readFile ../private/bitcoin.conf));
		};
	};
  nixpkgs.config = {
    packageOverrides = pkgs: {
      gnupg21 = pkgs.gnupg21.override { pinentry = pkgs.pinentry_ncurses; };
    };
  };
	*/
}
