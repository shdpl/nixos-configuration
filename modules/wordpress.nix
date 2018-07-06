{ config, pkgs, ... }:

let
	cfg = config.wordpress;
in
{
	options.wordpress = {
		vhost = mkOption {
			type = types.str;
			default = "";
		};
	};
  config = {
  };
}
