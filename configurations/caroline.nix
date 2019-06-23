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
in
{
  # TODO: try 4.12.13 kernel for wifi disconnections reason=4
	imports =
	[
	#../hardware/qemu.nix
  ../hardware/dell_vostro_3559.nix
	../modules/users.nix
	../modules/pl.nix
	../modules/data-sharing.nix
	../modules/ssh.nix
	../modules/dns/ovh.nix
	../modules/common.nix
	../modules/workstation.nix
	../modules/graphics.nix
	../modules/programming.nix
	../modules/work/livewyer.nix
  ../modules/hobby.nix
  ../modules/print-server.nix
    "${builtins.fetchTarball https://github.com/rycee/home-manager/archive/nixos-module-user-pkgs.tar.gz}/nixos"
	];

  virtualisation.libvirtd.enable = true;

  aaa = {
    enable = true;
    wheelIsRoot = true;
    users = [ user ];
  };

  dataSharing = {
    user = user.name;
		vhost = hostname;
    sslCertificate  = personalCert;
    sslCertificateKey = personalCertKey;
  };

  networking = {
    nameservers=[
      "208.67.222.222"
      "208.67.220.220"
      "208.67.222.220"
      "208.67.220.222"
      "2620:0:ccc::2"
      "2620:0:ccd::2"
    ];
    wireless = {
      enable = true;
      userControlled.enable = true;
      # networks = {
      #   shd_ap = (import ../private/wireless/shd_ap.nix);
      #   shd_ap1 = (import ../private/wireless/shd_ap1.nix);
      #   shd_ap2 = (import ../private/wireless/shd_ap2.nix);
      # };
    };
  };

# FIXME
	users.users.root.openssh.authorizedKeys.keys = [
    (builtins.readFile ../data/ssh/id_ed25519.pub)
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

  programming = {
    enable = true;
    android = true;
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
		home.file = { ".config/syncthing/config.xml".source =  ../data/syncthing/caroline.xml; } // user.home.programming // user.home.workstation // user.home.common // user.home.work.livewyer;
    services = user.services.workstation;
		home.packages = [ ];
    xresources = user.xresources;
	};

	services = {
    mysql = {
      enable = true;
      package = pkgs.mysql;
    };
    #nscd.enable = false;
	};
}
