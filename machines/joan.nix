{ config, pkgs, ... }:
{
	deployment = {
    targetEnv = "none";
    targetHost = /*"localhost";*/ "joan.nawia.net";
  };
	imports = [ <nixpkgs/nixos/modules/installer/scan/not-detected.nix> ];
	boot = {
		loader.grub = {
			enable = true;
			version = 2;
			device = "/dev/sda";
		};
		initrd.availableKernelModules = [ "pata_sis" "ohci_pci" "floppy" ];
	};
	fileSystems = {
		"/" = {
			device = "/dev/disk/by-label/root";
			fsType = "ext4";
		};
		"/boot" = {
			device = "/dev/disk/by-label/boot";
			fsType = "ext2";
		};
	};
	swapDevices = [
		{ device = "/dev/disk/by-label/swap"; }
	];
	nix.maxJobs = 1;
}
