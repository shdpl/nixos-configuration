{ config, lib, ... }:
with lib;
let
  cfg = config.oci-registry;
in
  {
    options.oci-registry = {
      enable = mkEnableOption {};
      vhost = mkOption {
        type = types.str;
      };
      authTokenRealm = mkOption {
        type = types.str;
      };
      authTokenService = mkOption {
        type = types.str;
      };
      authTokenIssuer = mkOption {
        type = types.str;
      };
      authTokenRootCertBundle = mkOption {
        type = types.path;
      };
      # path = mkOption {
      #   type = types.str;
      #   default = "/oci-registry/";
      # };
  };
  config = (mkMerge [
    (mkIf (cfg != null && cfg.enable == true) {
      services.dockerRegistry = {
        enable = true;
        extraConfig = {
          auth.token = {
            realm = cfg.authTokenRealm;
            service = cfg.authTokenService;
            issuer = cfg.authTokenIssuer;
            rootcertbundle = cfg.authTokenRootCertBundle;
          };
        };
      };
    })
    (mkIf (cfg.vhost != "" && cfg.enable == true) {
      services.nginx.virtualHosts.${cfg.vhost} = {
        forceSSL = true;
        enableACME = true;
        locations."/" = {
          proxyPass = "http://localhost:5000";
          extraConfig = "client_max_body_size 0;";
        };
      };
    })
  ]);
}
