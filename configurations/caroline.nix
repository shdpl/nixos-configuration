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
  # helloRoot = (pkgs.buildEnv {
  #   name = "hello-root";
  #   paths = [ pkgs.hello ];
  # });
in
{
  disabledModules = [ ];
  imports = [
    ../hardware/lenovo_yoga_520.nix
    ../modules/users.nix
    ../modules/pl.nix
    ../modules/ssh.nix
    ../modules/dns/ovh.nix
    ../modules/common.nix
    ../modules/workstation.nix
    ../modules/graphics.nix
    ../modules/hobby.nix
    ../modules/programming.nix
    ../home-manager/nixos
      # ../modules/website/faston.nix
  ];
  networking = {
    hostName = host;
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
    autologin = false;
    user = user.name;
    pulseaudio = true;
  };

  # website.faston.enable = true;

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
    home.file = user.home.programming // user.home.workstation // user.home.common;
    services = user.services.workstation;
    home.packages = [ ];
    xresources = user.xresources;
  };

  /*
  virtualisation.oci-containers = {
    backend = "podman";
    containers = {
      hello-docker = {
        image = "hello-docker";
        imageFile = pkgs.dockerTools.buildImage {
          name = "hello-docker";
          tag = "latest";
          contents = [
            helloRoot
          ];
          config.Cmd = [ "hello" ];
        };
      };
      hello-oci = {
        image = "hello-oci";
        imageFile = pkgs.ociTools.buildContainer {
          args = helloRoot.outPath;
        };
      };
    };
  };
  */
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
    android = true;
  };

  graphics.enable = true;
  hobby.enable = true;

}
