{ config, pkgs, ... }:
let
in
{
  imports = [
  ../programming.nix
  ];
  programming = {
    enable = true;
    php = true;
    js = true;
    docker = true;
  };
  programs.zsh.enable = true;
  programs.zsh.ohMyZsh = {
    enable = true;
  };
}
