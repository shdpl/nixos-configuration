{ config, pkgs, ... }:

{
	imports = [
		./hardware-configuration.nix
	];

	boot = {
		cleanTmpDir = true;
		loader = {
			grub = {
				enable = true;
				version = 2;
				device = "/dev/sdd";
			};
		};
		blacklistedKernelModules = [ "snd_hda_intel" ];
	};

	fileSystems =
	[
		{
			mountPoint = "/";
			label = "root";
			fsType = "ext4";
		}
		{
			mountPoint = "/home";
			label = "home";
			fsType = "btrfs";
		}
	];

	security.sudo =
	{
		enable = true;
		wheelNeedsPassword = false;
	};

	networking.hostName = "magdalene";

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
	};
	
	time.timeZone = "Etc/GMT+1";

	services.ntp = {
		enable = true;
		servers = [ "0.pl.pool.ntp.org" "1.pl.pool.ntp.org" "2.pl.pool.ntp.org" "3.pl.pool.ntp.org" ];
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
	};*/
  
	environment.systemPackages = with pkgs;
	[
		inkscape #krita
  
		#dmd rdmd
		#vagrant
		git subversion
		vim ctags dhex # bvim
		valgrind # d-feet
		screen
    
		chromium flashplayer
		thunderbird
		tkabber
    
		flac
		spotify vlc 
		lastwatch
		lingot
    
		keepassx
    
		unzip

		# oxygen-gtk2-1.3.4
		# kde-gtk-config
		dbus
		xdotool
		dmenu
		(haskellPackages.ghcWithPackagesOld (self : with self;[
			xmonad xmonadContrib xmonadExtras
		]))
	];
}
