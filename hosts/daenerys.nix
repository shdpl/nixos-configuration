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
		../modules/mail-server.nix
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
			allowedTCPPorts = [ 53 9091 22000 ];
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
		/*tor = {*/
		/*	enable = true;*/
		/*	relay = {*/
		/*		enable = true;*/
		/*		#isBridge = true;*/
		/*		isExit = true;*/
		/*		portSpec = "53";*/
		/*	};*/
		/*};*/
		/*i2p.enable = true;*/
		/*deluge = {*/
		/*	enable = true;*/
		/*	web.enable = true;*/
		/*};*/
		transmission = {
			enable = true;
			settings = {
				start-added-torrents = true;
				lpd-enabled = true;
				peer-port = 8000;
				peer-port-random-low = 8001;
				peer-port-random-high = 8100;
				peer-port-random-on-start = true;
				rpc-whitelist-enabled = false;
				rpc-authentication-required = true;
				rpc-username = "shd";#builtins.readFile ../private/transmission/username;
				rpc-password = "kolopia";#builtins.readFile ../private/transmission/password;
			};
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
