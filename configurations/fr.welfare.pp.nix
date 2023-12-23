{ config, pkgs, ... }:
let
  welfare = pkgs.callPackage ../pkgs/fr.welfare/default.nix {
    ref = "staging";
    # rev = "0d1bd828ae9aeaceb2fe75f391fe5063c923dab4";
    rev = "4f4aff3ad904bd12f52ac988b1b22be9696ec0ae";
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
    environment = (import ../private/pp.welfare.fr/environment.nix) // {
      HOME="/run/welfare";
      BUILDKIT_PROGRESS="plain";
    };
    serviceConfig = {
      DynamicUser = true;
      SupplementaryGroups = [
        "docker"
      ];
      ExecStartPre = [
        "${pkgs.coreutils}/bin/cp -r ${welfare}/. /run/welfare/"
      ];
      ExecStart = "${pkgs.bash}/bin/bash -c '${pkgs.docker-compose}/bin/docker-compose --verbose -f compose.yaml -f compose.prod.yaml up'"; # TODO: https://github.com/bcsaller/sdnotify ?
      # ExecStart = "${pkgs.docker}/bin/docker compose -f compose.yaml -f compose.prod.yaml up"; # TODO: https://github.com/bcsaller/sdnotify ?
      ExecStop="${pkgs.docker-compose}/bin/docker-compose -f compose.yaml -f compose.prod.yaml down";
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
