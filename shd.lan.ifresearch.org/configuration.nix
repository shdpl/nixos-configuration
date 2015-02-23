{ config, pkgs, ... }:

{

	imports = [
		./hardware-configuration.nix
		<nixos/modules/programs/virtualbox.nix>
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
		extraHosts = "192.168.56.4 control.atrium.shd.lan.ifresearch.org dev.atrium.shd.lan.ifresearch.org pp.atrium.shd.lan.ifresearch.org immo.shd.lan.ifresearch.org lipro.immo.shd.lan.ifresearch.org crm.immo.shd.lan.ifresearch.org ";
	};

	i18n =
	{
		consoleFont = "lat2-16";
		consoleKeyMap = "pl";
		defaultLocale = "pl_PL.UTF-8";
	};

	services.xserver = {
		enable = true;
		autorun = true;
		layout = "pl";
		windowManager.xmonad.enable = true;
		windowManager.default = "xmonad";
		desktopManager.default = "none";
		videoDrivers = [ "ati" ];
		xrandrHeads = [ "VGA-0" "HDMI-0" ];
	};

	hardware.opengl = {
		driSupport32Bit = true;		
	};
	
	time.timeZone = "Etc/GMT+1";

	services.ntp = {
		enable = true;
		servers = [ "0.pl.pool.ntp.org" "1.pl.pool.ntp.org" "2.pl.pool.ntp.org" "3.pl.pool.ntp.org" ];
	};

	environment.variables = {
		ATRIUM_ADMIN_EMAIL = "mariusz.gliwinski@ifresearch.org";
	};

	environment.shellInit = ''
export GTK_PATH=$GTK_PATH:${pkgs.oxygen_gtk}/lib/gtk-2.0
export GTK2_RC_FILES=$GTK2_RC_FILES:${pkgs.oxygen_gtk}/share/themes/oxygen-gtk/gtk-2.0/gtkrc
'';
  
	environment.systemPackages = with pkgs;
	[
#		robomongo
		psmisc tree which
		inkscape #krita

		oraclejdk7
		libreoffice
  
		#dmd rdmd
		vagrant
		git subversion
		vim ctags dhex # bvim
#		ideas
#		virtualbox virtualboxGuestAdditions
		which
		valgrind # d-feet
		screen
    
		chromium #flashplayer adobe-reader
		thunderbird
		tkabber
    
		flac
#		spotify
		vlc 
		lastwatch
		lingot
    
		keepassx
    
		unzip

# oxygen-gtk2-1.3.4
# kde-gtk-config
		lxappearance
		dbus
		xdotool wmctrl
		dmenu gmrun
		(haskellPackages.ghcWithPackagesOld (self : with self;[
			xmonad xmonadContrib xmonadExtras
		]))
	];
	nixpkgs.config = {
		allowUnfree = true;
		chromium.enablePepperFlash = true;
		chromium.enablePepperPDF = true;
	};
  
}
