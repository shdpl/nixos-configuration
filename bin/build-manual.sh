COMMAND="$(cat <<-EOF
nix-build /tmp/nixos-configuration/nixpkgs/nixos/release.nix -A manual.x86_64-linux &&
cp -R result/* /tmp/out
EOF
)"
echo $COMMAND
docker run --rm -it \
	-v $PWD:/tmp/nixos-configuration \
	-v $PWD/out:/tmp/out \
	-e NIX_PATH=nixpkgs=/tmp/nixos-configuration/nixpkgs \
	lnl7/nix \
	sh -c "$COMMAND"
