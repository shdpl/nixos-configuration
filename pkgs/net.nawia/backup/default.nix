{ config, pkgs, lib, ... }:
let
  # FROM /dev/disk/by-id/ata-TOSHIBA_MQ04ABF100_70M6PZQZT
  # sudo smartctl --all /dev/disk/by-id/ata-TOSHIBA_MQ04ABF100_70M6PZQZT
  # TO   /dev/disk/by-id/ata-TOSHIBA_MQ04ABF100_40LEPQ2QT
  # sudo smartctl --all /dev/disk/by-id/ata-TOSHIBA_MQ04ABF100_40LEPQ2QT
  # sudo mount -t ntfs3g /dev/disk/by-id/ata-TOSHIBA_MQ04ABF100_70M6PZQZT-part1 ~/mnt/old
  # sudo mount -t ntfs /dev/disk/by-id/ata-TOSHIBA_MQ04ABF100_40LEPQ2QT-part1 ~/mnt/new/
  # cd ~/mnt/old/backup/ && find ~/mnt/old/backup/ -type f -exec md5sum \{\} \; | sort -t '-' -k 2 -n > ~/mnt/old/checksums/$(date +%s).md5sum
  # cd ~/mnt/new/backup/ && find ~/mnt/new/backup/ -type f -exec md5sum \{\} \; | sort -t '-' -k 2 -n > ~/mnt/new/checksums/$(date +%s).md5sum
  # diff $(find ~/mnt/old/checksums/ -type f | tail -n 2)
  # diff $(find ~/mnt/new/checksums/ -type f | tail -n 2)
  # rsync --no-links -rcitn ~/mnt/old/backup/ ~/mnt/new/backup/
  # rsync --no-links -rcit ~/mnt/old/backup/ ~/mnt/new/backup/
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
  # previousMatching = ''${diffPrevious} && ${previousMatched} || ${previousUnmatched}'';
  previousMatching = ''${diffPrevious} && echo "ok" || echo "ko"'';
  checksumNew = ''find ${targetDataPath} -type f -exec md5sum \{\} \; | sort -t '-' -k 2 -n > ${targetChecksumPath}/$(date +%s).md5sum'';
in
(pkgs.writeShellApplication {
  name = "backup";
  runtimeInputs = with pkgs;[ coreutils ];
  text = ''
    ${listPrevious};
    ${previousMatching}
  '';
})
