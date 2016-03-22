{ config, pkgs, lib, ... }:

let
	cfg = config.common;
	wireshark = ( if config.services.xserver.enable then pkgs.wireshark else pkgs.wireshark-cli );
	noXLibs = !config.services.xserver.enable;
	nixpkgsPath = "/home/shd/src/nixpkgs";
in

with lib;

{
  security.pki.certificateFiles = [
    /*../private/ca/mail.nawia.net.crt*/
  ];
	boot.cleanTmpDir = true;
	services = {
		ntp = {
			enable = true;
			servers = [ "0.pl.pool.ntp.org" "1.pl.pool.ntp.org" "2.pl.pool.ntp.org" "3.pl.pool.ntp.org" ];
		};
	};
	networking.firewall.logRefusedConnections = false;
	environment = {
		noXlibs = noXLibs;
		variables = {
			EDITOR = "vim";
			TERMINAL = "terminology";
			BROWSER = "chromium";
			NIXPKGS = nixpkgsPath;
			NIXPKGS_ALLOW_UNFREE = "1";
		};
		systemPackages = with pkgs;
		[
			vim
			irssi w3m
			screen reptyr
			aspellDicts.pl
			manpages posix_man_pages

			p7zip

			atop file dmidecode pciutils iftop
			mosh netrw lftp
			mmv
			psmisc tree which ncdu
			mtr mutt
			
			nmap wireshark curl aria2 socat
			nixops
			git
		];
	};
	nix = {
		gc = {
			automatic = true;
			dates = "04:00";
		};
		nixPath = [
			"/var/nix/profiles/per-user/root/channels/nixos"
			"nixos-config=/home/shd/src/nixos-configuration/configurations/magdalene.nix"
			"nixpkgs=${nixpkgsPath}"
			"/nix/var/nix/profiles/per-user/root/channels"
		];
	};
	programs.bash = {
		enableCompletion = true;
		shellAliases = {
			l = "ls -alh";
			ll = "ls -l";
			ls = "ls --color=tty";
			restart = "systemctl restart";
			start = "systemctl start";
			status = "systemctl status";
			stop = "systemctl stop";
			which = "type -P";
			grep = "grep --color=auto";
		};
		#    shellInit = "set -o vi";
	};
	nixpkgs.config = {
		allowUnfree = true;
		vimb = {
			/*enableAdobeFlash = true;*/
		};
		chromium = {
			enableWideVine = true;
			enablePepperFlash = true;
			enablePepperPDF = true;
		};
	};
	/*time.hardwareClockInLocalTime = true;*/
	/*system.autoUpgrade = {*/
	/*	enable = true;*/
	/*	channel = https://nixos.org/channels/nixos-unstable;*/
	/*};*/
}
