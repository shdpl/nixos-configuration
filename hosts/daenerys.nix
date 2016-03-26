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
  ssh = {
    vhost = wwwVhost;
  };
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
    };
  };
	services = {
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
	};
}
