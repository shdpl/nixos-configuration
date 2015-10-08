{ config, pkgs, lib, ... }:

let
	cfg = config.workstation;
	mopidy-configuration = builtins.readFile ../private/mopidy.conf;
in

with lib;

{
	options = {
		workstation = {
			enable = mkOption {
				default = false;
				type = with types; bool;
				description = ''
					Whether computer acts as workstation.
				'';
			};
			xrandrHeads = mkOption {
				default = [];
				type = with types; listOf string;
				description = ''
					XRandr displays
				'';
			};
			videoDrivers = mkOption {
				default = [];
				type = with types; listOf string;
				description = ''
					X-server video drivers
				'';
			};
		};
	};

config = 
	{
		environment.systemPackages = with pkgs;
		[
			e19.terminology
		];
	}
	//
	(mkIf cfg.enable {
		services = {
			xserver = {
				enable = true;
				autorun = true;
				layout = "pl";
				windowManager = {
					i3.enable = true;
					default = "i3";
				};
				desktopManager.default = "none";
				displayManager.auto = {
					enable = true;
					user = "shd";
				};
				xrandrHeads = cfg.xrandrHeads;
				videoDrivers = cfg.videoDrivers;
			};
			mopidy = {
				enable = true;
				configuration = mopidy-configuration;
				extensionPackages = [
					pkgs.mopidy-spotify
					pkgs.mopidy-moped
				];
			};
		};
	});
}
