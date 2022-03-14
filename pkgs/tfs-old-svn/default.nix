{ callPackage, fetchFromGitHub, stdenv, lib, pkg-config, libxml2, openssl_1_1, luajit, sqlite, autoreconfHook }:
let
  boost149 = (callPackage ../legacy/boost/1.49.nix {});
in
stdenv.mkDerivation rec {
  name = "tfs-old-svn";

  src = fetchFromGitHub {
    owner = "otland";
    repo = "tfs-old-svn";
    rev = "2f9e8413bf260dccf9788aa4e556fa24242c1d2d";
    sha256 = "sha256:0p9adks9383167md2vgrhwax6cw292xczr8s65z0mrl2qg4n4lnx";
  };

  buildInputs = [ pkg-config boost149 libxml2 openssl_1_1 luajit sqlite ];

  nativeBuildInputs = [ autoreconfHook ];

  configureFlags = [ "--enable-login-server" "--enable-luajit" "--enable-sqlite" ];

  meta = with lib; {
    homepage = "https://github.com/otland/tfs-old-svn";
    description = "The Forgotten Server is a free and open-source MMORPG server emulator written in C++. It is a fork of the OpenTibia Server project. To connect to the server, you can use OTClient.";
    license = [ licenses.gpl2Plus ];
  };
}
