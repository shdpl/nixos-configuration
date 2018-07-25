{ config, pkgs, ... }:
let
  host = "caroline";
  domain = "nawia.net";
  hostname = "${host}.${domain}";
  user = (import ../users/shd.nix);
	ddns = (import ../private/dns/caroline.nix);
  personalCert = ../private/ca/caroline.nawia.net/ca.crt;
  personalCertKey = ../private/ca/caroline.nawia.net/ca.key;
  cacheVhost = "cache.nix.nawia.net";
  interface = "wlp1s0";
  ip = "192.168.1.102";
in
{
	imports =
	[
	#../hardware/qemu.nix
  ../hardware/dell_vostro_3559.nix
	../modules/users.nix
	../modules/pl.nix
	# ../modules/data-sharing.nix
	../modules/ssh.nix
	../modules/dns/ovh.nix
	../modules/common.nix
	../modules/workstation.nix
	../modules/graphics.nix
	../modules/programming.nix
	../modules/work/livewyer.nix
  ../modules/hobby.nix
    "${builtins.fetchTarball https://github.com/rycee/home-manager/archive/nixos-module-user-pkgs.tar.gz}/nixos"
	];

  aaa = {
    enable = true;
    wheelIsRoot = true;
    users = [ user ];
  };

  /*
  dataSharing = {
    user = user.name;
		vhost = hostname;
    sslCertificate  = personalCert;
    sslCertificateKey = personalCertKey;
  };
  */

  networking = {
    wireless = {
      enable = true;
      networks = {
        shd_ap = (import ../private/wireless/shd_ap.nix);
        shd_ap1 = (import ../private/wireless/shd_ap1.nix);
        shd_ap2 = (import ../private/wireless/shd_ap2.nix);
      };
    };
  };

# FIXME
	users.users.root.openssh.authorizedKeys.keys = [
		"ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAIEAmNhcSbjZB3BazDbmmtqPCDzVd+GQBJI8WAoZNFkveBGC0zznUCdd78rrjke5sDRBVCIqKABCx5iwU4VM1zVWZfWlsf6HEbhyUVdWmKgylG7Mchg2dkJUfTHx/VLnE1gDqc1+9SSs88q6H+IO4Kex853Q7eUo9Cmsi8TUn9rthME="
	];
###

  dns = {
    ddns = true;
    host = host;
    domain = domain;
		username = ddns.username;
		password = ddns.password;
		interface = interface;
  };

  workstation = {
    enable = true;
    user = user.name;
    pulseaudio = true;
  };

  common = {
    host = host;
    cacheVhost = cacheVhost;
    nixpkgsPath = "/home/${user.name}/src/nixpkgs";
    nixosConfigurationPath = "/home/${user.name}/src/nixos-configuration";
    email = user.email;
    ca = ../private/ca/nawia.net.pem;
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
		home.file = { ".config/syncthing/config.xml".source =  ../data/syncthing/caroline.xml; } // user.home.programming // user.home.workstation // user.home.common;
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
  networking.hosts.${ip} = [ "cluster.nawia.net" ];
  services.kubernetes = {
    kubeconfig.server = "https://cluster.nawia.net:443";
    roles = ["master" "node"];
    controllerManager = {
      enable = true;
      port = 10252;
      kubeconfig.server = "https://cluster.nawia.net:443";
    };
    kubelet = {
      enable = true;
      unschedulable = false;
      address = ip;
      nodeIp = null;
      port = 10250;
      kubeconfig.server = "https://cluster.nawia.net:443";
    };
    apiserver = {
      enable = true;
      port = 8080;
      securePort = 443;
      address = ip;
      advertiseAddress = ip;
      publicAddress = ip;
      kubeletHttps = true;
      clientCaFile = ../private/ca/cluster.nawia.net/ca.crt;
      kubeletClientCaFile = ../private/ca/cluster.nawia.net/ca.crt;
      #kubeletClientCertFile = ../private/ca/cluster.nawia.net/user.pem;
    };
    scheduler = {
      enable  = true;
      address = ip;
      port = 10251;
      kubeconfig.server = "https://cluster.nawia.net:443";
    };
    # etcd.servers = [ "http://${ip}:2379" ];
    flannel.enable = true;
  };
}
