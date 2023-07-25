{ stdenv, lib, docker-compose }:
let
in
stdenv.mkDerivation rec {
  name = "fr.welfare";
  version = "0.0.1";

  src = builtins.fetchGit {
    url = "git@gitlab.com:pl.nawia/fr.welfarecard.git";
    ref = "master";
    rev = "eee21e5c26fbb9f789447cf025848fea189f9858";
  };

  installPhase = ''
    cp -r . $out
    mkdir -p $out/server/node_modules $out/client/website/node_modules $out/client/dashboard/node_modules
    rm -r $out/doc
  '';

  meta = with lib; {
    homepage = "http://welfarecard.fr";
  };
}
