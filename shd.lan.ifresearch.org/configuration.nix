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
		extraHosts = "192.168.56.4 control.atrium.shd.lan.ifresearch.org dev.atrium.shd.lan.ifresearch.org pp.atrium.shd.lan.ifresearch.org";
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

  
	environment.systemPackages = with pkgs;
	[
		psmisc tree which
		inkscape #krita

		oraclejdk7
  
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
		xdotool
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
