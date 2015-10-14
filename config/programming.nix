{ config, pkgs, ... }:
{
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

		libreoffice
	];
}
