{ config, pkgs, ... }:
{
  imports = [
    ../hosts/magdalene.nix
    ../machines/magdalene.nix
  ];
}
