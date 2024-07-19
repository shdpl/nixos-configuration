{ config, pkgs, lib, ... }:

let
  cfg = config.window-manager.i3;
in

with lib;

{
  imports = [
  ];
  options = {
  };

  config = (mkIf cfg.enable {
  });
}
