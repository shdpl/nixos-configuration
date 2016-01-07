{ config, pkgs, ... }:

{
	imports = [
		/*../../modules/pl.nix*/
		/*../../modules/wheel-is-root.nix*/
		/*../../modules/ssh.nix*/
		../modules/common.nix
	];

	networking = {
    firewall.enable = false;
		hostName = "kube-master";
		domain = "livewyer.nawia.net";
	};

  virtualisation.docker.enable = true;

	services = {
    etcd.enable = true;
    kubernetes = {
      package = pkgs.kubernetes;
      /*verbose = true;*/
      apiserver.enable = true;
      scheduler.enable = true;
      controllerManager.enable = true;
      kubelet.enable = true;
      proxy.enable = true;
    };
	};
  environment.systemPackages = [ pkgs.links pkgs.git ];
}
