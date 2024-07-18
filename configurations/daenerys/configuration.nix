{ lib, pkgs, ... }:

{
  imports =
    [
      ./hardware-configuration.nix
      ./disk-config.nix
    ];

  boot.loader.grub = {
    efiSupport = true;
    efiInstallAsRemovable = true;
  };
  services.openssh.enable = true;

  environment.systemPackages = map lib.lowPrio [
    pkgs.neovim
  ];

  users.users.root.openssh.authorizedKeys.keyFiles = [
    ../../data/ssh/id_ecdsa.pub
  ];



  system.stateVersion = "24.05"; # Did you read the comment?

}

