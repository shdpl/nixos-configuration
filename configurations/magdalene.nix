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
    ../modules/data-sharing.nix
    # ../modules/backup/ipfs.nix
    ../modules/ssh.nix
    ../modules/dns/ovh.nix
    ../modules/common.nix
    ../modules/workstation.nix
    ../modules/print-server.nix
    ../modules/programming.nix
    ../modules/cluster/kubernetes.nix
    ../modules/hobby.nix
    ../modules/graphics.nix
    ../home-manager/nixos
      # ../modules/website/pl.serwisrtvgdansk.www.nix
  ];
  networking = {
    hostName = "magdalene";
    # extraHosts = ''
    #   127.0.0.1 magdalene.nawia.net alert.magdalene.nawia.net auth.magdalene.nawia.net dashboard.magdalene.nawia.net ui.api.magdalene.nawia.net api.magdalene.nawia.net queue.magdalene.nawia.net storage.magdalene.nawia.net console.storage.magdalene.nawia.net mail.magdalene.nawia.net telemetry.magdalene.nawia.net
    # '';
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

  dataSharing = {
    enable = true;
    user = user.name;
    host = host;
  };

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

  security.pki.certificateFiles = [
    (pkgs.fetchurl {
      url = "https://letsencrypt.org/certs/staging/letsencrypt-stg-root-x1.pem";
      sha256 = "sha256-Ol4RceX1wtQVItQ48iVgLkI2po+ynDI5mpWSGkroDnM=";
    })
    (pkgs.fetchurl {
      url = "https://letsencrypt.org/certs/staging/letsencrypt-stg-root-x2.pem";
      sha256 = "sha256-SXw2wbUMDa/zCHDVkIybl68pIj1VEMXmwklX0MxQL7g=";
    })
  ];

  nixpkgs.config.packageOverrides = pkgs: {
    gnupg = pkgs.gnupg.override { pinentry = pkgs.pinentry-curses; };
  };

  programming = {
    enable = true;
    hostname = host;
    domain = domain;
    user = user.name;
    text = true;
    docker = true;
    terraform = true;
    js = true;
    html = true;
    typescript = true;
    graphql = true;
    php = true;
    cc = true;
    go = true;
    rust = true;
    scala = true;
    java = true;
    sql = true;
    nix = true;
    android = false;
  };

  cluster = {
    hostname = host;
    domain = domain;
    users = [ user.name ];
  };

  hobby.enable = true;

  # graphics.enable = true;
  # environment.systemPackages = with pkgs; [
  #   tibia
  #   libotbm
  #   otbm-util
  #   otbm-util-c
  #   opentibia-itemeditor
  #   tfs-old-svn
  #   rme
  # ];

  # services.traefik = {
  #   enable = true;
  #   environmentFiles = [
  #     (builtins.toFile "nawia_net.environment" (
  #       builtins.readFile ../private/lego/nawia.net/ovh.environment
  #     ))
  #   ];
  #   staticConfigOptions = {
  #     api.insecure = true;
  #     dashboard.insecure = true;
  #     providers.docker = {
  #       exposedByDefault = false;
  #     };
  #     entryPoints = {
  #       http.address = ":80";
  #       https.address = ":443";
  #     };
  #     certificatesResolvers.nawia_net.acme = {
  #       email="shd@nawia.net";
  #       storage = "/var/lib/traefik/acme.json";
  #       dnsChallenge.provider="ovh";
  #     };
  #   };
  #   group = "docker";
  # };
  # networking.firewall.allowedTCPPorts = [ 80 443 8080 ];
# traefik-certs-dumper

  systemd.oomd = {
    enableRootSlice = true;
    enableUserSlices = true;
    extraConfig.DefaultMemoryPressureDurationSec = "1s";
  };
  systemd.slices."-".sliceConfig = {
    ManagedOOMMemoryPressure = "kill";
  };
  boot.kernel.sysctl = {
    sysrq = 1;
    panic_on_oops = 1;
  };

  home-manager.users.${user.name} = {
    programs = {
      # TODO: go gpg irssi jq keychain lsd
      # noti.enable = true;
      # TODO: skim ssh taskwarrior vim qt dunst gpg-agent hound keepassx nextcloud-client random-background stalonetray syncthing taskwarrior-sync xdg.configFile i3.config
      # zathura.enable = true;
    };
    services = user.services.workstation;
    xresources = user.xresources;
    home = {
      packages = [ ];
      stateVersion = "22.11";
      file = user.home.programming // user.home.workstation // user.home.common;
    };
  };

  system.stateVersion = "23.11";
}
