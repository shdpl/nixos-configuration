{
  networking.firewall.allowedTCPPorts = [ 22000 ];
	services.syncthing = {
		enable = true;
		user = "shd";
	};
}
