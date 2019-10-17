{
	name = "shd";
  email = "shd@nawia.net";
  fullName = "Mariusz `shd` Gliwiński";
	groups = [ "wheel" "docker" "systemd-journal" "vboxusers" "wireshark" "libvirtd" "adbusers" "video" "disk" ];
	pubkey = (builtins.readFile ../data/ssh/id_ed25519.pub);
  services = {
    workstation = {
      dunst = {
        enable = true;
        settings = {
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
            separator_color = "#668799";
            dmenu = "/run/current-system/sw/bin/dmenu -p dunst";
            browser = "/run/current-system/sw/bin/firefox -new-tab";
            icon_position = "off";
            frame_width = "1";
            always_run_script = true;
          };
          urgency_low = {
            frame_color = "#3b3b3b";
            foreground = "#989898";
            background = "#151515";
            timeout = 8;
          };
          urgency_normal = {
            frame_color = "#3b3b3b";
            foreground = "#e8e8d3";
            background = "#151515";
            timeout = 16;
          };
          urgency_critical = {
            frame_color = "#3b3b3b";
            foreground = "#cf6a4c";
            background = "#151515";
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
            script = true;
            # script = ../data/dunst/notification.sh;
            # script = (builtins.toFile "bitcoin.conf" (builtins.readFile ../private/bitcoin.conf))
          };
        };
      };
    };
  };
  home = {
    programming = {
			".maven/maven-color.bash".source = ../data/maven/maven-color.bash;
    };
    work = {
      livewyer = {
        ".config/kube/rb-atp-nonlive.yaml".source = ../private/kube/rb-atp-nonlive.yaml;
        ".config/kube/k8s-1-13-5-do-0-lon1-1553717378409-kubeconfig.yaml".source = ../private/kube/k8s-1-13-5-do-0-lon1-1553717378409-kubeconfig.yaml;
        ".kube/config".source = ../private/kube/leaseweb.conf;
        ".ssh/ssh_private_key_charlie.pem".source = ../private/ssh/ssh_private_key_charlie.pem;
        ".ssh/livewyer_nfs.pem".source = ../private/ssh/livewyer_nfs.pem;
      };
    };
    workstation = {
			".config/terminology/config/standard/base.cfg".source = ../data/terminology/config/standard/base.cfg;

			".config/i3/config".source = ../data/i3/config;
			".config/i3status/config".source = ../data/i3status/config;

			/*".vimperatorrc" = {
				text = (builtins.readFile ../data/vimperator/.vimperatorrc);
			};
			".vimperator/colors" = {
				source = pkgs.fetchFromGitHub {
					owner = "vimpr";
					repo = "vimperator-colors";
					rev = "e4e7809d332c53b4c26d5f8e8b396e6b9d2fcd03";
					sha256 = "0c83dliy842vlyjqsmcgm7592jkvlf3maim9xznkw3196qinv3yk";
				} + "desert.vimp";
			};*/

			".config/vimb/config".source = ../data/vimb/config;

      ".config/dunst/notification.sh".source = ../data/dunst/notification.sh;
      ".config/dunst/notification.wav".source = ../data/dunst/notification.wav;
    };
    common = (import ../private/gnupg/files.nix) // {
      ".vim/bundle/snipmate/snippets/autoit.snippets".source = ../data/snipmate/snippets/autoit.snippets;
      ".vim/bundle/snipmate/snippets/cpp.snippets".source = ../data/snipmate/snippets/cpp.snippets;
      ".vim/bundle/snipmate/snippets/c.snippets".source = ../data/snipmate/snippets/c.snippets;
      ".vim/bundle/snipmate/snippets/d.snippets".source = ../data/snipmate/snippets/d.snippets;
      ".vim/bundle/snipmate/snippets/erlang.snippets".source = ../data/snipmate/snippets/erlang.snippets;
      ".vim/bundle/snipmate/snippets/html.snippets".source = ../data/snipmate/snippets/html.snippets;
      ".vim/bundle/snipmate/snippets/javascript.snippets".source = ../data/snipmate/snippets/javascript.snippets;
      ".vim/bundle/snipmate/snippets/java.snippets".source = ../data/snipmate/snippets/java.snippets;
      ".vim/bundle/snipmate/snippets/objc.snippets".source = ../data/snipmate/snippets/objc.snippets;
      ".vim/bundle/snipmate/snippets/perl.snippets".source = ../data/snipmate/snippets/perl.snippets;
      ".vim/bundle/snipmate/snippets/php.snippets".source = ../data/snipmate/snippets/php.snippets;
      ".vim/bundle/snipmate/snippets/python.snippets".source = ../data/snipmate/snippets/python.snippets;
      ".vim/bundle/snipmate/snippets/ruby.snippets".source = ../data/snipmate/snippets/ruby.snippets;
      ".vim/bundle/snipmate/snippets/sh.snippets".source = ../data/snipmate/snippets/sh.snippets;
      ".vim/bundle/snipmate/snippets/_.snippets".source = ../data/snipmate/snippets/_.snippets;
      ".vim/bundle/snipmate/snippets/snippet.snippets".source = ../data/snipmate/snippets/snippet.snippets;
      ".vim/bundle/snipmate/snippets/tcl.snippets".source = ../data/snipmate/snippets/tcl.snippets;
      ".vim/bundle/snipmate/snippets/tex.snippets".source = ../data/snipmate/snippets/tex.snippets;
      ".vim/bundle/snipmate/snippets/vim.snippets".source = ../data/snipmate/snippets/vim.snippets;
      ".vim/bundle/snipmate/snippets/zsh.snippets".source = ../data/snipmate/snippets/zsh.snippets;

			".gatehub/gatehub_recovery_key.txt".source = ../private/gatehub/gatehub_recovery_key.txt;

      /*
			".keepass/pwsafe.key".source = ../private/keepass/pwsafe.key;
			".keepass/db.kdbx".source = ../private/keepass/db.kdbx;
			".keepass/Database.kdb".source = ../private/keepass/Database.kdb;
      */

			".muttrc".source = ../data/mutt/muttrc;
			".mutt/mailcap".source = ../data/mutt/mailcap;

			".ssd/journalling".source = ../data/ssd/journalling;
			".ssd/scheduler".source = ../data/ssd/scheduler;
			".ssd/trim".source = ../data/ssd/trim;

			".ssh/config".source = ../data/ssh/config;
			".ssh/authorized_keys".source = ../data/ssh/authorized_keys;
			".ssh/id_rsa_sv_hack.pub".source = ../data/ssh/id_rsa_sv_hack.pub;
			".ssh/cloudebmsplatformsaapoc.pem".source = ../private/ssh/cloudebmsplatformsaapoc.pem;
			".ssh/id_rsa_leaseweb".source = ../private/ssh/id_rsa_leaseweb;
			".ssh/ian.key".source = ../private/ssh/ian.key;
			".ssh/id_newshack_rsa".source = ../private/ssh/id_newshack_rsa;
			# ".ssh/id_rsa".source = ../private/ssh/id_rsa;
			# ".ssh/id_rsa.pub".source = ../data/ssh/id_rsa.pub;
			".ssh/id_ed25519".source = ../private/ssh/id_ed25519;
			".ssh/id_ed25519.pub".source = ../data/ssh/id_ed25519.pub;
			".ssh/id_sv_protractor_rsa".source = ../private/ssh/id_sv_protractor_rsa;
			".ssh/Mariusz.asc".source = ../private/ssh/Mariusz.asc;
			".ssh/private.ppk".source = ../private/ssh/private.ppk;
    };
  };
  xresources.properties = {
    "xterm*termName" = "xterm-256color";
    "XTerm*locale" = "true";
    "XTerm*metaSendsEscape" = "true";
    "Xterm*saveLines" = "4096";

    "x11-ssh-askpass*font" = "-*-dina-medium-r-*-*-12-*-*-*-*-*-*-*";
    "x11-ssh-askpass*background" = "#000000";
    "x11-ssh-askpass*foreground" = "#ffffff";
    "x11-ssh-askpass.Button*background" = "#000000";
    "x11-ssh-askpass.Indicator*foreground" = "#ff9900";
    "x11-ssh-askpass.Indicator*background" = "#090909";
    "x11-ssh-askpass*topShadowColor" = "#000000";
    "x11-ssh-askpass*bottomShadowColor" = "#000000";
    "x11-ssh-askpass.*borderWidth" = "1";

    "Xcursor.theme" = "Vanilla-DMZ-AA";
    "Xcursor.size" = "22";

    "xterm*VT100.geometry" = "80x25";
    "xterm*faceName" = "Terminus:style=Regular:size=10";
    "!xterm*font" = "-*-dina-medium-r-*-*-16-*-*-*-*-*-*-*";
    "xterm*dynamicColors" = "true";
    "xterm*utf8" = "2";
    "xterm*eightBitInput" = "true";
    "xterm*saveLines" = "512";
    "xterm*scrollKey" = "true";
    "xterm*scrollTtyOutput" = "false";
    "xterm*scrollBar" = "false";
    "xterm*rightScrollBar" = "false";
    "xterm*jumpScroll" = "false";
    "xterm*multiScroll" = "false";
    "xterm*toolBar" = "false";

    "rofi.color-enabled" = "true";
    "rofi.color-normal" = "argb:00000000, #1aa, argb:11FFFFFF, #1aa,#333";
    "rofi.color-urgent" = "argb:00000000, #f99, argb:11FFFFFF, #f99,#333";
    "rofi.color-active" = "argb:00000000, #aa1, argb:11FFFFFF, #aa1,#333";
    "rofi.color-window" = "argb:ee333333, #1aa,#1aa";
    "rofi.separator-style" = "dash";

    "*xterm*background" = "#1B1D1E";
    "*xterm*foreground" = "#CCCCCC";
    "*xterm*cursorColor" = "#d0d0d0";
    "*xterm*color0" = "#1B1D1E";
    "*xterm*color8" = "#646767";
    "*xterm*color1" = "#F92673";
    "*xterm*color9" = "#FF5996";
    "*xterm*color2" = "#86B413";
    "*xterm*color10" = "#B8E354";
    "*xterm*color3" = "#FDB436";
    "*xterm*color11" = "#FEED6A";
    "*xterm*color4" = "#55C5D6";
    "*xterm*color12" = "#8CEEFF";
    "*xterm*color5" = "#8952FE";
    "*xterm*color13" = "#9C6EFE";
    "*xterm*color6" = "#465457";
    "*xterm*color14" = "#899CA1";
    "*xterm*color7" = "#CCCCC7";
    "*xterm*color15" = "#FFFFFF";
  };
}
