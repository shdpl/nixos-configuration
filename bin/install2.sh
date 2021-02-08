
sudo mkfs.ext4 -L nixos /dev/sda7
sudo mkswap -L swap /dev/sda6
sudo mkfs.fat -F32 -n boot  /dev/sda5
sudo nix-env -iA nixos.p7zip
sudo nix-env -iA nixos.git
sudo nix-env -iA nixos.git-crypt



dd if=/dev/urandom of=keyfile_root.bin bs=1024 count=4

 grub-2.02 don't know how to load from luks2 which is used by default in cryptsetup
cryptsetup luksFormat --type luks1 -h sha512 /dev/sdX2
cryptsetup luksAddKey /dev/sdX2 keyfile_root.bin
cryptsetup luksOpen /dev/sdX2 crypted-nixos

# you should backup LUKS Headers always after creating LUKS partition and save it to safe place
cryptsetup luksHeaderBackup /dev/sdX2 --header-backup-file dev_sdX2_headers.backup


# IF SWAP
pvcreate /dev/mapper/crypted-nixos
vgcreate vg /dev/mapper/crypted-nixos
lvcreate -L {RAM_SIZE}G -n swap vg
lvcreate -l '100%FREE' -n root vg

# you should backup LVM configs in safe place after LVM setup
man vgcfgbackup
# /IF SWAP



mkswap -L swap /dev/vg/swap
mkfs.ext4 -L root /dev/vg/root

mount /dev/vg/root /mnt
swapon /dev/vg/swap



mkdir /mnt/boot
find keyfile*.bin -print0 | sort -z | cpio -o -H newc -R +0:+0 --reproducible --null | gzip -9 > /mnt/boot/extra_initramfs_keys.gz
chmod 000 /mnt/boot/extra_initramfs_keys.gz



nixos-generate-config --root /mnt
  boot.loader.grub.device = "/dev/sdX"; # or "nodev" for efi only
  boot.loader.grub.enableCryptodisk = true;
  boot.loader.grub.extraInitrd = "/boot/extra_initramfs_keys.gz"
  
  boot.initrd.luks.devices = [{
    name = "crypted-nixos";
    keyFile = "/keyfile_root.bin";
    allowDiscards = true;
  }];



blkid


nixos-install
reboot
