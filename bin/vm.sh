#/usr/bin/env bash

if [[ ! $# == 1 ]]; then
	>&2 echo "Usage: $0 configuration"
	exit 1
fi

CONFIG="$PWD/configurations/$1.nix"
if [[ ! -f $CONFIG ]]; then
	>&2 echo "Configuration $1 could not be found"
	exit 2
fi

nix-build '<nixpkgs/nixos>' -A 'vm' -I nixos-config=$CONFIG
