{ config, lib, pkgs, serverInfo, php, ... }:

with lib;

let
  wordpressConfig = pkgs.writeText "wp-config.php" ''
    <?php
    define('DB_NAME',     '${config.dbName}');
    define('DB_USER',     '${config.dbUser}');
    define('DB_PASSWORD', file_get_contents('${config.dbPasswordFile}'));
    define('DB_HOST',     '${config.dbHost}');
    define('DB_CHARSET',  'utf8');
    $table_prefix  = '${config.tablePrefix}';
    define('AUTOMATIC_UPDATER_DISABLED', true);
    ${config.extraConfig}
    if ( !defined('ABSPATH') )
      define('ABSPATH', dirname(__FILE__) . '/');
    require_once(ABSPATH . 'wp-settings.php');
  '';
  pkgs.stdenv.mkDerivation = rec {
    name = "wordpress";
    src = config.package;
    installPhase = ''
      mkdir -p $out
      # copy all the wordpress files we downloaded
      cp -R * $out/

      # symlink the wordpress config
      ln -s ${wordpressConfig} $out/wp-config.php
      # symlink custom .htaccess
      ln -s ${htaccess} $out/.htaccess
      # symlink uploads directory
      ln -s ${config.wordpressUploads} $out/wp-content/uploads

      # remove bundled plugins(s) coming with wordpress
      rm -Rf $out/wp-content/plugins/*
      # remove bundled themes(s) coming with wordpress
      rm -Rf $out/wp-content/themes/*

      # symlink additional theme(s)
      ${concatMapStrings (theme: "ln -s ${theme} $out/wp-content/themes/${theme.name}\n") config.themes}
      # symlink additional plugin(s)
      ${concatMapStrings (plugin: "ln -s ${plugin} $out/wp-content/plugins/${plugin.name}\n") (config.plugins) }

      # symlink additional translation(s)
      mkdir -p $out/wp-content/languages
      ${concatMapStrings (language: "ln -s ${language}/*.mo ${language}/*.po $out/wp-content/languages/\n") (selectedLanguages) }
    '';
  };

in
 
{
}
