{ config, pkgs, lib, ... }:

let
  cfg = config.workstation;
  mopidy-configuration = builtins.readFile ../private/mopidy.conf;
in

with lib;

{
  options = {
    workstation = {
      enable = mkOption {
        default = false;
        type = with types; bool;
        description = ''
          Whether computer acts as workstation.
        '';
      };
      xrandrHeads = mkOption {
        default = [];
        type = with types; listOf string;
        description = ''
          XRandr displays
        '';
      };
      videoDrivers = mkOption {
        default = [];
        type = with types; listOf string;
        description = ''
          X-server video drivers
        '';
      };
    };
  };

config = mkMerge
	[
		{
			environment.systemPackages = with pkgs;
			[
				e19.terminology
				feh zathura
				ranger

				sox lame flac
				spotify
				(makeAutostartItem { name="spotify"; package=spotify; })
				dex
				vlc 
				lastwatch

        keepassx2

        chromium firefox vimbWrapper jumanji
        thunderbird
        owncloudclient
        skype #teamviewer
        google_talk_plugin

        hicolor_icon_theme
        lxappearance
        dbus libnotify dunst
        xdotool wmctrl xclip scrot stalonetray xorg.xwininfo linuxPackages.seturgent #xev xmessage
        /*xfce.xfce4notifyd*/
        /*notify-osd*/
        dmenu gmrun
        i3status i3lock

        jmtpfs
      ];
    }
    (mkIf cfg.enable {
      services = {
        xserver = {
          enable = true;
          autorun = true;
          layout = "pl";
          windowManager = {
            i3.enable = true;
            default = "i3";
          };
          desktopManager.default = "none";
          displayManager.auto = {
            enable = true;
            user = "shd";
          };
          xrandrHeads = cfg.xrandrHeads;
          videoDrivers = cfg.videoDrivers;
        };
        mopidy = {
          enable = true;
          configuration = mopidy-configuration;
          extensionPackages = [
            pkgs.mopidy-spotify
            pkgs.mopidy-moped
          ];
        };
      };
    })
  ];
}
