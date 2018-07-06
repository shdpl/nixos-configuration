{ config, pkgs, ... }:
{
	imports =
	[ <nixpkgs/nixos/modules/profiles/qemu-guest.nix>
	];
	boot.initrd.availableKernelModules = [ "ata_piix" "virtio_pci" "floppy" "sd_mod" "sr_mod" ];
	fileSystems."/" = {
		label = "nixos";
		fsType = "ext4";
	};
	fileSystems."/boot" =
	{
		label = "boot";
		fsType = "vfat";
	};
	boot.loader = {
		systemd-boot.enable = true;
		efi.canTouchEfiVariables = true;
	};
	swapDevices = [
		{ label = "swap"; }
	];

	nix.maxJobs = 4;
	nixpkgs.system = "x86_64-linux";
	system.stateVersion = "18.03";
}
