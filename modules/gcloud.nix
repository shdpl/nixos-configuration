{ config, pkgs, ... }:
{
	environment = {
		etc."gcloud/sa.json" = {
			source = ../private/gcloud/sa.json;
		};
		variables = {
			GOOGLE_APPLICATION_CREDENTIALS="/etc/gcloud/sa.json";
		};
		systemPackages = with pkgs;
		[
			google-cloud-sdk
		];
	};
}
