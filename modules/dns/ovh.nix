{ config, pkgs, lib, ... }:

let
	cfg = config.dns;
	ddns = import ../../private/dns/ovh.nix;
in

with lib;

{
	options = {
		dns = {
			host = mkOption {
				default = null;
				type = with types; string;
				description = ''
					Host name
				'';
			};
			domain = mkOption {
				default = null;
				type = with types; string;
				description = ''
					Domain address
				'';
			};
			ddns = mkOption {
				default = false;
				type = with types; bool;
				description = ''
					Notify DNS system about our current IP through DDNS protocol.
				'';
			};
		};
	};

	config = mkIf cfg.ddns {
		services.ddclient = {
			enable = true;
			domain = "${cfg.host}.${cfg.domain}";
			server = ddns.hostname;
			username = ddns.username;
			password = ddns.password;
			use = "if, if=enp1s0"; # FIXME:
		};
	};
}
