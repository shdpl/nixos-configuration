{ config, pkgs, ... }:
{
  imports = [
    ../hosts/caroline.nix
    ../machines/caroline.nix
  ];
}
