{ config, pkgs, ... }:
{
  imports = [ <nixpkgs/nixos/modules/installer/scan/not-detected.nix> ];

  boot = {
    initrd.availableKernelModules = [ "xhci_pci" "ahci" ];
    kernelModules = [ "kvm-intel" ];
    extraModulePackages = [ ];
    kernelPackages = pkgs.linuxPackages;
    loader = {
        systemd-boot.enable = true;
        efi.canTouchEfiVariables = true;
    };
  };
  fileSystems = {
		"/" = {
			label = "root";
      fsType = "ext4";
    };
	};

	services.xserver.synaptics.enable = true;

  swapDevices = [
		{ label = "swap"; }
	];

  nix.maxJobs = 4;
  nixpkgs.system = "x86_64-linux";
}
