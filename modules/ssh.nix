{ config, pkgs, ... }:
with import <nixpkgs/lib>;
{
	imports = [
    /*../modules/web-server.nix*/
	];
	options.ssh = {
		vhost = mkOption {
			type = types.str;
			default = "";
		};
		path = mkOption {
			type = types.str;
			default = "/shell/";
		};
	};
  config = (mkMerge [
		(mkIf true {
      networking.firewall = {
        allowedTCPPorts = [ 22 ];
        allowedUDPPortRanges = [
          { from = 60000; to = 61000; } # mosh
        ];
      };
      services = {
        openssh = {
          enable = true;
          /*startWhenNeeded = true;*/
          passwordAuthentication = false;
          challengeResponseAuthentication = false;
          permitRootLogin = "yes";
        };
        fail2ban.enable = true;
      };
		})
	]);
}
