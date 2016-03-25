{ config, pkgs, ... }:
let
  host = "daenerys";
	domain = "nawia.net";
  hostname = "${host}.${domain}";
  shd = (import ../users/shd.nix);
  cacheVhost = "cache.nix.nawia.net";
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
			/*allowedTCPPorts = [ 9091 ];*/
			allowedTCPPortRanges = [
				{ from = 8000; to = 8100; }
			];
			allowedUDPPortRanges = [
				{ from = 8000; to = 8100; }
			];
		};
	};

	/*nix.binaryCachePublicKeys = [ "hydra.nixos.org-1:CNHJZBh9K4tP3EKF6FkkgeVYsS3ohTl+oS0Qa8bezVs=" "shd:AAAAB3NzaC1yc2EAAAABJQAAAIEAmNhcSbjZB3BazDbmmtqPCDzVd+GQBJI8WAoZNFkveBGC0zznUCdd78rrjke5sDRBVCIqKABCx5iwU4VM1zVWZfWlsf6HEbhyUVdWmKgylG7Mchg2dkJUfTHx/VLnE1gDqc1+9SSs88q6H+IO4Kex853Q7eUo9Cmsi8TUn9rthME=" ];*/
	nix.trustedBinaryCaches = [ "http://hydra.nixos.org/" "http://${cacheVhost}/" ];

  webServer = {
    vhosts = {
      "www.nawia.net" = {
        ssl = true;
        root = "/var/www";
        paths = {
          "/dl".config = ''
            autoindex on;
          '';
          "/syncthing".config = ''
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://localhost:8384/;
          '';
          "/transmission".config = ''
            proxy_set_header    X-Real-IP  $remote_addr;
            proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header    Host $http_host;
            proxy_redirect      off;
            proxy_pass  http://localhost:9091/transmission;
          '';
          "/ntopng/".config = ''
            proxy_pass http://localhost:3000/;
          '';
          "/shell/".config = ''
            proxy_pass http://localhost:4200/;
          '';
        };
      };
      "${cacheVhost}" = {
        paths."/" = {
          config = "proxy_pass http://localhost:5000/;";
        };
      };
    };
  };
	services = {
    shellinabox = {
      enable = true;
      /*extraOptions = [ "--localhost-only" "--service /:shd:/home/shd:SHELL" ];*/
    };
    /*gateone.enable = true;*/
    murmur = {
      enable = true;
      registerHostname = hostname;
    };
    searx.enable = true;
    seeks.enable = true;
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
		transmission = {
			enable = true;
			settings = {
				start-added-torrents = true;
				lpd-enabled = true;
				peer-port = 8000;
				peer-port-random-low = 8001;
				peer-port-random-high = 8100;
				peer-port-random-on-start = true;
        rpc-bind-address = "127.0.0.1";
        rpc-enabled = true;
				rpc-whitelist-enabled = false;
				rpc-authentication-required = true;
				rpc-username = builtins.readFile ../private/transmission/username;
				rpc-password = builtins.readFile ../private/transmission/password;
			};
		};
		ntopng = {
			enable = true;
			extraConfig = ''
				--http-prefix=/ntopng
				--disable-login=1
				--interface=1
			'';
		};
    /*radicale = {*/
    /*  enable = true;*/
    /*  config = ''*/
    /*  '';*/
    /*};*/
	};
}
