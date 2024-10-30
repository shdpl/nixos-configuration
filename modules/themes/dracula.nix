{ config, pkgs, lib, ... }:

with lib;
let
  cfg = config.themes.dracula;

  background = "282a36";
  currentLine = "44475a";
  foreground = "f8f8f2";
  comment = "6272a4";
  cyan = "8be9fd";
  green = "50fa7b";
  orange = "ffb86c";
  pink = "ff79c6";
  purple = "bd93f9";
  red = "ff5555";
  yellow = "f1fa8c";
in
{
  options = {
    themes.dracula = {
      enable = mkEnableOption "";
      user = mkOption {
        type = with types; str;
      };
    };
  };
  config = mkIf cfg.enable {
    environment.systemPackages = [
      pkgs.dracula-icon-theme
      pkgs.dracula-theme
    ];
    home-manager.users.${cfg.user} = {
      programs = {
        autorandr = {
          enable = true;
          hooks = {
            postswitch = {
              "change-background" = "${pkgs.feh}/bin/feh --bg-fill ${pkgs.nixos-artwork.wallpapers.dracula}/share/backgrounds/nixos/nix-wallpaper-dracula.png";
            };
          };
        };
        fzf.colors = {
          "bg+" = "#${currentLine}";
          "fg+" = "#${foreground}";
          "hl+" = "#${purple}";
          bg = "#${background}";
          fg = "#${foreground}";
          header = "#${comment}";
          hl = "#${purple}";
          info = "#${orange}";
          marker = "#${pink}";
          pointer = "#${pink}";
          prompt = "#${green}";
          spinner = "#${orange}";
        };
        kitty.extraConfig =
          ''
            # https://draculatheme.com/kitty
            foreground            #f8f8f2
            background            #282a36
            selection_foreground  #ffffff
            selection_background  #44475a

            url_color #8be9fd

            # black
            color0  #21222c
            color8  #6272a4

            # red
            color1  #ff5555
            color9  #ff6e6e

            # green
            color2  #50fa7b
            color10 #69ff94

            # yellow
            color3  #f1fa8c
            color11 #ffffa5

            # blue
            color4  #bd93f9
            color12 #d6acff

            # magenta
            color5  #ff79c6
            color13 #ff92df

            # cyan
            color6  #8be9fd
            color14 #a4ffff

            # white
            color7  #f8f8f2
            color15 #ffffff

            # Cursor colors
            cursor            #f8f8f2
            cursor_text_color background

            # Tab bar colors
            active_tab_foreground   #282a36
            active_tab_background   #f8f8f2
            inactive_tab_foreground #282a36
            inactive_tab_background #6272a4

            # Marks
            mark1_foreground #282a36
            mark1_background #ff5555

            # Splits/Windows
            active_border_color #f8f8f2
            inactive_border_color #6272a4
          '';
        tmux.plugins = with pkgs.tmuxPlugins; [
          dracula
        ];
        zathura.extraConfig = ''
          set window-title-basename "true"
          set selection-clipboard "clipboard"

          # Dracula color theme for Zathura
          # Swaps Foreground for Background to get a light version if the user prefers

          #
          # Dracula color theme
          #

          set notification-error-bg       "#ff5555" # Red
          set notification-error-fg       "#f8f8f2" # Foreground
          set notification-warning-bg     "#ffb86c" # Orange
          set notification-warning-fg     "#44475a" # Selection
          set notification-bg             "#282a36" # Background
          set notification-fg             "#f8f8f2" # Foreground

          set completion-bg               "#282a36" # Background
          set completion-fg               "#6272a4" # Comment
          set completion-group-bg         "#282a36" # Background
          set completion-group-fg         "#6272a4" # Comment
          set completion-highlight-bg     "#44475a" # Selection
          set completion-highlight-fg     "#f8f8f2" # Foreground

          set index-bg                    "#282a36" # Background
          set index-fg                    "#f8f8f2" # Foreground
          set index-active-bg             "#44475a" # Current Line
          set index-active-fg             "#f8f8f2" # Foreground

          set inputbar-bg                 "#282a36" # Background
          set inputbar-fg                 "#f8f8f2" # Foreground
          set statusbar-bg                "#282a36" # Background
          set statusbar-fg                "#f8f8f2" # Foreground

          set highlight-color             "#ffb86c" # Orange
          set highlight-active-color      "#ff79c6" # Pink

          set default-bg                  "#282a36" # Background
          set default-fg                  "#f8f8f2" # Foreground

          set render-loading              true
          set render-loading-fg           "#282a36" # Background
          set render-loading-bg           "#f8f8f2" # Foreground

          #
          # Recolor mode settings
          #

          set recolor-lightcolor          "#282a36" # Background
          set recolor-darkcolor           "#f8f8f2" # Foreground

          #
          # Startup options
          #
          set adjust-open width
          set recolor true
        '';
        rofi.theme = "dracula";
      };
      xsession.windowManager.bspwm = {
        settings = {
          focused_border_color = "#${purple}";
          normal_border_color = "#${background}";
          active_border_color = "#${background}";
        };
      };
      services = {
        dunst.settings = {
          global = {
            font = "Source Code Pro for Powerline 8";
            markup = "yes";
            plain_text = "no";
            format = "<b>%s</b>\n%b";
            sort = "no";
            indicate_hidden = "yes";
            alignment = "center";
            bounce_freq = "0";
            show_age_threshold = "3";
            word_wrap = "yes";
            ignore_newline = "no";
            stack_duplicates = "yes";
            geometry = "450x50-0+18";
            shrink = "no";
            idle_threshold = "0";
            follow = "keyboard";
            sticky_history = "yes";
            history_length = "15";
            show_indicators = "no";
            padding = "1";
            # separator_color = "#668799";
            separator_color = "frame";
            dmenu = "/run/current-system/sw/bin/dmenu -p dunst";
            browser = "/run/current-system/sw/bin/firefox -new-tab";
            icon_position = "off";
            frame_width = "1";
            always_run_script = true;
          };
          urgency_low = {
            # frame_color = "#3b3b3b";
            frame_color = "#282a36";
            # foreground = "#989898";
            foreground = "#6272a4";
            # background = "#151515";
            background = "#282a36";
            timeout = 8;
          };
          urgency_normal = {
            # frame_color = "#3b3b3b";
            frame_color = "#282a36";
            # foreground = "#e8e8d3";
            foreground = "#bd93f9";
            # background = "#151515";
            background = "#282a36";
            timeout = 16;
          };
          urgency_critical = {
            # frame_color = "#3b3b3b";
            frame_color = "#282a36";
            # foreground = "#cf6a4c";
            foreground = "#f8f8f2";
            # background = "#151515";
            background = "#ff5555";
            timeout = 32;
          };
          shortcuts = {
            close = "ctrl+space";
            close_all = "ctrl+shift+space";
            history = "ctrl+grave";
            context = "ctrl+shift+period";
          };
          play_sound = {
            summary = "*";
            # script = true;
            # script = ../../data/dunst/notification.sh;
            # script = (builtins.toFile "notification.sh" (builtins.readFile ../../data/dunst/notification.sh));
            script = "/home/shd/.config/dunst/notification.sh";
          };
        };
        polybar = {
          config = {
            "bar/bottom" = {
              background = "#${background}";
              foreground = "#${foreground}";
              border-color = "#${background}";
            };
            "module/bspwm" = {
              label-focused-foreground = "#${pink}";
              label-occupied-foreground = "#${comment}";
              label-urgent-foreground = "#${red}";
              label-empty-foreground = "#${currentLine}";
              label-separator-foreground = "#${background}";
            };
            "module/cpu" = {
              format-foreground = "#${background}";
              format-background = "#${green}";
            };
            "module/time" = {
              format-foreground = "#${background}";
              format-background = "#${cyan}";
            };
            "module/date" = {
              format-foreground = "#${background}";
              format-background = "#${yellow}";
            };
            "module/memory" = {
              format-foreground = "#${background}";
              format-background = "#${cyan}";
            };
            "module/pulseaudio" = {
              format-volume-foreground = "#${background}";
              format-volume-background = "#${purple}";
              label-muted = "%{F#${red}}婢 %{F#${background}}muted";
              format-muted-foreground = "#${background}";
              format-muted-background = "#${red}";
            };
            "module/network" = {
              format-connected-foreground = "#${background}";
              format-connected-background = "#${purple}";
            };
          };
        };
      };
      xdg.configFile = {
        "fish/conf.d/theme.fish".text = ''
          # Dracula Color Palette
          set -l foreground f8f8f2
          set -l selection 44475a
          set -l comment 6272a4
          set -l red ff5555
          set -l orange ffb86c
          set -l yellow f1fa8c
          set -l green 50fa7b
          set -l purple bd93f9
          set -l cyan 8be9fd
          set -l pink ff79c6

          # Syntax Highlighting Colors
          set -gx fish_color_normal $foreground
          set -gx fish_color_command $cyan
          set -gx fish_color_keyword $pink
          set -gx fish_color_quote $yellow
          set -gx fish_color_redirection $foreground
          set -gx fish_color_end $orange
          set -gx fish_color_error $red
          set -gx fish_color_param $purple
          set -gx fish_color_comment $comment
          set -gx fish_color_selection --background=$selection
          set -gx fish_color_search_match --background=$selection
          set -gx fish_color_operator $green
          set -gx fish_color_escape $pink
          set -gx fish_color_autosuggestion $comment
          set -gx fish_color_cancel $red --reverse
          set -gx fish_color_option $orange

          # Default Prompt Colors
          set -gx fish_color_cwd $green
          set -gx fish_color_host $purple
          set -gx fish_color_host_remote $purple
          set -gx fish_color_user $cyan

          # Completion Pager Colors
          set -gx fish_pager_color_progress $comment
          set -gx fish_pager_color_background
          set -gx fish_pager_color_prefix $cyan
          set -gx fish_pager_color_completion $foreground
          set -gx fish_pager_color_description $comment
          set -gx fish_pager_color_selected_background --background=$selection
          set -gx fish_pager_color_selected_prefix $cyan
          set -gx fish_pager_color_selected_completion $foreground
          set -gx fish_pager_color_selected_description $comment
          set -gx fish_pager_color_secondary_background
          set -gx fish_pager_color_secondary_prefix $cyan
          set -gx fish_pager_color_secondary_completion $foreground
          set -gx fish_pager_color_secondary_description $comment
        '';
        "rofi/dracula.rasi".text = ''
          * {
              /* Dracula theme colour palette */
              drac-bgd: #282a36;
              drac-cur: #44475a;
              drac-fgd: #f8f8f2;
              drac-cmt: #6272a4;
              drac-cya: #8be9fd;
              drac-grn: #50fa7b;
              drac-ora: #ffb86c;
              drac-pnk: #ff79c6;
              drac-pur: #bd93f9;
              drac-red: #ff5555;
              drac-yel: #f1fa8c;

              font: "FiraCode Nerd Font Mono 13";

              foreground: @drac-fgd;
              background-color: @drac-bgd;
              active-background: @drac-pnk;
              urgent-foreground: @foreground;
              urgent-background: @drac-red;

              selected-background: @active-background;
              selected-urgent-background: @urgent-background;
              selected-active-background: @active-background;
              separatorcolor: @active-background;
              bordercolor: #6272a4;
          }

          #window {
              background-color: @background-color;
              border:           3;
              border-radius: 6;
              border-color: @bordercolor;
              padding:          5;
          }
          #mainbox {
              border:  0;
              padding: 5;
          }
          #message {
              border:       1px dash 0px 0px ;
              border-color: @separatorcolor;
              padding:      1px ;
          }
          #textbox {
              text-color: @foreground;
          }
          #listview {
              fixed-height: 0;
              border:       2px dash 0px 0px ;
              border-color: @bordercolor;
              spacing:      2px ;
              scrollbar:    false;
              padding:      2px 0px 0px ;
          }
          #element {
              border:  0;
              padding: 1px ;
          }
          #element.normal.normal {
              background-color: @background-color;
              text-color:       @foreground;
          }
          #element.normal.urgent {
              background-color: @urgent-background;
              text-color:       @urgent-foreground;
          }
          #element.normal.active {
              background-color: @active-background;
              text-color:       @background-color;
          }
          #element.selected.normal {
              background-color: @selected-background;
              text-color:       @foreground;
          }
          #element.selected.urgent {
              background-color: @selected-urgent-background;
              text-color:       @foreground;
          }
          #element.selected.active {
              background-color: @selected-active-background;
              text-color:       @background-color;
          }
          #element.alternate.normal {
              background-color: @background-color;
              text-color:       @foreground;
          }
          #element.alternate.urgent {
              background-color: @urgent-background;
              text-color:       @foreground;
          }
          #element.alternate.active {
              background-color: @active-background;
              text-color:       @foreground;
          }
          #scrollbar {
              width:        2px ;
              border:       0;
              handle-width: 8px ;
              padding:      0;
          }
          #sidebar {
              border:       2px dash 0px 0px ;
              border-color: @separatorcolor;
          }
          #button.selected {
              background-color: @selected-background;
              text-color:       @foreground;
          }
          #inputbar {
              spacing:    0;
              text-color: @foreground;
              padding:    1px ;
          }
          #case-indicator {
              spacing:    0;
              text-color: @foreground;
          }
          #entry {
              spacing:    0;
              text-color: @drac-cya;
          }
          #prompt {
              spacing:    0;
              text-color: @drac-grn;
          }
          #inputbar {
              children:   [ prompt,textbox-prompt-colon,entry,case-indicator ];
          }
          #textbox-prompt-colon {
              expand:     false;
              str:        ":";
              margin:     0px 0.3em 0em 0em ;
              text-color: @drac-grn;
          }
          element-text, element-icon {
              background-color: inherit;
              text-color: inherit;
          }
        '';
      };
      home.file.".config/qutebrowser/dracula" = {
        source = pkgs.fetchFromGitHub {
          owner = "dracula";
          repo = "qutebrowser-dracula-theme";
          rev = "master";
          sha256 = "sha256-BXTvYFZnzEDlNEOTaWm4m8MEelVrRsUkNdwYKxaxw/g=";
        };
      };
      programs.qutebrowser.extraConfig = ''
        import dracula.draw

        # Load existing settings made via :set
        config.load_autoconfig()

        dracula.draw.blood(c, {
          'spacing': {
            'vertical': 6,
            'horizontal': 8
          }
        })
      '';
    };
  };
}
