{ lib, pkgs, config, ... }:
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
    docker.enable = true;
    containerd.enable = true;
  };
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

  services = {
    keycloak = {
      enable = true;
      initialAdminPassword = builtins.readFile ../../private/keycloak/daenerys/admin_password;
      # sslCertificate = "/var/lib/acme/auth.nawia.pl/cert.pem";
      # sslCertificateKey = "/var/lib/acme/auth.nawia.pl/key.pem";
      settings = {
        hostname = "auth.nawia.pl";
        http-port = 8080;
        https-port = 8443;
        proxy = "edge";
        features = "docker";
      };
      database.passwordFile = builtins.toFile "database_password" (
        builtins.readFile ../../private/postgresql/daenerys/keycloak/database_password
      );
    };
  };
  
  services.dockerRegistry = {
    enable = true;
    extraConfig = {
      auth.token = {
        realm = "https://auth.nawia.pl/realms/nawia.pl/protocol/docker-v2/auth";
        service = "docker.nawia.pl";
        issuer = "https://auth.nawia.pl/realms/nawia.pl";
        rootcertbundle = builtins.toFile "rootcertbundle" (
          builtins.readFile ../../private/keycloak/daenerys/nawia.pl/keystore/registry.crt
        );
      };
    };
  };

  services.nginx = {
    enable = true;
    recommendedOptimisation = true;
    recommendedTlsSettings = true;
    recommendedBrotliSettings = true;
    recommendedGzipSettings = true;
    recommendedZstdSettings = true;
    recommendedProxySettings = true;
    virtualHosts = {
      "auth.nawia.pl" = {
        forceSSL = true;
        enableACME = true;
        locations."/" = {
          proxyPass = "http://localhost:8080";
        };
      };
      "docker.nawia.pl" = {
        forceSSL = true;
        enableACME = true;
        locations."/" = {
          proxyPass = "http://localhost:5000";
          extraConfig = "client_max_body_size 0;";
        };
      };
    };
  };
  services.invidious = {
    enable = true;
    domain = "video.shd.nawia.net";
    nginx.enable = true;
  };
  networking.firewall.allowedTCPPorts = [ 80 443 ];
  services.snowflake-proxy.enable = true;

  users.users.root.openssh.authorizedKeys.keyFiles = [
    ../../data/ssh/id_ecdsa.pub
  ];

  system.stateVersion = "24.05";
  home-manager.users.${user.name}.home.stateVersion = "22.11";
}
