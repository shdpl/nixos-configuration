{ config, pkgs, lib, ... }:
let
  domain = "nawia.net";
  host = "magdalene";
  hostname = "${host}.${domain}";
  user = (import ../private/users/shd.nix);
  personalCert = ../private/ca/magdalene.nawia.net/ca.crt;
  personalCertKey = ../private/ca/magdalene.nawia.net/ca.key;
  cacheVhost = "cache.nix.nawia.net";
  interface = "enp5s0";
  # otbm-util-c = pkgs.callPackage ../pkgs/games/nawia/otbm-util-c/default.nix {};
  # otbm-util = pkgs.callPackage ../pkgs/games/nawia/otbm-util/default.nix {};
  # itemeditor = pkgs.callPackage ../pkgs/games/nawia/itemeditor/default.nix {};
  # tfs-old-svn = pkgs.callPackage ../pkgs/tfs-old-svn/default.nix { enableServerDiagnostic=true; enableDebug=true; enableProfiler=true; };
  # backup = pkgs.callPackage ../pkgs/net.nawia/backup/default.nix {};
in
{
  disabledModules = [ ];
  imports = [
    ../hardware/pc.nix
    ../modules/users.nix
    ../modules/pl.nix
    # ../modules/data-sharing.nix
    ../modules/backup/ipfs.nix
    ../modules/ssh.nix
    ../modules/dns/ovh.nix
    ../modules/common.nix
    ../modules/workstation.nix
    ../modules/graphics.nix
    ../modules/hobby.nix
    ../modules/print-server.nix
    ../modules/programming.nix
    ../modules/graphics.nix
    ../home-manager/nixos
      # ../modules/website/pl.serwisrtvgdansk.www.nix
  ];
  networking = {
    hostName = "magdalene";
    # firewall.allowedTCPPorts = [ 7171 7172 ];
  };

  # TODO: NUR
  # TODO: binfmt WINE etc.
  # TODO: GPGCard
  # TODO: services.peroxide

  location = (import ../private/location/magdalene.nix);

  aaa = {
    enable = true;
    wheelIsRoot = true;
    users = {
      "${user.name}" = user;
    };
  };

  # dataSharing = {
  #   user = user.name;
  #   host = host;
  #   vhost = hostname;
  #   sslCertificate  = personalCert;
  #   sslCertificateKey = personalCertKey;
  #   folders = {
  #     "/var/backup" = {
  #         id = "backup";
  #         label = "backup";
  #         devices = [ "daenerys" "caroline" ];
  #         versioning = {
  #           params.cleanoutDays = "0";
  #           type = "trashcan";
  #         };
  #     };
  #     "/home/shd/books" = {
  #       id = "books";
  #       label = "books";
  #       devices = [ "daenerys" "caroline" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/home/shd/camera" = {
  #       id = "camera";
  #       label = "camera";
  #       ignorePerms = false;
  #       devices = [ "daenerys" "caroline" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/home/shd/documents" = {
  #       id = "documents";
  #       label = "documents";
  #       devices = [ "daenerys" "caroline" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/home/shd/historia" = {
  #       id = "historia";
  #       label = "historia";
  #       devices = [ "daenerys" "caroline" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/home/shd/muzyka" = {
  #       id = "muzyka";
  #       label = "muzyka";
  #       devices = [ "daenerys" "caroline" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/run/media/shd/Windows/backup/nawia" = {
  #       id = "nawia";
  #       label = "nawia";
  #       devices = [ "daenerys" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/home/shd/notes" = {
  #       id = "notes";
  #       label = "notes";
  #       devices = [ "daenerys" "caroline" "cynthia" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #     "/run/media/shd/Windows/backup/photos" = {
  #       id = "photos";
  #       label = "photos";
  #       devices = [ "daenerys" ];
  #       versioning = {
  #         params.cleanoutDays = "0";
  #         type = "trashcan";
  #       };
  #     };
  #   };
  #   devices = {
  #     cynthia =  {
  #       "addresses" = ["dynamic"];
  #       "id" = "BC7RERN-SKZBSGX-EHC3OV3-ZXMU7UY-SYZ7DK3-LV6XQDQ-CJTUPVB-Y5AOLQT";
  #     };
  #     caroline = {
  #       "addresses" = ["dynamic"];
  #       "id" = "JBOS6PP-WX5NNYZ-VAKWLEO-LVUPZ4B-H6DC47G-4BOF5PP-FGFPZHX-5HLMZAX";
  #     };
  #     daenerys = {
  #       "addresses" = ["dynamic"];
  #       "id" = "XUXFUUE-KSB3STD-ROAJL7C-KRLRPID-TVY6LTZ-ZGLKLCR-NUURL5B-6ZUKYAS";
  #     };
  #   };
  # };
  # backup.enable = true;

  dns = {
    ddns = true;
    host = host;
    domain = domain;
    username = ../private/dns/magdalene/username;
    password = ../private/dns/magdalene/password;
    interface = interface;
  };

  workstation = {
    enable = true;
    autologin = true;
    user = user.name;
    pulseaudio = true;
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
  };

  home-manager.users.${user.name} = {
    programs = {
      # TODO: go gpg irssi jq keychain lsd
      # noti.enable = true;
      # TODO: skim ssh taskwarrior vim qt dunst gpg-agent hound keepassx nextcloud-client random-background stalonetray syncthing taskwarrior-sync xdg.configFile i3.config
      # zathura.enable = true;
    };
    home.file = user.home.programming // user.home.workstation // user.home.common;
    services = user.services.workstation;
    home.packages = [ ];
    xresources = user.xresources;
  };

  # containers = {
  #   webserver = {
  #     autoStart = true;
  #     privateNetwork = true;
  #     forwardPorts = [ { hostPort = 8080; containerPort = 80; } ];
  #     bindMounts = {
  #       "/var/www" = {
  #         hostPath = "/home/shd/src/pl.nawia/serwisrtvgdansk";
  #         isReadOnly = false;
  #       };
  #     };
  #     config = { config, pkgs, ... }:
  #     {
  #       boot.isContainer = true;
  #       services.httpd = {
  #         enable = true;
  #         adminAddr = "admin@nawia.net";
  #       };
  #       environment.systemPackages = with pkgs;
  #       [
  #         php80 php80Packages.composer
  #       ];
  #     };
  #   };
  #   database = {
  #     config = { config, pkgs, ... }:
  #     {
  #       services.mysql = {
  #         enable = true;
  #         package = pkgs.mysql80;
  #       };
  #     };
  #   };
  # };

  programming = {
    enable = true;
    user = user.name;
    text = true;
    docker = true;
    terraform = true;
    js = true;
    typescript = true;
    go = false;
    scala = true;
    java = true;
    sql = false;
    nix = true;
    android = false;
  };

  graphics.enable = false;
  hobby.enable = false;
  # environment.systemPackages = with pkgs; [
  #   tibia
  #   libotbm
  #   otbm-util
  #   otbm-util-c
  #   opentibia-itemeditor
  #   tfs-old-svn
  #   rme
  # ];

  systemd.oomd.extraConfig.DefaultMemoryPressureDurationSec = "1s";
  systemd.slices."-".sliceConfig = {
    ManagedOOMMemoryPressure = "kill";
  };
  boot.kernel.sysctl = {
    sysrq = 1;
    panic_on_oops = 1;
  };

  services.dockerRegistry = {
    enable = true;
    listenAddress = "0.0.0.0";
    openFirewall = true;
    extraConfig = {
      auth.htpasswd = {
        realm = hostname;
        path = (builtins.toFile
          "bitcoin.conf"
          (builtins.readFile ../private/docker-registry/magdalene/.htpasswd)
        );
      };
    };
  };

  system.stateVersion = "23.11";
}
