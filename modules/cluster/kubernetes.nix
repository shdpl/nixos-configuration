{ config, pkgs, lib, ... }:
with lib;
let
  cfg = config.cluster;
  # shdOptions = config.services.kubernetes.lib.mkKubeConfigOptions "shd";
  # mkKubeConfigOptions = prefix: {
  #   server = mkOption {
  #     description = "${prefix} kube-apiserver server address.";
  #     type = types.str;
  #   };
  #
  #   caFile = mkOption {
  #     description = "${prefix} certificate authority file used to connect to kube-apiserver.";
  #     type = types.nullOr types.path;
  #     default = cfg.caFile;
  #     defaultText = literalExpression "config.${opt.caFile}";
  #   };
  #
  #   certFile = mkOption {
  #     description = "${prefix} client certificate file used to connect to kube-apiserver.";
  #     type = types.nullOr types.path;
  #     default = null;
  #   };
  #
  #   keyFile = mkOption {
  #     description = "${prefix} client key file used to connect to kube-apiserver.";
  #     type = types.nullOr types.path;
  #     default = null;
  #   };
  # };
  # mkKubeConfig = name: conf: pkgs.writeText "${name}-kubeconfig" (builtins.toJSON {
  #   apiVersion = "v1";
  #   kind = "Config";
  #   clusters = [{
  #     name = "local";
  #     cluster.certificate-authority = conf.caFile or cfg.caFile;
  #     cluster.server = conf.server;
  #   }];
  #   users = [{
  #     inherit name;
  #     user = {
  #       client-certificate = conf.certFile;
  #       client-key = conf.keyFile;
  #     };
  #   }];
  #   contexts = [{
  #     context = {
  #       cluster = "local";
  #       user = name;
  #     };
  #     name = "local";
  #   }];
  #   current-context = "local";
  # });
in
  {
    options.cluster = {
      hostname = mkOption {
        type = types.str;
      };
      domain = mkOption {
        type = types.str;
      };
      users = mkOption {
        type = types.listOf types.str;
        default = [];
      };
    };
    config = (mkMerge [
      {
        swapDevices = lib.mkForce [ ];
        environment.systemPackages = with pkgs; [
          kubernetes kubernetes-helm
        ];
        services.kubernetes = {
          # roles = [ "master" "node" ];
          masterAddress = "${cfg.hostname}.${cfg.domain}";
          roles = [ "master" "node" ];
          # masterAddress = "api.kube";
          # apiserverAddress = "https://api.kube:6443";
          easyCerts = true;
          # apiserver = {
          #   securePort = 6443;
          #   advertiseAddress = "10.0.0.5";
          # };
          pki.certs.shd = config.services.kubernetes.lib.mkCert {
            name = "shd";
            CN = "shd";
            privateKeyOwner = "shd";
          };
          # pki.certs = builtins.listToAttrs (
          #   map (
          #     user: {
          #       name = user;
          #       value = config.services.kubernetes.lib.mkCert {
          #         name = user;
          #         CN = user;
          #         privateKeyOwner = user;
          #       };
          #     }
          #   )
          #   cfg.users
          # );
        };

        # home-manager.users.shd.home.sessionVariables.KUBECONFIG = config.services.kubernetes.lib.mkKubeConfig "addon-manager" {
        #   server = top.apiserverAddress;
        #   certFile = cert;
        #   keyFile = key;
        # };
        home-manager.users.shd.home.sessionVariables.KUBECONFIG = with config.services.kubernetes.pki.certs.shd;
          config.services.kubernetes.lib.mkKubeConfig "shd" {
              server = config.services.kubernetes.apiserverAddress;
              certFile = cert;
              keyFile = key;
          };

        systemd.services.etcd.preStart = ''${pkgs.writeShellScript "etcd-wait" ''
  while [ ! -f /var/lib/kubernetes/secrets/etcd.pem ]; do sleep 1; done
''}'';
        systemd.services.flannel.preStart = ''${pkgs.writeShellScript "flannel-wait" ''
  while [ ! -f /var/lib/kubernetes/secrets/flannel-client.pem ]; do sleep 1; done
''}'';
        systemd.services.kube-apiserver.preStart = ''${pkgs.writeShellScript "kube-apiserver-wait" ''
  while [ ! -f /var/lib/kubernetes/secrets/service-account-key.pem ]; do sleep 1; done
''}'';
        systemd.services.kube-controller-manager.preStart = ''${pkgs.writeShellScript "kube-controller-manager-wait" ''
  while [ ! -f /var/lib/kubernetes/secrets/kube-controller-manager-client.pem ]; do sleep 1; done
''}'';
        systemd.services.kube-proxy.preStart = ''${pkgs.writeShellScript "kube-proxy-wait" ''
  while [ ! -f /var/lib/kubernetes/secrets/kube-proxy-client.pem ]; do sleep 1; done
''}'';
        systemd.services.kube-scheduler.preStart = ''${pkgs.writeShellScript "kube-scheduler-wait" ''
  while [ ! -f /var/lib/kubernetes/secrets/kube-scheduler-client.pem ]; do sleep 1; done
''}'';
      }
    ]);
  }
