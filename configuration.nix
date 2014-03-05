{ config, pkgs, ... }:

{
  imports = [
    ./hardware-configuration.nix
  ];

	boot = {
		loader = {
			grub = {
				enable = true;
				version = 2;
				device = "/dev/sda";
			};
		};
		cleanTmpDir = true;
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
  
  /*
  hardware.pulseaudio = {
    enable = true;
    systemWide = true;
  };
  */
  
	environment.systemPackages = with pkgs;
	[
		# todo: set default alsa card (2)
		# dbus pulseaudio
  
		git subversion
		vim ctags # bvim
		screen
    
		chromium
		thunderbird
    
		flac
		spotify vlc 
		lastwatch
		lingot
    
		keepassx
    
		unzip

		xdotool
		dmenu
		(haskellPackages.ghcWithPackagesOld (self : with self;[
			xmonad xmonadContrib xmonadExtras
		]))
	];
}
