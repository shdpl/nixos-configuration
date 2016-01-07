{ config, pkgs, ... }:

let
  host = "magdalene";
  domain = "nawia.net";
in
{
  imports = [
    ../modules/wheel-is-root.nix
    ../modules/pl.nix
    ../modules/ssh.nix
    /*../modules/dns/ovh.nix*/
    ../modules/workstation.nix
    ../modules/data-sharing.nix
    ../modules/common.nix
    ../modules/graphics.nix
    ../modules/programming.nix
    ../modules/hobby.nix
    ../modules/print-server.nix
		../modules/work/livewyer.nix
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
  };

/*
  nixpkgs.config = {
    packageOverrides = pkgs: {
      libbluray = pkgs.libbluray.override { withAACS = true; };
    };
  };
*/

}
