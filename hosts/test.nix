{ config, pkgs, ... }:

{ services.openssh.enable = true;
	boot.extraKernelParams = [ "systemd.log_level=debug" ];
	networking = {
		firewall.enable = false;
		hostName = "daenerys";
		domain = "nawia.net";
		/*defaultGateway = "88.198.67.31";*/
		defaultGateway6 = "fe80::1";
		interfaces = {
			"eth0" = {
				ip4 = [ { address = "88.198.67.27"; prefixLength = 27; } ];
				ip6 = [ { address = "2a01:4f8:140:4268:0:1"; prefixLength = 64; } ];
			/*	ipAddress = "88.198.67.27";*/
			/*	prefixLength = 27;*/
			};
		};
	};
}
