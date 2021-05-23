#TODO: shd.password
{ config, pkgs, lib, ... }:
let
  domain = "escola.pl";
  host = "shd";
  hostname = "${host}.${domain}";
  user = (import ../private/users/shd.nix);
in
{
  disabledModules = [ ];
  imports =
  [
    ../hardware/pc.nix
    ../modules/users.nix
    ../modules/pl.nix
    ../modules/ssh.nix
    ../modules/common.nix
    ../modules/workstation.nix
    ../modules/programming.nix
    ../modules/work/escola.nix
    "${builtins.fetchTarball { url = "https://github.com/rycee/home-manager/archive/release-20.09.tar.gz"; }}/nixos"
  ];

  virtualisation.libvirtd.enable = true;

  aaa = {
    enable = true;
    wheelIsRoot = true;
    users = [ user ];
  };

  boot = {
    kernel.sysctl."fs.inotify.max_user_watches" = "1048576";
  };


  workstation = {
    enable = true;
    user = user.name;
    pulseaudio = true;
    xrandrHeads = [ "DP-1" "DP-2" ];
  };

  common = {
    host = host;
    nixpkgsPath = "/home/${user.name}/src/nixpkgs";
    nixosConfigurationPath = "/home/${user.name}/src/nixos-configuration";
    email = user.email;
  };

  environment.systemPackages = with pkgs;
  [
    home-manager
    bat broot
  ];

  home-manager.users.${user.name} = {
    programs = {
      htop.enable = true;
      home-manager.enable = true;

      command-not-found.enable = true;
      fzf.enable = true;
      git = {
        enable = true;
        userName = user.fullName;
        userEmail = user.email;
      };
      noti.enable = true;
      zathura.enable = true;
      ssh = {
        enable = true;
        #identityFile = [
          #../private/ssh/escola_bitbucket
          #../private/ssh/escola_gitlab
        #];
      };
    };
    home.file = {
      ".config/ranger/commands.py".source =  ../data/ranger/commands.py;
      ".config/ranger/rc.conf".source =  ../data/ranger/rc.conf;
      ".config/ranger/rifle.conf".source =  ../data/ranger/rifle.conf;
      ".config/ranger/scope.sh".source =  ../data/ranger/scope.sh;
    } // user.home.programming // user.home.workstation // /*from common*/ {
      ".muttrc".source = ../data/mutt/muttrc;
      ".mutt/mailcap".source = ../data/mutt/mailcap;

      ".ssd/journalling".source = ../data/ssd/journalling;
      ".ssd/scheduler".source = ../data/ssd/scheduler;
      ".ssd/trim".source = ../data/ssd/trim;

      ".ssh/config".source = ../data/ssh/config;
      ".ssh/authorized_keys".source = ../data/ssh/authorized_keys;
    } // {
      "private/pl.escola/passbolt-recovery-kit.asc".source = ../private/pl.escola/passbolt-recovery-kit.asc;
      ".ssh/escola_bitbucket".source = ../private/ssh/escola_bitbucket;
      ".ssh/escola_bitbucket.pub".source = ../data/ssh/escola_bitbucket.pub;
      ".ssh/escola_gitlab".source = ../private/ssh/escola_gitlab;
      ".ssh/escola_gitlab.pub".source = ../data/ssh/escola_gitlab.pub;
      ".ssh/escola_github".source = ../private/ssh/escola_github;
      ".ssh/escola_github.pub".source = ../data/ssh/escola_github.pub;
    };
    services = user.services.workstation;
    xresources = user.xresources;
  };
}
