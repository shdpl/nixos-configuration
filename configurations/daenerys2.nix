{ config, pkgs, ... }:
{
  imports = [
    ../hosts/daenerys2.nix
    ../machines/daenerys2.nix
  ];
}
