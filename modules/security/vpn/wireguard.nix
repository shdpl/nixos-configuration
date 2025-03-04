{ config, pkgs, lib, ... }:

let
  cfg = config.vpn;
in
{
  options = with lib; {
    vpn = {
      enable = mkOption {
        type = with types; bool;
        default = false;
      };
      host = mkOption {
        type = with types; str;
      };
    };
  };

  config = with lib; (mkMerge [
    # (mkIf (cfg.enable == true) {
    #   environment.systemPackages = with pkgs; [
    #     wireguard-tools
    #   ];
    # })
    (mkIf (cfg.enable == true) {
      networking.nat.enable = true;
      networking.nat.externalInterface = "enp0s31f6";
      networking.nat.internalInterfaces = [ "wg0" ];
      networking.firewall = {
        allowedUDPPorts = [ 51820 ];
      };
      networking.wireguard.interfaces = {
      wg0 = {
        ips = [ "192.168.2.1/24" ];
        listenPort = 51820;

        postSetup = ''
          ${pkgs.iptables}/bin/iptables -t nat -A POSTROUTING -s 192.168.2.1/24 -o eth0 -j MASQUERADE
        '';

        # This undoes the above command
        postShutdown = ''
          ${pkgs.iptables}/bin/iptables -t nat -D POSTROUTING -s 192.168.2.1/24 -o eth0 -j MASQUERADE
        '';

        # FIXME: public secret
        # privateKeyFile = "path to private key file";
        privateKey = (lib.removeSuffix "\n" (builtins.readFile ../../../private/wireguard/daenerys/privatekey));

        peers = [
          {
            publicKey = (lib.removeSuffix "\n" (builtins.readFile ../../../private/wireguard/caroline/publickey));
            allowedIPs = [ "192.168.2.2/32" ]; # "10.100.0.2/32" # 
          }
          {
            publicKey = (lib.removeSuffix "\n" (builtins.readFile ../../../private/wireguard/cynthia/publickey));
            allowedIPs = [ "192.168.2.3/32" "FC00::/7" ]; # "10.100.0.2/32" # 
          }
          {
            publicKey = (lib.removeSuffix "\n" (builtins.readFile ../../../private/wireguard/magdalene/publickey));
            allowedIPs = [ "192.168.2.4/32" ]; # "10.100.0.2/32" # 
          }
        ];
    };
};
      # boot = {
      #   extraModulePackages = [ config.boot.kernelPackages.wireguard ];
      #   kernelModules = [ "wireguard" ];
      #   kernel.sysctl."fs.inotify.max_user_watches" = "1048576";
      # };
      # networking = {
      #   nameservers = [ "8.8.8.8" "8.8.4.4" ];
      #   firewall.allowedUDPPorts = [ 5555 ];
      #    wireguard.interfaces.wg0 = {
      #      ips = [ "192.168.2.4" ];
      #      listenPort = 5555;
      #      privateKey = (lib.removeSuffix "\n" (builtins.readFile ../../../private/wireguard/magdalene/privatekey));
      #      allowedIPsAsRoutes = false;
      #      peers = [
      #        {
      #          allowedIPs = [ "0.0.0.0/0" "::/0" ];
      #          endpoint = "78.46.102.47:51820";
      #          publicKey = (lib.removeSuffix "\n" (builtins.readFile ../../../private/wireguard/daenerys/publickey));
      #          persistentKeepalive = 25;
      #        }
      #        {
      #          allowedIPs = [ "0.0.0.0/0" "::/0" ];
      #          endpoint = "78.46.102.47:51820";
      #          publicKey = (lib.removeSuffix "\n" (builtins.readFile ../../../private/wireguard/caroline/publickey));
      #          persistentKeepalive = 25;
      #        }
      #        {
      #          allowedIPs = [ "0.0.0.0/0" "::/0" ];
      #          endpoint = "78.46.102.47:51820";
      #          publicKey = (lib.removeSuffix "\n" (builtins.readFile ../../../private/wireguard/cynthia/publickey));
      #          persistentKeepalive = 25;
      #        }
      #      ];
      #      postSetup = ''
      #        wg set wg0 fwmark 1234;
      #        ip rule add to 78.46.102.47 lookup main pref 30
      #        ip rule add to all lookup 80 pref 40
      #        ip route add default dev wg0 table 80
      #      '';
      #      postShutdown = ''
      #        # wg set wg0 fwmark 1234;
      #        ip rule delete to 78.46.102.47 lookup main pref 30
      #        ip rule delete to all lookup 80 pref 40
      #        ip route delete default dev wg0 table 80
      #      '';
      #    };
      # };
    })
  ]);
  
  # TODO: make configuration simpler
  # TODO: caroline:
  # boot = {
  # extraModulePackages = [ config.boot.kernelPackages.wireguard ];
  # kernelModules = [ "wireguard" ];
  # };
  # wireguard.interfaces.wg0 = {
  #   ips = [ "192.168.2.2" ];
  #   listenPort = 5555;
  #   privateKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/caroline/privatekey));
  #   allowedIPsAsRoutes = false;
  #   peers = [
  #     {
  #       allowedIPs = [ "0.0.0.0/0" "::/0" ];
  #       endpoint = "78.46.102.47:51820";
  #       publicKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/daenerys/publickey));
  #       persistentKeepalive = 25;
  #     }
  #     {
  #       allowedIPs = [ "0.0.0.0/0" "::/0" ];
  #       endpoint = "78.46.102.47:51820";
  #       publicKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/cynthia/publickey));
  #       persistentKeepalive = 25;
  #     }
  #     {
  #       allowedIPs = [ "0.0.0.0/0" "::/0" ];
  #       endpoint = "78.46.102.47:51820";
  #       publicKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/magdalene/publickey));
  #       persistentKeepalive = 25;
  #     }
  #   ];
  #   postSetup = ''
  #     wg set wg0 fwmark 1234;
  #     ip rule add to 78.46.102.47 lookup main pref 30
  #     ip rule add to all lookup 80 pref 40
  #     ip route add default dev wg0 table 80
  #   '';
  #   postShutdown = ''
  #     # wg set wg0 fwmark 1234;
  #     ip rule delete to 78.46.102.47 lookup main pref 30
  #     ip rule delete to all lookup 80 pref 40
  #     ip route delete default dev wg0 table 80
  #   '';
  # };
  # TODO: daenerys
  # extraModulePackages = [ config.boot.kernelPackages.wireguard ];
  # kernelModules = [ "wireguard" ];
  # networking = {
  # nat = {
  #   enable = true;
  #   externalInterface = "eth0";
  #   internalInterfaces = [ "wg0" ];
  # };
	# firewall = { allowedUDPPorts = [ 51820 ]; };
  # wireguard.interfaces.wg0 = {
  #   ips = [ "192.168.2.1/24" ];
  #   listenPort = 51820;
  #   privateKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/daenerys/privatekey));
  #   peers = [
  #     {
  #       publicKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/caroline/publickey));
  #       allowedIPs = [ "192.168.2.2/32" ]; # "10.100.0.2/32" # 
  #     }
  #     {
  #       publicKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/cynthia/publickey));
  #       allowedIPs = [ "192.168.2.3/32" ]; # "10.100.0.2/32" # 
  #     }
  #     {
  #       publicKey = (lib.removeSuffix "\n" (builtins.readFile ../private/wireguard/magdalene/publickey));
  #       allowedIPs = [ "192.168.2.4/32" ]; # "10.100.0.2/32" # 
  #     }
  #   ];
  # };
  #};
}
