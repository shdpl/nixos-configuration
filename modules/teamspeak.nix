{ config, pkgs, lib, ... }:
{
	services.teamspeak3.enable = true;
	networking.firewall = {
		allowedTCPPorts = [ 30033 10011 41144 ];
		allowedUDPPorts = [ 9987 ];
	};
}
