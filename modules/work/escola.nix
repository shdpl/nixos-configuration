{ config, pkgs, ... }:
let
  #
in
{
  imports = [
  ../programming.nix
  ];

  options = {
    work.escola = {
      enable = mkOption {
        type = with types; bool;
        default = false;
      };
    };
  };

  config = (mkMerge [
		(mkIf (cfg.enable == true) {
      programming = {
        enable = true;
        php = true;
        js = true;
        docker = true;
      };
      # programs.zsh.enable = true;
      # programs.zsh.ohMyZsh = {
      #   enable = true;
      # };
      home-manager.users.shd.home.file = {
        ".ssh/escola_bitbucket".source = ../../private/ssh/escola_bitbucket;
        ".ssh/escola_bitbucket.pub".source = ../../data/ssh/escola_bitbucket.pub;
      };

      networking.firewall.allowedTCPPorts = [ 1000 ];
      # services.caddy = {
      #   enable = true;
      #   email = "shd@nawia.net";
      #   config =
      #     ''
      #       ulearn.nawia.net {
      #         reverse_proxy 127.0.0.1:1000
      #       }
      #     '';
      # };

      virtualisation.oci-containers = {
        containers = {
          laravel = {
            image = "laravelsail/php80-composer";
            imageFile = pkgs.dockerTools.pullImage {
              imageName = "laravelsail/php80-composer";
              imageDigest = "sha256:b387b05f2d55d32d9ab1b861b4bc8347f75b36ca2b259231a3359118682dabad";
              finalImageName = "laravelsail";
              finalImageTag = "latest";
              sha256 = "sha256:068qm14g7j8161bqmrnhgxd7466rbz5h0r4z5i7r4mzkqa6vfswm";
              os = "linux";
              arch = "x86_64";
            };
          };
        };
      };

    })
  ]);
}
