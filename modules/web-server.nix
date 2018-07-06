{ config, pkgs, lib, ... }:

with import <nixpkgs/lib>;

let
in
{
  options = {
    webServer = {
      virtualHosts = mkOption {
        type = types.attrsOf (types.submodule (import <nixpkgs/nixos/modules/services/web-servers/nginx/vhost-options.nix> {
          inherit lib;
          inherit config;
        }));
        default = {
          localhost = {};
        };
        example = literalExample ''
          {
            "hydra.example.com" = {
              forceSSL = true;
              enableACME = true;
              locations."/" = {
                proxyPass = "http://localhost:3000";
              };
            };
          };
        '';
        description = "Declarative vhost config";
      };
    };
  };

  config = mkIf (attrValues config.webServer.virtualHosts != []) {
    networking.firewall.allowedTCPPorts = [ 80 443 ]; #FIXME: has any ssl
    services.nginx = {
      enable = true;
			statusPage = true;
			virtualHosts = config.webServer.virtualHosts;
    };
		services.phpfpm.poolConfigs.nginx = ''
			listen = /run/phpfpm/nginx
			listen.owner = nginx
			listen.group = nginx
			listen.mode = 0660
			user = nginx
			pm = dynamic
			pm.max_children = 75
			pm.start_servers = 10
			pm.min_spare_servers = 5
			pm.max_spare_servers = 20
			pm.max_requests = 500
			php_flag[display_errors] = on
			php_admin_value[error_log] = "/run/phpfpm/php-fpm.log"
			php_admin_flag[log_errors] = on
			php_value[date.timezone] = "UTC"
			php_value[upload_max_filesize] = 10G
			env[PATH] = /var/www/bin:/var/setuid-wrappers:/var/www/.nix-profile/bin:/var/www/.nix-profile/sbin:/nix/var/nix/profiles/default/bin:/nix/var/nix/profiles/default/sbin:/run/current-system/sw/bin/run/current-system/sw/sbin
		'';
  };
}
