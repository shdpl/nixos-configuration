{ config, pkgs, ... }:
{
  imports = [ <nixpkgs/nixos/modules/installer/scan/not-detected.nix> ];
	deployment = {
    targetEnv = "none";
    targetHost = "localhost"; #"magdalene.nawia.net";
  };
	boot = {
		initrd.availableKernelModules = [ "xhci_pci" "ahci" "usbhid" "usb_storage" ];
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
			device = "/dev/disk/by-uuid/4596d581-3476-48a4-958e-928d1258c3aa";
      fsType = "ext4";
    };
    "/boot" = {
			device = "/dev/disk/by-uuid/241D-53A4";
      fsType = "vfat";
    };
	};

	/*
  swapDevices = [
	  { device = "/dev/disk/by-uuid/956e7e4f-2b1a-4412-84bd-15cb2af2e4ab"; }
	];
	*/

  swapDevices = [];

  nix.maxJobs = 4;
}
