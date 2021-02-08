#!/bin/bash

DEVICE=/dev/sdc
SWAP_SIZE=8GiB
BOOT_SIZE=512MiB

parted $DEVICE -- mklabel gpt
parted $DEVICE -- mkpart primary ${BOOT_SIZE} -${SWAP_SIZE}
parted $DEVICE -- mkpart primary linux-swap -${SWAP_SIZE} 100%
parted $DEVICE -- mkpart ESP fat32 1MiB ${SWAP_SIZE}
parted $DEVICE -- set 3 esp on

mkfs.ext4 -L nixos ${DEVICE}1
mkswap -L swap $DEVICE
mkfs.fat -F 32 -n boot ${DEVICE}3

nixos-install
