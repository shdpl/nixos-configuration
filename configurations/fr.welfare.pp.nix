{ config, pkgs, ... }:
let
  welfare = pkgs.callPackage ../pkgs/fr.welfare/default.nix {};
in
{
  imports = [
    ./hardware-configuration.nix
  ];

  boot.loader.grub.enable = true;
  boot.loader.grub.device = "/dev/sda"; # or "nodev" for efi only

  environment.systemPackages = with pkgs; [
    neovim docker-compose htop
  ];

  users.users.shd = {
    groups = [ "wheel" "docker" "systemd-journal" ];
    createHome = true;
    # home = "/home/shd";
    openssh.authorizedKeys.keyFiles = [
      ../data/ssh/id_ecdsa.pub
    ];
  };

  systemd.services.welfare = {
    wantedBy = [ "multi-user.target" ];
    after = [ "network.target" "docker.service" "docker.socket" ];
    serviceConfig = {
      DynamicUser = true;
      ExecStart = "${pkgs.docker-compose}/bin/docker-compose -f ${welfare}/compose.yaml -f ${welfare}/compose.dev.yaml";
      WorkingDirectory = "${welfare}";
      Restart = "always";
    };
  };

  services = {
    haveged.enable = true;
    openssh = {
      enable = true;
      # settings.PermitRootLogin = "yes";
    };
  };

  virtualisation.docker.enable = true;

  system.stateVersion = "23.05";
}

