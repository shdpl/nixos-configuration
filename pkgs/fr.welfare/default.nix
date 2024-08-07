{
  stdenv,
  lib,
  docker-compose,
  ref ? "WEEKLY-2023_09_28",
  rev
}:
let
in
stdenv.mkDerivation rec {
  name = "fr.welfare";
  version = "0.0.1";

  src = builtins.fetchGit {
    url = "git@gitlab.com:pl.nawia/fr.welfarecard.git";
    submodules = true;
    ref = ref;
    rev = rev;
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
