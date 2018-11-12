{ config, pkgs, ... }:
{
  services.printing = {
    enable = true; #client
    drivers = [ pkgs.samsungUnifiedLinuxDriver ];
    # browsing = true; #server
    # listenAddresses = [ "*:631" ]; #server
    # defaultShared = true; #server
  };
  # networking.firewall = {
  #   allowedUDPPorts = [ 631 ]; #server
  #   allowedTCPPorts = [ 631 ]; #server
  # };
  services.avahi = {
    enable = true; # server,client
  #   publish = {
  #     enable = true; #server
  #     userServices = true; #server
  #   };
    nssmdns = true; #client
  };
}
