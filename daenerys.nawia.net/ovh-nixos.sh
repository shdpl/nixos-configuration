#!/bin/bash
export MOUNT=/mnt
export DEVICE=/dev/sda1

mount -t tmpfs -o size=1G tmpfs $MOUNT
debootstrap --verbose --arch amd64 --variant minbase --include dialog,vim,resolvconf,ifupdown,netbase,net-tools,sudo,curl,bzip2,ca-certificates,adduser,rsync wheezy /mnt http://mir1.ovh.net/debian
cp /etc/hosts $MOUNT/etc/hosts
mount -t proc proc $MOUNT/proc/
mount -t sysfs sys $MOUNT/sys/
mount -o bind /dev $MOUNT/dev/
chroot $MOUNT adduser --disabled-password nix
chroot $MOUNT groupadd -r nixbld
for n in $(seq 1 10);
do chroot $MOUNT useradd -c "Nix build user $n" \
    -d /var/empty -g nixbld -G nixbld -M -N -r -s "$(which nologin)" \
    nixbld$n;
done
chroot $MOUNT mkdir -m 0755 /nix
chroot $MOUNT chown nix /nix
chroot $MOUNT su - nix
	bash <(curl https://nixos.org/nix/install)
exit
chroot $MOUNT /bin/bash -x <<'CHROOT'
. ~nix/.nix-profile/etc/profile.d/nix.sh
nix-channel --remove nixpkgs
nix-channel --add http://nixos.org/channels/nixos-14.12 nixos
nix-channel --update
CHROOT
chroot $MOUNT mkfs.ext4 $DEVICE -L nixos
chroot $MOUNT mount $DEVICE /mnt
chroot $MOUNT /bin/bash -x <<'CHROOT'
cat <<EOF > /home/nix/configuration.nix
{ fileSystems."/" = {};
  boot.loader.grub.enable = false;
} 
EOF
. /home/nix/.nix-profile/etc/profile.d/nix.sh
export NIX_PATH=nixpkgs=/home/nix/.nix-defexpr/channels/nixos:nixos=/home/nix/.nix-defexpr/channels/nixpkgs/nixos
export NIXOS_CONFIG=/home/nix/configuration.nix
nix-env -i -A config.system.build.nixos-install -A config.system.build.nixos-option -A config.system.build.nixos-generate-config -f "<nixos>"
export NIX_PATH=nixpkgs=/root/.nix-defexpr/channels/nixos:nixos=/home/nix/.nix-defexpr/channels/nixpkgs/nixos
nixos-generate-config --root /mnt
CHROOT

echo "chroot to $MNT, configure your /mnt/etc/nixos and nixos-install manually"