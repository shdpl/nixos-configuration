# TODO: docker exec $(docker ps -aqf "name=postgres") pg_dumpall | zstd > /tmp/welfare-postgres-$(date +%s).zstd
{ config, pkgs, ... }:
let
  welfare = pkgs.callPackage ../pkgs/fr.welfare/default.nix {
    ref = "master";
    # rev = "d1ec68d52f8e2bd39a22b62c741e60c3a00a1470";
    rev = "26a2bfbb29ea574f7ade3f6028bc51cc1b64f348";
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

  systemd = {
    services = {
      welfare = {
        wantedBy = [ "multi-user.target" ];
        after = [ "network.target" "docker.service" "docker.socket" ];
        environment = (import ../private/welfare.fr/environment.nix) // {
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
          ExecStart = "${pkgs.docker-compose}/bin/docker-compose --verbose -f compose.yaml -f compose.prod.yaml up --remove-orphans";
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
      welfare-backup = { #TODO: WAL receiver
        description = "Backup welfare database";
        path  = [ pkgs.docker pkgs.zstd ];
        script = ''docker exec $(docker ps -aqf 'name=postgres') pg_dumpall | zstd > /var/lib/welfare/postgres/$(date '+%s').zstd'';
        serviceConfig.StateDirectory = "welfare/postgres";
      };
    };
    timers = {
      "welfare-backup" = {
        partOf = [ "welfare-backup.service" ];
        wantedBy = [ "timers.target" ];
        timerConfig = {
          OnCalendar="*-*-* 02:00:00";
          RandomizedDelaySec="2h";
        };
      };
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

  virtualisation.docker = {
    enable = true;
    autoPrune = {
      enable = true;
      dates = "monthly";
    };
  };

  nix = {
    gc = {
      automatic = true;
      dates = "weekly";
      options = "--delete-older-than 30d";
    };
    settings.trusted-users = [
      "root"
      "@wheel"
    ];
  };

  system.stateVersion = "23.05";
}
