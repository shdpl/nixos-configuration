{ config, pkgs, lib, ... }:

let
  cfg = config.programming;
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

  config = (mkMerge [
    (mkIf (cfg.enable == true) {
      environment.systemPackages = with pkgs; [
        wireguard wireguard-tools
      ];
    })
    (mkIf (cfg.enable == true && cfg.host == "magdalene") {
      boot = {
        extraModulePackages = [ config.boot.kernelPackages.wireguard ];
        kernelModules = [ "wireguard" ];
        kernel.sysctl."fs.inotify.max_user_watches" = "1048576";
      };
      networking = {
        nameservers = [ "8.8.8.8" "8.8.4.4" ];
        firewall.allowedUDPPorts = [ 5555 ];
         wireguard.interfaces.wg0 = {
           ips = [ "192.168.2.4" ];
           listenPort = 5555;
           privateKey = (lib.removeSuffix "\n" (builtins.readFile ../../private/wireguard/magdalene/privatekey));
           allowedIPsAsRoutes = false;
           peers = [
             {
               allowedIPs = [ "0.0.0.0/0" "::/0" ];
               endpoint = "78.46.102.47:51820";
               publicKey = (lib.removeSuffix "\n" (builtins.readFile ../../private/wireguard/daenerys/publickey));
               persistentKeepalive = 25;
             }
             {
               allowedIPs = [ "0.0.0.0/0" "::/0" ];
               endpoint = "78.46.102.47:51820";
               publicKey = (lib.removeSuffix "\n" (builtins.readFile ../../private/wireguard/caroline/publickey));
               persistentKeepalive = 25;
             }
             {
               allowedIPs = [ "0.0.0.0/0" "::/0" ];
               endpoint = "78.46.102.47:51820";
               publicKey = (lib.removeSuffix "\n" (builtins.readFile ../../private/wireguard/cynthia/publickey));
               persistentKeepalive = 25;
             }
           ];
           postSetup = ''
             wg set wg0 fwmark 1234;
             ip rule add to 78.46.102.47 lookup main pref 30
             ip rule add to all lookup 80 pref 40
             ip route add default dev wg0 table 80
           '';
           postShutdown = ''
             # wg set wg0 fwmark 1234;
             ip rule delete to 78.46.102.47 lookup main pref 30
             ip rule delete to all lookup 80 pref 40
             ip route delete default dev wg0 table 80
           '';
         };
      };
    })
  ]);

}
