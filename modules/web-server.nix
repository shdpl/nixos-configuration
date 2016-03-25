{ config, pkgs, ... }:

with import <nixpkgs/lib>;

let

  vhosts = attrValues config.webServer.vhosts;
  pathToConfig = path: ''
  location ${path.location} {
    ${path.config}
  }
  '';
  vhostToPort = { ssl, ... }: if ssl then 443 else 80;
  vhostToConfig = vhost: ''
    server {
      listen ${toString (vhostToPort vhost)} ${optionalString (vhost.ssl) '' ssl''};
      server_name ${vhost.host};

      ${optionalString (vhost.ssl) ''
      ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
      ssl_certificate ${../private/ca/mail.nawia.net.crt};
      ssl_certificate_key ${../private/ca/mail.nawia.net.key};
      ssl_client_certificate ${../private/ca/nawia.net.pem};
      ssl_verify_client on;
      ''}

      ${optionalString (vhost.root != null) ''
        root ${vhost.root};
      ''}

      ${concatStringsSep "\n" (map pathToConfig (attrValues vhost.paths))}
    }
  '';
  pathsOpts = { name, config, ... }: {
    options = {
      location = mkOption {
        type = types.str;
      };
      config = mkOption {
        type = types.str;
      };
    };
    config = {
      location = mkDefault name;
    };
  };
  vhostsOpts = { name, config, ... }: {
    options = {
      host = mkOption {
        type = types.str;
      };
      ssl = mkOption {
        type = types.bool;
        default = false;
      };
      root = mkOption {
        type = types.nullOr types.path;
        default = null;
      };
      paths = mkOption {
        type = types.loaOf types.optionSet;
        default = {};
        options = [ pathsOpts ];
      };
    };
    config = {
      host = mkDefault name;
    };
  };

in

{
  options = {
    webServer = {
      vhosts = mkOption {
        type = types.loaOf types.optionSet;
        default = {};
        options = [ vhostsOpts ];
      };
    };
  };

  config = mkIf (vhosts != []) {
    networking.firewall.allowedTCPPorts = [ 80 443 ]; #FIXME: has any ssl
    services.nginx = {
      enable = true;
      httpConfig = (concatStringsSep "\n" (map vhostToConfig vhosts));
    };
  };
}
