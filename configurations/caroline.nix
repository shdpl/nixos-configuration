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
  ../modules/hobby.nix
  ../home-manager/nixos
	];

  #boot.loader.grub.users.${user.name}.password = user.password;

  location.provider = "geoclue2";
  virtualisation.libvirtd.enable = true;

  aaa = {
    enable = true;
    wheelIsRoot = true;
    users = {
      "${user.name}" = user;
    };
  };

  boot = {
    kernel.sysctl."fs.inotify.max_user_watches" = "1048576";
  };
  networking = {
    wireless = {
      enable = true;
      interfaces = [ "wlp2s0" ];
      userControlled.enable = true;
      allowAuxiliaryImperativeNetworks = true;
      #extraConfig = builtins.readFile (../. + "/private/wpa_supplicant/wpa_supplicant.conf");
    };
    firewall.allowedUDPPorts = [ 5555 ];
  };

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
    gitlabAccessTokens = user.gitlabAccessTokens;
    js = true;
    php = true;
    docker = true;
    nix = true;
  };

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

  nixpkgs.config.packageOverrides = pkgs: {
    gnupg = pkgs.gnupg.override { pinentry = pkgs.pinentry-curses; };
    # php = pkgs.php56;
  };

  environment.systemPackages = with pkgs;
  [
    home-manager
    bat broot
    skype
  ];

  home-manager.users.${user.name} = {
    programs = {
      # TODO: go gpg irssi jq keychain lsd
      noti.enable = true;
      # TODO: skim ssh taskwarrior vim qt dunst gpg-agent hound keepassx nextcloud-client random-background stalonetray syncthing taskwarrior-sync xdg.configFile i3.config
      zathura.enable = true;
    };
    home.file = user.home.programming // user.home.workstation // user.home.common;
    services = user.services.workstation;
		home.packages = [ ];
    xresources = user.xresources;
	};

  # hobby.enable = true;
  graphics.enable = true;

	services = {
    # etcd = {
    #   enable = true;
    # };
    # mysql = {
    #   enable = true;
    #   package = pkgs.mysql;
    # };
    #nscd.enable = false;
	};
}
