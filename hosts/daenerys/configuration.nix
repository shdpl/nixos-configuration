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
			allowedTCPPorts = [ 22 25 53 80 443 465 22000 993 995 ];
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
		nginx = {
			enable = true;
			httpConfig = ''
				server {
					listen 443 ssl;
					server_name www.nawia.net;

					ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
					ssl_certificate ${../../private/mail.nawia.net.crt};
					ssl_certificate_key ${../../private/mail.nawia.net.key};
					ssl_client_certificate ${../../private/nawia.net.pem};
					ssl_verify_client on;

					root /var/www;
					location /dl {
						autoindex on;
					}
					location /syncthing/ {
						proxy_set_header Host $host;
						proxy_set_header X-Real-IP $remote_addr;
						proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
						proxy_pass http://localhost:8384/;
					}
					location /deluge {
						proxy_pass http://localhost:8112/;
						proxy_set_header X-Deluge-Base "/deluge/";
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
