{ config, pkgs, ... }:
{
  imports = [
    ../hosts/daenerys.nix
    ../machines/daenerys.nix
  ];
}
