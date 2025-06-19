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
      user = mkOption {
        type = with types; str;
        default = "shd";
      };
    };
  };

  config = (mkMerge [
    (mkIf (cfg.enable == true) {
      boot.binfmt.emulatedSystems = ["x86_64-windows"];
      hardware.graphics.enable32Bit = true; # for steam
      programs.steam.enable = true;
      environment.systemPackages = with pkgs;
      [
        mediainfo
        ardour fmit vmpk mp3splt /*liquidsfz*/
        /*sfizz*/ soundfont-ydp-grand /*bristol*/ /*surge-XT*/
        lingot
        lgogdownloader
        discord #teamspeak_client
        wineWowPackages.stable
        #rawtherapee
      ];
      home-manager.users.${cfg.user} = {
        programs.timidity.enable = true;
        # services.fluidsynth.enable = true;
      };
    })
  ]);
}
