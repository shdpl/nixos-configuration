COMMAND="$(cat <<-EOF
cp -r /tmp/.ssh ~/.ssh
chown -R root ~/.ssh
rm ~/.ssh/known_hosts

nix-env -iA nixos.openssh
ssh -o StrictHostKeyChecking=no root@172.17.0.2 'mkdir realms'
scp /tmp/nixos-configuration/realms/trivial.{layout,partition.sh} root@172.17.0.2:~/realms
ssh root@172.17.0.2 'sh realms/trivial.partition.sh'
ssh root@172.17.0.2 ls /dev/disk/by-label
scp /tmp/nixos-configuration/init.sh root@172.17.0.2:~
ssh root@172.17.0.2 'sh init.sh'
scp -r /tmp/nixos-configuration/init.nix root@172.17.0.2:/mnt/etc/nixos/configuration.nix
# scp -r /tmp/nixos-configuration/{private,users,configurations,hardware,modules} root@172.17.0.2:~
# ssh root@172.17.0.2 'ln -s ~/configurations/trivial.nix /mnt/etc/nixos/configuration.nix'
# ssh root@172.17.0.2 'ln -s ~/configurations/trivial.nix /mnt/etc/nixos/configuration.nix'
ssh root@172.17.0.2 'nixos-install --no-root-passwd'
# ssh root@172.17.0.2 'reboot'
# rm ~/.ssh/known_hosts
# 
# nix-env -iA nixos.nixops
# cd /tmp/nixos-configuration
# sh nixops.sh create realms/trivial.nix
# sh nixops.sh deploy realms/trivial.nix
# ssh root@172.17.0.2 'reboot'
bash
#sh nixops.sh destroy realms/trivial.nix
EOF
)"
echo $COMMAND
docker run --rm -it \
	-v /tmp/store:/nix/store \
	-v $PWD:/tmp/nixos-configuration \
	-v /home/shd/.ssh:/tmp/.ssh \
	-e NIX_PATH=nixpkgs=/tmp/nixos-configuration/nixpkgs \
	lnl7/nix \
	sh -c "$COMMAND"
