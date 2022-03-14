{ fetchFromGitHub, stdenv, lib, dmd }:
stdenv.mkDerivation {
  name = "libotbm";
  # src = /home/shd/src/net.nawia/world/windows/libotbm;
  src = fetchFromGitHub {
    owner = "shdpl";
    repo = "libotbm";
    rev = "6b25359d8a70168bbd015b440b09cec6328d6500";
    sha256 = "sha256-IybFA/M5JLDbVBeG8BiNXX7irTIzZs/m841DO9RSPrI";
  };
  nativeBuildInputs = [ dmd ];

  buildPhase = ''
    dmd -lib -release -O -H -Hdinc/otbm src/otbm/common.d  src/otbm/otb.d  src/otbm/otbm.d  src/otbm/parser.d -oflib/libotbm.a
  '';

  installPhase = ''
    mkdir $out
    cp -r lib $out/lib/
    cp -r inc $out/include
  '';

  meta = with lib; {
    homepage = "https://github.com/shdpl/libotbm";
    description = "Library for reading/writing .otbm and .otb formats ";
  };
}
