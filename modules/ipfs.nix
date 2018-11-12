{ config, pkgs, ... }:
with import <nixpkgs/lib>;
{
	imports = [
    ../modules/web-server.nix
	];
	options.ipfs = {
		vhost = mkOption {
			type = types.str;
		};
		path = mkOption {
			type = types.str;
			default = "/ipfs/";
		};
		user = mkOption {
			type = types.str;
		};
	};
  config = (mkMerge [
		(mkIf (config.ipfs != null) {
			services.ipfs = {
				enable = true;
				localDiscovery = false;
			};
		})
		(mkIf (config.ipfs.vhost != "") {
			webServer.virtualHosts.${config.ipfs.vhost} = {
				locations.${config.ipfs.path} = {
					extraConfig = ''
						proxy_pass http://127.0.0.1:8080;
						proxy_set_header Host            $host;
						proxy_set_header X-Forwarded-For $remote_addr;
					'';
				};
			};
		})
	]);
}
