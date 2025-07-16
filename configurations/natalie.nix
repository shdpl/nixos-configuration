{ pkgs, ... }:
let
  domain = "nawia.net";
  host = "natalie";
  user = (import ../private/users/shd.nix);
  cacheVhost = "cache.nix.nawia.net";
  interface = "wlp2s0";
  # stylix = pkgs.fetchFromGitHub {
  #   owner = "danth";
  #   repo = "stylix";
  #   rev = "release-24.05";
  # };
in
{
  imports =
    [
    ../hardware/framework_16_ryzen_7_7840HS.nix
    #"${builtins.fetchTarball "https://github.com/nix-community/disko/archive/master.tar.gz"}/module.nix"
    ../disko/module.nix
    ../disko-config/uefi_raid0.nix
    ../modules/users.nix
    ../modules/pl.nix
    ../modules/ssh.nix
    ../modules/dns/ovh.nix
    ../modules/common.nix
    ../modules/workstation.nix
    # (import stylix).homeManagerModules.stylix
    ../modules/themes/dracula.nix
    ../modules/graphics.nix
    ../modules/hobby.nix
    ../modules/programming.nix
    ../home-manager/nixos
    ];

  # stylix = {
  #   enable = true;
  #   image = "${pkgs.nixos-artwork.wallpapers.dracula}/share/backgrounds/nixos/nix-wallpaper-dracula.png";
  # };

  networking = {
    hostName = host;
    domain = domain;
    search = [ "nawia.net" "nawia.pl" ];
    # hosts = {
    #   "65.108.111.116" = ["rss.shd.nawia.net"];
    # };
    wireless = {
      enable = true;
      interfaces = [ interface ];
      userControlled.enable = true;
      allowAuxiliaryImperativeNetworks = true;
      #extraConfig = builtins.readFile (../. + "/private/wpa_supplicant/wpa_supplicant.conf");
    };
    # resolvconf.dnsExtensionMechanism = false; #FIXME: alternative way to connect to public hotspots
  };


  location.provider = "geoclue2";

  aaa = {
    enable = true;
    wheelIsRoot = true;
    users = {
      "${user.name}" = user;
    };
  };
  services.fprintd.enable = true;
  services.fwupd.enable = true;
  # environment.systemPackages = with pkgs; [
  #   fw-ectool
  #   framework-tool
  # ];

  # FIXME
  users.users.root.openssh.authorizedKeys.keys = [
    (builtins.readFile ../data/ssh/id_ed25519.pub)
  ];
  #

  dns = {
    ddns = true;
    host = host;
    domain = domain;
    username = ../private/dns/${host}/username;
    password = ../private/dns/${host}/password;
    interface = interface;
  };

  workstation = {
    enable = true;
    autologin = false;
    user = user.name;
  };
  themes.dracula = {
    enable = true;
    user = user.name;
  };

  common = {
    userName = user.name;
    userFullName = user.fullName;
    userEmail = user.email;
    userPublicKeyPath = "/home/${user.name}/.ssh/id_ed25519.pub";
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

  home-manager.users.${user.name} = {
    home.file = user.home.programming // user.home.workstation // user.home.common;
    services = user.services.workstation;
    home.packages = [ ];
    xresources = user.xresources;
    home.stateVersion = "24.05";
  };

  programming = {
    enable = true;
    user = user.name;
    text = true;
    docker = true;
    terraform = true;
    js = true;
    typescript = true;
    go = true;
    java = true;
    nix = true;
    sql = false;
    android = true;
  };

  graphics.enable = true;
  hobby.enable = true;

  system.stateVersion = "24.05";
}
