{ callPackage, fetchFromGitHub, stdenv, lib, pkg-config, libxml2, lua5_1, /*luajit,*/ sqlite, autoreconfHook,
  enableServerDiagnostic ? false,
  enableLoginServer ? false,
  enableOtAdmin ? false,
  enableOtservAllocator ? false,
  enableHomedirConf ? false,
  enableRootPermission ? false,
  enableGroundCache ? false,
  enableDebug ? false,
  enableProfiler ? false
}:
# assert enableLuaJit -> luajit != null;
let
  boost149 = (callPackage ../legacy/boost/1.49.nix {});
  openssl = (callPackage ../legacy/openssl/1.0.2u.nix {});
  # optionalBuildInputs = [
  #   { name = "--enable-sqlite"; enable = enableSqlite; packages = [ sqlite ]; }
  #   { name = "--enable-pgsql"; enable = enablePgsql; packages = [ pgsql ]; }
  #   { name = "--enable-mysql"; enable = enableMysql; packages = [ mysql ]; }
  # ];
in
stdenv.mkDerivation rec {
  name = "theforgottenserver";

  src = fetchFromGitHub {
    owner = "otland";
    repo = "tfs-old-svn";
    rev = "5f51171931d33d84f42d4cf55adaf13a67004299"; # nawia
    sha256 = "sha256:1l5ypcpw3bm062bklfdnjb9l9yscn6625aw93q63xsjd9d6hnpaq";
  };

  buildInputs = [ pkg-config boost149 libxml2 openssl lua5_1 /*luajit*/ sqlite ]
    # ++ flatten (builtins.catAttrs "packages" (builtins.filter (e: e.enable) optionalBuildInputs))
  ;

  nativeBuildInputs = [ autoreconfHook ];

  configureFlags = [ "--enable-sqlite" ]
    ++ lib.optionals (enableServerDiagnostic) [ "--enable-server-diag" ]
    ++ lib.optionals (enableLoginServer) [ "--enable-login-server" ]
    ++ lib.optionals (enableOtAdmin) [ "--enable-ot-admin" ]
    ++ lib.optionals (enableOtservAllocator) [ "--enable-otserv-allocator" ]
    ++ lib.optionals (enableHomedirConf) [ "--enable-homedir-conf" ]
    ++ lib.optionals (enableRootPermission) [ "--enable-root-permission" ]
    ++ lib.optionals (enableGroundCache) [ "--enable-groundcache" ]
    ++ lib.optionals (enableDebug) [ "--enable-debug" ]
    ++ lib.optionals (enableProfiler) [ "--enable-profiler" ]
    # ++ flatten (builtins.catAttrs "name" (builtins.filter (e: e.enable) optionalBuildInputs))
  ;

  NIX_CFLAGS_COMPILE = [ "-O -Wno-error=deprecated-declarations -Wno-error=maybe-uninitialized -Wno-error=implicit-fallthrough -Wno-error=misleading-indentation" ];

  installPhase = ''
    mkdir $out

    mkdir $out/bin
    cp theforgottenserver $out/bin/
    echo "cd $out/share/theforgottenserver && theforgottenserver" >> $out/bin/opentibia
    chmod +x $out/bin/opentibia

    mkdir -p $out/share/theforgottenserver
    cp config.lua.dist $out/share/theforgottenserver/config.lua
    cp theforgottenserver.s3db $out/share/theforgottenserver/
    cp -r schemas mods doc data $out/share/theforgottenserver/

    mkdir $out/share/theforgottenserver/data/{weapons,talkactions,movements,creaturescripts,globalevents}/lib
  '';

  patches = [
    ./raids_clog.patch
  ];

  meta = with lib; {
    homepage = "https://github.com/otland/tfs-old-svn";
    description = "The Forgotten Server is a free and open-source MMORPG server emulator written in C++. It is a fork of the OpenTibia Server project. To connect to the server, you can use OTClient.";
    license = [ licenses.gpl2Plus ];
  };
}
