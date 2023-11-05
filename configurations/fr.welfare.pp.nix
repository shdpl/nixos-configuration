{ config, pkgs, ... }:
let
  welfare = pkgs.callPackage ../pkgs/fr.welfare/default.nix {
    # rev = "c32dc98f8d5033f2661dbc0c4e77e0573e9f6928";
    rev = "d3d92e380bfb9d940db1107e7100fe561b8e109e";
  };
in
{
  imports = [
    ../hardware/ovh-vps2020-essential-2-4-80.nix
  ];

  boot.loader.grub.enable = true;
  boot.loader.grub.device = "/dev/sda"; # or "nodev" for efi only

  environment.systemPackages = with pkgs; [
    neovim htop
  ];

  users.users.shd = {
    isNormalUser = true;
    extraGroups = [ "wheel" "docker" "systemd-journal" ];
    createHome = true;
    openssh.authorizedKeys.keyFiles = [
      ../data/ssh/id_ecdsa.pub
    ];
  };

  systemd.services.welfare = {
    wantedBy = [ "multi-user.target" ];
    after = [ "network.target" "docker.service" "docker.socket" ];
    environment = (import ../private/pp.welfare.fr/environment.nix) // { BUILDKIT_PROGRESS="plain"; };
    serviceConfig = {
      DynamicUser = true;
      SupplementaryGroups = [
        "docker"
      ];
      ExecStartPre = [
        "${pkgs.coreutils}/bin/cp -r ${welfare}/. /run/welfare/"
      ];
      # ExecStart = "${pkgs.bash}/bin/bash -c 'chmod +w client/dashboard/node_modules/ && cd client/dashboard && ${pkgs.yarn}/bin/yarn install && cd ../.. && ${pkgs.docker}/bin/docker compose -f compose.yaml -f compose.dev.yaml up || sleep 120'";
      ExecStart = "${pkgs.bash}/bin/bash -c 'chmod +w client/dashboard/node_modules/ && ${pkgs.docker}/bin/docker compose -f compose.yaml -f compose.dev.yaml up'"; # TODO: https://github.com/bcsaller/sdnotify ?
      ExecStop="${pkgs.docker}/bin/docker --log-level=debug compose -f compose.yaml -f compose.dev.yaml down";
      ExecStopPost = [
        "${pkgs.bash}/bin/bash -c '${pkgs.docker}/bin/docker volume rm welfare_website_modules welfare_server_modules welfare_client_modules || exit 0'"
        "${pkgs.docker}/bin/docker image rm welfare-client welfare-server welfare-keycloak welfare-website"
      ];
      TimeoutStopSec=30;
      RuntimeDirectory="welfare";
      WorkingDirectory = "/run/welfare";
      Restart = "always";
    };
    unitConfig = {
      StartLimitIntervalSec = 120;
    };
  };

  networking.firewall.allowedTCPPorts = [
    3000
    8000
    8008
    8025
    14318
  ];

  services = {
    # haveged.enable = true;
    openssh = {
      enable = true;
      settings.PasswordAuthentication = false;
    };
  };

  security = {
    sudo = {
      execWheelOnly = true;
      wheelNeedsPassword = false;
    };
    pam.enableSSHAgentAuth = true;
  };

  virtualisation.docker.enable = true;

  nix.settings.trusted-users = [
    "root"
    "@wheel"
  ];

  system.stateVersion = "23.05";
}
