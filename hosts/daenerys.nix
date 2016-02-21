{ config, pkgs, ... }:
let
  host = "daenerys";
	domain = "nawia.net";
  shd = (import ../users/shd.nix);
in
{
	imports = [
		../modules/users.nix
		../modules/pl.nix
		../modules/data-sharing.nix
		../modules/ssh.nix
		../modules/common.nix
		/*../modules/mail-server.nix*/
    ../modules/web-server.nix
	];

	aaa = {
		enable = true;
		wheelIsRoot = true;
		users = [ shd ];
	};

	networking = {
		hostName = host;
		domain = domain;
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
#nix-serve
#murmur
#searx seeks
#shellinabox
#subsonic
#systemhealth
		tor = {
			enable = true;
			relay = {
				enable = true;
				/*isBridge = true;*/
				isExit = true;
				portSpec = "53";
			};
		};
		i2p.enable = true;
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
}
