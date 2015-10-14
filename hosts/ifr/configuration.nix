{ config, pkgs, ... }:

let
	host = "ifr";
	domain = "nawia.net";
	libeDomain = "libe.local";
in
{
	imports = [
		./hardware-configuration.nix
		../../config/wheel-is-root.nix
		../../config/pl.nix
		../../config/virtualbox.nix
		../../config/ssh.nix
		../../config/dns/ovh.nix
		../../config/workstation.nix
		../../config/data-sharing.nix
		../../config/common.nix
		../../config/graphics.nix
		../../config/programming.nix
	];

	networking = {
		hostName = host;
		domain = domain;
		extraHosts = "127.0.0.1 ${libeDomain} lipro.${libeDomain} cms.${libeDomain} cmsapi.${libeDomain}";
		/*tcpcrypt.enable = true;*/
		firewall = {
			allowedTCPPorts = [ 22000 8080 ];
			allowedUDPPorts = [ 21025 ];
		};
		search = [ domain ];
	};

	dns = {
		host = host;
		domain = domain;
		ddns = true;
	};

	hardware = {
		opengl.driSupport32Bit = true;
		pulseaudio.enable = true;
	};

	workstation = {
		enable = true;
		xrandrHeads = [ "VGA-0" "HDMI-0" ];
		videoDrivers = [ "ati" ];
	};

	services = {
		dnsmasq = {
			enable = true;
			servers = [ "8.8.8.8" "8.8.4.4" ];
		};
		printing = {
			enable = true;
			drivers = [ ];
		};
	};
}
