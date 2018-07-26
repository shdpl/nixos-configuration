#!/usr/bin/env bash

set -euo pipefail

NIXOPS=${NIXOPS:-nixops}
NIX_PATH=$NIX_PATH:.

usage () {
cat <<USAGE
Usage: $0 <nixops command> <realms/spec.nix> [nixops options]
Examples:
  $0 deploy realms/vbox.nix
  $0 info realms/vbox.nix
  $0 deploy realms/dumpoo-ec2.nix --build-only
  $0 destroy realms/cats.nix --include slothcat
USAGE
}

fatal () {
  echo '** ERROR:' "$@" >&2
  usage >&2
  exit 1
}

if [ $# -lt 2 ]; then
  fatal "missing agruments."
fi

CMD="$1"; shift
REALM_NIX="$1"; shift

case "$REALM_NIX" in
  *realms/*.nix) REALM=$(basename "$REALM_NIX" .nix);;
  *) fatal "invalid realm spec: $REALM_NIX";;
esac

cd "$(dirname "$0")"

state="secrets/nixops-${REALM}.json"
db=$(mktemp -u "secrets/tmp.${REALM}.XXXXXX.nixops")

save() {
  if [ -f "$db" ]; then
    "$NIXOPS" export -s "${db}" > "${state}.tmp" && mv "${state}.tmp" "${state}"
  fi
}

clean() {
    rm -f "$db"*
}

create() {
  "$NIXOPS" create -s "$db" -d "$REALM" "<realms/${REALM}.nix>"
}

case "$CMD" in
  create)
    trap 'clean' EXIT
    [ ! -f "$state" ] || fatal "\`$state' already exists."
    create && save
    ;;
  *)
    if [[ "$@" == *'--build-only'* ]]; then
      trap 'clean' EXIT
      create
    else
      trap 'save && clean' EXIT
      [ -f "$state" ] || fatal "\`$state' does not exists."
      "$NIXOPS" import -s "${db}" < "$state"
    fi
    "$NIXOPS" "$CMD" -s "$db" -d "$REALM" "$@"
    ;;
esac
