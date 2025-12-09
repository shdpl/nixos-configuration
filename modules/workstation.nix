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
    # FIXME: microphone input on calls
    # services.pipewire = {
    #   enable = true;
    #
    #   alsa.enable = true;
    #   pulse.enable = true;
    #   jack.enable = true;
    # };

    musnix.enable = true;
    # musnix.soundcardPciId = "00:1f.3";
    users.users.${cfg.user}.extraGroups = [ "audio" ];
    /*kernelModules = [ "snd-seq" "snd-rawmidi" "snd-aloop" ];*/
    systemd.tmpfiles.rules = [
      "d /var/lib/systemd/coredump 0755 root root 1d"
    ];
    services = {
      journald.extraConfig = "MaxRetentionSec=1day";
      # pipewire = {
      #   enable = true;
      #
      #   alsa.enable = true;
      #   pulse.enable = true;
      #   jack.enable = true;
      # };
      # teamviewer.enable = true;
      # psd = {
      #   enable = true;
      #   users = [ cfg.user ]; # FIXME
      #  };
      displayManager = {
        defaultSession = "none+i3";
        autoLogin = {
          enable = true;
          user = cfg.user;
        };
      };
      xserver = {
        enable = true;
        autorun = true;
        xkb.layout = "pl";
        windowManager = {
          # occasionally switch to https://github.com/cardboardwm/cardboard https://github.com/catacombing/catacomb
          i3 = {
            enable = true;
            #configFile = ../data/i3/config;
            # package = pkgs.i3.overrideAttrs (old: {
            #   # src = pkgs.fetchurl {
            #   #   url = "https://i3wm.org/downloads/${old.pname}-${old.version}.tar.xz";
            #   #   sha256 = "sha256-YQJqcZbJE50POq3ScZfosyDFduOkUOAddMGspIQETEY=";
            #   # };
            #   src = pkgs.fetchFromGitHub {
            #     owner = "i3";
            #     repo = "i3";
            #     rev = "910e58585fb5675c157cddec2bcd2922045fcda5";
            #     sha256 = "sha256-F10sI5mF8CM0r5phkz4oA15UeBqyy4W4GXOid3wlfNk=";
            #     # rev = "8de59d409fab49f17d838a43277cb08b9cc2a0dc";
            #     # sha256 = "sha256-zN/z2vvT9/2KYlNCesK+PfsGrXg9j9PDZbwQhVbp9j8=";
            #   };
            #  });
          };
        };
        displayManager = {
          lightdm = {
            background = "#000000";
          };
        };
        # xrandrHeads = cfg.xrandrHeads;
        # videoDrivers = cfg.videoDrivers;
        xautolock = {
          enable = !cfg.autologin;
          enableNotifier = true;
          time = 5;
          notifier = "${pkgs.libnotify}/bin/notify-send \"Locking in 10 seconds\"";
          killer = "/run/current-system/systemd/bin/systemctl suspend";
          locker = lockerCmd;
        };
      };
      # mopidy = {
      #   enable = true;
      #   # configuration = mopidy-configuration;
      #   extensionPackages = with pkgs; [
      #     mopidy-iris
      #     mopidy-spotify
      #     mopidy-bandcamp
      #     mopidy-soundcloud
      #     # mopidy-mixcloud
      #     mopidy-podcast
      #     mopidy-scrobbler
      #     mopidy-mpd
      #   ];
      # };
      unclutter = {
        enable = true;
        extraOptions = [ "noevents" ];
      };
      actkbd = {
        enable = true;
        bindings = [
          { keys = [ 224 ]; events = [ "key" ]; command = "${pkgs.light}/bin/light -U 5"; }
          { keys = [ 225 ]; events = [ "key" ]; command = "${pkgs.light}/bin/light -A 5"; }
        ];
      };
    };
    fonts.packages = with pkgs; [
      corefonts
      inconsolata
      ubuntu-classic
      source-code-pro
    ];

    programs = {
      light.enable = true; #TODO: autorandr
      xss-lock = {
        enable = !cfg.autologin;
        lockerCommand = lockerCmd;
      };
    };

    environment = {
      systemPackages = with pkgs; [
        ntfs3g #jmtpfs
        # jre
        # pavucontrol
        enlightenment.terminology #TODO: alacritty || termite
        ffmpeg ffmpegthumbnailer

        sox lame flac
        spotify spotify-cli-linux
        #(makeAutostartItem { name="spotify"; package=spotify; })
        dex
        vlc mplayer
        # lastwatch
        espeak

        keepassxc

        #bcat
        #thunderbird
        #skype
        # google_talk_plugin

        # hicolor-icon-theme
        lxappearance
        libnotify
        xdotool wmctrl xclip scrot stalonetray xorg.xwininfo seturgent evtest #xmessage xorg.xev
        /*xfce.xfce4notifyd*/
        /*notify-osd*/
        /*polybar*/

        kdePackages.okular
        free42

        jmtpfs #TODO: mobile?
        pulsemixer
        #nextcloud-client
      ];
      variables = {
        BROWSER = "${pkgs.qutebrowser}/bin/qutebrowser";
      };
  };


    home-manager.users.${cfg.user} = {
      services = {
        dunst = {
          enable = true;
        };
        clipmenu = {
          enable = true;
          launcher = "fzf";
        };
        # grobi.enable = true;
        gromit-mpx.enable = true;
      };
      programs = {
        feh = {
          enable = true;
          themes = {
            feh = [
              "--auto-zoom"
              "--scale-down"
            ];
          };
        };
        chromium.enable = true;
        firefox = {
          enable = true;
          nativeMessagingHosts = [
            pkgs.tridactyl-native
          ];
          #TODO: profile
          # extensions = with pkgs.nur.repos.rycee.firefox-addons; [
          #   privacy-badger
          # ];
        };
        qutebrowser = {
          enable = true;
          searchEngines = {
            DEFAULT = "https://www.presearch.org/search?q={}";
            w = "https://en.wikipedia.org/wiki/Special:Search?search={}&go=Go&ns0=1";
            aw = "https://wiki.archlinux.org/?search={}";
            nw = "https://wiki.nixos.org/index.php?search={}";
            g = "https://www.google.com/search?hl=en&q={}";
          };
          settings = {
            tabs.tabs_are_windows = true;
            tabs.show = "multiple";
            url.start_pages = ["https://feedly.com/i/collection/content/user/5e8a5356-5f41-4ceb-95f3-fd122241200b/category/global.all"];
            colors.webpage.darkmode.enabled = true;
          };
        };
        rofi = {
          enable = true;
          terminal = "${pkgs.i3}/bin/i3-sensible-terminal";
          # theme = ../data/rofi/theme.rasi;
          # theme = "lb";
        };
        ranger.enable = true;
        # TODO: go gpg irssi jq keychain lsd
        noti.enable = true;
        # TODO: skim ssh taskwarrior vim qt gpg-agent hound keepassx nextcloud-client random-background stalonetray syncthing taskwarrior-sync xdg.configFile i3.config
        zathura.enable = true;
        # sioyek.enable = true;
        # taskwarrior.enable = true;
        # freetube.enable = true;
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
        config.common.default = "*";
      };
      sounds.enable = true;
    };

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
