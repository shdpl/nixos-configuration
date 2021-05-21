{ config, pkgs, ... }:

{
  hardware.opengl.driSupport32Bit = true; # for steam
  environment.systemPackages = with pkgs;
  [
    mediainfo
    ardour fmit vmpk
    lingot
    lgogdownloader
    steam
    #(steam.override { newStdcpp = true; })
    teamspeak_client discord
    wineStable
    /*(wine.override {*/
    /* wineRelease = "staging";*/
    /* wineBuild = "wineWow";*/
    /*})*/
  ];
}
