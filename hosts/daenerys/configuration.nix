{ config, pkgs, ... }:

{
	imports = [
		./hardware-configuration.nix
		../../config/pl.nix
		../../config/wheel-is-root.nix
		../../config/data-sharing.nix
		../../config/ssh.nix
		../../config/common.nix
		../../config/mail-server.nix
    ../../config/web-server.nix
	];

	networking = {
		hostName = "daenerys";
		domain = "nawia.net";
		/*tcpcrypt.enable = true;*/
		firewall = {
			enable = true;
			allowedTCPPorts = [ 53 22000 ];
			allowedUDPPorts = [ 53 ];
			allowedTCPPortRanges = [
				{ from = 8000; to = 8100; }
			];
			allowedUDPPortRanges = [
				{ from = 8000; to = 8100; }
			];
		};
	};

	services = {
		tor = {
			enable = true;
			relay = {
				enable = true;
				/*isBridge = true;*/
				isExit = true;
				portSpec = "53";
			};
		};
		deluge = {
			enable = true;
			web.enable = true;
		};
		ntopng = {
			enable = true;
			extraConfig = ''
				--http-prefix=/ntopng
				--disable-login=1
				--interface=1
			'';
		};
	};

	systemd = {
		enableEmergencyMode = false;
		services = {
		};
	};
}
