{ config, pkgs, ... }:
let
  host = "daenerys2";
  domain = "nawia.net";
  hostname = "${host}.${domain}";
  user = (import ../users/shd.nix);
  wwwVhost = "www.${hostname}";
	personalCert = ../private/ca/mail.nawia.net.crt;
	personalCertKey = ../private/ca/mail.nawia.net.key;
	personalCertClient = ../private/ca/nawia.net.pem;
  cacheVhost = "cache.nix.nawia.net";
	serwisrtvgdansk_pl = import ../private/website/serwisrtvgdansk_pl.nix;
in
{
	imports = [
		../modules/users.nix
		../modules/pl.nix
		../modules/data-sharing.nix
		../modules/ssh.nix
		../modules/common.nix
		../modules/mail-server.nix
		../modules/nix-cache.nix
    ../modules/torrent/transmission.nix
    ../modules/search/searx.nix # seeks?
    ../modules/teamspeak.nix
    ../modules/ntop.nix
    ../modules/website/pl.serwisrtvgdansk.www.nix
#    ../modules/website/pl.joanka-z.nix
    "${builtins.fetchTarball https://github.com/rycee/home-manager/archive/nixos-module-user-pkgs.tar.gz}/nixos"
	];

	aaa = {
		enable = true;
		wheelIsRoot = true;
		users = [ user ];
	};

	networking = {
		hostName = host;
		domain = domain;
		/*tcpcrypt.enable = true;*/
		firewall = {
			enable = true;
		};

    #extraHosts = "127.0.0.1 www.serwisrtvgdansk.pl";
	};

	/*nix.binaryCachePublicKeys = [
    "hydra.nixos.org-1:CNHJZBh9K4tP3EKF6FkkgeVYsS3ohTl+oS0Qa8bezVs="
    "shd:AAAAB3NzaC1yc2EAAAABJQAAAIEAmNhcSbjZB3BazDbmmtqPCDzVd+GQBJI8WAoZNFkveBGC0zznUCdd78rrjke5sDRBVCIqKABCx5iwU4VM1zVWZfWlsf6HEbhyUVdWmKgylG7Mchg2dkJUfTHx/VLnE1gDqc1+9SSs88q6H+IO4Kex853Q7eUo9Cmsi8TUn9rthME="
  ];*/
  dataSharing = {
		vhost = hostname;
    user = user.name;
    sslCertificate  = personalCert;
    sslCertificateKey = personalCertKey;
    sslClientCertificate = personalCertClient;
  };

  nixCache = {
		vhost = cacheVhost;
  };

  torrent = {
		vhost = hostname;
  };

  search = {
		vhost = hostname;
    path = "/search/";
  };

  common = {
    host = host;
    cacheVhost = cacheVhost;
    nixpkgsPath = "/home/${user.name}/src/nixpkgs";
    nixosConfigurationPath = "/home/${user.name}/src/nixos-configuration";
    email = user.email;
    ca = ../private/ca/nawia.net.pem;
  };

  ntop = {
		vhost = hostname;
  };
  #ntopNg.vhost = wwwVhost;
  ssh.vhost = wwwVhost;
  #searx.vhost = wwwVhost;

  serwisRtvGdansk = {
    vhost = "serwis.${hostname}";
    dbName = serwisrtvgdansk_pl.database;
    dbUser = serwisrtvgdansk_pl.user;
    dbPassword  = serwisrtvgdansk_pl.password;
  };
#  joankaZ.vhost = "joanka.${hostname}";

	services = {
		bitcoind = {
			enable = true;
			user = user.name;
			txindex = true;
			configFile = (builtins.toFile "bitcoin.conf" (builtins.readFile ../private/bitcoin.conf));
		};
	};
  nixpkgs.config = {
    packageOverrides = pkgs: {
      gnupg21 = pkgs.gnupg21.override { pinentry = pkgs.pinentry_ncurses; };
      php = pkgs.php56;
    };
  };

  environment.systemPackages = with pkgs;
  [
    home-manager
  ];
	home-manager.users.${user.name} = {
    programs.git = {
      enable = true;
      userName = user.fullName;
      userEmail = user.email;
    };
		home.file = { ".config/syncthing/config.xml".source =  ../data/syncthing/daenerys.xml; } // user.home.common;
    services = user.services.workstation;
		home.packages = [ ];
    xresources = user.xresources;
	};
}
