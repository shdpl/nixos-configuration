{ config, pkgs, ... }:
with import <nixpkgs/lib>;
let
	cfg = config.ntop;
in
{
	imports = [
    ../modules/web-server.nix
	];
	options.ntop = {
		vhost = mkOption {
			type = types.str;
		};
		path = mkOption {
			type = types.str;
			default = "/ntop";
		};
	};
  config = (mkMerge [
		(mkIf (cfg != null) {
			services.ntopng = {
				enable = true;
				extraConfig = ''
					--http-prefix=${cfg.path}
					--disable-login=1
					--interface=1
				'';
			};
		})
		(mkIf (cfg.vhost != "") {
			webServer.virtualHosts.${cfg.vhost} = {
				locations."${cfg.path}/".extraConfig = ''
					proxy_pass http://localhost:3000/;
				'';
			};
		})
	]);
}
