{
  network = {
		description = "Web server";
		enableRollback = true;
	};

  caroline =
	{ config, pkgs, ... }:
	{
		imports =
		[
		../configurations/caroline.nix
		];
    virtualisation.virtualbox.host.enable = true;
		deployment = {
			targetHost = "caroline.nawia.net";
			owners = ["shd@nawia.net"];
			/*
			networking.p2pTunnels.ssh = { tunnel1 = { localIPv4 = "172.16.12.1"; localTunnel = 0; privateKey = "/root/.ssh/id_vpn"; remoteIPv4 = "172.16.12.2"; remoteTunnel = 1; target = "192.0.2.1"; } ; }
			networking.privateIPv4 = "";
			networking.publicIPv4 = "";
			resources.sshKeyPairs.name = {};
			encryptedLinksTo = [];
			keys.my-secret = {
				text = "shhh this is a secret";
			};
			systemd.services.my-service = {
				after = [ "my-secret-key.service" ];
				wants = [ "my-secret-key.service" ];
				script = ''
					export MY_SECRET=$(cat /run/keys/my-secret)
					run-my-program
					'';
			};
			*/
		};
	};

	daenerys2 =
	{ config, pkgs, ... }:
	{
		imports =
		[
		../configurations/daenerys.nix
		];
    deployment = {
      targetEnv = "hetzner";
      hetzner = {
        mainIPv4= "daenerys2.nawia.net"; #"daenerys.nawia.net";
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
    #virtualisation.virtualbox.guest.enable = true;
    #deployment.targetEnv = "virtualbox";
    #deployment.virtualbox.memorySize = 1024;
    #deployment.virtualbox.vcpu = 2;

    #deployment = {
    #	targetHost = "daenerys2.nawia.net";
    #};
	};
}