{ lib, ... }:
with lib;
{
  imports = [
    /*../modules/web-server.nix*/
  ];
  options.ssh = {
    vhost = mkOption {
      type = types.str;
      default = "";
    };
    path = mkOption {
      type = types.str;
      default = "/shell/";
    };
  };
  config = (mkMerge [
    (mkIf true {
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
          settings = {
            PermitRootLogin = "yes";
            PasswordAuthentication = false;
            KbdInteractiveAuthentication = false;
          };
        };
        fail2ban.enable = true;
      };
    })
  ]);
}
