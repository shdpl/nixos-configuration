{ config, pkgs, ... }:
let
  welfare = pkgs.callPackage ../pkgs/fr.welfare/default.nix {
    ref = "staging";
    # rev = "4d670d4c155a371ea0a57b6d661090bef870e0b2";
    # rev = "d38ab48e14a9e6955082ef929f6efc9acf3627cf";
    # rev = "525e12b99d55edccb24a622a5b387aaf16d03177";
    rev = "5c30acb0377f3a47a44f5f3062649dc2b6563833";
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
          ExecStart = "${pkgs.bash}/bin/bash -c '${pkgs.docker-compose}/bin/docker-compose --verbose -f compose.yaml -f compose.prod.yaml up'"; # TODO: https://github.com/bcsaller/sdnotify ?
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
