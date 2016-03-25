{ config, pkgs, ... }:
{
  networking.firewall = {
    /*allowedTCPPorts = [ 9091 ];*/
    allowedTCPPortRanges = [
      { from = 8000; to = 8100; }
    ];
    allowedUDPPortRanges = [
      { from = 8000; to = 8100; }
    ];
  };
  webServer.vhosts."www.nawia.net".paths."/transmission" = ''
    proxy_set_header    X-Real-IP  $remote_addr;
    proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header    Host $http_host;
    proxy_redirect      off;
    proxy_pass  http://localhost:9091/transmission;
  '';
  services.transmission = {
    enable = true;
    settings = {
      start-added-torrents = true;
      lpd-enabled = true;
      peer-port = 8000;
      peer-port-random-low = 8001;
      peer-port-random-high = 8100;
      peer-port-random-on-start = true;
      rpc-bind-address = "127.0.0.1";
      rpc-enabled = true;
      rpc-whitelist-enabled = false;
      rpc-authentication-required = true;
      rpc-username = builtins.readFile ../private/transmission/username;
      rpc-password = builtins.readFile ../private/transmission/password;
    };
  };
}
