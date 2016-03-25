{ config, pkgs, ... }:
{
  imports = [ <nixpkgs/nixos/modules/installer/scan/not-detected.nix> ];

  deployment = {
    targetEnv = "none";
    targetHost = "caroline.nawia.net"; #"192.168.0.103";
  };

  boot = {
    initrd.availableKernelModules = [ "xhci_pci" "ahci" ];
    kernelModules = [ "kvm-intel" ];
    extraModulePackages = [ ];
    kernelPackages = pkgs.linuxPackages_4_3;
    loader = {
        gummiboot.enable = true;
        efi.canTouchEfiVariables = true;
    };
  };
  fileSystems = {
		"/" = {
			label = "root";
      fsType = "ext4";
    };
    "/boot" = {
			label = "ESP";
      fsType = "vfat";
    };
	};

	services.xserver.synaptics.enable = true;

  swapDevices = [
		{ label = "swap"; }
	];

  nix.maxJobs = 4;
  nixpkgs.system = "x86_64-linux";
}
