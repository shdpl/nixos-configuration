# TODO: docker exec $(docker ps -aqf "name=postgres") pg_dumpall | zstd > /tmp/welfare-postgres-$(date +%s).zstd
{ config, pkgs, ... }:
let
  welfare = pkgs.callPackage ../pkgs/fr.welfare/default.nix {
    # ref = "WCARD-792";
    # rev = "4d206d7aca8844530c0109688247499e6f4db462";
    ref = "master";
    rev = "a20d388d48c1c016d75166213164c6b499db2b32";
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
