{ config, pkgs, ... }:
{
	imports = [
		../modules/pl.nix
		../modules/wheel-is-root.nix
		/*../modules/data-sharing.nix*/
		../modules/ssh.nix
		../modules/common.nix
		/*../modules/mail-server.nix*/
    /*../modules/web-server.nix*/
	];

	networking = {
		hostName = "joan";
		domain = "nawia.net";
		nat = {
			enable = true;
			externalInterface = "enp0s10";
			internalInterfaces = [ "enp0s11" "wlp0s12" ];
		};
	};

	services = {
		dnsmasq = {
			enable = true;
			resolveLocalQueries = false;
		};
	};
}
