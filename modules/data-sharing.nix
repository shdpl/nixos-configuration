{ config, pkgs, ... }:
with import <nixpkgs/lib>;
{
	imports = [
    ../modules/web-server.nix
	];
	options.dataSharing = {
		/*enable = mkOption {*/
		/*	type = types.bool;*/
		/*	default = false;*/
		/*};*/
		vhost = mkOption {
			type = types.str;
			default = "";
		};
		path = mkOption {
			type = types.str;
			default = "/syncthing/";
		};
		user = mkOption {
			type = types.str;
		};
	};
  config = (mkMerge [
		(mkIf (config.dataSharing != null) {
			networking.firewall.allowedTCPPorts = [ 22000 ];
			services.syncthing = {
				enable = true;
				user = config.dataSharing.user;
			};
		})
		(mkIf (config.dataSharing.vhost != "") {
			webServer.vhosts.${config.dataSharing.vhost}.paths.${config.dataSharing.path}.config = ''
				proxy_set_header Host $host;
				proxy_set_header X-Real-IP $remote_addr;
				proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
				proxy_set_header X-Forwarded-Proto $scheme;
				proxy_pass http://localhost:8384/;
			'';
		})
	]);
}
