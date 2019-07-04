{ lib
, buildGoPackage
, fetchFromGitHub
, callPackage
, list
}:
let
  toDrv = data:
    buildGoPackage rec {
      inherit (data) owner repo version sha256;
      name = "${repo}-${version}";
      goPackagePath = "github.com/${owner}/${repo}";
      subPackages = [ "." ];
      src = fetchFromGitHub {
        inherit owner repo sha256;
        rev = "v${version}";
      };


      # Terraform allow checking the provider versions, but this breaks
      # if the versions are not provided via file paths.
      postBuild = "mv go/bin/${repo}{,_v${version}}";
    };
in
  {
    elasticsearch = callPackage <nixpkgs/pkgs/applications/networking/cluster/terraform-providers/elasticsearch> {};
    gandi = callPackage <nixpkgs/pkgs/applications/networking/cluster/terraform-providers/gandi> {};
    ibm = callPackage <nixpkgs/pkgs/applications/networking/cluster/terraform-providers/ibm> {};
    libvirt = callPackage <nixpkgs/pkgs/applications/networking/cluster/terraform-providers/libvirt> {};
  } // lib.mapAttrs (n: v: toDrv v) list
