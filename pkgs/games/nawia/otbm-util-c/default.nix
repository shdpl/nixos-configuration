{ fetchFromGitLab, stdenv, lib, callPackage, dmd }:
let
  libotbm = callPackage ../../../libotbm/default.nix {};
in
stdenv.mkDerivation {
  name = "otbm-util-c";

  # src = /home/shd/src/net.nawia/world/otbm-util-c;
  src = fetchFromGitLab {
    owner = "nawia";
    repo = "otbm-util-c";
    rev = "557a07fb484064a9ba8f9806c73e742ed89b3fda";
    sha256 = "sha256:029bxq77w66bz4bn8hpy8nr9azq0c9jbds0mbf471l2s19h0a67x";
  };

  nativeBuildInputs = [ libotbm dmd ];

  meta = with lib; {
    homepage = "https://gitlab.com/nawia/otbmtool-c";
    description = "OTBM tool interface created in C language";
  };
}
