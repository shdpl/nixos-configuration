{ config, pkgs, ... }:
let
  shd = (import ../users/shd.nix);
in
{
	imports = [
		../modules/pl.nix
		../modules/wheel-is-root.nix
		../modules/data-sharing.nix
		../modules/ssh.nix
		../modules/common.nix
#../modules/print-server.nix
	];

	networking = {
		hostName = "joan";
		domain = "nawia.net";
		nat = {
			enable = true;
			externalInterface = "enp0s10";
			internalInterfaces = [ "enp0s11" "wlp0s12" ];
		};
		interfaces = {
			"enp0s11" = {
				ipAddress = "169.254.0.1";
				prefixLength = 16;
			};
		};
		firewall.trustedInterfaces = [ "enp0s11" "wlp0s12" ];
	};

	services = {
		dhcpd = {
			enable = true;
			interfaces = [ "enp0s11" "wlp0s12" ];
			extraConfig = ''
				option subnet-mask 255.255.0.0;
				subnet 169.254.0.0 netmask 255.255.0.0 {
					option broadcast-address 169.254.255.255;
					option routers 169.254.0.1;
					option domain-name "nawia.net";
					option domain-name-servers 8.8.8.8, 8.8.4.4;
					range 169.254.0.2 169.254.254.254;
				}
			'';
		};
/*
		dnsmasq = {
			enable = true;
			resolveLocalQueries = false;
		};
*/
		hostapd = {
			enable = true;
			#hwMode = "g";
			interface = "wlp0s12";
			ssid = "shd_AP";
			wpaPassphrase = builtins.readFile ../private/wpa_password;
		};
	};
	nix.allowedUsers = [ "@wheel" "root" ];
	/* nix.distributedBuilds */
	/* nix.nixPath */
	/*programs.ssh.knownHosts*/
	/*security.pam.enableSSHAgentAuth*/
	/*security.pam.usb.enable*/
	/*collectd*/
	/*polipo*/
	/*privoxy*/
	/*samba*/
}
