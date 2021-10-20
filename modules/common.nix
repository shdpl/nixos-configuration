{ config, pkgs, lib, ... }:

let
	cfg = config.common;
	wireshark = ( if config.services.xserver.enable then pkgs.wireshark else pkgs.wireshark-cli );
in

with lib;

{
  options = {
    common = {
      userName = mkOption {
        type = types.str;
      };
      userFullName = mkOption {
        type = types.str;
      };
      userEmail = mkOption {
        type = types.str;
      };
      host = mkOption {
        type = types.str;
      };
      cacheVhost = mkOption {
        type = types.str;
      };
      nixpkgsPath = mkOption {
        type = types.str;
      };
      nixosConfigurationPath = mkOption {
        type = types.str;
      };
      email = mkOption {
        type = types.str;
      };
      ca = mkOption {
        type = types.path;
      };
      ntp = mkOption { #TODO: by locale
        type = types.listOf types.str;
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
      udisks2.enable = true;
      ntp = {
        enable = true;
        servers = cfg.ntp;
      };
    };
    /*time.hardwareClockInLocalTime = true;*/
    networking = {
      firewall.logRefusedConnections = false;
      #nameservers = [ "208.67.222.222" "208.67.220.220" ];
    };
    environment = {
      #noXlibs = !config.services.xserver.enable;
      variables = {
        EDITOR = "vim";
        TERMINAL = "terminology";
        BROWSER = "firefox";
        # NIXPKGS = cfg.nixpkgsPath;
        NIXPKGS_ALLOW_UNFREE = "1";
        EMAIL = cfg.email;
        #CURL_CA_BUNDLE = [ "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt" ];
      };
      systemPackages = with pkgs;
      [
        /*(neovim.override { vimAlias = true; })*/
        nixops openssl
        silver-searcher
        (vim_configurable.customize {
          name = "vim";
          vimrcConfig.customRC = (builtins.readFile ../data/vim/.vimrc);
          vimrcConfig.vam.knownPlugins = pkgs.vimPlugins;
          vimrcConfig.vam.pluginDictionaries = [
            { names = [
              "ack-vim"
              "coffee-script"
              "vim-css-color"
              "ctrlp"
              "vim-easytags"
              # "vim-gutentags"
              "csv"
              /*"d"*/
              /*"glsl"*/
              "vim-go"
              "vim-addon-goto-thing-at-cursor"
              "vim-pug"
              "vim-colorschemes"
              "vim-json"
              "vim-yaml"
              /*"less"*/
              /*"makeshift"*/
              "vim-markdown"
              "vim-nix"
              /*vim-addon-nix*/
              /*"cute-python"*/
              /*"python-mode"*/
              /*"recover"*/
              "snipmate" # utilsnips
              "vim-snippets"
              "syntastic"
              "tabular"
              /*systemd*/
              "tagbar"
              /*unstack*/
              "vimshell"
              /*"terraform"*/
              /*"xml-folding"*/
              "commentary"
              "Jenkinsfile-vim-syntax"
              "clang_complete"
              "editorconfig-vim"
              "vim-fugitive"
              "indentLine"
              /* deoplete-tabnine coc-tabnine */
            ];
          }
        ];
      })
      w3m #irssi
      screen reptyr # byobu
      aspellDicts.pl
      manpages posix_man_pages
      p7zip

      atop file dmidecode pciutils iotop lsof
      mosh netrw lftp
      mmv
      bat broot
      psmisc tree which ncdu
      mtr mutt pv

      nmap wireshark tcpdump aria2 socat iperf jnettop iptstate conntrack_tools bridge-utils
      curl httpie /* pup*/

      git-crypt
      direnv
      gnupg

      yank
        # bat
        jdupes
        bitwarden-cli
      ];
    };
    nix = {
      /*
      extraOptions = ''
        experimental-features = nix-command
      '';
      */
      gc = {
        automatic = true;
        dates = "weekly";
        options = "--delete-older-than 30d";
      };
      nixPath = [
        "nixos-config=${cfg.nixosConfigurationPath}/configurations/${cfg.host}.nix"
        "nixpkgs=${cfg.nixpkgsPath}"
        #"/nix/var/nix/profiles/per-user/root/channels"
      ];
      /*
      package = pkgs.nixUnstable; #why?
      trustedBinaryCaches = [ "http://${cfg.cacheVhost}/" "https://cache.nixos.org/" ];
      */
    };
    # FIXME: external dependency to home-manager
    # home-manager.users.shd.programs.i3status =
    # home-manager.users.shd.programs.keychain =

    home-manager = {
      useGlobalPkgs = true;
      users.${cfg.userName}.programs = {
        bash.enable = true;
        direnv.enable = true;
        # starship = {
        #   enable = true;
        #   enableBashIntegration = true;
        # };
        lesspipe.enable = true;
        htop.enable = true;
        home-manager.enable = true;
        command-not-found.enable = true;
        # direnv.enable = true; #FIXME: not working
        fzf.enable = true;
        # TODO: chromium feh firefox
        # bat = {
        #   enable = true;
        #   config = { theme = "zenburn"; };
        # };
        # broot = {
        #   enable = true;
        #   enableFishIntegration = false;
        #   enableZshIntegration = false;
        # };
        git = {
          enable = true;
          userName = cfg.userFullName;
          userEmail = cfg.userEmail;
          #TODO: signing
          # delta = {
          #   enable = true;
          # };
          extraConfig.init.defaultBranch = "master";
        };
      };
    };

    programs = {
      ssh = {
        startAgent = true;
        # TODO: certAuthority
      };
      gnupg.agent = {
        enable = true;
        pinentryFlavor = "curses";
      };
      bash = {
        # autojump
        enableCompletion = true;
        # shellInit = ''
        #   eval $(direnv hook bash)
        # '';
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
          #fehmv = "feh --auto-rotate -F -A 'mv %F %N'";
          #fehrm = "feh --auto-rotate -F -A 'rm %F'";
        };
        #    shellInit = "set -o vi";
      };
    };
    nixpkgs.config.allowUnfree = true;
  };
}
