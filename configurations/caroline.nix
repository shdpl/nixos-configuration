{ config, pkgs, lib, ... }:
let
  host = "caroline";
  domain = "nawia.net";
  hostname = "${host}.${domain}";
  user = (import ../users/shd.nix);
	ddns = (import ../private/dns/caroline.nix);
  personalCert = ../private/ca/caroline.nawia.net/ca.crt;
  personalCertKey = ../private/ca/caroline.nawia.net/ca.key;
  cacheVhost = "cache.nix.nawia.net";
  interface = "wlp2s0";
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

  boot.extraModulePackages = [ config.boot.kernelPackages.wireguard ];
  boot.kernelModules = [ "wireguard" ];
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
    firewall.allowedUDPPorts = [ 5555 ];
    wireguard.interfaces.wg0 = {
      ips = [ "192.168.2.2" ]; #"10.100.0.2"
      listenPort = 5555;
      privateKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/caroline/privatekey));
      allowedIPsAsRoutes = false;
      peers = [
        {
          allowedIPs = [ "0.0.0.0/0" "::/0" ]; #  #  #"192.168.2.0/24" "104.248.170.84/32"
          endpoint = "78.46.102.47:51820";
          publicKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/daenerys/publickey));
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

  environment.systemPackages = with pkgs;
  [
    home-manager
    bat broot
  ];
	home-manager.users.${user.name} = {
    programs = {
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
      };
      # TODO: go gpg htop irssi jq keychain lsd
      noti.enable = true;
      # TODO: rofi skim ssh taskwarrior vim qt dunst gpg-agent hound keepassx nextcloud-client random-background stalonetray syncthing taskwarrior-sync xdg.configFile i3.config
      zathura.enable = true;
    };
    home.file = {
      ".config/syncthing/config.xml".source =  ../data/syncthing/caroline.xml;
      ".config/ranger/commands.py".source =  ../data/ranger/commands.py;
      ".config/ranger/rc.conf".source =  ../data/ranger/rc.conf;
      ".config/ranger/rifle.conf".source =  ../data/ranger/rifle.conf;
      ".config/ranger/scope.sh".source =  ../data/ranger/scope.sh;
    } // user.home.programming // user.home.workstation // user.home.common // user.home.work.livewyer;
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
