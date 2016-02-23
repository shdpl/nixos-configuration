{ config, pkgs, ... }:

let
  host = "caroline";
  domain = "nawia.net";
  shd = (import ../users/shd.nix);
in
{
  imports = [
		../modules/users.nix
    ../modules/pl.nix
    ../modules/data-sharing.nix
    ../modules/ssh.nix
    /*../modules/dns/ovh.nix*/
    ../modules/common.nix
    ../modules/workstation.nix
    /*../modules/graphics.nix*/
    ../modules/programming.nix
    /*../modules/hobby.nix*/
    /*../modules/print-server.nix*/
		../modules/work/livewyer.nix
  ];

  aaa = {
    enable = true;
    wheelIsRoot = true;
    users = [ shd ];
  };

  networking = {
    hostName = host;
    domain = domain;
    search = [ domain ];
		wireless = {
			enable = true;
			userControlled.enable = true;
		};
  };

  /*dns = {*/
  /*  host = host;*/
  /*  domain = domain;*/
  /*  ddns = true;*/
  /*};*/

  workstation = {
    enable = true;
  };

	/*services = {*/
	/*	devmon.enable = true;*/
	/*	kmscon = {*/
	/*		enable = true;*/
	/*		hwRender = true;*/
	/*	};*/
	/*};*/

/*
  nixpkgs.config = {
    packageOverrides = pkgs: {
      libbluray = pkgs.libbluray.override { withAACS = true; };
    };
  };
*/

}
