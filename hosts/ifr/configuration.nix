{ config, pkgs, ... }:

let
	host = "ifr";
	domain = "nawia.net";
	libeDomain = "libe.local";
in
{
	imports = [
		./hardware-configuration.nix
		../../modules/wheel-is-root.nix
		../../modules/pl.nix
		../../modules/virtualbox.nix
		../../modules/ssh.nix
		../../modules/dns/ovh.nix
		../../modules/workstation.nix
		../../modules/data-sharing.nix
		../../modules/common.nix
		../../modules/graphics.nix
		../../modules/programming.nix
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
