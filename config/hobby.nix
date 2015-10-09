{ config, pkgs, ... }:

{
	environment.systemPackages = with pkgs;
	[
		lingot
		lgogdownloader
	];
}
