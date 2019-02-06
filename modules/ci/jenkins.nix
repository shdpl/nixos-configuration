{ config, pkgs, ... }:
with import <nixpkgs/lib>;
{
	imports = [
    ../../modules/web-server.nix
	];
	options.ci = {
		vhost = mkOption {
			type = types.str;
		};
		path = mkOption {
			type = types.str;
			default = "/jenkins/";
		};
		port = mkOption {
			type = types.int;
			default = 8081;
		};
	};
  config = (mkMerge [
		(mkIf (config.ci != null) {
			services.jenkins = {
				enable = true;
				prefix = config.ci.path;
				port = config.ci.port;
        listenAddress = "0.0.0.0";
        jobBuilder = {
          enable = true;
          accessToken = "";
          accessUser = "";
					/*
          yamlJobs = ''
---
- project:
    name: example
    scm-url: 'git@github.com:K3Imagine/TestService.git'
    github-url: 'https://github.com/K3Imagine/TestService'
    jobs:
      - 'example-jobs'
'';
*/
					/*
          yamlJobs = ''
- job:
		name: jenkins-job-test-1
		builders:
			- shell: echo 'Hello world!'
          '';
					*/
        };
			};
		})
		(mkIf (config.ci.vhost != "") {
			webServer.virtualHosts.${config.ci.vhost} = {
        enableACME = true;
        forceSSL = true;
				extraConfig = ''
					ignore_invalid_headers off;
				'';
				locations."${config.ci.path}".extraConfig = ''
					proxy_set_header        Host $host:$server_port;
          proxy_set_header        X-Forwarded-Host $host;
          proxy_set_header        X-Forwarded-Port $server_port;
					proxy_set_header        X-Forwarded-Proto $scheme;
					proxy_set_header        X-Real-IP $remote_addr;
					proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_redirect          http:// https://;
					proxy_pass http://localhost:${toString config.ci.port};
					# Required for new HTTP-based CLI
					proxy_http_version 1.1;
					proxy_request_buffering off;
					proxy_buffering off; # Required for HTTP-based CLI to work over SSL
					# workaround for https://issues.jenkins-ci.org/browse/JENKINS-45651
					add_header 'X-SSH-Endpoint' '${config.ci.vhost}:50022' always;
				'';
			};
		})
	]);
}
