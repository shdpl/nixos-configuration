{ stdenv, lib, docker-compose }:
let
in
stdenv.mkDerivation rec {
  name = "fr.welfare";
  version = "0.0.1";

  src = builtins.fetchGit {
    url = "git@gitlab.com:pl.nawia/fr.welfarecard.git";
    ref = "master";
    rev = "688d85a1ee626660e3027ef6d813ac3e036f2194";
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
