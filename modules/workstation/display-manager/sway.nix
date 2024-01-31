{ config, pkgs, lib, ... }:

{
  # This sway config is mostly based on https://nixos.wiki/wiki/Sway
  # which integrates sway with systemd in the style described here
  # https://github.com/swaywm/sway/wiki/Systemd-integration
  # and the replies in https://github.com/NixOS/nixpkgs/issues/57602
  # with some individual packages added/removed and using sddm as the display manager.
  #
  # Take care to start the correct target as described by the sway proejct wiki.
  # I do this by adding the following line to the bottom of my sway config file:
  # exec "systemctl --user import-environment; systemctl --user start sway-session.target"
  #
  # Remaining issues:
  #
  # * When I connect to/disconnect from Thunderbolt docks I need to
  #     1. reload the sway config and then
  #     2. restart the kanshi user service
  #   In order to actually enable the correct outputs that are configured in kanshi.
  #
  #   To make that easy I have configured the following keybinding in sway to restart kanshi:
  #   bindsym $mod+Shift+z exec systemctl restart --user kanshi.service
  #   
  #
  # * It is a bit annoying to need an X Server just for running a display manager, but with GDM
  #   I couldn't recover from the above problem at all really. One thing that's still annoying
  #   is that if some service delays boot significantly an the X server was already started you
  #   are stuck at a blank black screen for some time instead of looking at systemd's output.
  #   
  # I think maybe not having a display manager at all would be a better alternative.
  # I am also intested in running something like tuigreet via greetd. 


  # configuring sway itself (assmung a display manager starts it)
  systemd.user.targets.sway-session = {
    description = "Sway compositor session";
    documentation = [ "man:systemd.special(7)" ];
    bindsTo = [ "graphical-session.target" ];
    wants = [ "graphical-session-pre.target" ];
    after = [ "graphical-session-pre.target" ];
  };

  environment.systemPackages = with pkgs; [
    # i3pystatus (python38.withPackages(ps: with ps; [ i3pystatus keyring ]))
  ];

  programs.sway = {
    enable = true;
    extraPackages = with pkgs; [
      dmenu
      swaylock
      swayidle
      xwayland
      mako
      kanshi
      grim
      slurp
      wl-clipboard
      wf-recorder
      # (python38.withPackages(ps: with ps; [ i3pystatus keyring ]))
    ];
    extraSessionCommands = ''
      export SDL_VIDEODRIVER=wayland
      export QT_QPA_PLATFORM=wayland
      export QT_WAYLAND_DISABLE_WINDOWDECORATION="1"
      export _JAVA_AWT_WM_NONREPARENTING=1
      export MOZ_ENABLE_WAYLAND=1
    '';
  };

  # configuring kanshi
  systemd.user.services.kanshi = {
    description = "Kanshi output autoconfig ";
    wantedBy = [ "graphical-session.target" ];
    partOf = [ "graphical-session.target" ];
    # environment = { XDG_CONFIG_HOME="/home/mschwaig/.config"; };
    serviceConfig = {
      # kanshi doesn't have an option to specifiy config file yet, so it looks
      # at .config/kanshi/config
      ExecStart = ''
      ${pkgs.kanshi}/bin/kanshi
      '';
      RestartSec = 5;
      Restart = "always";
    };
  };

  services.xserver.enable = true;
  services.xserver.displayManager.defaultSession = "sway";
  services.xserver.displayManager.sddm.enable = true;
  services.xserver.libinput.enable = true;
}
