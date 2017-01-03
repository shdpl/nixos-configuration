{ config, pkgs, ... }:
{
  environment.variables = {
    GOPATH="/home/shd/src/go";
    GO15VENDOREXPERIMENT="1";
  };
	environment.systemPackages = with pkgs;
	[
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
		ack silver-searcher

		nix-prefetch-scripts nix-repl nixpkgs-lint nox

		libreoffice pandoc

    glide
    go
    gotags
	];
}
