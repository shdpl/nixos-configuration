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
      android = mkOption {
				type = with types; bool;
      };
    };
  };

  config = (mkMerge [
		(mkIf (cfg.enable == true) {
      environment.variables = {
        GOPATH="/home/${user}/src/go";
        GO15VENDOREXPERIMENT="1";
      };
      environment.systemPackages = with pkgs;
      [
        jetbrains.idea-community
        bfg-repo-cleaner
        enca

        colordiff highlight
        dmd rdmd
        nodejs
        # nodejs-8_x
        /*leiningen*/
        subversion mercurial
        ctags dhex bvi vbindiff
        meld
        jq csvkit xmlstarlet
        yaml2json
        valgrind dfeet
        ltrace strace gdb

        bc

        nix-prefetch-scripts nixpkgs-lint nox

        libreoffice pandoc

        glide
        go_1_12 vgo2nix
        gotags
        nodePackages.js-yaml
      ];
    })
		(mkIf (cfg.android == true) {
      programs.adb.enable = true;
      environment.systemPackages = with pkgs;
      [
        heimdall
      ];
    })
  ]);
}
