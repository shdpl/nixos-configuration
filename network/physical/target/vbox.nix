{ config, pkgs, ... }:
{ deployment.targetEnv = "virtualbox";
  deployment.virtualbox = {
    memorySize = 512;
    headless = true;
  };
}
