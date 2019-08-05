{ config, pkgs, ... }:
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
    kubevirt
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
	virtualisation.docker.enable = true;
  environment.variables = import ../../private/livewyer/vault.nix;
	/*services.solr = {*/
	/*	enable = true;*/
	/*	user = "shd";*/
	/*	group = "wheel";*/
	/*	solrHome = "/home/shd/solr";*/
	/*};*/

  #networking.firewall.allowedTCPPorts = [ 8080 ];
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
}
