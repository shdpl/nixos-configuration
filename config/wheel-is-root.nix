{
	security = {
		sudo = {
			enable = true;
			wheelNeedsPassword = false;
		};
		polkit.extraConfig = ''
			/* Allow members of the wheel group to execute any actions
			 * without password authentication, similar to "sudo NOPASSWD:"
			 */
			polkit.addRule(function(action, subject) {
					if (subject.isInGroup("wheel")) {
							return polkit.Result.YES;
					}
			});
		'';
	};
}
