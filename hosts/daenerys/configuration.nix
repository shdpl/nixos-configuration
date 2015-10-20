{ config, pkgs, ... }:

{
	imports = [
		./hardware-configuration.nix
		../../config/pl.nix
		../../config/wheel-is-root.nix
		../../config/data-sharing.nix
		../../config/ssh.nix
		../../config/common.nix
		../../config/mail-server.nix
	];

	networking = {
		hostName = "daenerys";
		domain = "nawia.net";
#		tcpcrypt.enable = true;
		firewall = {
			enable = true;
			allowedTCPPorts = [ 22 25 53 80 443 465 8112 22000 993 995 8384 ];
			allowedUDPPorts = [ 53 6997 ];
			allowedTCPPortRanges = [
				{ from = 8000; to = 8100; }
			];
			allowedUDPPortRanges = [
				{ from = 8000; to = 8100; }
			];
		};
	};

	services = {
		nginx = {
			enable = true;
			httpConfig = ''
				server {
					listen 443;
					ssl on;
					server_name www.nawia.net;

					ssl_certificate ${../../private/mail.nawia.net.crt};
					ssl_certificate_key ${../../private/mail.nawia.net.key};
					ssl_client_certificate ${../../private/nawia.net.pem};
					ssl_verify_client on;

					root /var/www;
					location /dl {
						autoindex on;
					}
				}
			'';
		};
		tor = {
			enable = true;
			relay = {
				enable = true;
				isBridge = true;
				portSpec = "53";
			};
		};
		deluge = {
			enable = true;
			web.enable = true;
		};
	};

	systemd = {
		enableEmergencyMode = false;
		services = {
		};
	};
}
