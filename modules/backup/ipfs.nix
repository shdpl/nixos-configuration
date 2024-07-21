{ config, pkgs, lib, ... }:
  with lib;
{
  options.backup = {
    enable = mkEnableOption (lib.mdDoc "Arbitrary backup functionality");
    storageMax = mkOption {
      type = types.string;
      default = "1GB";
    };
  };
  config = (mkMerge [
    (mkIf (config.backup.enable) {
      services.kubo = {
        enable = true;
        enableGC = true;
        autoMount = true;
        settings = {
          Datastore = {
            StorageMax = config.backup.storageMax;
          };
        };
      };
    })
  ]);
}
