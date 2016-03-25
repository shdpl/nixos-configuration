{ config, pkgs, ... }:

let
  host = "magdalene";
  domain = "nawia.net";
  shd = (import ../users/shd.nix);
	ddns = (import ../private/dns/magdalene.nix);
in
{
  imports = [
		../modules/users.nix
    ../modules/pl.nix
    ../modules/data-sharing.nix
    ../modules/ssh.nix
    ../modules/dns/ovh.nix
    ../modules/common.nix
    ../modules/workstation.nix
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

  networking = {
    hostName = host;
    domain = domain;
    search = [ domain ];
    firewall.enable = false;
  };

  dns = {
    ddns = true;
    host = host;
    domain = domain;
		username = ddns.username;
		password = ddns.password;
    interface = "enp6s0";
  };

  workstation = {
    enable = true;
  };

	services = {
		devmon.enable = true;
	};

/*
  nixpkgs.config = {
    packageOverrides = pkgs: {
      libbluray = pkgs.libbluray.override { withAACS = true; };
    };
  };
*/

}
