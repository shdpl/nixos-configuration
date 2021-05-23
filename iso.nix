# This module defines a small NixOS installation CD.  It does not
# contain any graphical stuff.
{lib, config, pkgs, ...}:
{
  imports = [
    <nixpkgs/nixos/modules/installer/cd-dvd/installation-cd-minimal.nix>
    #<nixpkgs/nixos/modules/profiles/qemu-guest.nix>
    #<nixpkgs/nixos/modules/installer/cd-dvd/channel.nix>
  ];
  systemd.services.sshd.wantedBy = lib.mkForce [ "multi-user.target" ];
  users.users.root.openssh.authorizedKeys.keys = [
    (builtins.readFile data/ssh/id_ed25519.pub)
  ];
	networking.wireless.enable = true;
	/*nix.nixPath = [*/
	/*	"nixpkgs=https://github.com/NixOS/nixpkgs/archive/44358ff94b314977415bd92b3f220b7dd16ed711.tar.gz"*/
	/*	"nixos-config=/etc/nixos/configuration.nix"*/
	/*];*/
}
