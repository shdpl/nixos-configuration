{ fetchFromGitHub, stdenv, lib, callPackage, dmd }:
let
  libotbm = callPackage /home/shd/src/nixos-configuration/pkgs/libotbm/default.nix {};
in
stdenv.mkDerivation {
  name = "otbmtool";
  src = /home/shd/src/net.nawia/world/libotbm;
  # src = fetchFromGitHub {
  #   owner = "shdpl";
  #   repo = "libotbm";
  #   rev = "6b25359d8a70168bbd015b440b09cec6328d6500";
  #   sha256 = "sha256-IybFA/M5JLDbVBeG8BiNXX7irTIzZs/m841DO9RSPrI";
  # };
  nativeBuildInputs = [ dmd libotbm ];

  buildPhase = ''
    dmd -release -O -L-L${libotbm}/lib -L-lotbm -I${libotbm}/include src/tool.d  -ofbin/otbm
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
