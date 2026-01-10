{ config, pkgs, lib, ... }:
let
  # FROM /dev/disk/by-id/ata-TOSHIBA_MQ04ABF100_70M6PZQZT
  # sudo smartctl --all /dev/disk/by-id/ata-TOSHIBA_MQ04ABF100_70M6PZQZT
  # TO   /dev/disk/by-id/ata-TOSHIBA_MQ04ABF100_40LEPQ2QT
  # sudo smartctl --all /dev/disk/by-id/ata-TOSHIBA_MQ04ABF100_40LEPQ2QT
  # sudo mount /dev/disk/by-id/ata-TOSHIBA_MQ04ABF100_70M6PZQZT-part1 ~/mnt/old
  # sudo mount /dev/disk/by-id/ata-TOSHIBA_MQ04ABF100_40LEPQ2QT-part1 ~/mnt/new
  # cd ~/mnt/old/ && find backup/ -type f -exec md5sum \{\} \; | sort -t '-' -k 2 -n > ~/mnt/old/checksums/$(date +%s).md5sum
  # cd ~/mnt/new/ && find backup/ -type f -exec md5sum \{\} \; | sort -t '-' -k 2 -n > ~/mnt/new/checksums/$(date +%s).md5sum
  # diff $(find ~/mnt/old/checksums/ -type f | tail -n 2)
  # diff $(find ~/mnt/new/checksums/ -type f | tail -n 2)
  # diff $(find ~/mnt/old/checksums/ -type f | tail -n 1) $(find ~/mnt/new/checksums/ -type f | tail -n 1)

  # rsync --no-links -rcin /home/shd/books/ ~/mnt/old/backup/books/
  # rsync --no-links -rci /home/shd/books/ ~/mnt/old/backup/books/
  # rsync --no-links -rcin /home/shd/camera/ ~/mnt/old/backup/camera/
  # rsync --no-links -rci /home/shd/camera/ ~/mnt/old/backup/camera/
  # rsync --no-links -rcin /home/shd/documents/ ~/mnt/old/backup/documents/
  # rsync --no-links -rci /home/shd/documents/ ~/mnt/old/backup/documents/
  # rsync --no-links -rcin /home/shd/history/ ~/mnt/old/backup/historia/
  # rsync --no-links -rci /home/shd/history/ ~/mnt/old/backup/historia/
  # rsync --no-links -rcin /home/shd/music/ ~/mnt/old/backup/muzyka/
  # rsync --no-links -rci /home/shd/music/ ~/mnt/old/backup/muzyka/
  # rsync --no-links -rcin /home/shd/src/net.nawia/game/ots/ ~/mnt/old/backup/nawia/ots/
  # rsync --no-links -rci /home/shd/src/net.nawia/game/ots/ ~/mnt/old/backup/nawia/ots/
  # rsync --no-links -rcin /home/shd/src/net.nawia/game/world/ ~/mnt/old/backup/nawia/world/
  # rsync --no-links -rci /home/shd/src/net.nawia/game/world/ ~/mnt/old/backup/nawia/world/
  # rsync --no-links -rcin /home/shd/notes/ ~/mnt/old/backup/notes/
  # rsync --no-links -rci /home/shd/notes/ ~/mnt/old/backup/notes/
  # rsync --no-links -rcin /home/shd/photos/ ~/mnt/old/backup/photos/
  # rsync --no-links -rci /home/shd/photos/ ~/mnt/old/backup/photos/
  # rsync --no-links -rcin /home/shd/location/ ~/mnt/old/backup/location/
  # rsync --no-links -rci /home/shd/location/ ~/mnt/old/backup/location/
  # rsync --no-links -rcin /home/shd/feed/ /home/shd/mnt/old/backup/feed/
  # rsync --no-links -rci /home/shd/feed/ /home/shd/mnt/old/backup/feed/

  # rsync --no-links -rcin ~/mnt/old/backup/ ~/mnt/new/backup/
  # rsync --no-links -rci ~/mnt/old/backup/ ~/mnt/new/backup/
  sourcePath = "/home/shd";
  targetPath = "/run/media/shd/2B94D46E6B6A9B78";
  targetChecksumPath = "${targetPath}/checksums";
  targetDataPath = "${targetPath}/backup";
  paths = [
    "books/"
    "camera/"
    "documents/"
    "history/"                 # backup/historia
    "music/"                   # backup/music
    "src/net.nawia/game/ots"   # backup/nawia/ots
    "src/net.nawia/game/world" # backup/nawia/world
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
