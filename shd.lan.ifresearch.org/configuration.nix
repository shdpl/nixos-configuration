{ config, pkgs, ... }:

{

	imports = [
		./hardware-configuration.nix
#		<nixos/modules/programs/virtualbox.nix>
	];


	security.sudo =
	{
		enable = true;
		wheelNeedsPassword = false;
	};

	networking = {
		hostName = "shd";
		domain = "lan.ifresearch.org";
		nameservers = [ "8.8.8.8" ];
		extraHosts = "10.10.5.42 control.atrium.shd.lan.ifresearch.org dev.atrium.shd.lan.ifresearch.org pp.atrium.shd.lan.ifresearch.org immo.shd.lan.ifresearch.org lipro.immo.shd.lan.ifresearch.org cms.immo.shd.lan.ifresearch.org ";
	};

	i18n =
	{
		consoleFont = "lat2-16";
		consoleKeyMap = "pl";
		defaultLocale = "pl_PL.UTF-8";
	};

	hardware.opengl = {
		driSupport32Bit = true;		
	};
	
	time.timeZone = "Europe/Warsaw";

	services = {
		virtualboxHost.enable = true;
		xserver = {
			enable = true;
			autorun = true;
			layout = "pl";
			windowManager.xmonad.enable = true;
			windowManager.default = "xmonad";
			desktopManager.default = "none";
			videoDrivers = [ "ati" ];
			xrandrHeads = [ "VGA-0" "HDMI-0" ];
		};
		ntp = {
			enable = true;
			servers = [ "0.pl.pool.ntp.org" "1.pl.pool.ntp.org" "2.pl.pool.ntp.org" "3.pl.pool.ntp.org" ];
		};
	};

	environment.variables = {
		ATRIUM_ADMIN_EMAIL = "mariusz.gliwinski@ifresearch.org";
		EDITOR = "vim";
	};

	environment.shellInit = ''
export GTK_PATH=$GTK_PATH:${pkgs.oxygen_gtk}/lib/gtk-2.0
export GTK2_RC_FILES=$GTK2_RC_FILES:${pkgs.oxygen_gtk}/share/themes/oxygen-gtk/gtk-2.0/gtkrc
'';
  
	environment.systemPackages = with pkgs;
	[
		robomongo
		/*terminology*/
		psmisc tree which
		gimp inkscape /*krita*/
		/*ImageMagick*/
		qrencode
		feh mupdf

		oraclejdk7
		libreoffice
  
		dmd rdmd
		php /*phpstorm*/
		leiningen
		vagrant
		git subversion
		vim ctags dhex bvi
		jq xmlstarlet
		which
		valgrind dfeet
		screen
    
		nmap wireshark curl aria2
		chromium firefox vimbWrapper
		thunderbird
    
		flac
		spotify
		vlc 
		lastwatch
		lingot
    
		keepassx
    
		unzip zip

		hicolor_icon_theme
		lxappearance
		dbus libnotify
		xdotool wmctrl xclip scrot stalonetray #xev xmessage 
#		xfce4-notifyd
		dmenu gmrun
		(haskellPackages.ghcWithPackagesOld (self : with self;[
			xmonad xmonadContrib xmonadExtras
		]))
	];

	programs.bash.enableCompletion = true;

	nixpkgs.config = {
		allowUnfree = true;
		chromium.enablePepperFlash = true;
		chromium.enablePepperPDF = true;
	};
  
}
