{ config, pkgs, ... }:
{
  imports = [
    ../../modules/virtualbox.nix
  ];
  networking.extraHosts = ''
		172.19.8.101 local.k8.xxx.livew.io etcd.ext.local.k8.xxx.livew.io
	'';
  security.pki.certificateFiles = [
    ../../private/ca/livewyer.crt
		../../private/ca/kubernetes.crt
		../../private/ca/livewyer.aax.crt
		../../private/ca/livewyer.local.crt
  ];
	environment.systemPackages = with pkgs; [
		atom
		go16Packages.vault go16Packages.go-sqlite3
		gnumake gcc
		python # for some weird javascript builders
		sqlite
		eclipses.eclipse-platform oraclejdk7 ant
	];
	virtualisation.docker.enable = true;
  environment.variables = import ../../private/livewyer/vault.nix;
	/*services.solr = {*/
	/*	enable = true;*/
	/*	user = "shd";*/
	/*	group = "wheel";*/
	/*	solrHome = "/home/shd/solr";*/
	/*};*/
}
