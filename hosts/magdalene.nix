{ config, pkgs, ... }:

let
#  host = "magdalene";
  domain = "nawia.net";
  shd = (import ../users/shd.nix);
in
{
  imports = [
		../modules/users.nix
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

  aaa = {
    enable = true;
    wheelIsRoot = true;
    users = [ shd ];
  };

/*
  networking = {
    hostName = host;
    domain = domain;
    search = [ domain ];
    firewall.enable = false;
  };
*/

  /*dns = {*/
  /*  host = host;*/
  /*  domain = domain;*/
  /*  ddns = true;*/
  /*};*/

  workstation = {
    enable = true;
  };

	nix.nixPath = [ "/var/nix/profiles/per-user/root/channels/nixos" "nixos-config=/home/shd/src/nixos-configuration/configurations/magdalene.nix" "/nix/var/nix/profiles/per-user/root/channels" ];

/*
  nixpkgs.config = {
    packageOverrides = pkgs: {
      libbluray = pkgs.libbluray.override { withAACS = true; };
    };
  };
*/

}
