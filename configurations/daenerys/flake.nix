{
  inputs = {
    nixpkgs.url = "github:shdpl/nixpkgs/nixos-25.05";
    home-manager = {
      url = "github:nix-community/home-manager/release-25.05";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    sops-nix = {
      url = "github:Mic92/sops-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    disko = {
      url = "github:nix-community/disko";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { nixpkgs, home-manager, disko, sops-nix, ... }:
    {
      nixosConfigurations.hetzner-cloud = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          { nix.nixPath = [ "nixpkgs=${nixpkgs}" ]; }
          home-manager.nixosModules.home-manager
          disko.nixosModules.disko
          sops-nix.nixosModules.sops
          ./configuration.nix
        ];
      };
    };
}
