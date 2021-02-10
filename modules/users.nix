{ config, pkgs, lib, ... }:
let
  cfg = config.aaa;
in
with lib;
{
  imports = [];
  options = {
    aaa = {
      enable = mkOption {
        default = false;
        type = with types; bool;
        description = ''
          Whether users are managed by the following module.
        '';
      };
      users = mkOption {
        default = [];
        type = with types; listOf unspecified;
        description = ''
          Users definitions.
        '';
      };
      wheelIsRoot = mkOption {
        default = true;
        type = with types; bool;
        description = ''
          Whether to grant root access for wheel users.
        '';
      };
    };
  };

  config = (mkMerge [
		(mkIf cfg.enable {
		 users.mutableUsers = false;
/* FIXME: multi-user support
		  users.users = (map
				(u:
					{
						name = (builtins.getAttr "name" u);
						extraGroups = (builtins.getAttr "groups" u);
						isNormalUser = true;
            # initialHashedPassword = (builtins.getAttr "initialHashedPassword" u);
            # hashedPassword = (builtins.getAttr "hashedPassword" u);
            # password = (builtins.getAttr "password" u);
						openssh.authorizedKeys.keys = [(builtins.getAttr "pubkey" u)];
            password = (builtins.getAttr "password" u);
					}
				)
				cfg.users
			);
*/
		users.users = {
			"shd" = {
				extraGroups = [ "wheel" "docker" "kubernetes" "systemd-journal" "vboxusers" "wireshark" "libvirtd" "adbusers" "video" "disk" ];
				isNormalUser = true;
				openssh.authorizedKeys.keys = [(builtins.readFile ../data/ssh/id_ed25519.pub)];
			};
		};
		})
		(mkIf (cfg.enable && cfg.wheelIsRoot) {
      users.extraUsers.root.openssh.authorizedKeys.keys = (map (builtins.getAttr "pubkey") cfg.users);
			security = {
				sudo = {
					enable = true;
					wheelNeedsPassword = false;
					extraConfig = "Defaults:root,%wheel env_keep+=EDITOR";
				};
				polkit = {
					enable = true;
					extraConfig = ''
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
			};
		})
	]);
}
