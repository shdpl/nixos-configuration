{ config, pkgs, lib, ... }:
with import <nixpkgs/lib>;
let
  hostname = "caroline";
  domain = "nawia.net";
in
{
	options.cluster = {
		hostname = mkOption {
			type = types.str;
		};
		domain = mkOption {
			type = types.str;
		};
	};
  config = (mkMerge [
    {
      swapDevices = lib.mkForce [ ];
      environment.systemPackages = with pkgs; [
        kubectl kubernetes-helm
      ];
      services.kubernetes = {
        roles = [ "master" "node" ];
        masterAddress = "${hostname}.${domain}";
      };
    }
	]);
}
