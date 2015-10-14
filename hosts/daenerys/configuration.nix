{ config, pkgs, ... }:

{
	imports = [
		./hardware-configuration.nix
		../../config/pl.nix
		../../config/wheel-is-root.nix
		../../config/data-sharing.nix
		../../config/ssh.nix
		../../config/common.nix
	];

	networking = {
		hostName = "daenerys";
		domain = "nawia.net";
#		tcpcrypt.enable = true;
		firewall = {
			enable = true;
			allowedTCPPorts = [ 22 25 53 80 8112 ];
			allowedUDPPorts = [ 53 6997 ];
			allowedTCPPortRanges = [
				{ from = 8000; to = 8100; }
			];
			allowedUDPPortRanges = [
				{ from = 8000; to = 8100; }
			];
		};
	};

	services = {
		postfix = {
			enable = true;
			rootAlias = "shd";
			origin = "nawia.net";
			destination = [ "nawia.net" ];
			hostname = "mail.nawia.net";
		};
		dovecot2 = {
			enable = true;
		};
		tor = {
			enable = true;
			relay = {
				enable = true;
				isBridge = true;
				portSpec = "53";
			};
		};
		deluge = {
			enable = true;
			web.enable = true;
		};
	};

	systemd = {
		enableEmergencyMode = false;
		services = {
		};
	};
}
