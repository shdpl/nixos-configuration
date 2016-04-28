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
		../../private/ca/bobkat-temp.crt
  ];
	environment.systemPackages = with pkgs; [
		gnumake gcc
		python # for some weird javascript builders
		sqlite
		eclipses.eclipse-platform jdk ant
	];
	virtualisation.docker.enable = true;
	/*services.solr = {*/
	/*	enable = true;*/
	/*	user = "shd";*/
	/*	group = "wheel";*/
	/*	solrHome = "/home/shd/solr";*/
	/*};*/
}
