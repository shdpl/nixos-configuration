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

	time.timeZone = "Europe/Warsaw";

	services = {
		xserver = {
			enable = true;
#			autorun = true;
			layout = "pl";
			windowManager = {
				i3.enable = true;
				default = "i3";
			};
			desktopManager.default = "none";
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
  
	environment = {
		variables.EDITOR="vim";
		systemPackages = with pkgs;
		[
			#terminology
			gimp inkscape #krita
			imagemagick
			qrencode
			feh mupdf

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
			posix_man_pages
			bc

			nix-prefetch-scripts nix-repl nixpkgs-lint

			flac
			spotify
			vlc 
			lastwatch
			lingot
			
			keepassx
			
			p7zip

			atop file
			mosh netrw
			mmv
			psmisc tree which ncdu
			mtr mutt

			nmap wireshark curl aria2 socat
			chromium firefox vimbWrapper
			skype

			hicolor_icon_theme
			lxappearance
			dbus libnotify
			xdotool wmctrl xclip scrot stalonetray
			dmenu gmrun
		];
	};

	programs.bash.enableCompletion = true;

	nixpkgs.config.allowUnfree = true;
}
