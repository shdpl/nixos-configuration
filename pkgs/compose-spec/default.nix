{ stdenv, lib, fetchFromGitHub, pkgs }:
stdenv.mkDerivation rec {
  name = "compose-spec";

  src = fetchFromGitHub {
    owner = "compose-spec";
    repo = "compose-spec";
    rev = "95f8b4f9dc3030323b4eb840abb7bc40a81d49b1";
    sha256 = "sha256-dPWuDPgBo+yFVz44vFGTE7Xa3AMYuNzYFjpTY8+y/5M=";
  };

  phases = [ "installPhase" ];

  installPhase = ''
    mkdir -p $out/share/doc/compose-spec/
    cp $src/*.md $out/share/doc/compose-spec/
  '';

  meta = with lib; {
    homepage = "https://compose-spec.io/";
    description = "The Compose specification establishes a standard for the definition of multi-container platform-agnostic applications.";
    license = [ licenses.asl20 ];
  };
}
