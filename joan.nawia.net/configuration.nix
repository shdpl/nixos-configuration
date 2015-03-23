{ config, pkgs, ... }:

let
	interface = {
		external = {
			name = "eth0";
		};
		cable = {
			name = "eth1";
			ip = "10.254.239.1";
			prefixLength = 24;
			subnet = "10.254.239.1/24";
		};
		wlan = {
			name = "wlan0";
			ip = "192.168.0.1";
			prefixLength = 24;
			subnet = "192.168.0.1/24";
		};
	};
in {
	imports = [
		./hardware-configuration.nix
	];

	boot = {
		cleanTmpDir = true;
		loader = {
			grub = {
				enable = true;
				version = 2;
				device = "/dev/sda";
			};
		};
	};

	fileSystems."/" = {
		device = "/dev/disk/by-label/nixos";
		fsType = "ext4";
	};

	security = {
		sudo = {
			enable = true;
			wheelNeedsPassword = false;
			extraConfig = "Defaults:root,%wheel env_keep+=EDITOR";
		};
	};

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
			internalIPs = [ interface.cable.subnet interface.wlan.subnet ];
			internalInterfaces = [ interface.cable.name interface.wlan.name ];
		};
		interfaces = {
			${interface.external.name} = {};
			${interface.cable.name} = {
				ip4 = interface.cable.ip;
				prefixLength = interface.cable.prefixLength;
			};
			${interface.wlan.name} = {
				ip4 = interface.wlan.ip;
				prefixLength = interface.wlan.prefixLength;
			};
		};
	};

	i18n =
	{
		consoleFont = "lat2-16";
		consoleKeyMap = "pl";
		defaultLocale = "pl_PL.UTF-8";
	};

	time.timeZone = "Europe/Warsaw";

	nix.gc = {
		automatic = true;
		dates = "04:00";
	};

	programs.bash.enableCompletion = true;

	services = {
		ntp = {
			servers = [ "0.pl.pool.ntp.org" "1.pl.pool.ntp.org" "2.pl.pool.ntp.org" "3.pl.pool.ntp.org" ];
		};
		dnsmasq = {
			enable = true;
			resolveLocalQueries = false;
		};
		openssh = {
			enable = true;
			passwordAuthentication = false;
			challengeResponseAuthentication = false;
		};
		fail2ban = {
			enable = true;
		};
		smartd = {
			enable = true;
		};
		syncthing = {
			enable = true;
		};
	};

	systemd = {
		enableEmergencyMode = false;
		services = {
		};
	};
	/*zramSwap = {*/
	/*	enable = true;*/
	/*};*/

	users.extraUsers = {
		shd = {
			extraGroups = [ "wheel" ];
			isNormalUser = true;
			openssh.authorizedKeys.keys = [ "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAIEAmNhcSbjZB3BazDbmmtqPCDzVd+GQBJI8WAoZNFkveBGC0zznUCdd78rrjke5sDRBVCIqKABCx5iwU4VM1zVWZfWlsf6HEbhyUVdWmKgylG7Mchg2dkJUfTHx/VLnE1gDqc1+9SSs88q6H+IO4Kex853Q7eUo9Cmsi8TUn9rthME=" ];
		};
	};

	environment = {
		variables.EDITOR="vim";
		systemPackages = with pkgs;
		[
			vim
			atop
			/*tmsu*/ beets /* picard */
		];
	};

}
