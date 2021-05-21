{ config, pkgs, lib, ... }:

let
  cfg = config.graphics;
in
 with lib; 
{
  options =  {
    graphics = {
      enable = mkOption {
        type = with types; bool;
        default = false;
      };
    };
  };

  config = (mkMerge [
    (mkIf (cfg.enable == true) {
      environment.systemPackages = with pkgs;
      [
        gimp inkscape #krita
        imagemagick7
        # rapid-photo-downloader
      ];
    })
  ]);
}
