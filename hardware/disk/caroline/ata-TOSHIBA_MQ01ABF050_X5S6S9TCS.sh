sfdisk /dev/disk/by-id/ata-TOSHIBA_MQ01ABF050_X5S6S9TCS < disk/caroline/ata-TOSHIBA_MQ01ABF050_X5S6S9TCS.layout
sleep 1
mkswap /dev/disk/by-id/ata-TOSHIBA_MQ01ABF050_X5S6S9TCS-part2
mkfs.fat -F 32 /dev/disk/by-id/ata-TOSHIBA_MQ01ABF050_X5S6S9TCS-part1
mkfs.ext4 -F /dev/disk/by-id/ata-TOSHIBA_MQ01ABF050_X5S6S9TCS-part3

swapon /dev/disk/by-id/ata-TOSHIBA_MQ01ABF050_X5S6S9TCS-part2
mount /dev/disk/by-id/ata-TOSHIBA_MQ01ABF050_X5S6S9TCS-part3 /mnt
mkdir -p /mnt/boot
mount /dev/disk/by-id/ata-TOSHIBA_MQ01ABF050_X5S6S9TCS-part1 /mnt/boot
mkdir -p /mnt/etc/nixos

nixos-generate-config --root /mnt
nixos-install
