{ config, pkgs, lib, ... }:
with lib;
let
  cfg = config.website."net.nawia.shd";
in
{
  imports = [
    # paths to other modules
  ];

  options.website."net.nawia.shd" = {
		enable = mkEnableOption "shd.nawia.net website";
		hostname = mkOption {
			type = types.str;
			default = "shd";
    };
		domain = mkOption {
			type = types.str;
			default = "nawia.net";
    };
  };

  config = lib.mkIf cfg.enable {
    # networking.extraHosts = "${kubeMasterIP} ${kubeMasterHostname}";
    networking.extraHosts = "cluster.local";
    environment.variables = {
      KUBECONFIG = "/etc/kubernetes/cluster-admin.kubeconfig";
      ETCDCTL_CA_FILE = "/var/lib/kubernetes/secrets/ca.pem";
      ETCDCTL_CERT_FILE = "/var/lib/kubernetes/secrets/etcd.pem";
      ETCDCTL_KEY_FILE = "/var/lib/kubernetes/secrets/etcd-key.pem";
      ETCDCTL_ENDPOINTS = "https://etcd.local:2379";
      ETCDCTL_API = "2";
    };
    # systemd.services.docker.environment.DOCKER_OPTS = "--net=host";
		environment.systemPackages = with pkgs; [
			kubectl
		];
    # services.flannel.backend = "udp";
		services.kubernetes = {
      flannel.enable = false;
      easyCerts = true;
      pki.enable = true;
			roles = [ "master" "node" ];
			masterAddress = "${cfg.hostname}.${cfg.domain}";
      kubelet = {
        extraOpts = "--fail-swap-on=false"; # for dev
        verbosity = 4;
        networkPlugin = "kubenet";
        # cni.config = [
					# {
						# cniVersion = "0.3.1";
						# delegate = {
							# bridge = "docker0";
							# isDefaultGateway = true;
						# };
						# name = "mynet";
						# type = "flannel";
        #     log_level = "debug";
					# }
				# ];
      };
		};
    security.sudo = {
      extraConfig = ''
Defaults  env_keep += "KUBECONFIG"
Defaults  env_keep += "ETCDCTL_CA_FILE"
Defaults  env_keep += "ETCDCTL_CERT_FILE"
Defaults  env_keep += "ETCDCTL_ENDPOINTS"
Defaults  env_keep += "ETCDCTL_KEY_FILE"
'';
    };
  };
}
