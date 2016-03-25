{ resources, config, pkgs, ... }:
{
  nix.buildMachines = [ #FIXME
    {
      hostName = "magdalene.nawia.net";
      maxJobs = 4;
      sshKey = resources.sshKeyPairs.buildMachines.privateKey;
      sshUser = "nix";
      system = "x86_64-linux";
    }
    {
      hostName = "caroline.nawia.net";
      maxJobs = 4;
      sshKey = resources.sshKeyPairs.buildMachines.privateKey;
      sshUser = "nix";
      system = "x86_64-linux";
    }
    {
      hostName = "daenerys.nawia.net";
      maxJobs = 1;
      sshKey = resources.sshKeyPairs.buildMachines.privateKey;
      sshUser = "nix";
      system = "x86_64-linux";
    }
    {
      hostName = "joan.nawia.net";
      maxJobs = 1;
      sshKey = resources.sshKeyPairs.buildMachines.privateKey;
      sshUser = "nix";
      system = "i686-linux";
    }
  ]; 
  nix.distributedBuilds = true;
}
