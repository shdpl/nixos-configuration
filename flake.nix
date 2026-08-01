{
  inputs = {
    nixpkgs.url = "github:shdpl/nixpkgs/nixos-25.11";
    home-manager = {
      url = "github:nix-community/home-manager/release-25.11";
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
    musnix = {
      url = "github:musnix/musnix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { nixpkgs, home-manager, sops-nix, musnix, ... }:
    {
      nixosConfigurations.magdalene = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        nixpkgs.config.permittedInsecurePackages = [
          "python-2.7.18.12"
        ];
        modules = [
          { nix.nixPath = [ "nixpkgs=${nixpkgs}" ]; }
          home-manager.nixosModules.home-manager
          sops-nix.nixosModules.sops
          musnix.nixosModules.musnix
          ./configurations/magdalene.nix
        ];
      };
    };
}
