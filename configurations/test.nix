let
  nixos = import <nixpkgs/nixos> {
    configuration = ../hardware/docker.nix;
    system = "x86_64-linux";
  };
in
nixos.config.system.build.tarball
