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
		extraHosts = "127.0.0.1 libe.local lipro.libe.local cms.libe.local cmsapi.libe.local";
		/*tcpcrypt.enable = true;*/
		firewall = {
			allowedTCPPorts = [ 22000 ];
			allowedUDPPorts = [ 21025 ];
		};
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
		pulseaudio.enable = true;
	};

	
	time.timeZone = "Europe/Warsaw";

	virtualisation.virtualbox = {
		host.enable = true;
		guest.enable = true;
	};

	services = {
		dnsmasq = {
			enable = true;
			servers = [ "8.8.8.8" "8.8.4.4" ];
		};
		xserver = {
			enable = true;
			autorun = true;
			layout = "pl";
			windowManager = {
				xmonad.enable = true;
				default = "xmonad";
			};
			desktopManager.default = "none";
			videoDrivers = [ "ati" ];
			xrandrHeads = [ "VGA-0" "HDMI-0" ];
		};
		ntp = {
			enable = true;
			servers = [ "0.pl.pool.ntp.org" "1.pl.pool.ntp.org" "2.pl.pool.ntp.org" "3.pl.pool.ntp.org" ];
		};
		xinetd = {
			enable = true;
			services = [
				{
					name = "elasticsearch";
					port = 9200;
					user = "elasticsearch";
					unlisted = true;
					server = "/var/run/current-system/sw/bin/ssh";
					serverArgs = "-q -T -i /var/lib/syncthing/root/data/home/elasticsearch/.ssh/id_rsa elasticsearch-tunnel@daenerys.nawia.net";
				}
				{
					name = "kibana";
					port = 9292;
					user = "kibana";
					unlisted = true;
					server = "/var/run/current-system/sw/bin/ssh";
					serverArgs = "-q -T -i /var/lib/syncthing/root/data/home/kibana/.ssh/id_rsa kibana-tunnel@daenerys.nawia.net";
				}
				{
					name = "syncthing-client";
					port = 8081;
					user = "syncthing-client";
					unlisted = true;
					server = "/var/run/current-system/sw/bin/ssh";
					serverArgs = "-q -T -i /var/lib/syncthing/root/data/home/syncthing/.ssh/id_rsa syncthing-tunnel@daenerys.nawia.net";
				}
				{
					name = "ntopng";
					port = 3000;
					user = "ntopng";
					unlisted = true;
					server = "/var/run/current-system/sw/bin/ssh";
					serverArgs = "-q -T -i /var/lib/syncthing/root/data/home/ntopng/.ssh/id_rsa ntopng-tunnel@daenerys.nawia.net";
				}
			];
		};
		/*syncthing = {*/
		/*	enable = true;*/
		/*	user = "shd";*/
		/*};*/
	};

	environment = {
		variables = {
			ATRIUM_ADMIN_EMAIL = "mariusz.gliwinski@ifresearch.org";
			EDITOR = "vim";
			BROWSER = "chromium";
			NIXPKGS = "/home/shd/src/nixpkgs";
		};
		shellAliases = {
			logstash = "ssh -f -L 9292:localhost:9292 -L 9200:5.39.79.8:9200 daenerys.nawia.net -N && xdg-open 'http://localhost:9292'";
			ntop = "ssh -f -L 3000:localhost:3000 daenerys.nawia.net -N && xdg-open 'http://localhost:3000'";
			syncthing = "ssh -f -L 8282:localhost:8282 daenerys.nawia.net -N && xdg-open 'http://localhost:8282'";
		};
	};

	users.extraUsers = {
		elasticsearch = {
			home = "/var/lib/syncthing/root/data/home/elasticsearch";
		};
		kibana = {
			home = "/var/lib/syncthing/root/data/home/kibana";
		};
		syncthing-client = {
			home = "/var/lib/syncthing/root/data/home/syncthing";
		};
		ntopng = {
			home = "/var/lib/syncthing/root/data/home/ntopng";
		};
	};

/*	environment.shellInit = ''*/
/*export GTK_PATH=$GTK_PATH:${pkgs.oxygen_gtk}/lib/gtk-2.0*/
/*export GTK2_RC_FILES=$GTK2_RC_FILES:${pkgs.oxygen_gtk}/share/themes/oxygen-gtk/gtk-2.0/gtkrc*/
/*'';*/
/*  */
	environment.systemPackages = with pkgs;
	[
		/*terminology*/
		gimp inkscape /*krita*/
		imagemagick
		qrencode
		feh mupdf

		oraclejdk7
		androidsdk_4_4
		libreoffice
		
		openscad
		freecad
  
		robomongo
		dmd rdmd
		php /*phpstorm*/
		leiningen
		vagrant
		git subversion
		vim ctags dhex bvi vbindiff
		meld
		jq xmlstarlet
		valgrind dfeet
		ltrace strace gdb
		screen reptyr
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
		chromium firefox vimbWrapper w3m.override { graphicsSupport = true; }
		owncloudclient
		skype

		hicolor_icon_theme
		lxappearance
		dbus libnotify
		xdotool wmctrl xclip scrot stalonetray #xev xmessage 
#		xfce4-notifyd
		dmenu gmrun
		/*(haskellPackages.ghcWithPackagesOld (self : with self;[*/
		/*	xmonad xmonadContrib xmonadExtras*/
		/*]))*/
		/*i3 i3lock*/

		/*keychain*/
		jmtpfs
	];

	boot.kernelPackages = pkgs.linuxPackages // {
		virtualbox = pkgs.linuxPackages.virtualbox.override {
			enableExtensionPack = true;
		};
	};

	programs.bash.enableCompletion = true;

	nixpkgs.config = {
		allowUnfree = true;
		/*chromium.enablePepperFlash = true;*/
		/*chromium.enablePepperPDF = true;*/
		virtualbox.enableExtensionPack = true;
	};
  
}
