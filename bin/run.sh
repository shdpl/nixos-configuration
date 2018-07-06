NAME=$1
PORT=$2
docker run -it --rm \
	--device /dev/kvm \
	--name ${NAME} \
	-e QEMU_HDA=/tmp/${NAME}.qcow2 \
	-e QEMU_HDA_SIZE=20G \
	-e QEMU_CPU=1 \
	-e QEMU_RAM=4096 \
	-e QEMU_CDROM=/tmp/image.iso \
	-e QEMU_BOOT='order=d' \
	-e QEMU_PORTS='2375 2376' \
	-p ${PORT}:22 \
	-p 5900:5900 \
	-v /home/shd/src/nixos-configuration/tmp3/out/iso/nixos-18.03.git.e932b5b-x86_64-linux.iso:/tmp/image.iso:ro \
	tianon/qemu start-qemu -vnc :1 --bios /usr/share/ovmf/OVMF.fd
	# tianon/qemu start-qemu -vnc :1 --bios /usr/share/ovmf/OVMF.fd
	# -v /tmp/hda.qcow2:/tmp/hda.qcow2 \
	# -v /home/shd/Pobrane/nixos-minimal-18.03.131807.489a14add9a-x86_64-linux.iso:/tmp/image.iso:ro \
	# -v /home/shd/Pobrane/debian-9.4.0-amd64-netinst.iso:/tmp/image.iso:ro \
	# -v /home/shd/src/nixos-configuration/tmp3/out/iso/nixos-18.03.git.120b013-x86_64-linux.iso:/tmp/image.iso:ro \
