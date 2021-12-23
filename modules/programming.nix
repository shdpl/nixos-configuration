{ config, pkgs, lib, ... }:

let
	cfg = config.programming;
  php-manual = pkgs.callPackage ../pkgs/php-manual/default.nix { };
in

with lib;

{
  options = {
    programming = {
      enable = mkOption {
				type = with types; bool;
      };
      text = mkOption {
				type = with types; bool;
        default = true;
      };
      js = mkOption {
				type = with types; bool;
        default = false;
      };
      go = mkOption {
				type = with types; bool;
        default = false;
      };
      # android = mkOption {
				# type = with types; bool;
      # };
      java = mkOption {
        type = with types; bool;
        default = false;
      };
      scala = mkOption {
				type = with types; bool;
        default = false;
      };
      clojure = mkOption {
        type = types.bool;
        default = false;
      };
      php = mkOption {
				type = with types; bool;
        default = false;
      };
      d = mkOption {
				type = with types; bool;
        default = false;
      };
      nix = mkOption {
				type = with types; bool;
        default = false;
      };
      system = mkOption {
				type = with types; bool;
        default = false;
      };
      docker = mkOption {
        type = with types; bool;
        default = false;
      };
      user = mkOption {
        type = with types; str;
      };
      gitlabAccessTokens = mkOption {
        type = with types; str;
      };
    };
  };

  config = (mkMerge [
		(mkIf (cfg.enable == true) {
      environment.etc.hosts.mode = "0644";

      environment.systemPackages = with pkgs;
      [
        # bfg-repo-cleaner

        colordiff highlight
        subversion mercurial
        meld
        jq csvkit xmlstarlet
        yaml2json nodePackages.js-yaml

        bc
        ctags

        gnumake

        protobuf
        gitAndTools.gitflow
        # public http service to pipe through nc from pc to the website ( returns a link )
      ];
      # nix.extraOptions = ''
      #   access-tokens = gitlab.com=${cfg.gitlabAccessTokens}
      # '';
    })
		# (mkIf (cfg.enable == true && cfg.android == true) {
      # programs.adb.enable = true;
      # environment.systemPackages = with pkgs;
      # [
        # heimdall
      # ];
    # })
		(mkIf (cfg.enable == true && cfg.java == true) {
      environment.systemPackages = with pkgs;
      [
        jetbrains.idea-community
      ];
    })
		(mkIf (cfg.enable == true && cfg.scala == true) {
      environment.systemPackages = with pkgs;
      [
        sbt
      ];
    })
		(mkIf (cfg.enable == true && cfg.clojure == true) {
      environment.systemPackages = with pkgs;
      [
        leiningen
      ];
    })
		(mkIf (cfg.enable == true && cfg.php == true) {
      networking.firewall.allowedTCPPorts = [ 9000 9003 ];
      environment.systemPackages = with pkgs;
      [
        php80 php80Packages.composer
        phpPackages.phpcs #phpPackages.psalm
        php-manual
        # php80 php80Packages.composer
        jetbrains.phpstorm
        # TODO: local documentation environment, http://doc.php.net/tutorial/local-setup.php
      ];
      
    })
		(mkIf (cfg.enable == true && cfg.go == true) {
      home-manager.users.${cfg.user} = {
        programs.go = {
          enable = true;
          goBin = "/home/${cfg.user}/src/go/bin";
          goPath = "/home/${cfg.user}/src/go";
          packages = {
            "golang.org/x/text" = builtins.fetchGit "https://go.googlesource.com/text";
            #"golang.org/x/tools/cmd/godoc" = builtins.fetchGit "https://github.com/golang/tools.git";
          };
        };
        home.sessionPath = [ "/home/${cfg.user}/src/go/bin" ];
      };
      environment.variables = {
        GOPATH="/home/${cfg.user}/src/go";
        #GO15VENDOREXPERIMENT="1";
        #CGO_ENABLED="0";
      };
      environment.systemPackages = with pkgs;
      [
        # glide
        #vgo2nix
        gotags
        go-protobuf
      ];
    })
    (mkIf (cfg.enable == true && cfg.text == true) {
      environment.systemPackages = with pkgs;
      [
        libreoffice pandoc
        # TODO: reveal.js hedgedoc
        # foam?
        enca
      ];
    })
    (mkIf (cfg.enable == true && cfg.js == true) {
      environment.systemPackages = with pkgs;
      [
        html-tidy vscodium
        nodejs nodePackages.prettier
        # nodejs-8_x
      ];
    })
    (mkIf (cfg.enable == true && cfg.d == true) {
      environment.systemPackages = with pkgs;
      [
        dmd rdmd
      ];
    })
    (mkIf (cfg.enable == true && cfg.system == true) {
      programs.bcc.enable = true;
      environment.systemPackages = with pkgs;
      [
        valgrind dfeet
        ltrace strace gdb
        dhex bvi vbindiff
      ];
    })
    (mkIf (cfg.enable == true && cfg.nix == true) {
      environment.systemPackages = with pkgs;
      [
        nix-prefetch-scripts nixpkgs-lint nox
        nixos-option nix-doc
      ];
    })
    (mkIf (cfg.enable == true && cfg.docker == true) {
      virtualisation.libvirtd.enable = true;
      virtualisation.docker.enable = true;
      environment.systemPackages = with pkgs;
      [
        docker-compose
      ];
    })
  ]);
}
