sfdisk /dev/disk/by-id/ata-PLEXTOR_PX-256M6V_P02547111291 < disk/caroline/ata-PLEXTOR_PX-256M6V_P02547111291.layout
sleep 1
mkswap /dev/disk/by-id/ata-PLEXTOR_PX-256M6V_P02547111291-part2
mkfs.fat -F 32 /dev/disk/by-id/ata-PLEXTOR_PX-256M6V_P02547111291-part1
mkfs.ext4 -F /dev/disk/by-id/ata-PLEXTOR_PX-256M6V_P02547111291-part3

swapon /dev/disk/by-id/ata-PLEXTOR_PX-256M6V_P02547111291-part2
mount /dev/disk/by-id/ata-PLEXTOR_PX-256M6V_P02547111291-part3 /mnt
mkdir -p /mnt/boot
mount /dev/disk/by-id/ata-PLEXTOR_PX-256M6V_P02547111291-part1 /mnt/boot
mkdir -p /mnt/etc/nixos

nixos-generate-config --root /mnt
nixos-install
