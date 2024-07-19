{ lib, pkgs, ... }:
let
  host = "daenerys";
  domain = "nawia.net";
  user = (import ../../private/users/shd.nix);
in
{
  imports =
    [
      ./hardware-configuration.nix
      ./disk-config.nix
      ../../modules/users.nix
      ../../modules/pl.nix
      ../../modules/ssh.nix
      ../../modules/common.nix
    ];

  boot.loader.grub = {
    efiSupport = true;
    efiInstallAsRemovable = true;
  };

  aaa = {
    enable = true;
    wheelIsRoot = true;
    users = {
      "${user.name}" = user;
    };
  };

  networking = {
    hostName = host;
    domain = domain;
    /*tcpcrypt.enable = true;*/
  };

  common = {
    host = host;
    userName = user.name;
    userFullName = user.fullName;
    userEmail = user.email;
    email = user.email;
    ca = ../../private/ca/nawia.net.pem;
    nixpkgsPath = "/home/${user.name}/src/nixpkgs";
    nixosConfigurationPath = "/home/${user.name}/src/nixos-configuration";
  };

  ssh = {};
  services.openssh.enable = true;

  virtualisation.docker.enable = true;
  security.acme = {
    email = user.email;
    acceptTerms = true;
  };

  environment.systemPackages = map lib.lowPrio [
    pkgs.neovim
  ];

  nixpkgs.config.packageOverrides = pkgs: {
    gnupg = pkgs.gnupg.override { pinentry = pkgs.pinentry-curses; };
  };

  # home-manager.users.${user.name} = {
  #   home = {
  #     packages = [];
  #     file = {
  #       # "syncthing" = {
  #       #   recursive = true;
  #       #   target = ".config/syncthing/config.xml";
  #       #   source = ../../data/syncthing/daenerys.xml;
  #       # };
  #       # "../../data/syncthing/daenerys.xml".target = ".config/syncthing/config.xml";
  #       # ".config/syncthing/config.xml".target =  ../../data/syncthing/daenerys.xml;
  #     } // user.home.common;
  #   };
  #   services = user.services.workstation;
  #   xresources = user.xresources;
  # };

  services.keycloak = {
    enable = true;
    initialAdminPassword = user.password;
    settings = {
      hostname = "auth.${domain}";
      hostname-strict-backchannel = true;
    };
    database.passwordFile = builtins.toFile "database_password" (
      builtins.readFile ../../private/postgresql/daenerys/keycloak/database_password
    );
  };

  users.users.root.openssh.authorizedKeys.keyFiles = [
    ../../data/ssh/id_ecdsa.pub
  ];

  system.stateVersion = "24.05";
}

