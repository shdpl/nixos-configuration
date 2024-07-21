{ config, pkgs, lib, ... }:
with lib;
{
	imports = [
    ../../modules/web-server.nix
	];
	options.chat = {
		vhost = mkOption {
			type = types.str;
		};
		path = mkOption {
			type = types.str;
			default = "/chat/";
		};
    address = mkOption {
			type = types.str;
			default = "0.0.0.0";
		};
		port = mkOption {
			type = types.int;
			default = 8082;
		};
	};
  config = (mkMerge [
		(mkIf (config.chat != null) {
			services.mattermost = {
				enable = true;
        siteUrl = "https://${config.chat.vhost}";
        listenAddress = "${config.chat.address}:${toString config.chat.port}";
			};
		})
		(mkIf (config.chat.vhost != "") {
			webServer.virtualHosts.${config.chat.vhost} = {
        enableACME = true;
        forceSSL = true;
				locations."${config.chat.path}".extraConfig = ''
					proxy_set_header        Host $host:$server_port;
          proxy_set_header        X-Forwarded-Host $host;
          proxy_set_header        X-Forwarded-Port $server_port;
					proxy_set_header        X-Forwarded-Proto $scheme;
					proxy_set_header        X-Real-IP $remote_addr;
					proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_redirect          http:// https://;
					proxy_pass http://localhost:${toString config.chat.port};
				'';
			};
		})
	]);
}
