{ config, pkgs, ... }:

{
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
		polkit.enable = false;
	};

	networking = {
		hostName = "daenerys";
		domain = "nawia.net";
#		tcpcrypt.enable = true;
		firewall.enable = true;
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
			enable = true;
			servers = [ "0.pl.pool.ntp.org" "1.pl.pool.ntp.org" "2.pl.pool.ntp.org" "3.pl.pool.ntp.org" ];
		};
		openssh = {
			enable = true;
			startWhenNeeded = true;
			passwordAuthentication = false;
			challengeResponseAuthentication = false;
		};
		fail2ban = {
			enable = true;
		};
		freenet = {
			enable = true;
		};
		logstash = {
			enable = true;
			enableWeb = true;
			inputConfig = ''
pipe {
	command => "/nix/store/wkcw8sg96pmawpg0sm2qgb9c5iavs3s7-system-path/bin/journalctl -f -o json"
	type => "syslog" codec => json {}
}
'';
			outputConfig = ''elasticsearch { host => "daenerys.nawia.net" }'';
		};
		elasticsearch = {
			enable = true;
			host = "daenerys.nawia.net";
		};
	};

	users.extraUsers.shd = {
		extraGroups = [ "wheel" ];
		isNormalUser = true;
		openssh.authorizedKeys.keys = [ "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAIEAmNhcSbjZB3BazDbmmtqPCDzVd+GQBJI8WAoZNFkveBGC0zznUCdd78rrjke5sDRBVCIqKABCx5iwU4VM1zVWZfWlsf6HEbhyUVdWmKgylG7Mchg2dkJUfTHx/VLnE1gDqc1+9SSs88q6H+IO4Kex853Q7eUo9Cmsi8TUn9rthME=" ];
	};

	environment = {
		variables.EDITOR="vim";
		systemPackages = with pkgs;
		[
			vim
		];
	};

}
# security.duosec
# services.chronos
