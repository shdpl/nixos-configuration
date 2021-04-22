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
  home-manager.users.shd.home.file = {
    ".ssh/escola_bitbucket".source = ../../private/ssh/escola_bitbucket;
    ".ssh/escola_bitbucket.pub".source = ../../data/ssh/escola_bitbucket.pub;
  };
}
