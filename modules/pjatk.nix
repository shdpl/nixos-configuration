{ config, pkgs, lib, ... }:

let
	cfg = config.pjatk;
in

with lib;

{
  options = {
    pjatk = {
      enable = mkOption {
				type = with types; bool;
      };
    };
  };

  config = (mkMerge [
		(mkIf (cfg.enable == true) {
      environment.systemPackages = with pkgs;
      [
        # all
        teams discord

        # PRG
        clang gnumake #gcc
      ];
    })
  ]);
}
