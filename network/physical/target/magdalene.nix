{ config, pkgs, ... }:
{ deployment = {
    targetEnv = "none";
    targetHost = "localhost"; #"magdalene.nawia.net";
    storeKeysOnMachine = true;
    autoRaid0 = {
      nixos = {
        devices = [ "/dev/sda" "/dev/sdb" ];
      };
    };
    encryptedLinksTo = [];
    keys = {};
    owners = [ "shd@nawia.net" ];
  };
  networking.p2pTunnels = {
    ssh = {};
  };
#resources.sshKeyPairs
}
