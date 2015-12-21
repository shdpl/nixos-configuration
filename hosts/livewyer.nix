{ config, pkgs, ... }:

{
	imports = [
		/*../../config/pl.nix*/
		/*../../config/wheel-is-root.nix*/
		/*../../config/ssh.nix*/
		../config/common.nix
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
