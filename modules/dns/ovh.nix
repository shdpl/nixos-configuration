{ config, pkgs, lib, ... }:

let
	cfg = config.dns;
in

with lib;

{
	options = {
		dns = {
			ddns = mkOption {
				default = false;
				type = with types; bool;
				description = ''
					Notify DNS system about our current IP through DDNS protocol.
				'';
			};
			host = mkOption {
				default = null;
				type = with types; string;
				description = ''
					Host name
				'';
			};
			domain = mkOption {
				default = "nawia.net";
				type = with types; string;
				description = ''
					Domain address
				'';
			};
			server = mkOption {
				default = "www.ovh.com";
				type = with types; string;
				description = ''
					DDNS provider host
				'';
			};
			username = mkOption {
				default = null;
				type = with types; string;
				description = ''
					DDNS provider username
				'';
			};
			password = mkOption {
				default = null;
				type = with types; string;
				description = ''
					DDNS provider password
				'';
			};
			interface = mkOption {
				default = "enp1s0";
				type = with types; string;
				description = ''
					Interface to fetch ip from
				'';
			};
		};
	};

	config = mkIf cfg.ddns {
		services.ddclient = {
			enable = true;
			domains = [ "${cfg.host}.${cfg.domain}" ];
			server = cfg.server;
			username = cfg.username;
			password = cfg.password;
			use = "if, if="+cfg.interface;
			ssl = false;
		};
	};
}
