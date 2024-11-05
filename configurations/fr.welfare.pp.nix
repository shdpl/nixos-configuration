{ pkgs, ... }:
let
  welfare = pkgs.callPackage ../pkgs/fr.welfare/default.nix {
    ref = "master";
    # rev = "8dca47263a6adb93fca6e5a28590d9be794c427d";
    # rev = "e3429d10aa6c5313e7a717af8c5f2b3a5327fcd4";
    rev = "38d0727289c7e4c7e5454c7963ed8aa82a80ed49";
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
          ExecStart = "${pkgs.bash}/bin/bash -c '${pkgs.docker-compose}/bin/docker-compose --verbose -f compose.yaml -f compose.prod.yaml up --build'"; # TODO: https://github.com/bcsaller/sdnotify ?
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
      };
      # TODO: WAL receiver
      # TODO: backup every deploy
      welfare-backup = {
        description = "Backup welfare database";
        path  = [ pkgs.docker pkgs.zstd ];
        script = ''
          docker exec $(docker ps -aqf 'name=postgres') pg_dumpall | zstd > /var/lib/welfare/postgres/$(date '+%s').zstd
        '';
          # docker exec $(docker ps -qf 'name=postgres') pg_dump keycloak | zstd > /var/lib/welfare/postgres/$(date '+%s')-keycloak.zstd
          # docker exec $(docker ps -qf 'name=postgres') pg_dump uptrace | zstd > /var/lib/welfare/postgres/$(date '+%s')-uptrace.zstd
          # docker exec $(docker ps -qf 'name=postgres') pg_dump welfare | zstd > /var/lib/welfare/postgres/$(date '+%s')-welfare.zstd
        # docker exec -it $(docker ps -qf 'name=minio') sh -c 'export DATE=$(date +"%s") MC_HOST_MINIO=http://${MINIO_ROOT_USER}:${MINIO_ROOT_PASSWORD}@minio:9090 && mkdir -p /var/lib/welfare/minio/${DATE} && mc mirror --md5 MINIO/ /var/lib/welfare/minio/${DATE}'
        # docker cp $(docker ps -qf 'name=minio'):/var/lib/welfare/minio /var/lib/welfare/minio
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
    pam.sshAgentAuth.enable = true;
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
