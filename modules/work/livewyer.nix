{ config, pkgs, ... }:
{
  imports = [
    ../config/virtualbox.nix
	];
  networking.extraHosts = ''
		172.19.8.101 local.k8.xxx.livew.io
	'';
  security.pki.certificateFiles = [
    ../../private/ca/livewyer.crt
  ];
}
