{ config, pkgs, ... }:
{
  imports = [ <nixpkgs/nixos/modules/installer/scan/not-detected.nix> ];
  deployment = {
    targetEnv = "hetzner";
    hetzner = {
			mainIPv4= "88.198.67.27"; #"daenerys.nawia.net";
			partitions = ''
				zerombr
				clearpart --all --initlabel --drives=sda,sdb

				part swap1 --recommended --label=swap1 --fstype=swap --ondisk=sda
				part swap2 --recommended --label=swap2 --fstype=swap --ondisk=sdb

				part btrfs.1 --grow --ondisk=sda
				part btrfs.2 --grow --ondisk=sdb

				btrfs / --data=1 --metadata=1 --label=rhel7 btrfs.1 btrfs.2
			'';
		};
  };
/*--data=0 --metadata=1 */
				/*part btrfs.02 --ondisk=sdb*/
				/*part swap --recommended --label=swap --fstype=swap --ondisk=sda*/
				/*part / --fstype=ext4 --label=root --grow --ondisk=sda*/
				/*clearpart --all --initlabel --drives=sda,sdb*/

				/*part swap1 --recommended --label=swap1 --fstype=swap --ondisk=sda*/
				/*part swap2 --recommended --label=swap2 --fstype=swap --ondisk=sdb*/

				/*part btrfs.1 --grow --ondisk=sda*/
				/*part btrfs.2 --grow --ondisk=sdb*/

				/*btrfs / --data=1 --metadata=1 --label=root btrfs.1 btrfs.2*/

				/*clearpart --all --initlabel --drives=sda,sdb*/

				/*part swap1 --recommended --label=swap1 --fstype=swap --ondisk=sda*/
				/*part swap2 --recommended --label=swap2 --fstype=swap --ondisk=sdb*/

				/*part raid.1 --grow --ondisk=sda*/
				/*part raid.2 --grow --ondisk=sdb*/

				/*raid / --level=0 --device=md0 --fstype=ext4 --label=root raid.1 raid.2*/

	/*fileSystems = {*/
	/*	"/" = {*/
	/*		label = "root";*/
	/*	};*/
	/*};*/

	/*swapDevices = [*/
	/*	{ label = "swap1"; }*/
	/*	{ label = "swap2"; }*/
	/*];*/
	/*boot = {*/
	/*	initrd.availableKernelModules = [ ];*/
	/*	kernelModules = [ ];*/
	/*	extraModulePackages = [ ];*/
	/*	loader = {*/
	/*		grub = {*/
	/*			enable = true;*/
	/*			version = 2;*/
	/*			device = "/dev/sda";*/
	/*		};*/
	/*	};*/
	/*};*/
	/*fileSystems."/" = {*/
	/*	device = "/dev/disk/by-label/nixos";*/
	/*	fsType = "ext4";*/
	/*};*/

	/*
  swapDevices = [
	  { device = "/dev/disk/by-uuid/956e7e4f-2b1a-4412-84bd-15cb2af2e4ab"; }
	];
	*/

  /*swapDevices = [];*/

  /*nix.maxJobs = 4;*/
}
