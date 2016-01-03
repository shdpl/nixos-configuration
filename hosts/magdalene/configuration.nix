{ config, pkgs, ... }:

let
  host = "magdalene";
  domain = "nawia.net";
in
{
  imports = [
    ./hardware-configuration.nix
    ../../config/wheel-is-root.nix
    ../../config/pl.nix
    ../../config/ssh.nix
    /*../../config/dns/ovh.nix*/
    ../../config/workstation.nix
    ../../config/data-sharing.nix
    ../../config/common.nix
    ../../config/graphics.nix
    ../../config/programming.nix
    ../../config/hobby.nix
    ../../config/virtualbox.nix
    ../../config/print-server.nix
  ];

  networking = {
    hostName = host;
    domain = domain;
    search = [ domain ];
    firewall.enable = false;
    extraHosts = ''
      172.19.8.101 local.k8.xxx.livew.io
    '';
  };

  security.pki.certificateFiles = [
    ../../private/ca/livewyer.crt
  ];

  /*dns = {*/
  /*  host = host;*/
  /*  domain = domain;*/
  /*  ddns = true;*/
  /*};*/

  workstation = {
    enable = true;
#    videoDrivers = [ "intel" ];
  };

  boot.kernelPackages = pkgs.linuxPackages_4_3;

  boot.loader = {
    gummiboot.enable = true;
    efi.canTouchEfiVariables = true;
  };

/*
  nixpkgs.config = {
    packageOverrides = pkgs: {
      libbluray = pkgs.libbluray.override { withAACS = true; };
    };
  };
*/

  #virtualisation.docker.enable = true;
  services = {
    nfs.server.enable = true;
    dbus.enable = true;
  };

  environment = {
    systemPackages = with pkgs;
    [
      steam
      teamspeak_client
      wineStable
      /*(wine.override {*/
      /* wineRelease = "staging";*/
      /* wineBuild = "wineWow";*/
      /*})*/
    ];
  };

}
