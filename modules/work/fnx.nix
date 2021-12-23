{ config, pkgs, lib, ... }:
let
  cfg = config.fnx;
in
with lib; 
{
  imports =
    [
      ../programming.nix
    ];

  options = {
    fnx = {
      enable = mkOption {
        type = with types; bool;
        default = false;
      };
      user = mkOption {
        type = with types; str;
      };
      gitlabAccessTokens = mkOption {
        type = with types; str;
      };
    };
  };

  config = (mkMerge [
		(mkIf (cfg.enable == true) {
      programming = {
        enable = true;
        user = cfg.user;
        gitlabAccessTokens = cfg.gitlabAccessTokens;
        js = true;
        php = true;
        docker = true;
      };
    })
  ]);
}
