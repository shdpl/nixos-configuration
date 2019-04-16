{ config, pkgs, ... }:
let
  user = "shd";
in
{
  environment.variables = {
    GOPATH="/home/${user}/src/go";
    GO15VENDOREXPERIMENT="1";
  };
	environment.systemPackages = with pkgs;
	[
    jetbrains.idea-community
    bfg-repo-cleaner
		enca
#androidsdk_4_4

		colordiff highlight
		dmd rdmd
		# nodejs
    nodejs-8_x
		/*leiningen*/
		subversion mercurial
		ctags dhex bvi vbindiff
		meld
		jq pythonPackages.csvkit xmlstarlet
    yaml2json
		valgrind dfeet
		ltrace strace gdb

		bc

		nix-prefetch-scripts nixpkgs-lint nox

		/*libreoffice*/ pandoc

    glide
    go_1_12
    gotags
		nodePackages.js-yaml
	];
}
