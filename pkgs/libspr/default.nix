{ lib, buildGoModule, fetchFromGitHub }:

buildGoModule rec {
  name = "libspr";
  src = /home/shd/src/net.nawia/world/libspr;
  # src = fetchFromGitHub {
  #   owner = "shdpl";
  #   repo = "libotbm";
  #   rev = "6b25359d8a70168bbd015b440b09cec6328d6500";
  #   sha256 = "sha256-IybFA/M5JLDbVBeG8BiNXX7irTIzZs/m841DO9RSPrI";
  # };

  vendorSha256 = null;

  buildPhase = ''
    go build -buildmode=c-archive -o libspr.a main.go
  '';

  checkPhase = "";

  postInstall = ''
    mkdir $out/lib
    cp libspr.a $out/lib/libspr.a

    mkdir $out/include
    cp libspr.h $out/include/spr.h
  '';

  meta = with lib; {
    homepage = "https://github.com/shdpl/libspr";
    description = "Library for reading .spr data format";
  };
}
