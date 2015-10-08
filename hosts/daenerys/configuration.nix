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
	};

	networking = {
		hostName = "daenerys";
		domain = "nawia.net";
#		tcpcrypt.enable = true;
		firewall = {
			enable = true;
			/*allowedTCPPorts = [ 9292 9200 3000 8080 22000 ];*/
			allowedTCPPorts = [ 22000 ];
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
		/*postfix = {*/
		/*	enable = true;*/
		/*	hostname = "daenerys.nawia.net";*/
		/*};*/
		ntp = {
			servers = [ "0.pl.pool.ntp.org" "1.pl.pool.ntp.org" "2.pl.pool.ntp.org" "3.pl.pool.ntp.org" ];
		};
		openssh = {
			enable = true;
			passwordAuthentication = false;
			challengeResponseAuthentication = false;
		};
		fail2ban = {
			enable = true;
		};
		logstash = {
			enable = true;
			enableWeb = true;
			inputConfig = builtins.readFile logstash/input.conf;
			filterConfig = builtins.readFile logstash/filter.conf;
			outputConfig = builtins.readFile logstash/output.conf;
		};
		elasticsearch = {
			enable = true;
			host = "elastic-search.nawia.net";
		};
		ntopng = {
			enable = true;
			configText = "--disable-login";
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
		syncthing = {};
		elasticsearch-tunnel = {
			home = "/var/lib/syncthing/root/data/home/elasticsearch";
			openssh.authorizedKeys.keys = [ ''command="nc elastic-search.nawia.net 9200",no-X11-forwarding,no-agent-forwarding,no-port-forwarding ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCcGFjUrRnBLu7ewIHVZ6hCKtg80eLmIDBkfKy2o5NNwz/2JMcMAfDIfmUkttPj2/xF6U8Qg0LlrUJ3hnbp2A8J+uEJpzWpGLyfW66nu8txdskjf1D8Z+oP9oS6zc81WQrPoDMJvqKC/Q2JvaFc/I0wO2tkh3orm7ywenbjyJEBPmKhh8bRsSMNhGz3lnuyEQ2SxnYuh41HVMHpKpHgtyMBCMNLztlv7MKj0Xq1igB+VlkHux32rX0bKrv/rN2pRbFOU3XCGfWUT7VHf0elUQwlsbFSvSph7tUdnxjPKf43JBzm3L0/bCPRglOQXGBmHeVwZzozqx+ttAK8pvZ8BKpL root@daenerys'' ];
			isNormalUser = true;
		};
		kibana-tunnel = {
			home = "/var/lib/syncthing/root/data/home/kibana";
			openssh.authorizedKeys.keys = [ ''command="nc daenerys.nawia.net 9292",no-X11-forwarding,no-agent-forwarding,no-port-forwarding ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDGxQCEP+X/d6hTKqHRyznsXSXvkYrvXLNW+r9gWxkWJHnt2seT35LvhYcWQf8FdiClq2KFesZBSh1BHrIu+NiTGCO2FfNF+CRJY1rqc1V+qxV/FCPBKDpno275xp4jJhYjwPsShX7+WnSFmRUe/N8yJcPpYVUQop9S9s2o3LGJwywkgDm8VDifHCr/A2uMg6jTEzvPc/98jviHbXzecU7FlG+ve1sASt1ZWqLTN8C5Ff68MtLug093q669nc4VpcNPP4M1l1+vyd/oM99n92XgZaBZilhcNO1pTP1mETRgrmpi55ZSohwZtYhm+8Lcf7Dw2vDcDddFCwNFH/yW7T8V shd@shd'' ];
			isNormalUser = true;
		};
		ntopng-tunnel = {
			home = "/var/lib/syncthing/root/data/home/ntopng";
			openssh.authorizedKeys.keys = [ ''command="nc daenerys.nawia.net 3000",no-X11-forwarding,no-agent-forwarding,no-port-forwarding ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDBDNysLnyIK61o4pYRaM55Dja9N7QKtaVDY3ARRkVIcpQlt+h7j71Nlj4YltwbAdr9kMsCB595U9QLHbizjUAMZU0/ZSwk9fqWHcR1hRIxSswT9NuNs8oYBLL96hWqXhAnw14TwGQiGMfqhkliemoWNOKLGLG855TYUYzKrQCXESlF1eLsDXDVUVRt+i0krugSbOWf3VPhQ4vvqUBDEQmlVgkPWmvopaznnV2dN9ayd7wVM2xQE1y09wfNCASUdBVIUI6fItd0ZwvtABDKqBj94aNYqE9icg0rXRSoAbNUZcgKlo7/KXsaacp1mMjmUxWeTLfA4TOmFeCG32c0Evjj shd@shd'' ];
			isNormalUser = true;
		};
		syncthing-tunnel = {
			home = "/var/lib/syncthing/root/data/home/syncthing";
			openssh.authorizedKeys.keys = [ ''command="nc daenerys.nawia.net 8080",no-X11-forwarding,no-agent-forwarding,no-port-forwarding ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC8je/Wb9aiHyHxtnT6AUjNujLAHxiJ+8koCZxFIJUTw5TnrGUqaUIi/Hy4F+YsZBOk7o6UN78ofo7UapjXd28LA5PpKr2Bqbn3TLpMjJ7HINszQAFVHwE4o4jCDqC9FBJwK068jUIyzcIb25+ZVTMRd0qu0CekGMEUjvlkK05Vp/UDU4lgfQjhbe0Ox7J9GeLJa1bgrg5zAHmarz8tcSwgAlYTC9BsQL/IlXdW8zE4hvXkSKmANJWMSp8lZzsHAChlZs7ZAUE/xeRLbPVx4C0UA8cFGzdWL1wMucPKbO9Q01CAlF/7PYKscMK/DYFevpjTsfThS7ROEkJznZdQiZh7 shd@shd'' ];
			isNormalUser = true;
		};

	};

	/*security.polkit.enable = false;*/
	/*services.udisks2.enable = false;*/
	/*sound.enable = false;*/

	environment = {
		variables.EDITOR="vim";
		systemPackages = with pkgs;
		[
			vim
			atop
			snort p0f
			leiningen
		];
	};

}
# security.duosec
# services.chronos
# services.collectd
# services.mailpile
# services.openfire services.prosody
# services.openldap
# services.opensmtpd services.postfix
# services.peerflix
# services.radicale
