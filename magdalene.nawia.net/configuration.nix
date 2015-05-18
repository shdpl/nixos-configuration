{ config, pkgs, ... }:

{
	imports = [
		./hardware-configuration.nix
	];

	security.sudo =
	{
		enable = true;
		wheelNeedsPassword = false;
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


/*
# http://rs20.mine.nu/w/2011/07/gmail-as-relay-host-in-postfix/
	services.postfix = {
		enable = true;
		setSendmail = true;
		extraConfig = ''
relayhost=[smtp.gmail.com]:587
smtp_use_tls=yes
smtl_tls_CAfile=/etc/ssl/certs/ca-bundle.crt
smtp_sasl_auth_enable=yes
smtp_sasl_password_maps=hash:/etc/postfix.local/sasl_passwd
smtp_sasl_security_options=noanonymous
'';
	};
*/
  
	environment.systemPackages = with pkgs;
	[
		#terminology
		gimp inkscape #krita
		imagemagick
		qrencode
		feh mupdf

#		oraclejdk7
#		libreoffice
  
#		robomongo
		dmd rdmd
#		php phpstorm
#		leiningen
#		vagrant
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

		(haskellPackages.ghcWithPackagesOld (self : with self;[
			xmonad xmonadContrib xmonadExtras
		]))
	];

	programs.bash.enableCompletion = true;

	nixpkgs.config.allowUnfree = true;
}
