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
  boot.kernelPackages = pkgs.linuxPackages_3_18;
	zramSwap.enable = true;
}
