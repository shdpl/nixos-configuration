{ config, pkgs, lib, ... }:
let
  domain = "nawia.net";
  host = "magdalene";
  hostname = "${host}.${domain}";
  user = (import ../private/users/shd.nix);
  ddns = (import ../private/dns/magdalene.nix);
  personalCert = ../private/ca/magdalene.nawia.net/ca.crt;
  personalCertKey = ../private/ca/magdalene.nawia.net/ca.key;
  cacheVhost = "cache.nix.nawia.net";
  interface = "enp5s0";
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
      ../modules/hobby.nix
      ../modules/print-server.nix
      ../modules/work/escola.nix
      "${builtins.fetchTarball { url = "https://github.com/rycee/home-manager/archive/release-20.09.tar.gz"; }}/nixos"
      ];

  # TODO: NUR
  # TODO: binfmt WINE etc.
  # TODO: GPGCard

  location = {
    latitude = 54.372158;
    longitude = 18.638306;
  };

  aaa = {
    enable = true;
    wheelIsRoot = true;
    users = [ user ];
  };

  dataSharing = {
    user = user.name;
    host = host;
    vhost = hostname;
    sslCertificate  = personalCert;
    sslCertificateKey = personalCertKey;
    folders = {
      "/var/backup" = {
          id = "backup";
          label = "backup";
          devices = [ "daenerys" "caroline" ];
          versioning = {
            params.cleanoutDays = "0";
            type = "trashcan";
          };
      };
      "/home/shd/books" = {
        id = "books";
        label = "books";
        devices = [ "daenerys" "caroline" "cynthia" ];
        versioning = {
          params.cleanoutDays = "0";
          type = "trashcan";
        };
      };
      "/home/shd/camera" = {
        id = "camera";
        label = "camera";
        ignorePerms = false;
        devices = [ "daenerys" "caroline" "cynthia" ];
        versioning = {
          params.cleanoutDays = "0";
          type = "trashcan";
        };
      };
      "/home/shd/documents" = {
        id = "documents";
        label = "documents";
        devices = [ "daenerys" "caroline" "cynthia" ];
        versioning = {
          params.cleanoutDays = "0";
          type = "trashcan";
        };
      };
      "/run/media/shd/Windows/backup/nawia" = {
        id = "nawia";
        label = "nawia";
        devices = [ "daenerys" ];
        versioning = {
          params.cleanoutDays = "0";
          type = "trashcan";
        };
      };
      "/home/shd/notes" = {
        id = "notes";
        label = "notes";
        devices = [ "daenerys" "caroline" "cynthia" ];
        versioning = {
          params.cleanoutDays = "0";
          type = "trashcan";
        };
      };
      "/run/media/shd/Windows/backup/photos" = {
        id = "photos";
        label = "photos";
        devices = [ "daenerys" ];
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
      caroline = {
        "addresses" = ["dynamic"];
        "id" = "JBOS6PP-WX5NNYZ-VAKWLEO-LVUPZ4B-H6DC47G-4BOF5PP-FGFPZHX-5HLMZAX";
      };
      daenerys = {
        "addresses" = ["dynamic"];
        "id" = "XUXFUUE-KSB3STD-ROAJL7C-KRLRPID-TVY6LTZ-ZGLKLCR-NUURL5B-6ZUKYAS";
      };
    };
  };

  dns = {
    ddns = true;
    host = host;
    domain = domain;
    # extraHosts = [ "luviane.nawia.net" ]; # TODO: modules/website
		username = ddns.username;
		password = ddns.password;
		interface = interface;
  };

  workstation = {
    enable = true;
    autologin = true;
    user = user.name;
    pulseaudio = true;
  };

  hobby.enable = false;

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
      # TODO: go gpg irssi jq keychain lsd
      noti.enable = true;
      # TODO: rofi skim ssh taskwarrior vim qt dunst gpg-agent hound keepassx nextcloud-client random-background stalonetray syncthing taskwarrior-sync xdg.configFile i3.config
      zathura.enable = true;
    };
    home.file = user.home.programming // user.home.workstation // user.home.common;
    services = user.services.workstation;
		home.packages = [ ];
    xresources = user.xresources;
	};

}
