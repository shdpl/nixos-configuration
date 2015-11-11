{
	networking.firewall = {
		allowedTCPPorts = [ 22 ];
		allowedUDPPortRanges = [
			{ from = 60000; to = 61000; } # mosh
		];
	};
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
