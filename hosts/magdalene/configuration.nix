{ config, pkgs, ... }:

{
	imports = [
		./hardware-configuration.nix
	];

	security.sudo =
	{
		enable = true;
		wheelNeedsPassword = false;
		extraConfig = "Defaults:root,%wheel env_keep+=EDITOR";
	};

	networking = {
		hostName = "magdalene";
		search = [ "nawia.net" ];
		firewall.enable = false;
	};

	i18n =
	{
		consoleFont = "lat2-16";
		consoleKeyMap = "pl";
		defaultLocale = "pl_PL.UTF-8";
	};

	hardware = {
		opengl.driSupport32Bit = true;
#		pulseaudio.enable = true;
	};

	boot.loader.grub.memtest86.enable = true;

	time.timeZone = "Europe/Warsaw";

	services = {
		/*mopidy = {*/
		/*	enable = true;*/
		/*	configuration = builtins.readFile ./mopidy/mopidy.conf;*/
		/*	extensionPackages = [*/
		/*		pkgs.mopidy-spotify*/
		/*		pkgs.mopidy-moped*/
		/*		pkgs.mopidy-mopify*/
		/*	];*/
		/*};*/
		mysql = {
			enable = true;
			package = pkgs.mysql;
		};
		syncthing = {
			enable = true;
			user = "shd";
		};
		xserver = {
			enable = true;
#			autorun = true;
			layout = "pl";
			windowManager = {
				i3.enable = true;
				default = "i3";
			};
			desktopManager = {
			/*	kde4.enable = true;*/
				default = "none";
			};
			displayManager.auto = {
				enable = true;
				user = "shd";
			};
			videoDrivers = [ "ati" ];
		};
		ntp = {
			enable = true;
			servers = [ "0.pl.pool.ntp.org" "1.pl.pool.ntp.org" "2.pl.pool.ntp.org" "3.pl.pool.ntp.org" ];
		};
	};

	users.extraUsers = {
		shd = {
			extraGroups = [ "wheel" ];
			isNormalUser = true;
			openssh.authorizedKeys.keys = [ "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAIEAmNhcSbjZB3BazDbmmtqPCDzVd+GQBJI8WAoZNFkveBGC0zznUCdd78rrjke5sDRBVCIqKABCx5iwU4VM1zVWZfWlsf6HEbhyUVdWmKgylG7Mchg2dkJUfTHx/VLnE1gDqc1+9SSs88q6H+IO4Kex853Q7eUo9Cmsi8TUn9rthME=" ];
		};
	};

	nixpkgs.config = {
		allowUnfree = true;

		vimb = {
			enableAdobeFlash = true;
			/*enableMPlayer = true;*/
			/*enableGeckoMediaPlayer = true;*/
		};
		/*firefox = {*/
		/*	enableAdobeFlash = true;*/
		/*};*/
    packageOverrides = pkgs: {
      libbluray = pkgs.libbluray.override { withAACS = true; };
    };
	};
  
	environment = {
		variables = {
			EDITOR="vim";
			TERMINAL="terminology";
			NIXPKGS="/home/shd/src/nixpkgs";
		};
		systemPackages = with pkgs;
		[
			e19.terminology
			ranger
			gimp inkscape #krita
			imagemagick
			qrencode
			feh zathura #zathuraCollection

#			oraclejdk7
#			libreoffice
		
#			robomongo
			dmd rdmd
#			php phpstorm
#			leiningen
#			vagrant
			git subversion
			vim_configurable ctags dhex bvi vbindiff
			meld
			jq xmlstarlet
			valgrind dfeet
			ltrace strace gdb
			screen
			aspellDicts.pl
			manpages
			posix_man_pages
			bc

			nix-prefetch-scripts nix-repl nixpkgs-lint

			sox lame flac
			vlc
			lastwatch
			lingot
			
			keepassx2
			owncloudclient
			
			p7zip

			atop file dmidecode
			mosh netrw lftp
			mmv
			psmisc tree which ncdu
			mtr mutt
			google_talk_plugin

			nmap wireshark curl aria2 socat
#vimbWrapper
chromium
/*firefoxWrapper*/
#dwbWrapper
jumanji

			skype
      steam
      teamspeak_client spotify
			wineStable
			/*(wine.override {*/
			/* wineRelease = "staging";*/
			/* wineBuild = "wineWow";*/
			/*})*/

			hicolor_icon_theme
			lxappearance
			dbus dunst libnotify
			xdotool wmctrl xclip scrot stalonetray xorg.xwininfo linuxPackages.seturgent
			dmenu gmrun
			i3status
		];
	};

	programs.bash = {
    enableCompletion = true;
    shellAliases = {
      l = "ls -alh";
      ll = "ls -l";
      ls = "ls --color=tty";
      restart = "systemctl restart";
      start = "systemctl start";
      status = "systemctl status";
      stop = "systemctl stop";
      which = "type -P";
      grep = "grep --color=auto";
    };
    shellInit = "set -o vi";
  };
}
