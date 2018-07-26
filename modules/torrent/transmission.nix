{ config, pkgs, ... }:
with import <nixpkgs/lib>;
let
	cfg = config.torrent;
in
{
	imports = [
    ../../modules/web-server.nix
	];
	options.torrent = {
		vhost = mkOption {
			type = types.str;
		};
		path = mkOption {
			type = types.str;
			default = "/transmission/";
		};
		downloadPath = mkOption {
			type = types.str;
			default = "/dl/";
		};
    sslCertificate = mkOption {
      type = types.path;
      example = "/var/host.cert";
      description = "Path to server SSL certificate.";
    };
    sslCertificateKey = mkOption {
      type = types.path;
      example = "/var/host.key";
      description = "Path to server SSL certificate key.";
    };
	};
  config = (mkMerge [
		(mkIf (cfg != null) {
			networking.firewall = {
				/*allowedTCPPorts = [ 9091 ];*/
				allowedTCPPortRanges = [
					{ from = 8000; to = 8100; }
				];
				allowedUDPPortRanges = [
					{ from = 8000; to = 8100; }
				];
			};
			services.transmission = {
				enable = true;
				settings = {
					start-added-torrents = true;
					lpd-enabled = true;
					peer-port = 8000;
					peer-port-random-low = 8001;
					peer-port-random-high = 8100;
					peer-port-random-on-start = true;
					rpc-bind-address = "127.0.0.1";
					rpc-enabled = true;
          #rpc-whitelist-enabled = true;
          #rpc-whitelist = "*.*.*.*";
					rpc-host-whitelist-enabled = true;
          rpc-host-whitelist = cfg.vhost;
					/*rpc-authentication-required = true;*/
					/*rpc-username = builtins.readFile ../../private/transmission/username;*/
					/*rpc-password = builtins.readFile ../../private/transmission/password;*/
				};
			};
		})
		(mkIf (cfg.vhost != "") {
			users.users.nginx.extraGroups = ["transmission"];
			webServer.virtualHosts."${cfg.vhost}" = {
        forceSSL = true;
        sslCertificate  = cfg.sslCertificate;
        sslCertificateKey = cfg.sslCertificateKey;
        extraConfig = ''
			ssl_client_certificate ${cfg.sslCertificate};
			ssl_verify_client on;

      location / {
          return 301 https://$server_name/transmission/;
      }
      location ^~ /transmission {
      
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $http_host;
          proxy_set_header X-NginX-Proxy true;
          proxy_http_version 1.1;
          proxy_set_header Connection "";
          proxy_pass_header X-Transmission-Session-Id;
          add_header   Front-End-Https   on;
      
          location /transmission/rpc {
              proxy_pass http://127.0.0.1:9091;
          }
      
          location /transmission/web/ {
              proxy_pass http://127.0.0.1:9091;
          }
      
          location /transmission/upload {
              proxy_pass http://127.0.0.1:9091;
          }
      
          location /transmission/web/style/ {
              proxy_pass http://127.0.0.1:9091;
          }
      
          location /transmission/web/javascript/ {
              proxy_pass http://127.0.0.1:9091;
          }
      
          location /transmission/web/images/ {
              proxy_pass http://127.0.0.1:9091;
          }
          
          location /transmission/ {
              return 301 https://$server_name/transmission/web;
          }
      }
        '';
        /*
				locations."${cfg.path}".extraConfig = ''
					proxy_set_header    Host $http_host;
					proxy_set_header    X-Real-IP  $remote_addr;
					proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_pass_header   X-Transmission-Session-Id;
					proxy_redirect      off;
					proxy_pass          http://localhost:9091;
				'';
        */
				locations."/dl/" = {
					extraConfig = ''
						autoindex on;
						alias /var/lib/transmission/Downloads/;
					'';
				};
			};
		})
	]);
}
