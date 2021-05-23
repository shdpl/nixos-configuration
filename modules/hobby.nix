{ config, pkgs, lib, ... }:

let
  cfg = config.hobby;
in
  with lib;
{
  options = {
    hobby = {
      enable = mkOption {
        type = with types; bool;
        default = false;
      };
    };
  };

  config = (mkMerge [
    (mkIf (cfg.enable == true) {
      hardware.opengl.driSupport32Bit = true; # for steam
      environment.systemPackages = with pkgs;
      [
        mediainfo
        ardour fmit vmpk
        lingot
        lgogdownloader
        steam
        teamspeak_client discord
        wineStable
      ];
    })
  ]);
}
