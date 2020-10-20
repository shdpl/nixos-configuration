{ config, pkgs, lib, ... }:
let
  host = "magdalene";
  domain = "nawia.net";
  hostname = "${host}.${domain}";
  user = (import ../private/users/shd.nix);
	ddns = (import ../private/dns/magdalene.nix);
  personalCert = ../private/ca/magdalene.nawia.net/ca.crt;
  personalCertKey = ../private/ca/magdalene.nawia.net/ca.key;
  cacheVhost = "cache.nix.nawia.net";
  # interface = "enp6s0";
  interface = "wg0";
in
{
  disabledModules = [ ];
	imports =
	[
  ../hardware/pc.nix
	../modules/users.nix
	../modules/pl.nix
	../modules/data-sharing.nix
	../modules/ssh.nix
	../modules/dns/ovh.nix
	../modules/common.nix
	../modules/workstation.nix
	../modules/graphics.nix
	../modules/programming.nix
  ../modules/hobby.nix
  ../modules/print-server.nix
#  ../modules/website/net.nawia.shd.nix
  ../modules/pjatk.nix
  # <home-manager/nixos>
  "${builtins.fetchTarball { url = "https://github.com/rycee/home-manager/archive/release-20.03.tar.gz"; }}/nixos"
  # "${builtins.fetchGit { url = "git@github.com:shdpl/home-manager.git"; ref = "release-20.03"; }}/nixos"
	];

  # TODO: NUR
  # TODO: binfmt WINE etc.
  # TODO: GPGCard

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

  boot = {
    extraModulePackages = [ config.boot.kernelPackages.wireguard ];
    kernelModules = [ "wireguard" ];
    kernel.sysctl."fs.inotify.max_user_watches" = "1048576";
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
    firewall.allowedUDPPorts = [ 5555 ];
    wireguard.interfaces.wg0 = {
      ips = [ "192.168.2.4" ];
      listenPort = 5555;
      privateKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/magdalene/privatekey));
      allowedIPsAsRoutes = false;
      peers = [
        {
          allowedIPs = [ "0.0.0.0/0" "::/0" ];
          endpoint = "78.46.102.47:51820";
          publicKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/daenerys/publickey));
          persistentKeepalive = 25;
        }
        {
          allowedIPs = [ "0.0.0.0/0" "::/0" ];
          endpoint = "78.46.102.47:51820";
          publicKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/caroline/publickey));
          persistentKeepalive = 25;
        }
        {
          allowedIPs = [ "0.0.0.0/0" "::/0" ];
          endpoint = "78.46.102.47:51820";
          publicKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/cynthia/publickey));
          persistentKeepalive = 25;
        }
      ];
      postSetup = ''
        wg set wg0 fwmark 1234;
        ip rule add to 78.46.102.47 lookup main pref 30
        ip rule add to all lookup 80 pref 40
        ip route add default dev wg0 table 80
      '';
      postShutdown = ''
        # wg set wg0 fwmark 1234;
        ip rule delete to 78.46.102.47 lookup main pref 30
        ip rule delete to all lookup 80 pref 40
        ip route delete default dev wg0 table 80
      '';
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

  nixpkgs.config.packageOverrides = pkgs: {
    gnupg = pkgs.gnupg.override { pinentry = pkgs.pinentry-curses; };
  };

  environment.systemPackages = with pkgs;
  [
    home-manager
    bat broot
  ];

	home-manager.users.${user.name} = {
    programs = {
      htop.enable = true;
      home-manager.enable = true;
      command-not-found.enable = true;
      # direnv.enable = true; #FIXME: not working
      fzf.enable = true;
      # TODO: chromium feh firefox
      # bat = {
      #   enable = true;
      #   config = { theme = "zenburn"; };
      # };
      # broot = {
      #   enable = true;
      #   enableFishIntegration = false;
      #   enableZshIntegration = false;
      # };
      git = {
        enable = true;
        userName = user.fullName;
        userEmail = user.email;
        #TODO: signing
        # delta = {
        #   enable = true;
        #   options = [ "--dark" ];
        # };
      };
      # TODO: go gpg htop irssi jq keychain lsd
      noti.enable = true;
      # TODO: rofi skim ssh taskwarrior vim qt dunst gpg-agent hound keepassx nextcloud-client random-background stalonetray syncthing taskwarrior-sync xdg.configFile i3.config
      zathura.enable = true;
    };
    home.file = {
      # ".config/syncthing/config.xml".source =  ../data/syncthing/magdalene.xml;
      ".config/syncthing/.config/syncthing/config.xml".source =  ../data/syncthing/magdalene.xml; # WTF?
      ".config/ranger/commands.py".source =  ../data/ranger/commands.py;
      ".config/ranger/rc.conf".source =  ../data/ranger/rc.conf;
      ".config/ranger/rifle.conf".source =  ../data/ranger/rifle.conf;
      ".config/ranger/scope.sh".source =  ../data/ranger/scope.sh;
    } // user.home.programming // user.home.workstation // user.home.common;
    services = user.services.workstation;
		home.packages = [ ];
    xresources = user.xresources;
	};

	services = {
    etcd = {
      enable = true;
    };
    mysql = {
      enable = true;
      package = pkgs.mysql;
    };
    #nscd.enable = false;
	};
/*
	website."net.nawia.shd" = {
    enable = true;
    hostname = host;
    domain = domain;
	};
*/
  pjatk.enable = true;
}
