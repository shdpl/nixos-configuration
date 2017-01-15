/*{ resources, ... }:*/
{
  resources.sshKeyPairs.buildMachines = {};

	daenerys = { resources, ... }:
  {
    imports = [ ../../machines/daenerys.nix ../../modules/distributed-builds.nix ];

    deployment = {
      targetEnv = "hetzner";
      hetzner = {
        mainIPv4= "78.46.102.47"; #"daenerys.nawia.net";
        partitions = ''
          zerombr
          clearpart --all --initlabel --drives=sda,sdb

          part swap1 --recommended --label=swap1 --fstype=swap --ondisk=sda
          part swap2 --recommended --label=swap2 --fstype=swap --ondisk=sdb

          part btrfs.1 --grow --ondisk=sda
          part btrfs.2 --grow --ondisk=sdb

          btrfs / --data=1 --metadata=1 --label=rhel7 btrfs.1 btrfs.2
        '';
      };
    };

  };
	daenerys2 = { resources, ... }:
  {
    imports = [ ../../machines/daenerys2.nix ../../modules/distributed-builds.nix ];

    deployment = {
      targetEnv = "hetzner";
      hetzner = {
        mainIPv4= "78.46.102.47"; #"daenerys.nawia.net";
        partitions = ''
          zerombr
          clearpart --all --initlabel --drives=sda,sdb

          part swap1 --recommended --label=swap1 --fstype=swap --ondisk=sda
          part swap2 --recommended --label=swap2 --fstype=swap --ondisk=sdb

          part btrfs.1 --grow --ondisk=sda
          part btrfs.2 --grow --ondisk=sdb

          btrfs / --data=1 --metadata=1 --label=rhel7 btrfs.1 btrfs.2
        '';
      };
    };

  };
	caroline =  { resources, ... }:
  {
    imports = [ ../../machines/caroline.nix ../../modules/distributed-builds.nix ];

    deployment = {
      targetEnv = "none";
      targetHost = "caroline.nawia.net";
      /*targetHost = "localhost";*/
    };
  };
  joan = { resources, ... }:
  {
    imports = [ ../../machines/joan.nix ../../modules/distributed-builds.nix ];

    deployment = {
      targetEnv = "none";
      targetHost = "joan.nawia.net";
      /*targetHost = "localhost";*/
    };
  };
  magdalene = { resources, ... }:
  {
    imports = [ ../../machines/magdalene.nix ../../modules/distributed-builds.nix ];

    deployment = {
      targetEnv = "none";
      targetHost = "magdalene.nawia.net";
      /*targetHost = "localhost";*/
    };
  };
}
