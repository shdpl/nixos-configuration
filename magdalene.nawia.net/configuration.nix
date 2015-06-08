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
		mopidy = {
			enable = true;
			configuration = builtins.readFile ./mopidy/mopidy.conf;
			extensionPackages = [
				pkgs.mopidy-spotify
				pkgs.mopidy-moped
				/*pkgs.mopidy-mopify*/
			];
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
		firefox = {
			enableAdobeFlash = true;
		};
	};
  
	environment = {
		variables = {
			EDITOR="vim";
			TERMINAL="terminology";
		};
		systemPackages = with pkgs;
		[
			e19.terminology
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
			vim ctags dhex bvi vbindiff
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

			flac
			vlc
			lastwatch
			lingot
			
			keepassx2
			owncloudclient
			
			p7zip

			atop file
			mosh netrw
			mmv
			psmisc tree which ncdu
			mtr mutt
			google_talk_plugin

			nmap wireshark curl aria2 socat
vimbWrapper
#chromium
firefoxWrapper
#dwbWrapper
#jumanji

			skype steam teamspeak_client #spotify
			wineUnstable

			hicolor_icon_theme
			lxappearance
			dbus dunst libnotify
			xdotool wmctrl xclip scrot stalonetray xorg.xwininfo linuxPackages.seturgent linuxPackages.ati_drivers_x11
			dmenu gmrun
			i3status
		];
	};

	programs.bash.enableCompletion = true;
}
