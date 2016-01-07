{ config, pkgs, lib, ... }:
with lib;
{
  imports = [
  ];
  options = {
    workstation = {
      enable = mkOption {
        default = false;
        type = with types; bool;
        description = ''
          Whether users are managed by the following module.
        '';
      };
      users = mkOption {
        default = [];
        type = with types; listOf attrs;
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
		})
		(mkIf cfg.enable && cfg.wheelIsRoot {
		})
	]);
}
