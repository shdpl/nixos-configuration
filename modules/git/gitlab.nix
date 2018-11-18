{ config, pkgs, ... }:
with import <nixpkgs/lib>;
{
	imports = [
    ../../modules/web-server.nix
	];
	options.git = {
		vhost = mkOption {
			type = types.str;
		};
		path = mkOption {
			type = types.str;
			default = "/gitlab/";
		};
		databasePassword = mkOption {
			type = types.str;
		};
		initialRootEmail = mkOption {
			type = types.str;
		};
		initialRootPassword = mkOption {
			type = types.str;
		};
		dbSecret = mkOption {
			type = types.str;
		};
		secretSecret = mkOption {
			type = types.str;
		};
		otpSecret = mkOption {
			type = types.str;
		};
		jwsSecret = mkOption {
			type = types.str;
		};
	};
  config = (mkMerge [
		(mkIf (config.git != null) {
			services.gitlab = {
				enable = true;
        databasePassword = config.git.databasePassword;
				host = config.git.vhost;
				https = true;
				initialRootEmail = config.git.initialRootEmail;
				initialRootPassword = config.git.initialRootPassword;
				port = 8081;
				secrets = {
					db = config.git.dbSecret;
					secret = config.git.secretSecret;
					otp = config.git.otpSecret;
					jws = config.git.jwsSecret;
				};
			};
		})
		(mkIf (config.git.vhost != "") {
			webServer.virtualHosts.${config.git.vhost} = {
        enableACME = true;
        forceSSL = true;
				locations.${config.git.path} = {
          proxyPass = "http://unix:/run/gitlab/gitlab-workhorse.socket";
				};
			};
		})
	]);
}
