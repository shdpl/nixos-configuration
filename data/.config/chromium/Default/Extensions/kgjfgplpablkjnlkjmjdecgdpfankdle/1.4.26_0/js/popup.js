$(function(){function v(){var t=new XMLHttpRequest;t.onreadystatechange=function(){if(t.readyState==4)try{var i=JSON.parse(t.responseText);$(".signout>a").text(n("popup_signout",i));$("title").text(n("popup_title",i));$("#loading>span").text(n("popup_loading",i));$("a.btn-signin").text(n("popup_signin",i));$(".setting>a").attr("title",n("popup_setting, i18Msg"));$("#main_schedule_meeting").text(n("popup_schedule",i));$("button>span.btn-start").text(n("popup_start",i));$("a.without-video").text(n("popup_videooff",i));$("a.with-video").text(n("popup_videoon",i))}catch(r){}};t.open("GET",chrome.extension.getURL("/_locales/"+COMMON.getValue("zoom_locale")+"/messages.json"),!0);t.send()}function c(){u.hide()}function f(n){n=n||"Loading";u.find("span").text(n);u.show()}function e(){c();t.hide();r.show();s.hide();h.hide()}function y(){c();t.show();r.hide();s.show();COMMON.getValue("zoom_config_fte")?o.hide():o.show();h.show()}function l(n){r.hide();COMMON.toSync(function(){f("Connecting")},function(){if(n.email&&n.email!=""&&t.find(".profile-email").text(n.email).attr("title",n.email),n.displayPicUrl&&n.displayPicUrl!=""){var i=n.displayPicUrl;i.indexOf("https")==0||i.indexOf("http")==0||(i=n._zm_baseurl&&""!=n._zm_baseurl?n._zm_baseurl+i:"https://zoom.us"+i);setTimeout(function(){t.find(".profile-img").attr("src",i)},100)}n.displayName&&n.displayName!=""&&t.find(".profile-img").attr("alt",n.displayName);y()})}function p(){var n=COMMON.getGoogleToken();n?COMMON.login(n,"",function(){l(COMMON.getZoomData())},function(){e()}):e()}function n(n,t){var i=chrome.i18n.getMessage(n);return t&&(i=t[n].message),i}function i(n){return/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(n)}var t=$("#header_container"),o=$("#header_container .setting>a"),s=$("#content_container .btn-content"),h=$("#footer_container"),r=$("#content_container .sec-sign"),u=$("#loading"),a;v();a=COMMON.hasZoomRqToken();a?(COMMON.checkPoint(function(){f("Connecting")}),l(COMMON.getZoomData())):p();$("#login_with_google").click(function(){chrome.tabs.create({url:COMMON.getOAuthURL(),selected:!1},function(n){chrome.tabs.update(n.id,{selected:!0});COMMON.saveValue("zoom_oauth_tabid",n.id)})});$(".sso-back").delegate(".back-main","click",function(){$(".sec-sign .sign-pannel").show();$(".sec-sign .sso-pannel").hide();$("#login_with_google").focus()});$("#sso-form").delegate("#manual-domain","click",function(){$(".sec-sign #sso-form .company").hide();$(".sec-sign #sso-form .manual").show();$(".sso-msg").text("");$("#sso-form input#domain").focus().trigger("keyup")});$("#sso-form").delegate("#company-domain","click",function(){$(".sec-sign #sso-form .company").show();$(".sec-sign #sso-form .manual").hide();$(".sso-msg").text("");$("#sso-form input#ssoemail").focus().trigger("keyup")});$("#login_with_sso").click(function(){$(".sec-sign .sign-pannel").hide();$(".sec-sign .sso-pannel").show();$("#ssoemail").val("").focus();$(".sso-msg").text("")});$("#login-form").delegate("input","keyup",function(){var n=$(this);i($("input[name='email']").val().trim())&&$("#password").val().length>=6?$(".sign-pannel .signin > button").removeClass("disabled").attr("aria-disabled","false"):$(".sign-pannel .signin > button").addClass("disabled").attr("aria-disabled","true")});$("#sso-form").delegate("input","keyup",function(){var n=$(this),t=n.val();t.length>0?window.setTimeout(function(){$("input[name='domain']").is(":visible")&&(""!=$("#domain").val().trim()?$(".sso-pannel .continue > button").removeClass("disabled").attr("aria-disabled","false"):$(".sso-pannel .continue > button").addClass("disabled").attr("aria-disabled","true"));$("input[name='ssoemail']").is(":visible")&&(i($("input[name='ssoemail']").val().trim())?$(".sso-pannel .continue > button").removeClass("disabled").attr("aria-disabled","false"):$(".sso-pannel .continue > button").addClass("disabled").attr("aria-disabled","true"))},100):$(".sso-pannel .continue > button").addClass("disabled").attr("aria-disabled","true")});$(".signin>button").click(function(){var n=$(this);i($("#email").val().trim())&&$("#password").val().length>=6&&(n.addClass("inprogress"),$(".signin .busy").show(),COMMON.signin({email:$("input[name='email']").val().trim(),password:$("#password").val()},function(n){if(n.indexOf("/oauth2/auth?")>0)chrome.tabs.create({url:COMMON.getOAuthURL(),selected:!1},function(n){chrome.tabs.update(n.id,{selected:!0});COMMON.saveValue("zoom_oauth_tabid",n.id)});else if(n.indexOf("/signin")>0){var t=n.substring(0,n.indexOf("/signin"))+"/saml/login?from=extension";chrome.tabs.create({url:t,selected:!1},function(n){chrome.tabs.update(n.id,{selected:!0});COMMON.saveValue("zoom_oauth_tabid",n.id)})}else COMMON.login("","",function(){COMMON.saveValue("zoom_auth_type",1);window.location.reload()},function(){$("#error-msg").show().text("Invalid email address or password.")})},function(){$("#error-msg").show().text("Invalid email address or password.")},function(){n.removeClass("inprogress");$(".signin .busy").hide()}))});$(".continue>button").click(function(){var n=$(this);($("input[name='ssoemail']").is(":visible")&&i($("input[name='ssoemail']").val())||$("input[name='domain']").is(":visible")&&""!=$("input[name='domain']").val())&&($(".sso-msg").text(""),n.addClass("inprogress"),$(".continue .busy").show(),COMMON.ssoCheck({email:$("input[name='ssoemail']").is(":visible")?$("input[name='ssoemail']").val():"",domain:$("input[name='domain']").is(":visible")?$("input[name='domain']").val()+".zoom.us":""},function(n){chrome.tabs.create({url:n,selected:!1},function(n){chrome.tabs.update(n.id,{selected:!0});COMMON.saveValue("zoom_oauth_tabid",n.id)})},function(){$("#sso-form input:visible").focus();$(".sso-msg").text("No matching domain found.")},function(){n.removeClass("inprogress");$(".continue .busy").hide()}))});$("#footer_container .signout>a").click(function(){return f("Connecting"),COMMON.logout(function(){e()}),!1});$("#content_container .btn-group").hover(function(){var n=$(this);n.hasClass("open")||n.addClass("open")},function(){var n=$(this);n.hasClass("open")&&n.removeClass("open")});$("#content_container .btn-group").click(function(){$(this).toggleClass("open")});$("#content_container").delegate(".btn-group","click",function(n){var t=$("#content_container .btn-group");$(n.target).hasClass("with-video")?chrome.tabs.create({url:COMMON.getMeetingWithVideoUrl()}):$(n.target).hasClass("without-video")&&chrome.tabs.create({url:COMMON.getMeetingWithoutVideoUrl()})});$(".profile .profile-email").click(function(){chrome.tabs.create({url:COMMON.getMyMeetingsUrl()})});$(".setting>a").click(function(){chrome.tabs.create({url:chrome.extension.getURL("options.html")},function(){COMMON.saveValue("zoom_options_tabid",0)})});$("#main_schedule_meeting").click(function(){COMMON.getValue("zoom_config_fte")?chrome.tabs.create({url:chrome.extension.getURL("options.html"),selected:!1},function(n){chrome.tabs.update(n.id,{selected:!0});COMMON.saveValue("zoom_options_tabid",n.id)}):chrome.tabs.create({url:COMMON.getGoogleCalendarUrl()},function(){})})})