{ config, pkgs, lib, ... }:
let
  sourcePath = "/home/shd";
  targetPath = "/run/media/shd/2B94D46E6B6A9B78";
  targetChecksumPath = "${targetPath}/checksums";
  targetDataPath = "${targetPath}/backup";
  paths = [
    "books/"
    "camera/"
    "documents/"
    "historia/"
    "muzyka/"
    "src/net.nawia/game"
    "notes/"
    "photos/"
  ];
  listPrevious = ''newestFiles=( $(ls -1 ${targetChecksumPath} | tail -n 2) )'';
  diffPrevious = ''${pkgs.diffutils}/bin/diff \$\{newestFiles[0]\} \$\{newestFiles[1]\}'';
  copyDirectoryFn = (path: ''rsync --no-links -rc ${sourcePath}/${path} ${targetDataPath}/${path}'');
  previousMatched = (builtins.concatStringsSep " && " (builtins.map copyDirectoryFn paths));
  previousUnmatched = ''exit 1'';
  previousMatching = ''${diffPrevious} && ${previousMatched} || ${previousUnmatched}'';
  checksumNew = ''find ${targetDataPath} -type f -exec md5sum \{\} \; > ${targetChecksumPath}/$(date +%s).md5sum'';
in
(pkgs.writeShellApplication {
  name = "backup";
  runtimeInputs = with pkgs;[ coreutils ];
  text = ''
    ${listPrevious};
    ${previousMatching}
  '';
})
