{ stdenv, lib, docker-compose }:
let
in
stdenv.mkDerivation rec {
  name = "fr.welfare";
  version = "0.0.1";

  src = builtins.fetchGit {
    url = "git@gitlab.com:pl.nawia/fr.welfarecard.git";
    ref = "master";
    rev = "e210d95b1b5e95d46bc9feea41ff33e692b890c7";
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
