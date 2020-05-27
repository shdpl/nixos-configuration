# COMMAND="$(cat <<-EOF
# nix-build '<nixpkgs/nixos>' \
# -A config.system.build.isoImage \
# -I 'nixos-config=/tmp/nixpkgs/iso.nix' \
# -o result && cp -r result/* /tmp/out
# EOF
# )"
# echo $COMMAND
# docker run --rm -it \
# 	-v $PWD/nixpkgs:/tmp/nixpkgs \
# 	-v $PWD/out:/tmp/out \
# 	-e NIX_PATH=nixpkgs=/tmp/nixpkgs lnl7/nix \
# 	sh -c "$COMMAND"
nix-build '<nixpkgs/nixos>' -A config.system.build.isoImage -I nixos-config=iso.nix
