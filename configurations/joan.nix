{ config, pkgs, ... }:
{
  imports = [
    ../hosts/joan.nix
    ../machines/joan.nix
  ];
}
