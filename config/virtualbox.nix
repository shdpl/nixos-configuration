{pkgs, ...}:
{
	virtualisation.virtualbox = {
		host.enable = true;
	};
	boot.kernelPackages = pkgs.linuxPackages // {
		virtualbox = pkgs.linuxPackages.virtualbox.override {
			enableExtensionPack = true;
		};
	};
	nixpkgs.config.virtualbox.enableExtensionPack = true;
}
