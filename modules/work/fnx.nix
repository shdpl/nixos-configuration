{ config, pkgs, lib, ... }:
let
  cfg = config.fnx;
in
with lib; 
{
  imports =
    [
      ../programming.nix
    ];

  options = {
    fnx = {
      enable = mkOption {
        type = with types; bool;
        default = false;
      };
      user = mkOption {
        type = with types; str;
      };
      gitlabAccessTokens = mkOption {
        type = with types; str;
      };
      recrutation = mkOption {
        type = with types; bool;
        default = true;
      };
    };
  };

  config = (mkMerge [
		(mkIf (cfg.enable == true) {
      programming = {
        enable = true;
        user = cfg.user;
        gitlabAccessTokens = cfg.gitlabAccessTokens;
        js = true;
        php = true;
        docker = true;
      };
    })
		(mkIf (cfg.recrutation == true) {
      system.userActivationScripts.fnx-journals = ''
      if [ ! -d "$HOME/src/pl.nawia/fnx" ]; then
        mkdir -p $HOME/src/pl.nawia/fnx
        ${pkgs.git}/bin/git clone git@gitlab.com:shdpl/fnx.git $HOME/src/pl.nawia/fnx/journals
        cd $HOME/src/pl.nawia/fnx/journals && ${pkgs.phpPackages.composer}/bin/composer install
      fi;
      '';
      services.httpd = {
        enable = true;
        user = "shd";
        group = "users";
        enablePHP = true;
        phpPackage = pkgs.php80.withExtensions ({ all, ... }: with all; [ session pdo pdo_sqlite ]);
        adminAddr = "shd@nawia.net";
        virtualHosts.localhost = {
          documentRoot = "/home/${cfg.user}/src/pl.nawia/fnx/journals";
          locations."/" = {
            index = "/index.php";
            extraConfig = ''
              <IfModule mod_rewrite.c>
                RewriteEngine on
                RewriteCond %{REQUEST_URI}  "^(?!/js/)"
                RewriteCond %{REQUEST_URI}  "^(?!/css/)"
                RewriteCond %{REQUEST_URI}  "^(?!/html/)"
                RewriteCond %{REQUEST_FILENAME} !=/home/${cfg.user}/src/pl.nawia/fnx/journals/index.php
                RewriteRule ^.*$ /index.php [L,QSA]
              </IfModule>
            '';
          };
        };
      };
      # systemd.user.services.Service clone?
      systemd.services.httpd.serviceConfig.StateDirectory = "httpd";
      systemd.services.httpd-migrate = {
        enable = true;
        wantedBy = [ "httpd.service" ];
        serviceConfig = {
          User = "shd";
          Group = "users";
          Type = "oneshot";
          StateDirectory = "httpd";
          ExecStart = "${pkgs.php80}/bin/php /home/${cfg.user}/src/pl.nawia/fnx/journals/bin/migrate.php";
        };
      };
    })
  ]);
}
