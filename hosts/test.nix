{ config, pkgs, ... }:

{ services.openssh.enable = true;
	boot.extraKernelParams = [ "systemd.log_level=debug" ];
	networking = {
		firewall.enable = false;
	};
}
