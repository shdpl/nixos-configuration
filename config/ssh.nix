{
	networking.firewall.allowedTCPPorts = [ 22 ];
	services = {
		openssh = {
			enable = true;
			/*startWhenNeeded = true;*/
			passwordAuthentication = false;
			challengeResponseAuthentication = false;
			permitRootLogin = "no";
		};
		fail2ban.enable = true;
	};
}
