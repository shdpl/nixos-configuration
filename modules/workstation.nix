{ config, pkgs, lib, ... }:

let
  cfg = config.workstation;
  #mopidy-configuration = builtins.readFile ../private/mopidy.conf;
  lockerCmd = "${pkgs.i3lock}/bin/i3lock -c 000000";
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
        type = with types; listOf str;
        description = ''
          XRandr displays
        '';
      };
      videoDrivers = mkOption {
        default = [];
        type = with types; listOf str;
        description = ''
          X-server video drivers
        '';
      };
      pulseaudio = mkOption {
        default = true;
        type = with types; bool;
      };
      user = mkOption {
        type = with types; str;
      };
      autologin = mkOption {
        default = false;
        type = with types; bool;
      };
    };
  };

  config = (mkIf cfg.enable {
    security.rtkit.enable = true;
    hardware = {
      # opengl.driSupport32Bit = true;
      pulseaudio = {
        enable = cfg.pulseaudio;
        # configFile = ../data/default.pa;
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
          i3 = {
            enable = true;
            #configFile = ../data/i3/config;
          };
        };
        displayManager = {
          lightdm = {
            background = "#000000";
          };
          autoLogin = {
            enable = true;
            user = cfg.user;
          };
        };
        displayManager.defaultSession = "none+i3";
        # xrandrHeads = cfg.xrandrHeads;
        # videoDrivers = cfg.videoDrivers;
        xautolock = {
          enable = !cfg.autologin;
          time = 5;
          notifier = "${pkgs.libnotify}/bin/notify-send \"Locking in 10 seconds\"";
          killer = "/run/current-system/systemd/bin/systemctl suspend";
          locker = lockerCmd;
        };
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
      unclutter = {
        enable = true;
        extraOptions = [ "noevents" ];
      };
      actkbd = {
        enable = true;
        bindings = [
          { keys = [ 224 ]; events = [ "key" ]; command = "/run/current-system/sw/bin/light -U 5"; }
          { keys = [ 225 ]; events = [ "key" ]; command = "/run/current-system/sw/bin/light -A 5"; }
        ];
      };
    };
    fonts.fonts = with pkgs; [
      corefonts
      inconsolata
      ubuntu_font_family
      source-code-pro
    ];

    programs = {
      light.enable = true; #TODO: autorandr
      xss-lock = {
        enable = !cfg.autologin;
        lockerCommand = lockerCmd;
      };
    };

    environment.systemPackages = with pkgs; [
      ntfs3g #jmtpfs
      # jre
      # pavucontrol
      enlightenment.terminology #TODO: alacritty || termite
      feh
      ranger ffmpegthumbnailer

      sox lame flac
      spotify spotify-cli-linux
      #(makeAutostartItem { name="spotify"; package=spotify; })
      dex
      vlc mplayer
      # lastwatch

      keepassx2

      #bcat
      chromium firefoxWrapper vimbWrapper /*tor-browser-bundle-bin*/ /*jumanji*/ /*qutebrowser*/ /*uzbl*/ /*vimprobable*/
      #thunderbird
      #skype
      # google_talk_plugin

      hicolor_icon_theme
      lxappearance
      libnotify
      xdotool wmctrl xclip scrot stalonetray xorg.xwininfo seturgent evtest #xmessage xorg.xev
      /*xfce.xfce4notifyd*/
      /*notify-osd*/
      /*polybar*/

      jmtpfs #TODO: mobile?
      pulsemixer
      #nextcloud-client
    ];

    home-manager.users.${cfg.user} = {
      programs = {
    #   autorandr = {
    #     enable = true;
    #     hooks = {
    #       postswitch = {
    #         "change-background" = builtins.toFile "change-background.sh" "feh --bg-fill ~/.background-image";
    #       };
    #     };
    #   };
    #   home.file = {
    #     ".background-image".source =  ../private/i3/.background-image.jpg;
    #   };
        # TODO: go gpg irssi jq keychain lsd
        noti.enable = true;
        # TODO: skim ssh taskwarrior vim qt dunst gpg-agent hound keepassx nextcloud-client random-background stalonetray syncthing taskwarrior-sync xdg.configFile i3.config
        zathura.enable = true;
        # taskwarrior.enable = true;
      };
    };

    xdg = {
      autostart.enable = true;
      icons.enable = true;
      menus.enable = true;
      mime.enable = true;
      portal = {
        enable = true;
        extraPortals = [ pkgs.xdg-desktop-portal-gtk ];
      };
      sounds.enable = true;
    };

    nixpkgs.config = {
      firefox = { # TODO: enable tridactyl native, colorscheme desert, disable gui, change tab characters
        # enableGoogleTalkPlugin = true;
        /*enableAdobeFlash = true;*/
        /*icedtea = true;*/
        /*jre = true;*/
      };
      # vimb = {
      #   /*enableAdobeFlash = true;*/
      # };
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
    # home-manager.users.${cfg.user} = {
    #     rofi = {
    #       enable = true;
    #       terminal = "${pkgs.i3}/bin/i3-sensible-terminal";
    #       # theme = ../data/rofi/theme.rasi;
    #       theme = "lb";
    #     };
    #   };
    # TODO: taskwarrior timewarrior
    # redshift = {
    #   enable = true;
    #   brightness = {
    #     night = "1";
    #     day = "0.7";
    #   };
    # };
  });
}
