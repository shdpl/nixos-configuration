{ config, pkgs, ... }:
{
  environment.variables = {
    GOPATH="/home/shd/src/go";
    GO15VENDOREXPERIMENT="1";
  };
	environment.systemPackages = with pkgs;
	[
		enca
		oraclejdk7
		androidsdk_4_4

		robomongo
		dmd rdmd
		php #idea.phpstorm
		nodejs
		leiningen
		vagrant
		git subversion
		ctags dhex bvi vbindiff
		meld
		jq xmlstarlet
		valgrind dfeet
		ltrace strace gdb

		bc
		ack

		nix-prefetch-scripts nix-repl nixpkgs-lint nox

		libreoffice pandoc

    goPackages.glide
    goPackages.go
    gotags
	];
}
