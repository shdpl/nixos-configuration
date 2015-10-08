{ config, pkgs, ... }:

let
	host = "ifr";
	domain = "nawia.net";
	fqdn = "${host}.${domain}";
	libeDomain = "libe.local";
in
{
	imports = [
		./hardware-configuration.nix
		../../config/wheel-is-root.nix
		../../config/pl.nix
		../../config/virtualbox.nix
		../../config/ssh.nix
		../../config/dns/ovh.nix
		../../config/workstation.nix
		../../config/data-sharing.nix
		../../config/common.nix
		../../config/graphics.nix
	];

	networking = {
		hostName = host;
		domain = domain;
		extraHosts = "127.0.0.1 ${libeDomain} lipro.${libeDomain} cms.${libeDomain} cmsapi.${libeDomain}";
		/*tcpcrypt.enable = true;*/
		firewall = {
			allowedTCPPorts = [ 22000 8080 ];
			allowedUDPPorts = [ 21025 ];
		};
		search = [ domain ];
	};

	hardware = {
		opengl.driSupport32Bit = true;
		pulseaudio.enable = true;
	};

	dns = {
		host = host;
		domain = domain;
		ddns = true;
	};

	workstation = {
		enable = true;
		xrandrHeads = [ "VGA-0" "HDMI-0" ];
		videoDrivers = [ "ati" ];
	};

	services = {
		dnsmasq = {
			enable = true;
			servers = [ "8.8.8.8" "8.8.4.4" ];
		};
		printing = {
			enable = true;
			drivers = [ ];
		};
	};

	environment.systemPackages = with pkgs;
	[
		gimp inkscape #krita
		imagemagick
		qrencode
		feh mupdf
		ranger
		enca

		oraclejdk7
		androidsdk_4_4
		libreoffice
		
		#openscad freecad
		#qgis openjump
  
		robomongo
		dmd rdmd
		php #idea.phpstorm
		nodejs
		leiningen
		vagrant
		git subversion
		ctags dhex bvi vbindiff
		meld
		jq xmlstarlet
		valgrind dfeet
		ltrace strace gdb
		screen reptyr
		aspellDicts.pl
		posix_man_pages
		bc
		ack

		nix-prefetch-scripts nix-repl nixpkgs-lint nox

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
		chromium firefox vimbWrapper #(w3m.override { graphicsSupport = true; })
		owncloudclient
		skype teamviewer

		hicolor_icon_theme
		lxappearance
		dbus libnotify
		xdotool wmctrl xclip scrot stalonetray #xev xmessage 
#		xfce4-notifyd
		dmenu gmrun
		i3status
		/*i3 i3lock*/

		/*keychain*/
		jmtpfs
		/*lgogdownloader*/
	];

}
