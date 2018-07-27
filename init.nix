{ config, pkgs, ... }:
{
	imports =
	[ <nixpkgs/nixos/modules/profiles/qemu-guest.nix>
	];
	boot.initrd.availableKernelModules = [ "ata_piix" "virtio_pci" "floppy" "sd_mod" "sr_mod" ];
	fileSystems."/" = {
		device = "/dev/disk/by-uuid/2c80bf97-d398-4b8a-aed2-e37807327a56";
		fsType = "ext4";
	};
	fileSystems."/boot" = {
		device = "/dev/disk/by-uuid/3A01-773F";
		fsType = "vfat";
	};
	boot.loader = {
		systemd-boot.enable = true;
		efi.canTouchEfiVariables = true;
	};
	swapDevices = [
		{ device = "/dev/disk/by-uuid/6fd8807f-2b34-4638-87f7-a2b6b88afc32"; }
	];

	nix.maxJobs = 4;
	nixpkgs.system = "x86_64-linux";
	system.stateVersion = "18.03";

	services.openssh.enable = true;
	users.users.root.openssh.authorizedKeys.keys = [
    (builtins.readFile data/ssh/id_ed25519.pub)
	];
}
