{ config, pkgs, lib, ... }:
let
  backupPath = "/var/backup/teamspeak3-server.tar";
  backupUser = "teamspeak";
  root = "/var/lib/teamspeak3-server";
  user = "shd";
in
{
	services.teamspeak3.enable = true;
	networking.firewall = {
		allowedTCPPorts = [ 30033 10011 41144 ];
		allowedUDPPorts = [ 9987 ];
	};
  systemd = {
    timers.teamspeakBackup = {
      wantedBy = [ "timers.target" ];
      timerConfig = {
        OnCalendar = "01:15:00";
        AccuracySec = "5m";
        Unit = "teamspeakBackup.service";
      };
    };
    services = {
      teamspeakBackup = {
        enable = true;
        serviceConfig = {
          PermissionsStartOnly = true;
        };
        script = ''
          mkdir -p $(dirname "${backupPath}")
          ${pkgs.gnutar}/bin/tar -cvf "${backupPath}" "${root}"
          chown -R "${user}" "${backupPath}"
        '';
      };
      teamspeakRestore = {
        before = [ "teamspeak3-server.service" ];
        wantedBy = [ "multi-user.target" ];
        unitConfig = {
          type = "oneshot";
          RemainAfterExit = true;
        };
        script = ''
          ls /var/lib
          if [ ! -d "${root}" ]
          then
            echo "Restoring ${root}"
            mkdir -m 700 -p "${root}"
            chown ${backupUser} "${root}"
            cd /
            ${pkgs.gnutar}/bin/tar xvf "${backupPath}"
          fi
        '';
      };
    };
  };
}
