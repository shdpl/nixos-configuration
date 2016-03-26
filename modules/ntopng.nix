{ config, pkgs, ... }:
with import <nixpkgs/lib>;
{
	imports = [
    ../modules/web-server.nix
	];
	options.ntopNg = {
		vhost = mkOption {
			type = types.str;
			default = "";
		};
		path = mkOption {
			type = types.str;
			default = "/ntopng";
		};
	};
  config = (mkMerge [
		(mkIf (config.ntopNg != null) {
			services.ntopng = {
				enable = true;
				extraConfig = ''
					--http-prefix=${config.ntopNg.path}
					--disable-login=1
					--interface=1
				'';
			};
		})
		(mkIf (config.ntopNg.vhost != "") {
			webServer.vhosts."${config.ntopNg.vhost}".paths."${config.ntopNg.path}/".config  = ''
				proxy_pass http://localhost:3000/;
			'';
		})
	]);
}
