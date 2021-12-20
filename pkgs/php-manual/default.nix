{ fetchgit, stdenv, lib, php80 }:
let
  doc-en = fetchgit {
    url = "https://github.com/php/doc-en";
    # owner = "php";
    # repo = "doc-en";
    rev = "65d4ecb42e75a180eb8964968c230b09d81d3601";
    sha256 = "sha256-ZiZ7CLPry9itCEK0zDzVnJ17tGklCKrmky14DTAk8ws=";
  };
  doc-base = fetchgit {
    url = "https://github.com/php/doc-base";
    # owner = "php";
    # repo = "doc-base";
    rev = "d6a6dd152187ac935ee077f3f5ff958e1a9bf920";
    sha256 = "sha256-FRkAdDeun4NnBSurfhTuvGsySlcuZYPXJ0VKxh4p2Gg=";
  };
  phd = fetchgit {
    url = "https://github.com/php/phd";
    # owner = "php";
    # repo = "phd";
    rev = "d1e00445df49009d8e61769e022bdde1fc4de527";
    sha256 = "sha256-z61bdAtOJoYKSmciCoMMRYDn/vme2+ZwkKLjEbLaXOc=";
  };
in
stdenv.mkDerivation rec {
  name = "php-manual";

  # DOM, libXML2, XMLReader, and SQLite3
  srcs = [ doc-en doc-base phd ];

  buildInputs = [ php80 ];

  unpackPhase = ''
      runHook preUnpack

      cp -r ${doc-en} en
      cp -r ${doc-base} ./doc-base
      cp -r ${phd} ./phd

      chmod -R u+w -- .

      runHook postUnpack
  '';

  configurePhase = ''
    php doc-base/configure.php
  '';

  buildPhase = ''
    php phd/render.php --docbook doc-base/.manual.xml -P Generic -f manpage
    php phd/render.php --docbook doc-base/.manual.xml -P PHP -f manpage

    php phd/render.php --docbook doc-base/.manual.xml -P Generic -f bigxhtml
    php phd/render.php --docbook doc-base/.manual.xml -P PHP -f bigxhtml
  '';

  installPhase = ''
    mkdir -p $out/share/man/man3

    cp -rv output/generic-unix-manual-pages/* $out/share/man/man3
    cp -rv output/php-functions/* $out/share/man/man3

    mkdir -p $out/share/doc/php/manual/

    cp -rv output/big-xhtml.html output/big-xhtml-data $out/share/doc/php/manual/
    cp -rv output/php-bigxhtml.html output/php-bigxhtml-data/ $out/share/doc/php/manual/
  '';

  meta = with lib; {
    homepage = "http://doc.php.net";
    description = "Manual pages for the PHP programming language";
    license = [ licenses.php301 licenses.mit ];
  };
}
