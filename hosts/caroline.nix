{ config, pkgs, ... }:

let
  host = "caroline";
  domain = "nawia.net";
  hostname = "${host}.${domain}";
  shd = (import ../users/shd.nix);
	ddns = (import ../private/dns/caroline.nix);
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

  dns = {
    ddns = true;
    host = host;
    domain = domain;
		username = ddns.username;
		password = ddns.password;
		interface = "wlp1s0";
  };

  workstation = {
    enable = true;
    pulseaudio = false;
  };

  dataSharing = {
    user = shd.name;
  };

}
