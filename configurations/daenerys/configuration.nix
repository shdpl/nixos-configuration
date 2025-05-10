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
      ../../modules/data-sharing.nix
      ../../modules/rss.nix
      ../../modules/identity.nix
      ../../modules/oci-registry.nix
      ../../modules/scm.nix
      ../../modules/pl.nix
      ../../modules/ssh.nix
      ../../modules/common.nix
    ];

  boot = {
    binfmt.emulatedSystems = [ "aarch64-linux" ];
    loader.grub = {
      efiSupport = true;
      efiInstallAsRemovable = true;
    };
  };

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

  rss = {
    enable = true;
    vhost = "rss.shd.nawia.net";
    path = "/";
  };

  identity = {
    enable = true;
    vhost = "auth.nawia.pl";
  };

  scm = {
    vhost = "scm.nawia.pl";
    initialRootEmail = builtins.readFile ../../private/scm/admin_email;
    initialRootPassword = builtins.toFile "adminPassword" (
      builtins.readFile ../../private/scm/admin_password
    );
    dbSecret = builtins.toFile "dbSecret" (
      builtins.readFile ../../private/scm/db_secret
    );
    secretSecret = builtins.toFile "secretSecret" (
      builtins.readFile ../../private/scm/secret_file
    );
    otpSecret = builtins.toFile "otpSecret" (
      builtins.readFile ../../private/scm/otp_secret
    );
    jwsSecret = builtins.toFile "jwsSecret" (
      builtins.readFile ../../private/scm/jws_secret
    );
  };

  oci-registry = {
    enable = true;
    vhost = "docker.nawia.pl";
    authTokenRealm = "https://auth.nawia.pl/realms/nawia.pl/protocol/docker-v2/auth";
    authTokenService = "docker.nawia.pl";
    authTokenIssuer = "https://auth.nawia.pl/realms/nawia.pl";
    authTokenRootCertBundle = builtins.toFile "rootcertbundle" (
      builtins.readFile ../../private/keycloak/daenerys/nawia.pl/keystore/registry.crt
    );
  };

  networking = {
    hostName = host;
    domain = domain;
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

  virtualisation = {
    docker = {
      enable = true;
      autoPrune = {
        enable = true;
        dates = "monthly";
      };
    };
    containerd.enable = true;
  };
  security.acme = {
    defaults.email = user.email;
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

  services.nginx = {
    enable = true;
    recommendedOptimisation = true;
    recommendedTlsSettings = true;
    recommendedBrotliSettings = true;
    recommendedGzipSettings = true;
    recommendedZstdSettings = true;
    recommendedProxySettings = true;
  };
  # services.invidious = {
  #   enable = true;
  #   domain = "video.shd.nawia.net";
  #   nginx.enable = true;
  # };
  networking.firewall.allowedTCPPorts = [ 80 443 ];
  services.snowflake-proxy.enable = true;

  users.users.root.openssh.authorizedKeys.keyFiles = [
    ../../data/ssh/id_ecdsa.pub
  ];

  system.stateVersion = "24.05";
  home-manager.users.${user.name}.home.stateVersion = "22.11";
}
