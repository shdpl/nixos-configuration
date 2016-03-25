/*{ resources, ... }:*/
{
	daenerys = { resources, ... }:
  {
    imports = [ ../../machines/daenerys.nix ];
    /*nix.buildMachines = [ #FIXME*/
    /*  {*/
    /*    hostName = "magdalene.nawia.net";*/
    /*    maxJobs = 4;*/
    /*    sshKey = resources.sshKeyPairs.buildMachines.privateKey;*/
    /*    sshUser = "nix";*/
    /*    system = "x86_64-linux";*/
    /*  }*/
    /*  {*/
    /*    hostName = "caroline.nawia.net";*/
    /*    maxJobs = 4;*/
    /*    sshKey = resources.sshKeyPairs.buildMachines.privateKey;*/
    /*    sshUser = "nix";*/
    /*    system = "x86_64-linux";*/
    /*  }*/
    /*  {*/
    /*    hostName = "daenerys.nawia.net";*/
    /*    maxJobs = 1;*/
    /*    sshKey = resources.sshKeyPairs.buildMachines.privateKey;*/
    /*    sshUser = "nix";*/
    /*    system = "x86_64-linux";*/
    /*  }*/
    /*  {*/
    /*    hostName = "joan.nawia.net";*/
    /*    maxJobs = 1;*/
    /*    sshKey = resources.sshKeyPairs.buildMachines.privateKey;*/
    /*    sshUser = "nix";*/
    /*    system = "i686-linux";*/
    /*  }*/
    /*]; */
    /*nix.distributedBuilds = true;*/
  };
	caroline = import ../../machines/caroline.nix;
  joan = import ../../machines/joan.nix;
  magdalene = import ../../machines/magdalene.nix;
}
