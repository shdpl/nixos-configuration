{ config, pkgs, lib, ... }:

let
	cfg = config.common;
	wireshark = ( if config.services.xserver.enable then pkgs.wireshark else pkgs.wireshark-cli );
	noXLibs = !config.services.xserver.enable;
in

with lib;

{
  options = {
    common = {
      host = mkOption {
				type = with types; string;
      };
      cacheVhost = mkOption {
				type = with types; string;
      };
      nixpkgsPath = mkOption {
				type = with types; string;
      };
      nixosConfigurationPath = mkOption {
				type = with types; string;
      };
      email = mkOption {
				type = with types; string;
      };
      ca = mkOption {
				type = with types; types.path;
      };
      ntp = mkOption {
        type = types.listOf types.string;
        default = [ "0.pl.pool.ntp.org" "1.pl.pool.ntp.org" "2.pl.pool.ntp.org" "3.pl.pool.ntp.org" ];
      };
    };
  };

  config = {
    security.pki.certificateFiles = [
      cfg.ca
    ];
    boot.cleanTmpDir = true;
    services = {
      ntp = {
        enable = true;
        servers = cfg.ntp;
      };
    };
    networking.firewall.logRefusedConnections = false;
    environment = {
      noXlibs = noXLibs;
      variables = {
			EDITOR = "vim";
			TERMINAL = "terminology";
			BROWSER = "chromium";
			/*NIXPKGS = cfg.nixpkgsPath;*/
			NIXPKGS_ALLOW_UNFREE = "1";
			EMAIL = cfg.email;
      #CURL_CA_BUNDLE = [ "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt" ];
		};
		systemPackages = with pkgs;
		[
			/*httpie pup*/
			/*(neovim.override { vimAlias = true; })*/
      nixops
      ack silver-searcher
(
        with import <nixpkgs> {};

        vim_configurable.customize {
            name = "vim";
						/*
            vimrcConfig.customRC = ''
							colorscheme jellybeans
							syntax enable
            '';
						*/
						vimrcConfig.customRC = (builtins.readFile ../data/vim/.vimrc);
						vimrcConfig.vam.knownPlugins = pkgs.vimPlugins;
						vimrcConfig.vam.pluginDictionaries = [
						{ names = [
							"ack-vim"
							"coffee-script"
							"vim-css-color"
							"ctrlp"
							"vim-easytags"
							"csv"
							/*"d"*/
							/*"glsl"*/
							"vim-go"
							"vim-addon-goto-thing-at-cursor"
							"vim-jade"
							"vim-colorschemes"
							"vim-json"
							/*"less"*/
							/*"makeshift"*/
							"vim-markdown"
							"vim-nix"
							/*vim-addon-nix*/
							/*"cute-python"*/
							/*"python-mode"*/
							/*"recover"*/
							"snipmate"
							"syntastic"
							"tabular"
							/*systemd*/
							"tagbar"
							/*unstack*/
							"vimshell"
							/*"terraform"*/
							/*"xml-folding"*/
              "commentary"
							];
						}
						];
        }
)
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
			git git-crypt
			direnv
			gnupg

      yank
		];
	};
	nix = {
		gc = {
			automatic = false;
			dates = "04:00";
		};
		nixPath = [
			"nixos-config=${cfg.nixosConfigurationPath}/configurations/${cfg.host}.nix"
			"nixpkgs=${cfg.nixpkgsPath}"
      #"/nix/var/nix/profiles/per-user/root/channels"
		];
		package = pkgs.nixUnstable;
		trustedBinaryCaches = [ "http://${cfg.cacheVhost}/" "https://cache.nixos.org/" ];
	};
	programs.bash = {
    enableCompletion = true;
    shellInit = ''
      eval $(${pkgs.direnv}/bin/direnv hook bash)
    '';
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
	/*time.hardwareClockInLocalTime = true;*/
	/*system.autoUpgrade = {*/
	/*	enable = true;*/
	/*	channel = https://nixos.org/channels/nixos-unstable;*/
	/*};*/
  };
}
