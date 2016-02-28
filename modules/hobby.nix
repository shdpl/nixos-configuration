{ config, pkgs, ... }:

{
	environment.systemPackages = with pkgs;
	[
		mediainfo
		ardour fmit
		lingot
		lgogdownloader
		/*steam*/
		teamspeak_client
		wineStable
		/*(wine.override {*/
		/* wineRelease = "staging";*/
		/* wineBuild = "wineWow";*/
		/*})*/
	];
}
