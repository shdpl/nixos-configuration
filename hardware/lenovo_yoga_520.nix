{ config, lib, pkgs, ... }:

{
  # https://linux-hardware.org/?probe=e5dc04e6a5
  imports =
    [ <nixpkgs/nixos/modules/installer/scan/not-detected.nix>
      "${builtins.fetchTarball { url = "https://github.com/rycee/home-manager/archive/release-21.05.tar.gz"; }}/nixos"
    ];

  boot.initrd.availableKernelModules = [ "xhci_pci" "ahci" "usb_storage" "sd_mod" "sr_mod" "rtsx_usb_sdmmc" ];
  boot.kernelModules = [ "kvm-intel" ];
  boot.extraModulePackages = [ ];

  fileSystems."/" =
    { device = "/dev/disk/by-uuid/fe869d43-b8b6-43cd-96a0-597e38970a97";
      fsType = "ext4";
    };

  fileSystems."/boot" =
    { device = "/dev/disk/by-uuid/E5BE-5FC7";
      fsType = "vfat";
    };

  swapDevices =
    [ { device = "/dev/disk/by-uuid/1a694db9-e241-42e6-92b6-fd4fc491a5b5"; }
    ];

	boot.loader = {
		systemd-boot.enable = true;
		efi.canTouchEfiVariables = true;
	};
  nix.maxJobs = lib.mkDefault 4;
  powerManagement.cpuFreqGovernor = lib.mkDefault "powersave";
  services.xserver.libinput.enable = true;

  services.blueman.enable = true;
  hardware.bluetooth = {
    enable = true;
    # settings.General = {
    #   Enable = "Source,Sink,Media,Socket";
    # };
  };
  # services.mpris-proxy.enable = true;
  hardware.pulseaudio.extraModules = [ pkgs.pulseaudio-modules-bt ];
  environment.variables = {
    MOZ_USE_XINPUT2 = "1";
  };
}
