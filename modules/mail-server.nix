{ config, pkgs, ... }:

{
  networking.firewall.allowedTCPPorts = [ 25 465 993 995 ];
	security.pam.services.dovecot2.text = ''
		auth    sufficient pam_permit.so
		account sufficient pam_permit.so
	'';
	services = {
		postfix = {
			enable = true;
			hostname = "mail.nawia.net";
			origin = "nawia.net";
			destination = [ "nawia.net" ];
			rootAlias = "shd";
      /*sslCert = ../private/nawia.net.pem;*/
      /*sslCACert = ../private/mail.nawia.net.crt;*/
      /*sslKey = ../private/mail.nawia.net.key;*/
      /*extraConfig = ''*/
      /*  smtpd_tls_ask_ccert = yes*/
      /*  smtpd_recipient_restrictions = permit_mynetworks,permit_tls_all_clientcerts,reject_unauth_destination*/
      /*  smtpd_tls_loglevel = 4*/
      /*'';*/
		};
		dovecot2 = rec {
			enable = true;
			enableImap = true;
			enablePop3 = true;
			enableLmtp = false;
			extraConfig = ''
        auth_debug = yes
        auth_mechanisms = plain login digest-md5 cram-md5 otp
        auth_ssl_require_client_cert = yes
        auth_verbose = yes

				ssl_cipher_list = ALL:!LOW:!SSLv2
				ssl_verify_client_cert = yes
				auth_ssl_username_from_cert = yes
				ssl_cert_username_field = name
				protocol !smtp {
					auth_ssl_require_client_cert = yes
				}
			'';
				/*ssl_cert_username_field = emailAddress*/
			group = "dovecot2";
			mailLocation = "maildir:/var/spool/mail/%u";
			showPAMFailure = false;
			sslCACert = ../private/ca/nawia.net.pem;
			sslServerCert = ../private/ca/mail.nawia.net.crt;
			sslServerKey = ../private/ca/mail.nawia.net.key;
			user = "dovecot2";
			configFile = pkgs.writeText "dovecot.conf"
				(
				''
					base_dir = /var/run/dovecot2/

					protocols = ${pkgs.stdenv.lib.optionalString enableImap "imap"} ${pkgs.stdenv.lib.optionalString enablePop3 "pop3"} ${pkgs.stdenv.lib.optionalString enableLmtp "lmtp"}
				''
				+ (if sslServerCert!="" then
				''
					ssl_cert = <${sslServerCert}
					ssl_key = <${sslServerKey}
					ssl_ca = <${sslCACert}
					disable_plaintext_auth = yes
				'' else ''
					ssl = no
					disable_plaintext_auth = no
				'')

				+ ''
					default_internal_user = ${user}

					mail_location = ${mailLocation}

					maildir_copy_with_hardlinks = yes

					auth_mechanisms = plain login
					service auth {
						user = root
					}                                                                                                                                                                                                          
					userdb {
						driver = passwd
					}
					passdb {
						driver = pam
						args = ${pkgs.stdenv.lib.optionalString showPAMFailure "failure_show_msg=yes"} dovecot2
					}

					pop3_uidl_format = %08Xv%08Xu
				'' + extraConfig
				)
			;
		};
	};
}
