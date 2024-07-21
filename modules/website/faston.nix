{ config, pkgs, lib, ... }:
with lib;
let
	cfg = config.website.faston;
in
{
  options.website.faston = {
    enable = mkOption {
      type = with types; bool;
      default = false;
    };
  };

  config = (mkMerge [
		(mkIf (cfg.enable == true) {
      nixpkgs.config.packageOverrides = pkgs: with pkgs; {
        myPackages = pkgs.buildEnv {
          name = "my-packages";
          paths = [
            aspell
            bc
            coreutils
            gdb
            ffmpeg
            nixUnstable
            emscripten
            jq
            nox
            silver-searcher
          ];
        };
      };
      # networking.firewall.allowedTCPPorts = [ 8080 ];
      # environment.systemPackages = with pkgs;
      # [
      #   php80 php80Packages.composer
      # ];

      # virtualisation.oci-containers.containers = {
      #   www = {
      #     image = "php:8.0-cli"; #FIXME: download time exceeds TimeoutStartSec
      #     imageFile = pkgs.dockerTools.pullImage {
      #       imageName = "mysql";
      #       imageDigest = "sha256:52431ae274bf5d43d4ebf9f0ec942fcbd7280ae64339fe07967ce5fd20e4d569";
      #       finalImageName = "php:";
      #       finalImageTag = "8.0-cli";
      #       sha256 = "sha256-GpkZCbdYFXyfwvmGBoE4GgYllAcoG+1yWqaIaqOiBkQ=";
      #       os = "linux";
      #       arch = "x86_64";
      #     };
      #     environment = import ../../private/fnx/introduction/.env.nix;
      #     user = "100033";
      #     ports = [ "3306:3306" ];
      #   };
      # };
    })
  ]);
}
