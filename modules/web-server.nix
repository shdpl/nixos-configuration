{ config, pkgs, ... }:

{
  networking.firewall.allowedTCPPorts = [ 80 443 ];
  services.nginx = {
    enable = true;
    httpConfig = ''
      server {
        listen 443 ssl;
        server_name www.nawia.net;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_certificate ${../private/ca/mail.nawia.net.crt};
        ssl_certificate_key ${../private/ca/mail.nawia.net.key};
        ssl_client_certificate ${../private/ca/nawia.net.pem};
        ssl_verify_client on;

        root /var/www;
        location /dl {
          autoindex on;
        }
        location /syncthing/ {
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_pass http://localhost:8384/;
        }
        location /deluge {
          proxy_pass http://localhost:8112/;
          proxy_set_header X-Deluge-Base "/deluge/";
        }
        location /ntopng/ {
          proxy_pass http://localhost:3000/;
        }
      }
			server {
        listen 80;
        server_name cache.nix.nawia.net;

        location / {
          proxy_pass http://localhost:5000/;
        }
			}
    '';
  };
}
