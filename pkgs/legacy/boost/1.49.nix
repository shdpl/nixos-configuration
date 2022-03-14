{ stdenv, lib, fetchurl, expat, zlib, bzip2, python
, enableRelease ? true
, enableDebug ? false
, enableSingleThreaded ? false
, enableMultiThreaded ? true
, enableShared ? true
, enableStatic ? false
, enablePIC ? false
, enableExceptions ? false
}:

let

  variant = lib.concatStringsSep ","
    (lib.optional enableRelease "release" ++
     lib.optional enableDebug "debug");

  threading = lib.concatStringsSep ","
    (lib.optional enableSingleThreaded "single" ++
     lib.optional enableMultiThreaded "multi");

  link = lib.concatStringsSep ","
    (lib.optional enableShared "shared" ++
     lib.optional enableStatic "static");

  # To avoid library name collisions
  finalLayout = if ((enableRelease && enableDebug) ||
    (enableSingleThreaded && enableMultiThreaded) ||
    (enableShared && enableStatic)) then
    "tagged" else "system";

  cflags = if enablePIC && enableExceptions then
             "cflags=-fPIC -fexceptions cxxflags=-fPIC-w linkflags=-fPIC"
           else if enablePIC then
             "cflags=-fPIC cxxflags=-fPIC-w linkflags=-fPIC"
           else if enableExceptions then
             "cflags=-fexceptions-w"
           else
             "cflags=-w";
in

stdenv.mkDerivation {
  name = "boost-1.49.0";

  meta = {
    homepage = "http://boost.org/";
    description = "Collection of C++ libraries";
    license = "boost-license";

    platforms = lib.platforms.unix;
    maintainers = [ lib.maintainers.simons ];
  };

  src = fetchurl {
    url = "mirror://sourceforge/boost/boost_1_49_0.tar.bz2";
    sha256 = "0g0d33942rm073jgqqvj3znm3rk45b2y2lplfjpyg9q7amzqlx6x";
  };

  # See <http://svn.boost.org/trac/boost/ticket/4688>.
  patches = [
    ./CVE-2013-0252.patch # https://svn.boost.org/trac/boost/ticket/7743
    ./boost_filesystem_post_1_49_0.patch
    ./time_utc.patch
    ./boost-149-cstdint.patch
  ] ++ (lib.optional stdenv.isDarwin ./boost-149-darwin.patch );

  enableParallelBuilding = true;

  buildInputs = [expat zlib bzip2 python];

  configureScript = "./bootstrap.sh";
  configureFlags = "--without-icu --with-python=${python}/bin/python";

  buildPhase = "./b2 -j$NIX_BUILD_CORES -sEXPAT_INCLUDE=${expat}/include -sEXPAT_LIBPATH=${expat}/lib --layout=${finalLayout} variant=${variant} threading=${threading} link=${link} ${cflags} -d0 install";

  installPhase = ":";

  # crossAttrs = rec {
  #   buildInputs = [ expat.crossDrv zlib.crossDrv bzip2.crossDrv ];
  #   # all buildInputs set previously fell into propagatedBuildInputs, as usual, so we have to
  #   # override them.
  #   propagatedBuildInputs = buildInputs;
  #   # We want to substitute the contents of configureFlags, removing thus the
  #   # usual --build and --host added on cross building.
  #   preConfigure = ''
  #     export configureFlags="--prefix=$out --without-icu"
  #   '';
  #   buildPhase = ''
  #     set -x
  #     cat << EOF > user-config.jam
  #     using gcc : cross : $crossConfig-g++ ;
  #     EOF
  #     ./b2 -j$NIX_BUILD_CORES -sEXPAT_INCLUDE=${expat.crossDrv}/include -sEXPAT_LIBPATH=${expat.crossDrv}/lib --layout=${finalLayout} --user-config=user-config.jam toolset=gcc-cross variant=${variant} threading=${threading} link=${link} ${cflags} --without-python install
  #   '';
  # };
}
