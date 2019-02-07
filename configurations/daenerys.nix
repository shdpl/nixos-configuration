{ config, pkgs, ... }:
let
	gitlab = import ../private/git/gitlab.nix;
  host = "daenerys2";
  domain = "nawia.net";
  hostname = "${host}.${domain}";
  user = (import ../users/shd.nix);
  wwwVhost = "www.${hostname}";
  cacheVhost = "nix-cache.${domain}";
  searchVhost = "search.${domain}";
  torrentVhost = "torrent.${domain}";
  ntopVhost = "ntop.${domain}";
  sshVhost = "ssh.${domain}";
	serwisrtvgdansk_pl = import ../private/website/serwisrtvgdansk_pl.nix;
	# bartekwysocki_com = import ../private/website/bartekwysocki_com.nix;
	# dagmarawojtanowicz_pl = import ../private/website/dagmarawojtanowicz_pl.nix;
	# mateuszmickiewicz_pl = import ../private/website/mateuszmickiewicz_pl.nix;
	# zmora-asg_pl = import ../private/website/zmora-asg_pl.nix;
	mail_nawia_net = import ../private/website/mail_nawia_net.nix;
in
{
	imports = [
		../modules/users.nix
		../modules/pl.nix
		../modules/data-sharing.nix
    # ../modules/ipfs.nix
		../modules/ssh.nix
		../modules/common.nix
		../modules/mail-server.nix
		../modules/nix-cache.nix
    ../modules/torrent/transmission.nix
    ../modules/search/searx.nix # seeks?
    ../modules/teamspeak.nix
    ../modules/ntop.nix
    ../modules/website/pl.serwisrtvgdansk.www.nix
    # ../modules/website/com.bartekwysocki.nix
    # ../modules/website/pl.dagmarawojtanowicz.nix
    # ../modules/website/pl.mateuszmickiewicz.nix
    # ../modules/website/pl.zmora-asg.nix
		../modules/website/net.nawia.mail.nix
    ../modules/git/gitlab.nix
    ../modules/ci/jenkins.nix
    # ../modules/chat/mattermost.nix
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
	};

	/*nix.binaryCachePublicKeys = [
    "hydra.nixos.org-1:CNHJZBh9K4tP3EKF6FkkgeVYsS3ohTl+oS0Qa8bezVs="
    "shd:AAAAB3NzaC1yc2EAAAABJQAAAIEAmNhcSbjZB3BazDbmmtqPCDzVd+GQBJI8WAoZNFkveBGC0zznUCdd78rrjke5sDRBVCIqKABCx5iwU4VM1zVWZfWlsf6HEbhyUVdWmKgylG7Mchg2dkJUfTHx/VLnE1gDqc1+9SSs88q6H+IO4Kex853Q7eUo9Cmsi8TUn9rthME="
  ];*/
  dataSharing = {
		vhost = "data.${domain}";
    path = "/";
    user = user.name;
    sslCertificate  = ../private/ca/data.nawia.net/ca.crt;
    sslCertificateKey = ../private/ca/data.nawia.net/ca.key;
  };

  # ipfs = {
  #   vhost = "ipfs.${domain}";
  #   path = "/";
  # };

  ci = {
    vhost = "ci.${domain}";
    path = "/";
  };

  # chat = {
  #   vhost = "chat.${domain}";
  #   path = "/";
  # };

  git = {
    vhost = "git.${domain}";
    path = "/";
    databasePassword = gitlab.databasePassword;
		dbSecret = gitlab.dbSecret;
		secretSecret = gitlab.secretSecret;
		otpSecret = gitlab.otpSecret;
		jwsSecret = gitlab.jwsSecret;
		initialRootEmail = gitlab.initialRootEmail;
		initialRootPassword = gitlab.initialRootPassword;
  };

  nixCache = {
		vhost = cacheVhost;
    path = "/";
    sslCertificate  = ../private/ca/nix-cache.nawia.net/ca.crt;
    sslCertificateKey = ../private/ca/nix-cache.nawia.net/ca.key;
  };

  torrent = {
		vhost = torrentVhost;
    sslCertificate  = ../private/ca/torrent.nawia.net/ca.crt;
    sslCertificateKey = ../private/ca/torrent.nawia.net/ca.key;
  };

  search = {
		vhost = searchVhost;
    path = "/";
    sslCertificate  = ../private/ca/search.nawia.net/ca.crt;
    sslCertificateKey = ../private/ca/search.nawia.net/ca.key;
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
		vhost = ntopVhost;
    path = "/";
    sslCertificate  = ../private/ca/ntop.nawia.net/ca.crt;
    sslCertificateKey = ../private/ca/ntop.nawia.net/ca.key;
  };

  ssh = {
		vhost = sshVhost;
    path = "/";
  };

  serwisRtvGdansk = {
    vhost = "www.serwisrtvgdansk.pl";
    dbName = serwisrtvgdansk_pl.database;
    dbUser = serwisrtvgdansk_pl.user;
    dbPassword  = serwisrtvgdansk_pl.password;
  };

  # bartekwysockiCom = {
  #   vhost = "bartekwysocki.${domain}";
  #   dbName = bartekwysocki_com.database;
  #   dbUser = bartekwysocki_com.user;
  #   dbPassword  = bartekwysocki_com.password;
  # };

  # dagmarawojtanowiczPl = {
  #   vhost = "dagmarawojtanowicz.${domain}";
  #   dbName = dagmarawojtanowicz_pl.database;
  #   dbUser = dagmarawojtanowicz_pl.user;
  #   dbPassword  = dagmarawojtanowicz_pl.password;
  # };

  # mateuszmickiewiczPl = {
  #   vhost = "mateuszmickiewicz.${domain}";
  #   dbName = mateuszmickiewicz_pl.database;
  #   dbUser = mateuszmickiewicz_pl.user;
  #   dbPassword  = mateuszmickiewicz_pl.password;
  # };

  # zmoraAsgPl = {
  #   vhost = "zmora-asg.${domain}";
  #   dbName = zmora-asg_pl.database;
  #   dbUser = zmora-asg_pl.user;
  #   dbPassword  = zmora-asg_pl.password;
  # };

  mailNawiaNet = {
    vhost = "mail.${domain}";
    dbName = mail_nawia_net.database;
    dbUser = mail_nawia_net.user;
    dbPassword  = mail_nawia_net.password;
  };

	services = {
		bitcoind = {
			enable = true;
			user = user.name;
			txindex = true;
			configFile = (builtins.toFile "bitcoin.conf" (builtins.readFile ../private/bitcoin.conf));
    };
    mysql = {
      enable = true;
      package = pkgs.mysql;
    };
	};
  nixpkgs.config = {
    packageOverrides = pkgs: {
      gnupg21 = pkgs.gnupg21.override { pinentry = pkgs.pinentry_ncurses; };
      # php = pkgs.php56;
    };
  };

  environment = {
    systemPackages = with pkgs;
    [
      home-manager wp-cli
    ];
    variables.TS3SERVER_LICENSE = "accept";
  };
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
