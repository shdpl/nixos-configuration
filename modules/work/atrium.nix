{ config, pkgs, lib, ... }:
{
	environment.variables.ATRIUM_ADMIN_EMAIL = "mariusz.gliwinski@ifresearch.org";
	environment.systemPackages = with pkgs;
	[
		robomongo
		php #idea.phpstorm
		vagrant
	];
}
