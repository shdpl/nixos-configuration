{ config, pkgs, lib, ... }:
let
  cfg = config.fnx;
	dir = "/usr/src/fnx"; #$HOME/src/pl.nawia/fnx/journals /home/${cfg.user}/src/pl.nawia/fnx/journals
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
			system.userActivationScripts.fnx-recrutation = ''
			if [ ! -d "${dir}" ]; then
				mkdir -p ${dir}
				${pkgs.git}/bin/git clone git@gitlab.com:shdpl/fnx.git ${dir}
				cd ${dir} && ${pkgs.phpPackages.composer}/bin/composer install
				${pkgs.php80}/bin/php ${dir}/bin/migrate.php
			fi;
			'';
			services.phpfpm = {
				phpPackage = pkgs.php80.withExtensions ({ all, ... }: with all; [ session pdo pdo_sqlite ]);
				pools.fnx-recrutation = {
					user = "${cfg.user}";
					group = "users";
					phpOptions = ''error_log = "syslog"'';
					settings = {
						"pm" = "dynamic";
						"pm.max_children" = 32;
						"pm.start_servers" = 2;
						"pm.min_spare_servers" = 2;
						"pm.max_spare_servers" = 4;
						"pm.max_requests" = 500;
						"listen.owner" = "wwwrun";
						"listen.group" = "wwwrun";
						"access.log" = "/var/log/fpm-access.log";
					};
				};
			};
			services.httpd = {
				enable = true;
				extraModules = [ "proxy_fcgi" ];
				adminAddr = "shd@nawia.net";
				virtualHosts.localhost = {
					documentRoot = dir;
					extraConfig = ''
						<Directory ${dir}>

							<FilesMatch "\.php$">
								SetHandler "proxy:unix:${config.services.phpfpm.pools.fnx-recrutation.socket}|fcgi://localhost/"
							</FilesMatch>

							<IfModule mod_rewrite.c>
								RewriteEngine on
								RewriteCond %{REQUEST_URI}  "^(?!/js/)"
								RewriteCond %{REQUEST_URI}  "^(?!/css/)"
								RewriteCond %{REQUEST_URI}  "^(?!/html/)"
								RewriteCond %{REQUEST_FILENAME} !=${dir}/index.php
								RewriteRule ^.*$ /index.php [L,QSA]
							</IfModule>

							DirectoryIndex index.php;

						</Directory>
					'';
        };
      };
    })
  ]);
}
