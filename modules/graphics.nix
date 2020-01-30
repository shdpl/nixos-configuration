{ config, pkgs, ... }:

{
	environment.systemPackages = with pkgs;
	[
		gimp inkscape #krita
		imagemagick7
    # rapid-photo-downloader
	];
}
