{
	services = {
		openssh = {
			enable = true;
			startWhenNeeded = true;
			passwordAuthentication = false;
			challengeResponseAuthentication = false;
		};
		fail2ban.enable = true;
	};
}
