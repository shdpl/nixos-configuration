{ config, pkgs, ... }:
let
  searxConfigFile = toString (builtins.toFile "searx.yml" (builtins.readFile ../private/searx.yml));
in
{
  webServer.vhosts."www.nawia.net".paths."/".config = ''
    proxy_pass              http://localhost:8888/;
    proxy_set_header        Host                 $host;
    proxy_set_header        X-Real-IP            $remote_addr;
    proxy_set_header        X-Forwarded-For      $proxy_add_x_forwarded_for;
    proxy_set_header        X-Remote-Port        $remote_port;
    proxy_set_header        X-Forwarded-Proto    $scheme;
    proxy_redirect          off;
  '';
  services.searx = {
    enable = true;
    /*configFile = searxConfigFile;*/
  };
}
