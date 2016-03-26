{ config, pkgs, ... }:
with import <nixpkgs/lib>;
let
  searxConfigFile = toString (builtins.toFile "searx.yml" (builtins.readFile ../private/searx.yml));
in
{
	imports = [
    ../modules/web-server.nix
	];
	options.searx = {
		vhost = mkOption {
			type = types.str;
			default = "";
		};
		path = mkOption {
			type = types.str;
			default = "/";
		};
	};
  config = (mkMerge [
		(mkIf (config.searx != null) {
      services.searx = {
        enable = true;
        /*configFile = searxConfigFile;*/
      };
		})
		(mkIf (config.searx.vhost != "") {
			webServer.vhosts."${config.searx.vhost}".paths."${config.searx.path}".config  = ''
        proxy_pass              http://localhost:8888/;
        proxy_set_header        Host                 $host;
        proxy_set_header        X-Real-IP            $remote_addr;
        proxy_set_header        X-Forwarded-For      $proxy_add_x_forwarded_for;
        proxy_set_header        X-Remote-Port        $remote_port;
        proxy_set_header        X-Forwarded-Proto    $scheme;
        proxy_redirect          off;
			'';
		})
	]);
}
