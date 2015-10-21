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
    /*../../config/hobby.nix*/
  ];

  networking = {
    hostName = host;
    domain = domain;
    search = [ domain ];
    firewall.enable = false;
  };

  /*dns = {*/
  /*  host = host;*/
  /*  domain = domain;*/
  /*  ddns = true;*/
  /*};*/

  workstation = {
    enable = true;
    videoDrivers = [ "ati" ];
  };

  boot.loader.grub.memtest86.enable = true;

  nixpkgs.config = {
    packageOverrides = pkgs: {
      libbluray = pkgs.libbluray.override { withAACS = true; };
    };
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
