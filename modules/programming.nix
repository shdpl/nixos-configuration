{ config, pkgs, lib, ... }:

let
	cfg = config.programming;
  user = "shd";
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
      go = mkOption {
				type = with types; bool;
        default = true;
      };
      android = mkOption {
				type = with types; bool;
      };
      scala = mkOption {
				type = with types; bool;
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
    };
  };

  config = (mkMerge [
		(mkIf (cfg.enable == true) {
      environment.etc.hosts.mode = "0644";
      environment.systemPackages = with pkgs;
      [
        jetbrains.idea-community
        # bfg-repo-cleaner

        colordiff highlight
        html-tidy
        nodejs
        # nodejs-8_x
        /*leiningen*/
        subversion mercurial
        meld
        jq csvkit xmlstarlet
        yaml2json nodePackages.js-yaml

        bc
        ctags

        gnumake

        protobuf
      ];
    })
		(mkIf (cfg.enable == true && cfg.android == true) {
      programs.adb.enable = true;
      environment.systemPackages = with pkgs;
      [
        heimdall
      ];
    })
		(mkIf (cfg.enable == true && cfg.scala == true) {
      environment.systemPackages = with pkgs;
      [
        sbt
      ];
    })
		(mkIf (cfg.enable == true && cfg.php == true) {
      environment.systemPackages = with pkgs;
      [
        php php74Packages.composer
      ];
    })
		(mkIf (cfg.enable == true && cfg.go == true) {
      home-manager.users.${user} = {
        programs.go = {
          enable = true;
          goPath = "/home/${user}/src/go";
          packages = {
            "golang.org/x/text" = builtins.fetchGit "https://go.googlesource.com/text";
          };
        };
      };
      environment.variables = {
        GOPATH="/home/${user}/src/go";
        GO15VENDOREXPERIMENT="1";
        CGO_ENABLED="0";
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
        enca
      ];
    })
  ]);
}
