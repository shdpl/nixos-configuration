{ config, pkgs, lib, ... }:
with lib;
let
  cfg = config.cluster;
in
  {
    options.cluster = {
      enable = mkEnableOption {};
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
      (mkIf (cfg.enable == true) {
        swapDevices = lib.mkForce [ ];
        environment.systemPackages = with pkgs; [
          kubernetes kubernetes-helm
        ];
        services.kubernetes = {
          masterAddress = "${cfg.hostname}.${cfg.domain}";
          roles = [ "master" "node" ];
          easyCerts = true;
          pki.certs = builtins.listToAttrs (
            map (user: {
              name = user;
              value = config.services.kubernetes.lib.mkCert {
                name = user;
                CN = user;
                privateKeyOwner = user;
              };
            }) cfg.users
          );
        };

        home-manager.users = builtins.listToAttrs (
          map (user: {
            name = user;
            value = {
              home.sessionVariables.KUBECONFIG = with config.services.kubernetes.pki.certs."${user}";
                config.services.kubernetes.lib.mkKubeConfig "${user}" {
                    server = config.services.kubernetes.apiserverAddress;
                    certFile = cert;
                    keyFile = key;
                };
            };
          }) cfg.users
        );

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
      })
    ]);
  }
