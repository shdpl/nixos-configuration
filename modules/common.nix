{ config, pkgs, lib, ... }:

let
	cfg = config.common;
	wireshark = ( if config.services.xserver.enable then pkgs.wireshark else pkgs.wireshark-cli );
in

with lib;

{
	imports = [
		../user/default.nix
	];
	user.shd.enable = true;

	boot.cleanTmpDir = true;
	services = {
		ntp = {
			enable = true;
			servers = [ "0.pl.pool.ntp.org" "1.pl.pool.ntp.org" "2.pl.pool.ntp.org" "3.pl.pool.ntp.org" ];
		};
	};
	environment = {
		variables = {
			EDITOR = "vim";
			TERMINAL = "terminology";
			BROWSER = "chromium";
			NIXPKGS = "/home/shd/src/nixpkgs";
			NIXPKGS_ALLOW_UNFREE = "1";
		};
		systemPackages = with pkgs;
		[
			vim_configurable
			screen reptyr
			aspellDicts.pl
			manpages posix_man_pages

			p7zip

			atop file dmidecode
			mosh netrw lftp
			mmv
			psmisc tree which ncdu
			mtr mutt
			
			nmap wireshark curl aria2 socat
		];
	};
	nix.gc = {
		automatic = true;
		dates = "04:00";
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
			enableAdobeFlash = true;
		};
		chromium = {
			enableWideVine = true;
			enablePepperFlash = true;
			enablePepperPDF = true;
		};
	};
	/*system.autoUpgrade = {*/
	/*	enable = true;*/
	/*	channel = https://nixos.org/channels/nixos-15.09;*/
	/*};*/
}
