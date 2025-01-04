{ config, pkgs, lib, ... }:

let
  cfg = config.common;
  wireshark = ( if config.services.xserver.enable then pkgs.wireshark else pkgs.wireshark-cli );
  kernelVersion = config.boot.kernelPackages.kernel.version;
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
    boot.tmp.cleanOnBoot = true;
    services = {
      udisks2 = {
        enable = true;
        settings = {
          "udisks2.conf" = {
            udisks2 = {
              modules = [ "*" ];
              modules_load_preference = "ondemand";
            };
            defaults = {
              encryption = "luks2";
            } // optionalAttrs (builtins.compareVersions kernelVersion "6.2.0" < 0) {
              ntfs_defaults="uid=$UID,gid=$GID"; # windows_names
            };
          };
        };
      };
      ntp = {
        enable = true;
        servers = cfg.ntp;
      };
      # dnsmasq = {
      #   enable = true;
      #   settings.server = [
      #     # "/nawia.net/ns111.ovh.net"
      #     "/nawia.net/213.251.128.155"
      #     # "/nawia.pl/ns100.ovh.net"
      #     "/nawia.pl/213.251.128.144"
      #   ];
      # };
    };
    /*time.hardwareClockInLocalTime = true;*/
    networking = {
      firewall.logRefusedConnections = false;
      #nameservers = [ "208.67.222.222" "208.67.220.220" ];
    };
    environment = {
      variables = {
        EDITOR = "vim";
        TERMINAL = "terminology";
        # NIXPKGS = cfg.nixpkgsPath;
        NIXPKGS_ALLOW_UNFREE = "1";
        EMAIL = cfg.email;
        #CURL_CA_BUNDLE = [ "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt" ];
        HIGHLIGHT_OPTIONS = "--style base16/twilight -O xterm256";
      };
      systemPackages = with pkgs;
      [
        /*(neovim.override { vimAlias = true; })*/
        /*nixops*/ openssl
        (vim_configurable.customize {
          name = "vim";
          vimrcConfig = {
            customRC = (builtins.readFile ../data/vim/.vimrc);
            vam = {
              knownPlugins = pkgs.vimPlugins;
              pluginDictionaries = [
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
                  "snipmate" #utilsnips
                  "vim-snippets"
                  "syntastic"
                  # "vim-lsp"
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
                  # "vim-plug"
                  /* deoplete-tabnine coc-tabnine */
                ];
              }
            ];
          };
        };
      })
        w3m irssi
        screen reptyr # byobu
        aspellDicts.pl
        man-pages man-pages-posix
        p7zip

        bat viddy
        atop file dmidecode pciutils smartmontools iotop lsof
        mosh netrw lftp
        mmv
        psmisc tree which ncdu
        mtr mutt pv parallel tmux

        nmap wireshark tcpdump aria2 socat iperf jnettop iptstate conntrack-tools bridge-utils
        curl httpie 

        git-crypt
        # direnv
        gnupg

        yank
        jdupes
        bitwarden-cli
        qrencode
      ];
    };
    nix = {
      /*
      package = pkgs.nixFlakes;
      extraOptions = ''
        experimental-features = nix-command flakes
      '';
      */
      settings.experimental-features = [ "nix-command" "flakes" ];
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
      trustedBinaryCaches = [ "http://${cfg.cacheVhost}/" "https://cache.nixos.org/" ];
      */
    };
    # FIXME: external dependency to home-manager
    # home-manager.users.shd.programs.i3status =
    # home-manager.users.shd.programs.keychain =

    home-manager = {
      useGlobalPkgs = true;
      users.${cfg.userName} = {
        home.enableNixpkgsReleaseCheck = true;
        programs = {
          bash = {
            enable = true;
            enableCompletion = true;
            # initExtra = ''
            #   set -o vi
            # '';
          };
          direnv = {
            enable = true;
            enableBashIntegration = true; # see note on other shells below
            # nix-direnv.enable = true;
          };
          # direnv.enable = true;
          lesspipe.enable = true;
          htop.enable = true;
          home-manager.enable = true;
          command-not-found.enable = true;
          fzf.enable = true;
          broot = {
            enable = true;
          };
          git = {
            enable = true;
            userName = cfg.userFullName;
            userEmail = cfg.userEmail;
            #TODO: signing
            extraConfig = {
              init.defaultBranch = "master";
              pull.rebase = false;
            };
          };
          neovim = {
            enable = true;
            extraConfig = ''
              set number relativenumber
            '';
            plugins = with pkgs.vimPlugins; [
              lush-nvim
              { plugin = jellybeans-nvim;
                config = "colorscheme jellybeans-nvim\nset termguicolors";
              }
              { plugin = nvim-comment;
                type = "lua";
                config = "\nrequire('nvim_comment').setup()";
              }
              ctrlp
              { plugin = snipmate;
                config = "let g:snipMate = { 'snippet_version' : 1 }";
              }
              vim-snippets
              nvim-lspconfig
            ];
          };
          # programs.boxxy.enable = true;
          # carapace.enable = true;
          # pazi.enable = true;
          navi.enable = true;
          lsd.enable = true;
          fd.enable = true;
          ripgrep.enable = true;
          z-lua = {
            enable = true;
            options = [
              "fzf"
            ];
          };
        };
      };
      # systemd.user.startServices = "sd-switch"; TODO: test with DBus
    };

    programs = {
      ssh = {
        startAgent = true;
        # TODO: certAuthority
      };
      gnupg.agent = {
        enable = true;
        # pinentryFlavor = "curses";
      };
      bash = {
        # autojump
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
          #fehmv = "feh --auto-rotate -F -A 'mv %F %N'";
          #fehrm = "feh --auto-rotate -F -A 'rm %F'";
        };
        #    shellInit = "set -o vi";
      };
    };
    nixpkgs.config.allowUnfree = true;

    documentation = {
      man.generateCaches = true;
      dev.enable = true;
      # nixos.includeAllModules = true;
    };
  };
  # starship = {
  #   enable = true;
  #   enableBashIntegration = true;
  # };
  # bat = {
  #   enable = true;
  #   config = { theme = "zenburn"; };
  # };
  # git.delta = {
  #   enable = true;
  # };
}
