{ config, pkgs, ... }:
{
  imports = [
    ../../modules/virtualbox.nix
  ];
  networking.extraHosts = ''
		172.19.8.101 local.k8.xxx.livew.io etcd.ext.local.k8.xxx.livew.io
	'';
  security.pki.certificateFiles = [
		../../private/ca/lw-ca.crt
		../../private/ca/k8-ca.crt
  ];
	environment.systemPackages = with pkgs; [
    #aws
		atom
		/*go16Packages.vault go16Packages.go-sqlite3*/
		gnumake gcc
		sqlite
		eclipses.eclipse-platform jdk /*oraclejdk*/ ant
		vagrant
    minikube kubectl kubernetes-helm awscli
    yarn
		python # for some weird javascript builders
    binutils # for weird redis javascript builder
    hugo
    dep
    # nodePackages."snyk"
	];
	virtualisation.docker.enable = true;
  environment.variables = import ../../private/livewyer/vault.nix;
	/*services.solr = {*/
	/*	enable = true;*/
	/*	user = "shd";*/
	/*	group = "wheel";*/
	/*	solrHome = "/home/shd/solr";*/
	/*};*/

  networking.firewall.allowedTCPPorts = [ 8080 ];
}
