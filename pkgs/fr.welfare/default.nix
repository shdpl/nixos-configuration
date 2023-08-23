{ stdenv, lib, docker-compose }:
let
in
stdenv.mkDerivation rec {
  name = "fr.welfare";
  version = "0.0.1";

  src = builtins.fetchGit {
    url = "git@gitlab.com:pl.nawia/fr.welfarecard.git";
    ref = "master";
    rev = "d7a81ac597261cce386a9deb160d2975ad637116";
  };

  installPhase = ''
    cp -r . $out
    mkdir -p $out/server/node_modules $out/client/website/node_modules $out/client/dashboard/node_modules
    rm -r $out/doc
  '';

  dontPatchShebangs = true;

  meta = with lib; {
    homepage = "http://welfarecard.fr";
  };
}
