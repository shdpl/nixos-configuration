# TODO: docker exec $(docker ps -aqf "name=postgres") pg_dumpall | zstd > /tmp/welfare-postgres-$(date +%s).zstd
{ config, pkgs, ... }:
let
  welfare = pkgs.callPackage ../pkgs/fr.welfare/default.nix {
    ref = "master";
    # rev = "f6d6fb5b36e483df800dbafb656131687fbfb730";
    # rev = "3d7044f7e669737f011fce54424ec7d5877a53e2";
    rev = "61251651248fa885a259dc1a61c0240feb1d13bb";
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
          ExecStart = "${pkgs.docker-compose}/bin/docker-compose --verbose -f compose.yaml -f compose.prod.yaml up --build --remove-orphans";
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
    # 14318 # TODO: reconsider allowing client-side telemetry
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
