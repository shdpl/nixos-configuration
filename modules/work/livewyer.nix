{ config, pkgs, ... }:
let
  hostname = "caroline";
  domain = "nawia.net";
in
{
  # imports = [
  #   ../../modules/virtualbox.nix
  # ];
  networking.extraHosts = ''
		172.19.8.101 local.k8.xxx.livew.io etcd.ext.local.k8.xxx.livew.io
	'';
  security.pki.certificateFiles = [
		../../private/ca/lw-ca.crt
		../../private/ca/k8-ca.crt
  ];
	environment.systemPackages = with pkgs; [
    # kubevirt
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
    jenkins-job-builder
    terraform_0_11-full
    # (terraform.withPlugins (p: [p.libvirt]))
	];
  virtualisation.docker = {
    enable = true;
    # socketActivation = false;
  };
  environment.variables = import ../../private/livewyer/vault.nix;
	/*services.solr = {*/
	/*	enable = true;*/
	/*	user = "shd";*/
	/*	group = "wheel";*/
	/*	solrHome = "/home/shd/solr";*/
	/*};*/
  services.kubernetes = {
    roles = [ "master" "node" ];
    masterAddress = "${hostname}.${domain}";
  };

  networking.firewall.allowedTCPPorts = [ 8080 ];
  nixpkgs.config.packageOverrides = pkgs: with pkgs; rec {
    terraform-providers = recurseIntoAttrs (
			callPackage ../../pkgs/terraform-providers.nix {
      list = import <nixpkgs/pkgs/applications/networking/cluster/terraform-providers/data.nix> //
      {
          ignition =
            {
              owner   = "terraform-providers";
              repo    = "terraform-provider-ignition";
              version = "1.1.0";
              sha256  = "1j9rgwrb4bnm8a44rg3d9fry46wlpfkwxxpkpw9y6l24php0qxh8";
            };
          local =
            {
              owner   = "terraform-providers";
              repo    = "terraform-provider-local";
              version = "1.3.0";
              sha256  = "1qxfyyg8k43rw0gny4dadamc2a9hk3x6ybdivifjc17m7il0janc";
            };
          random =
            {
              owner   = "terraform-providers";
              repo    = "terraform-provider-random";
              version = "2.1.0";
              sha256  = "0plg139pbvqwbs5hcl7d5kjn7vwknjr4n0ysc2j5s25iyhikkv9s";
            };
          template =
            {
              owner   = "terraform-providers";
              repo    = "terraform-provider-template";
              version = "2.1.0";
              sha256  = "0rn2qavvx1y0hv25iw8yd6acvrclmz17hzg2jpb161mnlh8q94r4";
            };
          tls =
            {
              owner   = "terraform-providers";
              repo    = "terraform-provider-tls";
              version = "2.0.0";
              sha256  = "0hvj00j8a820j18yi90xzhd635pkffivp1116d84wyqxya5acd4p";
            };
          null =
            {
              owner   = "terraform-providers";
              repo    = "terraform-provider-null";
              version = "2.1.0";
              sha256  = "1qbb4pyzqys2010g6b4yzdzgalrf6az1s24y4sa577q2bix8x45v";
            };
        };
      });
  };

  home.work.livewyer = {
    ".config/kube/rb-atp-nonlive.yaml".source = ../kube/rb-atp-nonlive.yaml;
    # ".config/kube/k8s-1-13-5-do-0-lon1-1553717378409-kubeconfig.yaml".source = ../kube/k8s-1-13-5-do-0-lon1-1553717378409-kubeconfig.yaml;
    ".kube/leaseweb.conf".source = ../kube/leaseweb.conf;
    ".kube/config".source = ../kube/k8s-1-13-5-do-0-lon1-1553717378409-kubeconfig.yaml;
    ".ssh/ssh_private_key_charlie.pem".source = ../ssh/ssh_private_key_charlie.pem;
    ".ssh/livewyer_nfs.pem".source = ../ssh/livewyer_nfs.pem;
  };
}
