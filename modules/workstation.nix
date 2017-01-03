{ config, pkgs, lib, ... }:

let
  cfg = config.workstation;
  mopidy-configuration = builtins.readFile ../private/mopidy.conf;
in

with lib;

{
  imports = [
    /*./gtktheme.nix*/
  ];
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
      pulseaudio = mkOption {
        default = true;
        type = with types; bool;
      };
    };
  };

  config = (mkIf cfg.enable {
		security.rtkit.enable = true;
    hardware = {
      opengl.driSupport32Bit = true;
      pulseaudio = {
        enable = cfg.pulseaudio;
        configFile = ../private/default.pa;
#package = pkgs.pulseaudioFull;
      };
    };
    /*kernelModules = [ "snd-seq" "snd-rawmidi" "snd-aloop" ];*/
    services = {
      psd = {
        enable = true;
        users = [ "shd" ]; # FIXME
       };
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
          pkgs.mopidy-moped
          pkgs.mopidy-spotify
          pkgs.mopidy-spotify-tunigo
        ];
      };
      unclutter.enable = true;
    };
    fonts.fonts = with pkgs; [
      corefonts
      inconsolata
      ubuntu_font_family
      source-code-pro
    ];
    environment.systemPackages = with pkgs; [
			jre
			pavucontrol
      enlightenment.terminology
      feh zathura
      ranger

      sox lame flac
      spotify
      #(makeAutostartItem { name="spotify"; package=spotify; })
      dex
      vlc
      lastwatch

      keepassx2

      chromium firefoxWrapper vimbWrapper torbrowser /*jumanji*/ /*qutebrowser*/ /*uzbl*/ /*vimprobable*/
      thunderbird
      skype #teamviewer
      google_talk_plugin

      hicolor_icon_theme
      lxappearance
      libnotify dunst
      xdotool wmctrl xclip scrot stalonetray xorg.xwininfo linuxPackages.seturgent #xev xmessage
      /*xfce.xfce4notifyd*/
      /*notify-osd*/
      i3status i3lock

      jmtpfs
    ];
    nixpkgs.config = {
      firefox = {
        enableGoogleTalkPlugin = true;
        /*enableAdobeFlash = true;*/
				/*icedtea = true;*/
				jre = true;
      };
      vimb = {
        /*enableAdobeFlash = true;*/
      };
      chromium = {
        enableWideVine = true;
        enablePepperFlash = true;
        enablePepperPDF = true;
				jre = true;
      };
    };
		/* services.actkbd.bindings */
		sound.enableMediaKeys = true;
  });
}
