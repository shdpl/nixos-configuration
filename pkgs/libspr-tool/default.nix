{ fetchFromGitHub, stdenv, lib, callPackage }:
let
  libspr = callPackage /home/shd/src/nixos-configuration/pkgs/libspr/default.nix {};
in
stdenv.mkDerivation {
  name = "sprtool";
  src = /home/shd/src/net.nawia/world/libspr-tool;
  # src = fetchFromGitHub {
  #   owner = "shdpl";
  #   repo = "libotbm";
  #   rev = "6b25359d8a70168bbd015b440b09cec6328d6500";
  #   sha256 = "sha256-IybFA/M5JLDbVBeG8BiNXX7irTIzZs/m841DO9RSPrI";
  # };
  nativeBuildInputs = [ libspr ];

  buildPhase = ''
    mkdir bin
    gcc -L${libspr}/lib -I${libspr}/include main.c -lspr -lpthread -obin/spr
  '';

  installPhase = ''
    mkdir $out
    cp -r bin $out/bin
  '';

  meta = with lib; {
    homepage = "https://github.com/shdpl/libotbm";
    description = "Library for reading/writing .otbm and .otb formats ";
  };
}
