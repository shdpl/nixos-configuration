{ config, pkgs, lib, ... }:

let
	cfg = config.common;
	wireshark = ( if config.services.xserver.enable then pkgs.wireshark else pkgs.wireshark-cli );
	noXLibs = !config.services.xserver.enable;
	nixpkgsPath = "/home/shd/src/nixpkgs";
  nixosConfigurationPath = "/home/shd/src/nixos-configuration";
  hostname = "magdalene";
  cacheVhost = "cache.nix.nawia.net";
in

with lib;

{
  security.pki.certificateFiles = [
    ../private/ca/nawia.net.pem
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
			EMAIL = "shd@nawia.net";
			CURL_CA_BUNDLE = [ "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt" ];
		};
		systemPackages = with pkgs;
		[
			(neovim.override { vimAlias = true; })
			irssi w3m
			screen reptyr
			aspellDicts.pl
			manpages posix_man_pages

			p7zip

			atop file dmidecode pciutils jnettop iotop
			mosh netrw lftp
			mmv fzf
			psmisc tree which ncdu
			mtr mutt pv
			
			nmap wireshark curl aria2 socat
			nixops
			git
		];
	};
	nix = {
		gc = {
			automatic = false;
			dates = "04:00";
		};
		nixPath = [
			"nixos-config=${nixosConfigurationPath}/configurations/${hostname}.nix"
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
	};
	nix.trustedBinaryCaches = [ "http://${cacheVhost}/" "https://cache.nixos.org/" "http://hydra.nixos.org/" ];
	/*time.hardwareClockInLocalTime = true;*/
	/*system.autoUpgrade = {*/
	/*	enable = true;*/
	/*	channel = https://nixos.org/channels/nixos-unstable;*/
	/*};*/
}
