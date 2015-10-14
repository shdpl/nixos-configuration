{ config, pkgs, ... }:

let
  host = "magdalene";
  domain = "nawia.net";
in
{
  imports = [
    ./hardware-configuration.nix
    ../../config/wheel-is-root.nix
    ../../config/pl.nix
    ../../config/ssh.nix
    /*../../config/dns/ovh.nix*/
    ../../config/workstation.nix
    ../../config/data-sharing.nix
    ../../config/common.nix
    ../../config/graphics.nix
    /*../../config/programming.nix*/
    /*../../config/hobby.nix*/
  ];

  networking = {
    hostName = host;
    domain = domain;
    search = [ domain ];
    firewall.enable = false;
  };

  /*dns = {*/
  /*  host = host;*/
  /*  domain = domain;*/
  /*  ddns = true;*/
  /*};*/

  hardware = {
    opengl.driSupport32Bit = true;
#		pulseaudio.enable = true;
  };

  workstation = {
    enable = true;
    videoDrivers = [ "ati" ];
  };

  boot.loader.grub.memtest86.enable = true;

  nixpkgs.config = {
    packageOverrides = pkgs: {
      libbluray = pkgs.libbluray.override { withAACS = true; };
    };
  };

  environment = {
    systemPackages = with pkgs;
    [
      dmd rdmd
#			php phpstorm
#			leiningen
#			vagrant
      git subversion
      ctags dhex bvi vbindiff
      meld
      jq xmlstarlet
      valgrind dfeet
      ltrace strace gdb
      bc

      nix-prefetch-scripts nix-repl nixpkgs-lint

      steam
      teamspeak_client spotify
      wineStable
      /*(wine.override {*/
      /* wineRelease = "staging";*/
      /* wineBuild = "wineWow";*/
      /*})*/
    ];
  };

  programs.bash = {
    enableCompletion = true;
    shellAliases = {
      l = "ls -alh";
      ll = "ls -l";
      ls = "ls --color=tty";
      restart = "systemctl restart";
      start = "systemctl start";
      status = "systemctl status";
      stop = "systemctl stop";
      which = "type -P";
      grep = "grep --color=auto";
    };
    shellInit = "set -o vi";
  };
}
