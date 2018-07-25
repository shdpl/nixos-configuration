{ config, pkgs, ... }:
let
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
  ip = "78.46.102.47";
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
	virtualisation.docker.enable = true;
  # services.etcd = {
  #   enable = true;
  #   advertiseClientUrls = [ "http://${ip}:2379" ];
  #   initialAdvertisePeerUrls = [ "http://${ip}:2380" ];
  #   initialCluster = [ "nixos=http://${ip}:2380" ];
  #   listenClientUrls = [ "http://${ip}:2379" ];
  #   listenPeerUrls = [ "http://${ip}:2380" ];
  #   clientCertAuth = true;
  #   certFile = ;
  #   keyFile = ;
  #   peerClientCertAuth = true;
  #   peerCertFile = ;
  #   peerKeyFile = ;
  #   peerTrustedCaFile = ;
  #   trustedCaFile = ;
  # };
  networking.hosts.${ip} = [ "kubernetes" ];
  services.kubernetes = {
    kubeconfig.server = "https://kubernetes:443";
    roles = ["master" "node"];
    controllerManager = {
      enable = true;
      port = 10252;
      kubeconfig.server = "https://kubernetes:443";
    };
    kubelet = {
      enable = true;
      unschedulable = false;
      address = ip;
      nodeIp = null;
      port = 10250;
      kubeconfig.server = "https://kubernetes:443";
    };
    apiserver = {
      enable = true;
      port = 8080;
      securePort = 443;
      address = ip;
      advertiseAddress = ip;
      publicAddress = ip;
      kubeletHttps = true;
    };
    scheduler = {
      enable  = true;
      address = ip;
      port = 10251;
      kubeconfig.server = "https://kubernetes:443";
    };
    # etcd.servers = [ "http://${ip}:2379" ];
    flannel.enable = true;
  };
}
