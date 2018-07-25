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
    bfg-repo-cleaner
		enca
#androidsdk_4_4

		colordiff highlight
		dmd rdmd
		nodejs
		/*leiningen*/
		subversion mercurial
		ctags dhex bvi vbindiff
		meld
		jq pythonPackages.csvkit xmlstarlet
		valgrind dfeet
		ltrace strace gdb

		bc

		nix-prefetch-scripts nix-repl nixpkgs-lint nox

		/*libreoffice*/ pandoc

    glide
    go godep
    gotags
		nodePackages.js-yaml
	];
}
