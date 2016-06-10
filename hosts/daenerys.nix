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
		/*tcpcrypt.enable = true;*/
		firewall = {
			enable = true;
		};
		extraHosts = "127.0.0.1 www.serwisrtvgdansk.pl";
	};

	/*nix.binaryCachePublicKeys = [
    "hydra.nixos.org-1:CNHJZBh9K4tP3EKF6FkkgeVYsS3ohTl+oS0Qa8bezVs="
    "shd:AAAAB3NzaC1yc2EAAAABJQAAAIEAmNhcSbjZB3BazDbmmtqPCDzVd+GQBJI8WAoZNFkveBGC0zznUCdd78rrjke5sDRBVCIqKABCx5iwU4VM1zVWZfWlsf6HEbhyUVdWmKgylG7Mchg2dkJUfTHx/VLnE1gDqc1+9SSs88q6H+IO4Kex853Q7eUo9Cmsi8TUn9rthME="
  ];*/
	nix.trustedBinaryCaches = [ "http://hydra.nixos.org/" "http://${cacheVhost}/" ];

  dataSharing = {
    vhost = wwwVhost;
    user = shd.name;
  };

  ntopNg.vhost = wwwVhost;
  ssh.vhost = wwwVhost;
  searx.vhost = wwwVhost;

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
    /*gateone.enable = true;*/
    murmur = {
      enable = true;
      registerHostname = hostname;
    };
    /*systemhealth = {*/
    /*  enable = true;*/
    /*  drives = [*/
    /*  { name = "root"; path = "/"; }*/
    /*  ];*/
    /*};*/
		/*i2p.enable = true;*/
		nix-serve = {
			enable = true;
			secretKeyFile = toString ../private/nix-store/private.key;
		};
    /*radicale = {*/
    /*  enable = true;*/
    /*  config = ''*/
    /*  '';*/
    /*};*/

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
	};
}
