{ config, pkgs, ... }:

{
	environment.systemPackages = with pkgs;
	[
		gimp inkscape #krita
		imagemagick
	];
}