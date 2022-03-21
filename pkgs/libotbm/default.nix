{ fetchFromGitHub, stdenv, lib, dmd }:
stdenv.mkDerivation {
  name = "libotbm";
  # src = /home/shd/src/net.nawia/world/libotbm;
  src = fetchFromGitHub {
    "owner" = "shdpl";
    "repo" = "libotbm";
    "rev" = "c68b6cf0b970bedafe6183acde3ac64046be4a8a";
    "sha256" = "111klaylalb89di6sgpnr79nczkg3gbz059f5cn96qd5h9vizh57";
  };
  nativeBuildInputs = [ dmd ];

  buildPhase = ''
    dmd -lib -release -O src/otbm/common.d -H -Hdd/include/otbm src/otbm/otb.d  src/otbm/otbm.d  src/otbm/parser.d -oflib/libotbm.a
  '';

  installPhase = ''
    mkdir $out
    cp -r lib $out
    cp -r include $out
    cp -r d $out
  '';

  meta = with lib; {
    homepage = "https://github.com/shdpl/libotbm";
    description = "Library for reading/writing .otbm and .otb formats ";
  };
}
