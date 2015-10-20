{ config, pkgs, lib, ... }:

let
	cfg = config.common;
in

with lib;

{
	boot.cleanTmpDir = true;
	services = {
		ntp = {
			enable = true;
			servers = [ "0.pl.pool.ntp.org" "1.pl.pool.ntp.org" "2.pl.pool.ntp.org" "3.pl.pool.ntp.org" ];
		};
	};
	environment = {
		variables = {
			ATRIUM_ADMIN_EMAIL = "mariusz.gliwinski@ifresearch.org";
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
	users.extraUsers = {
		shd = {
			extraGroups = [ "wheel" ];
			isNormalUser = true;
			openssh.authorizedKeys.keys = [
				"ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAIEAmNhcSbjZB3BazDbmmtqPCDzVd+GQBJI8WAoZNFkveBGC0zznUCdd78rrjke5sDRBVCIqKABCx5iwU4VM1zVWZfWlsf6HEbhyUVdWmKgylG7Mchg2dkJUfTHx/VLnE1gDqc1+9SSs88q6H+IO4Kex853Q7eUo9Cmsi8TUn9rthME="
			];
		};
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
		/*chromium.enablePepperFlash = true;*/
		/*chromium.enablePepperPDF = true;*/
	};
}
