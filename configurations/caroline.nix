{ config, pkgs, lib, ... }:
let
  domain = "nawia.net";
  host = "caroline";
  hostname = "${host}.${domain}";
  user = (import ../private/users/shd.nix);
  personalCert = ../private/ca/caroline.nawia.net/ca.crt;
  personalCertKey = ../private/ca/caroline.nawia.net/ca.key;
  cacheVhost = "cache.nix.nawia.net";
  interface = "wlp2s0";
  itemeditor = pkgs.callPackage ../pkgs/games/nawia/itemeditor/default.nix {};
  libotbm = pkgs.callPackage ../pkgs/libotbm/default.nix {};
in
{
  disabledModules = [ ];
	imports =
	[
  ../hardware/lenovo_yoga_520.nix
	../modules/users.nix
	../modules/pl.nix
	../modules/ssh.nix
	../modules/dns/ovh.nix
	../modules/common.nix
	../modules/workstation.nix
	../modules/graphics.nix
	../modules/programming.nix
	../modules/website/faston.nix
  ../modules/hobby.nix
  ../home-manager/nixos
	];

  location.provider = "geoclue2";

  aaa = {
    enable = true;
    wheelIsRoot = true;
    users = {
      "${user.name}" = user;
    };
  };

  networking = {
    wireless = {
      enable = true;
      interfaces = [ interface ];
      userControlled.enable = true;
      allowAuxiliaryImperativeNetworks = true;
      #extraConfig = builtins.readFile (../. + "/private/wpa_supplicant/wpa_supplicant.conf");
    };
  };

  # networking.resolvconf.dnsExtensionMechanism = false; #FIXME: alternative way to connect to public hotspots

  # FIXME
	users.users.root.openssh.authorizedKeys.keys = [
    (builtins.readFile ../data/ssh/id_ed25519.pub)
	];
  #

  dns = {
    ddns = true;
    host = host;
    domain = domain;
    username = ../private/dns/caroline/username;
    password = ../private/dns/caroline/password;
    interface = interface;
  };

  workstation = {
    enable = true;
    user = user.name;
    pulseaudio = true;
    autologin = false;
  };

  programming = {
    enable = true;
    user = user.name;
    js = true;
    go = true;
    nix = true;
  };

  website.faston.enable = true;

  graphics.enable = true;

  common = {
    userName = user.name;
    userFullName = user.fullName;
    userEmail = user.email;
    host = host;
    cacheVhost = cacheVhost;
    nixpkgsPath = "/home/${user.name}/src/nixpkgs";
    nixosConfigurationPath = "/home/${user.name}/src/nixos-configuration";
    email = user.email;
    ca = ../private/ca/nawia.net.pem;
  };

  nixpkgs.config.packageOverrides = pkgs: with pkgs; {
    gnupg = pkgs.gnupg.override { pinentry = pkgs.pinentry-curses; };
  };

  home-manager.users.${user.name} = {
    home.file = user.home.programming // user.home.workstation // user.home.common;
    services = user.services.workstation;
		home.packages = [ ];
    xresources = user.xresources;
	};

  environment.systemPackages = [
    libotbm
    itemeditor
  ];
}
