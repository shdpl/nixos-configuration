{ pkgs, config, lib, ... }:
{
  imports = [
    <nixpkgs/nixos/modules/virtualisation/docker-image.nix>
    <nixpkgs/nixos/modules/installer/cd-dvd/channel.nix>
  ];

  documentation.doc.enable = false;

  environment.systemPackages = with pkgs; [
    bashInteractive
    cacert
    nix
  ];
}
