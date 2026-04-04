{ config, pkgs, lib, ... }:

let
  cfg = config.hobby;
  hmlib = import ../home-manager/lib { inherit lib; };
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
        ardour fmit vmpk /*liquidsfz*/
        /*sfizz*/ soundfont-ydp-grand /*bristol*/ /*surge-XT*/
        lingot
        steamguard-cli
        lgogdownloader
        wineWowPackages.unstable
        #rawtherapee
        freetube
        calibre
      ];
      home-manager.users.${cfg.user} = {
        home.activation = {
          directlink = hmlib.hm.dag.entryAfter [ "writeBoundary" ] ''
$DRY_RUN_CMD mkdir -p /home/${cfg.user}/.config/steamguard-cli && ln -sfvn /home/${cfg.user}/src/nixos-configuration/private/steam/maFiles /home/${cfg.user}/.config/steamguard-cli/maFiles
          '';
        };
        programs.timidity.enable = true;
        # services.fluidsynth.enable = true;
      };
    })
  ]);
}
