{ config, pkgs, ... }:
let
	shd = builtins.readFile ../../users/shd.nix;
in
{
	imports = [
		./hardware-configuration.nix
		../../modules/users.nix
		../../modules/pl.nix
		../../modules/data-sharing.nix
		../../modules/ssh.nix
		../../modules/common.nix
		../../modules/mail-server.nix
    ../../modules/web-server.nix
	];

	aaa = {
		enable = true;
		wheelIsRoot = true;
		users = [ shd ];
	};

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
    /*radicale = {*/
    /*  enable = true;*/
    /*  config = ''*/
    /*  '';*/
    /*};*/
    /*gateone.enable = true;*/
	};

	systemd = {
		enableEmergencyMode = false;
		services = {
		};
	};
}
