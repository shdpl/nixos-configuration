{ config, pkgs, lib, ... }:

let
  cfg = config.workstation;
  #mopidy-configuration = builtins.readFile ../private/mopidy.conf;
in

with lib;

{
  imports = [
    /*./gtktheme.nix*/
  ../musnix
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
      user = mkOption {
        type = with types; string;
      };
    };
  };

  config = (mkIf cfg.enable {
		security.rtkit.enable = true;
    hardware = {
      # opengl.driSupport32Bit = true;
      pulseaudio = {
        enable = cfg.pulseaudio;
        configFile = ../private/default.pa;
#package = pkgs.pulseaudioFull;
      };
    };
    musnix.enable = true;
    musnix.soundcardPciId = "00:1f.3";
    users.users.${cfg.user}.extraGroups = [ "audio" ];
    /*kernelModules = [ "snd-seq" "snd-rawmidi" "snd-aloop" ];*/
    services = {
      # teamviewer.enable = true;
      # psd = {
      #   enable = true;
      #   users = [ cfg.user ]; # FIXME
      #  };
      xserver = {
        enable = true;
        autorun = true;
        layout = "pl";
        windowManager = {
          i3.enable = true;
        };
        displayManager.lightdm.autoLogin = {
          enable = true;
          user = cfg.user;
        };
        displayManager.defaultSession = "none+i3";
        # xrandrHeads = cfg.xrandrHeads;
        # videoDrivers = cfg.videoDrivers;
      };
      /*mopidy = {
        enable = true;
        configuration = mopidy-configuration;
        extensionPackages = [
          pkgs.mopidy-moped
          pkgs.mopidy-spotify
          pkgs.mopidy-spotify-tunigo
        ];
      };*/
      unclutter.enable = true;
      actkbd = {
        enable = true;
        bindings = [
          { keys = [ 224 ]; events = [ "key" ]; command = "/run/current-system/sw/bin/light -U 5"; }
          { keys = [ 225 ]; events = [ "key" ]; command = "/run/current-system/sw/bin/light -A 5"; }
        ];
      };
      # redshift = {
      #   enable = true;
      #   latitude = "54.372158";
      #   longitude = "18.638306";
      #   brightness = {
      #     night = "0.3";
      #     day = "0.5";
      #   };
      # };
    };
    fonts.fonts = with pkgs; [
      corefonts
      inconsolata
      ubuntu_font_family
      source-code-pro
    ];

    programs.light.enable = true; #TODO: autorandr

    environment.systemPackages = with pkgs; [
      ntfs3g
			jre
			pavucontrol
      enlightenment.terminology #TODO: alacritty || termite
      feh
      ranger ffmpegthumbnailer

      sox lame flac
      spotify
      #(makeAutostartItem { name="spotify"; package=spotify; })
      dex
      vlc
      # lastwatch

      keepassx2

      chromium firefoxWrapper vimbWrapper /*tor-browser-bundle-bin*/ /*jumanji*/ /*qutebrowser*/ /*uzbl*/ /*vimprobable*/
      thunderbird
      skype
      # google_talk_plugin

      hicolor_icon_theme
      lxappearance
      libnotify #dunst
      xdotool wmctrl xclip scrot stalonetray xorg.xwininfo seturgent #xev xmessage
      /*xfce.xfce4notifyd*/
      /*notify-osd*/
      rofi
      i3status i3lock

      jmtpfs
      pulsemixer
    ];
    nixpkgs.config = {
      firefox = {
        # enableGoogleTalkPlugin = true;
        /*enableAdobeFlash = true;*/
				icedtea = true;
				/*jre = true;*/
      };
      vimb = {
        /*enableAdobeFlash = true;*/
      };
      chromium = {
				/*
        enableWideVine = true;
        enablePepperFlash = true;
        enablePepperPDF = true;
				jre = true;
			*/
      };
    };
		/*sound.mediaKeys.enable = true;*/
  });
}
