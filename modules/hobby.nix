{ config, pkgs, ... }:

{
	environment.systemPackages = with pkgs;
	[
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
