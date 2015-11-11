{ config, pkgs, ... }:

let
	interface = {
		external = {
			name = "enp2s4";
		};
		cable = {
			name = "enp2s5";
			ip = "10.254.239.1";
			prefixLength = 24;
			subnet = "10.254.239.1/24";
		};
		/*wlan = {*/
		/*	name = "wlan0";*/
		/*	ip = "192.168.0.1";*/
		/*	prefixLength = 24;*/
		/*	subnet = "192.168.0.1/24";*/
		/*};*/
	};
in {
	imports = [
		/*./hardware-configuration.nix*/
		../../config/pl.nix
		../../config/wheel-is-root.nix
		/*../../config/data-sharing.nix*/
		../../config/ssh.nix
		../../config/common.nix
		/*../../config/mail-server.nix*/
    /*../../config/web-server.nix*/
	];

	networking = {
		hostName = "joan";
		domain = "nawia.net";
#		tcpcrypt.enable = true;
		firewall = {
			enable = true;
			/*allowedTCPPorts = [ 22000 ];*/
		};
		nat = {
			enable = true;
			externalInterface = interface.external.name;
			internalIPs = [ interface.cable.subnet/* interface.wlan.subnet*/ ];
			internalInterfaces = [ interface.cable.name/* interface.wlan.name*/ ];
		};
		interfaces = [
			/*${interface.external.name} = {};*/
      { name = interface.external.name; }
			/*${interface.cable.name} = {*/
			/*	ip4 = interface.cable.ip;*/
			/*	prefixLength = interface.cable.prefixLength;*/
			/*};*/
			/*${interface.wlan.name} = {*/
			/*	ip4 = interface.wlan.ip;*/
			/*	prefixLength = interface.wlan.prefixLength;*/
			/*};*/
		];
	};

	services = {
		dnsmasq = {
			enable = true;
			resolveLocalQueries = false;
		};
		/*smartd = {*/
		/*	enable = true;*/
		/*};*/
	};

	systemd = {
		enableEmergencyMode = false;
		services = {
		};
	};
	/*zramSwap = {*/
	/*	enable = true;*/
	/*};*/
}
