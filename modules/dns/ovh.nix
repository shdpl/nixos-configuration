{ config, lib, ... }:

let
  cfg = config.dns;
in
  with lib;
  with types;
  {
    options = {
      dns = {
        ddns = mkOption {
          default = false;
          type = bool;
          description = ''
            Notify DNS system about our current IP through DDNS protocol.
          '';
        };
        host = mkOption {
          default = null;
          type = str;
          description = ''
            Host name
          '';
        };
        domain = mkOption {
          default = "nawia.net";
          type = str;
          description = ''
            Domain address
          '';
        };
        extraHosts = mkOption {
          default = [ ];
          type = listOf str;
          description = ''
            List of extra fqdns to attach to the host.
          '';
        };
        server = mkOption {
          default = "www.ovh.com";
          type = str;
          description = ''
            DDNS provider host
          '';
        };
        username = mkOption {
          default = null;
          type = path;
          description = ''
            DDNS provider username file
          '';
        };
        password = mkOption {
          default = null;
          type = path;
          description = ''
            DDNS provider password file
          '';
        };
        interface = mkOption {
          default = "enp1s0";
          type = str;
          description = ''
            Interface to fetch ip from
          '';
        };
      };
    };

    config = mkIf cfg.ddns {
      services.ddclient = {
        enable = true;
        protocol = "ovh";
        domains = [ "${cfg.host}.${cfg.domain}" ] ++ cfg.extraHosts;
        server = cfg.server;
        username = (builtins.readFile cfg.username);
        passwordFile = (builtins.toFile "ddns" (builtins.readFile cfg.password)); # FIXME
        usev4 = "ifv4, ifv4="+cfg.interface;
        usev6 = "ifv6, ifv6="+cfg.interface;
        ssl = false;
        verbose = true;
      };
    };
  }
