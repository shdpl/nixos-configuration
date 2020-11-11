{ config, pkgs, lib, ... }:
let
  domain = "nawia.net";
  host = "caroline";
  hostname = "${host}.${domain}";
  user = (import ../private/users/shd.nix);
	ddns = (import ../private/dns/caroline.nix);
  personalCert = ../private/ca/caroline.nawia.net/ca.crt;
  personalCertKey = ../private/ca/caroline.nawia.net/ca.key;
  cacheVhost = "cache.nix.nawia.net";
  # interface = "wlp2s0";
  interface = "wg0";
in
{
  disabledModules = [ ];
  # TODO: try 4.12.13 kernel for wifi disconnections reason=4
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
  ../modules/hobby.nix
  ../modules/print-server.nix
  ../modules/cluster/kubernetes.nix
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
    host = "caroline";
		vhost = hostname;
    sslCertificate  = personalCert;
    sslCertificateKey = personalCertKey;
    folders = {
      "/var/backup" = {
          id = "backup";
          label = "backup";
          devices = [ "daenerys" "magdalene" ];
          versioning = {
            params.cleanoutDays = "0";
            type = "trashcan";
          };
      };
      "/home/shd/books" = {
        id = "books";
        label = "books";
        devices = [ "daenerys" "magdalene" "cynthia" ];
        versioning = {
          params.cleanoutDays = "0";
          type = "trashcan";
        };
      };
      "/home/shd/camera" = {
        id = "camera";
        label = "camera";
        ignorePerms = false;
        devices = [ "daenerys" "magdalene" "cynthia" ];
        versioning = {
          params.cleanoutDays = "0";
          type = "trashcan";
        };
      };
      "/home/shd/documents" = {
        id = "documents";
        label = "documents";
        devices = [ "daenerys" "magdalene" "cynthia" ];
        versioning = {
          params.cleanoutDays = "0";
          type = "trashcan";
        };
      };
      "/run/media/shd/Windows/backup/nawia" = {
        id = "nawia";
        label = "nawia";
        devices = [ "magdalene" "daenerys" ];
        versioning = {
          params.cleanoutDays = "0";
          type = "trashcan";
        };
      };
      "/home/shd/notes" = {
        id = "notes";
        label = "notes";
        devices = [ "daenerys" "magdalene" "cynthia" ];
        versioning = {
          params.cleanoutDays = "0";
          type = "trashcan";
        };
      };
      "/run/media/shd/Windows/backup/photos" = {
        id = "photos";
        label = "photos";
        devices = [ "daenerys" "magdalene" ];
        versioning = {
          params.cleanoutDays = "0";
          type = "trashcan";
        };
      };
    };
    devices = {
      cynthia =  {
        "addresses" = ["dynamic"];
        "id" = "BC7RERN-SKZBSGX-EHC3OV3-ZXMU7UY-SYZ7DK3-LV6XQDQ-CJTUPVB-Y5AOLQT";
      };
      daenerys = {
        "addresses" = ["dynamic"];
        "id" = "XUXFUUE-KSB3STD-ROAJL7C-KRLRPID-TVY6LTZ-ZGLKLCR-NUURL5B-6ZUKYAS";
      };
      magdalene = {
        "addresses" = ["dynamic"];
        "id" = "5S2XTLZ-77GPGEK-U7MC4PP-ALT6RIZ-G5VEZNA-YRHMPVA-2YHYAML-GEETKQL";
      };
    };
  };

  boot = {
    # extraModulePackages = [ config.boot.kernelPackages.wireguard ];
    # kernelModules = [ "wireguard" ];
    kernel.sysctl."fs.inotify.max_user_watches" = "1048576";
  };
  networking = {
    wireless = {
      enable = true;
      userControlled.enable = true;
    };
    firewall.allowedUDPPorts = [ 5555 ];
    # wireguard.interfaces.wg0 = {
    #   ips = [ "192.168.2.2" ];
    #   listenPort = 5555;
    #   privateKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/caroline/privatekey));
    #   allowedIPsAsRoutes = false;
    #   peers = [
    #     {
    #       allowedIPs = [ "0.0.0.0/0" "::/0" ];
    #       endpoint = "78.46.102.47:51820";
    #       publicKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/daenerys/publickey));
    #       persistentKeepalive = 25;
    #     }
    #     {
    #       allowedIPs = [ "0.0.0.0/0" "::/0" ];
    #       endpoint = "78.46.102.47:51820";
    #       publicKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/cynthia/publickey));
    #       persistentKeepalive = 25;
    #     }
    #     {
    #       allowedIPs = [ "0.0.0.0/0" "::/0" ];
    #       endpoint = "78.46.102.47:51820";
    #       publicKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/magdalene/publickey));
    #       persistentKeepalive = 25;
    #     }
    #   ];
    #   postSetup = ''
    #     wg set wg0 fwmark 1234;
    #     ip rule add to 78.46.102.47 lookup main pref 30
    #     ip rule add to all lookup 80 pref 40
    #     ip route add default dev wg0 table 80
    #   '';
    #   postShutdown = ''
    #     # wg set wg0 fwmark 1234;
    #     ip rule delete to 78.46.102.47 lookup main pref 30
    #     ip rule delete to all lookup 80 pref 40
    #     ip route delete default dev wg0 table 80
    #   '';
    # };
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
    # php = pkgs.php56;
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
      # "syncthing" = {
      #   target = ".config/syncthing/config.xml";
      #   source = ../data/syncthing/caroline.xml;
      # };
      # ".config/syncthing/config.xml".source =  ../data/syncthing/caroline.xml;
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
}
