{ config, pkgs, ... }:
{
  networking.firewall = {
    allowedTCPPorts = [ 53 ];
    allowedUDPPorts = [ 53 ];
  };
  tor = {
  	enable = true;
  	relay = {
  		enable = true;
  		#isBridge = true;
  		isExit = true;
  		portSpec = "53";
  	};
  };
}
