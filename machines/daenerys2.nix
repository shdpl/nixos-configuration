{ config, pkgs, ... }:
{
  imports = [ <nixpkgs/nixos/modules/installer/scan/not-detected.nix> ];
  boot.kernelPackages = pkgs.linuxPackages_3_18;
	zramSwap.enable = true;
  nixpkgs.system = "x86_64-linux";
}
