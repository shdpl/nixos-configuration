{ config, pkgs, lib, ... }:

let
	cfg = config.user;
in

with lib;

{
  options = {
    user.shd = {
      enable = mkEnableOption "user";
    };
  };
  config = mkIf cfg.shd.enable {
    users.extraUsers = {
      shd = {
        extraGroups = [ "wheel" ];
        isNormalUser = true;
        openssh.authorizedKeys.keys = [
          "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAIEAmNhcSbjZB3BazDbmmtqPCDzVd+GQBJI8WAoZNFkveBGC0zznUCdd78rrjke5sDRBVCIqKABCx5iwU4VM1zVWZfWlsf6HEbhyUVdWmKgylG7Mchg2dkJUfTHx/VLnE1gDqc1+9SSs88q6H+IO4Kex853Q7eUo9Cmsi8TUn9rthME="
        ];
      };
    };
  };
}
