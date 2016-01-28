{ config, pkgs, ... }:
{
  imports = [ <nixpkgs/nixos/modules/installer/scan/not-detected.nix> ];
/*
  deployment = {
    targetEnv = "none";
    targetHost = "127.0.0.1"; #"daenerys.nawia.net";
  };
*/
	boot = {
		initrd.availableKernelModules = [ ];
		kernelModules = [ ];
		extraModulePackages = [ ];
		loader = {
			grub = {
				enable = true;
				version = 2;
				device = "/dev/sda";
			};
		};
	};
	fileSystems."/" = {
		device = "/dev/disk/by-label/nixos";
		fsType = "ext4";
	};

	/*
  swapDevices = [
	  { device = "/dev/disk/by-uuid/956e7e4f-2b1a-4412-84bd-15cb2af2e4ab"; }
	];
	*/

  swapDevices = [];

  nix.maxJobs = 4;
}
