{
  inputs.nixpkgs.url = "github:shdpl/nixpkgs/release-24.05";
  inputs.disko.url = "github:nix-community/disko";
  inputs.disko.inputs.nixpkgs.follows = "nixpkgs";

  outputs = { nixpkgs, disko, ... }:
    {
      nixosConfigurations.hetzner-cloud = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          { nix.nixPath = [ "nixpkgs=${nixpkgs}" ]; }
          disko.nixosModules.disko
          ./configuration.nix
        ];
      };
    };
}
