/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version: 0.4.0-a66279f

window.Platform=window.Platform||{},window.logFlags=window.logFlags||{},function(a){var b=a.flags||{};location.search.slice(1).split("&").forEach(function(a){a=a.split("="),a[0]&&(b[a[0]]=a[1]||!0)});var c=document.currentScript||document.querySelector('script[src*="platform.js"]');if(c)for(var d,e=c.attributes,f=0;f<e.length;f++)d=e[f],"src"!==d.name&&(b[d.name]=d.value||!0);b.log&&b.log.split(",").forEach(function(a){window.logFlags[a]=!0}),b.shadow=b.shadow||b.shadowdom||b.polyfill,b.shadow="native"===b.shadow?!1:b.shadow||!HTMLElement.prototype.createShadowRoot,b.shadow&&document.querySelectorAll("script").length>1&&console.warn("platform.js is not the first script on the page. See http://www.polymer-project.org/docs/start/platform.html#setup for details."),b.register&&(window.CustomElements=window.CustomElements||{flags:{}},window.CustomElements.flags.register=b.register),b.imports&&(window.HTMLImports=window.HTMLImports||{flags:{}},window.HTMLImports.flags.imports=b.imports),a.flags=b}(Platform),"undefined"==typeof WeakMap&&!function(){var a=Object.defineProperty,b=Date.now()%1e9,c=function(){this.name="__st"+(1e9*Math.random()>>>0)+(b++ +"__")};c.prototype={set:function(b,c){var d=b[this.name];d&&d[0]===b?d[1]=c:a(b,this.name,{value:[b,c],writable:!0})},get:function(a){var b;return(b=a[this.name])&&b[0]===a?b[1]:void 0},"delete":function(a){var b=a[this.name];if(!b)return!1;var c=b[0]===a;return b[0]=b[1]=void 0,c},has:function(a){var b=a[this.name];return b?b[0]===a:!1}},window.WeakMap=c}(),Platform.flags.shadow?(!function(a){"use strict";function b(){function a(a){b=a}if("function"!=typeof Object.observe||"function"!=typeof Array.observe)return!1;var b=[],c={},d=[];return Object.observe(c,a),Array.observe(d,a),c.id=1,c.id=2,delete c.id,d.push(1,2),d.length=0,Object.deliverChangeRecords(a),5!==b.length?!1:"add"!=b[0].type||"update"!=b[1].type||"delete"!=b[2].type||"splice"!=b[3].type||"splice"!=b[4].type?!1:(Object.unobserve(c,a),Array.unobserve(d,a),!0)}function c(){if("undefined"!=typeof chrome&&chrome.app&&chrome.app.runtime)return!1;if("undefined"!=typeof navigator&&navigator.getDeviceStorage)return!1;try{var a=new Function("","return true;");return a()}catch(b){return!1}}function d(a){return+a===a>>>0&&""!==a}function e(a){return+a}function f(a){return a===Object(a)}function g(a,b){return a===b?0!==a||1/a===1/b:R(a)&&R(b)?!0:a!==a&&b!==b}function h(a){if(void 0===a)return"eof";var b=a.charCodeAt(0);switch(b){case 91:case 93:case 46:case 34:case 39:case 48:return a;case 95:case 36:return"ident";case 32:case 9:case 10:case 13:case 160:case 65279:case 8232:case 8233:return"ws"}return b>=97&&122>=b||b>=65&&90>=b?"ident":b>=49&&57>=b?"number":"else"}function i(){}function j(a){function b(){if(!(m>=a.length)){var b=a[m+1];return"inSingleQuote"==n&&"'"==b||"inDoubleQuote"==n&&'"'==b?(m++,d=b,o.append(),!0):void 0}}for(var c,d,e,f,g,j,k,l=[],m=-1,n="beforePath",o={push:function(){void 0!==e&&(l.push(e),e=void 0)},append:function(){void 0===e?e=d:e+=d}};n;)if(m++,c=a[m],"\\"!=c||!b(n)){if(f=h(c),k=W[n],g=k[f]||k["else"]||"error","error"==g)return;if(n=g[0],j=o[g[1]]||i,d=void 0===g[2]?c:g[2],j(),"afterPath"===n)return l}}function k(a){return V.test(a)}function l(a,b){if(b!==X)throw Error("Use Path.get to retrieve path objects");for(var c=0;c<a.length;c++)this.push(String(a[c]));Q&&this.length&&(this.getValueFrom=this.compiledGetValueFromFn())}function m(a){if(a instanceof l)return a;if((null==a||0==a.length)&&(a=""),"string"!=typeof a){if(d(a.length))return new l(a,X);a=String(a)}var b=Y[a];if(b)return b;var c=j(a);if(!c)return Z;var b=new l(c,X);return Y[a]=b,b}function n(a){return d(a)?"["+a+"]":'["'+a.replace(/"/g,'\\"')+'"]'}function o(b){for(var c=0;_>c&&b.check_();)c++;return O&&(a.dirtyCheckCycleCount=c),c>0}function p(a){for(var b in a)return!1;return!0}function q(a){return p(a.added)&&p(a.removed)&&p(a.changed)}function r(a,b){var c={},d={},e={};for(var f in b){var g=a[f];(void 0===g||g!==b[f])&&(f in a?g!==b[f]&&(e[f]=g):d[f]=void 0)}for(var f in a)f in b||(c[f]=a[f]);return Array.isArray(a)&&a.length!==b.length&&(e.length=a.length),{added:c,removed:d,changed:e}}function s(){if(!ab.length)return!1;for(var a=0;a<ab.length;a++)ab[a]();return ab.length=0,!0}function t(){function a(a){b&&b.state_===fb&&!d&&b.check_(a)}var b,c,d=!1,e=!0;return{open:function(c){if(b)throw Error("ObservedObject in use");e||Object.deliverChangeRecords(a),b=c,e=!1},observe:function(b,d){c=b,d?Array.observe(c,a):Object.observe(c,a)},deliver:function(b){d=b,Object.deliverChangeRecords(a),d=!1},close:function(){b=void 0,Object.unobserve(c,a),cb.push(this)}}}function u(a,b,c){var d=cb.pop()||t();return d.open(a),d.observe(b,c),d}function v(){function a(b,f){b&&(b===d&&(e[f]=!0),h.indexOf(b)<0&&(h.push(b),Object.observe(b,c)),a(Object.getPrototypeOf(b),f))}function b(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.object!==d||e[c.name]||"setPrototype"===c.type)return!1}return!0}function c(c){if(!b(c)){for(var d,e=0;e<g.length;e++)d=g[e],d.state_==fb&&d.iterateObjects_(a);for(var e=0;e<g.length;e++)d=g[e],d.state_==fb&&d.check_()}}var d,e,f=0,g=[],h=[],i={object:void 0,objects:h,open:function(b,c){d||(d=c,e={}),g.push(b),f++,b.iterateObjects_(a)},close:function(){if(f--,!(f>0)){for(var a=0;a<h.length;a++)Object.unobserve(h[a],c),x.unobservedCount++;g.length=0,h.length=0,d=void 0,e=void 0,db.push(this)}}};return i}function w(a,b){return $&&$.object===b||($=db.pop()||v(),$.object=b),$.open(a,b),$}function x(){this.state_=eb,this.callback_=void 0,this.target_=void 0,this.directObserver_=void 0,this.value_=void 0,this.id_=ib++}function y(a){x._allObserversCount++,kb&&jb.push(a)}function z(){x._allObserversCount--}function A(a){x.call(this),this.value_=a,this.oldObject_=void 0}function B(a){if(!Array.isArray(a))throw Error("Provided object is not an Array");A.call(this,a)}function C(a,b){x.call(this),this.object_=a,this.path_=m(b),this.directObserver_=void 0}function D(a){x.call(this),this.reportChangesOnOpen_=a,this.value_=[],this.directObserver_=void 0,this.observed_=[]}function E(a){return a}function F(a,b,c,d){this.callback_=void 0,this.target_=void 0,this.value_=void 0,this.observable_=a,this.getValueFn_=b||E,this.setValueFn_=c||E,this.dontPassThroughSet_=d}function G(a,b,c){for(var d={},e={},f=0;f<b.length;f++){var g=b[f];nb[g.type]?(g.name in c||(c[g.name]=g.oldValue),"update"!=g.type&&("add"!=g.type?g.name in d?(delete d[g.name],delete c[g.name]):e[g.name]=!0:g.name in e?delete e[g.name]:d[g.name]=!0)):(console.error("Unknown changeRecord type: "+g.type),console.error(g))}for(var h in d)d[h]=a[h];for(var h in e)e[h]=void 0;var i={};for(var h in c)if(!(h in d||h in e)){var j=a[h];c[h]!==j&&(i[h]=j)}return{added:d,removed:e,changed:i}}function H(a,b,c){return{index:a,removed:b,addedCount:c}}function I(){}function J(a,b,c,d,e,f){return sb.calcSplices(a,b,c,d,e,f)}function K(a,b,c,d){return c>b||a>d?-1:b==c||d==a?0:c>a?d>b?b-c:d-c:b>d?d-a:b-a}function L(a,b,c,d){for(var e=H(b,c,d),f=!1,g=0,h=0;h<a.length;h++){var i=a[h];if(i.index+=g,!f){var j=K(e.index,e.index+e.removed.length,i.index,i.index+i.addedCount);if(j>=0){a.splice(h,1),h--,g-=i.addedCount-i.removed.length,e.addedCount+=i.addedCount-j;var k=e.removed.length+i.removed.length-j;if(e.addedCount||k){var c=i.removed;if(e.index<i.index){var l=e.removed.slice(0,i.index-e.index);Array.prototype.push.apply(l,c),c=l}if(e.index+e.removed.length>i.index+i.addedCount){var m=e.removed.slice(i.index+i.addedCount-e.index);Array.prototype.push.apply(c,m)}e.removed=c,i.index<e.index&&(e.index=i.index)}else f=!0}else if(e.index<i.index){f=!0,a.splice(h,0,e),h++;var n=e.addedCount-e.removed.length;i.index+=n,g+=n}}}f||a.push(e)}function M(a,b){for(var c=[],f=0;f<b.length;f++){var g=b[f];switch(g.type){case"splice":L(c,g.index,g.removed.slice(),g.addedCount);break;case"add":case"update":case"delete":if(!d(g.name))continue;var h=e(g.name);if(0>h)continue;L(c,h,[g.oldValue],1);break;default:console.error("Unexpected record type: "+JSON.stringify(g))}}return c}function N(a,b){var c=[];return M(a,b).forEach(function(b){return 1==b.addedCount&&1==b.removed.length?void(b.removed[0]!==a[b.index]&&c.push(b)):void(c=c.concat(J(a,b.index,b.index+b.addedCount,b.removed,0,b.removed.length)))}),c}var O=a.testingExposeCycleCount,P=b(),Q=c(),R=a.Number.isNaN||function(b){return"number"==typeof b&&a.isNaN(b)},S="__proto__"in{}?function(a){return a}:function(a){var b=a.__proto__;if(!b)return a;var c=Object.create(b);return Object.getOwnPropertyNames(a).forEach(function(b){Object.defineProperty(c,b,Object.getOwnPropertyDescriptor(a,b))}),c},T="[$_a-zA-Z]",U="[$_a-zA-Z0-9]",V=new RegExp("^"+T+"+"+U+"*$"),W={beforePath:{ws:["beforePath"],ident:["inIdent","append"],"[":["beforeElement"],eof:["afterPath"]},inPath:{ws:["inPath"],".":["beforeIdent"],"[":["beforeElement"],eof:["afterPath"]},beforeIdent:{ws:["beforeIdent"],ident:["inIdent","append"]},inIdent:{ident:["inIdent","append"],0:["inIdent","append"],number:["inIdent","append"],ws:["inPath","push"],".":["beforeIdent","push"],"[":["beforeElement","push"],eof:["afterPath","push"]},beforeElement:{ws:["beforeElement"],0:["afterZero","append"],number:["inIndex","append"],"'":["inSingleQuote","append",""],'"':["inDoubleQuote","append",""]},afterZero:{ws:["afterElement","push"],"]":["inPath","push"]},inIndex:{0:["inIndex","append"],number:["inIndex","append"],ws:["afterElement"],"]":["inPath","push"]},inSingleQuote:{"'":["afterElement"],eof:["error"],"else":["inSingleQuote","append"]},inDoubleQuote:{'"':["afterElement"],eof:["error"],"else":["inDoubleQuote","append"]},afterElement:{ws:["afterElement"],"]":["inPath","push"]}},X={},Y={};l.get=m,l.prototype=S({__proto__:[],valid:!0,toString:function(){for(var a="",b=0;b<this.length;b++){var c=this[b];a+=k(c)?b?"."+c:c:n(c)}return a},getValueFrom:function(a){for(var b=0;b<this.length;b++){if(null==a)return;a=a[this[b]]}return a},iterateObjects:function(a,b){for(var c=0;c<this.length;c++){if(c&&(a=a[this[c-1]]),!f(a))return;b(a,this[0])}},compiledGetValueFromFn:function(){var a="",b="obj";a+="if (obj != null";for(var c,d=0;d<this.length-1;d++)c=this[d],b+=k(c)?"."+c:n(c),a+=" &&\n     "+b+" != null";a+=")\n";var c=this[d];return b+=k(c)?"."+c:n(c),a+="  return "+b+";\nelse\n  return undefined;",new Function("obj",a)},setValueFrom:function(a,b){if(!this.length)return!1;for(var c=0;c<this.length-1;c++){if(!f(a))return!1;a=a[this[c]]}return f(a)?(a[this[c]]=b,!0):!1}});var Z=new l("",X);Z.valid=!1,Z.getValueFrom=Z.setValueFrom=function(){};var $,_=1e3,ab=[],bb=P?function(){var a={pingPong:!0},b=!1;return Object.observe(a,function(){s(),b=!1}),function(c){ab.push(c),b||(b=!0,a.pingPong=!a.pingPong)}}():function(){return function(a){ab.push(a)}}(),cb=[],db=[],eb=0,fb=1,gb=2,hb=3,ib=1;x.prototype={open:function(a,b){if(this.state_!=eb)throw Error("Observer has already been opened.");return y(this),this.callback_=a,this.target_=b,this.connect_(),this.state_=fb,this.value_},close:function(){this.state_==fb&&(z(this),this.disconnect_(),this.value_=void 0,this.callback_=void 0,this.target_=void 0,this.state_=gb)},deliver:function(){this.state_==fb&&o(this)},report_:function(a){try{this.callback_.apply(this.target_,a)}catch(b){x._errorThrownDuringCallback=!0,console.error("Exception caught during observer callback: "+(b.stack||b))}},discardChanges:function(){return this.check_(void 0,!0),this.value_}};var jb,kb=!P;x._allObserversCount=0,kb&&(jb=[]);var lb=!1;a.Platform=a.Platform||{},a.Platform.performMicrotaskCheckpoint=function(){if(!lb&&kb){lb=!0;var b,c,d=0;do{d++,c=jb,jb=[],b=!1;for(var e=0;e<c.length;e++){var f=c[e];f.state_==fb&&(f.check_()&&(b=!0),jb.push(f))}s()&&(b=!0)}while(_>d&&b);O&&(a.dirtyCheckCycleCount=d),lb=!1}},kb&&(a.Platform.clearObservers=function(){jb=[]}),A.prototype=S({__proto__:x.prototype,arrayObserve:!1,connect_:function(){P?this.directObserver_=u(this,this.value_,this.arrayObserve):this.oldObject_=this.copyObject(this.value_)},copyObject:function(a){var b=Array.isArray(a)?[]:{};for(var c in a)b[c]=a[c];return Array.isArray(a)&&(b.length=a.length),b},check_:function(a){var b,c;if(P){if(!a)return!1;c={},b=G(this.value_,a,c)}else c=this.oldObject_,b=r(this.value_,this.oldObject_);return q(b)?!1:(P||(this.oldObject_=this.copyObject(this.value_)),this.report_([b.added||{},b.removed||{},b.changed||{},function(a){return c[a]}]),!0)},disconnect_:function(){P?(this.directObserver_.close(),this.directObserver_=void 0):this.oldObject_=void 0},deliver:function(){this.state_==fb&&(P?this.directObserver_.deliver(!1):o(this))},discardChanges:function(){return this.directObserver_?this.directObserver_.deliver(!0):this.oldObject_=this.copyObject(this.value_),this.value_}}),B.prototype=S({__proto__:A.prototype,arrayObserve:!0,copyObject:function(a){return a.slice()},check_:function(a){var b;if(P){if(!a)return!1;b=N(this.value_,a)}else b=J(this.value_,0,this.value_.length,this.oldObject_,0,this.oldObject_.length);return b&&b.length?(P||(this.oldObject_=this.copyObject(this.value_)),this.report_([b]),!0):!1}}),B.applySplices=function(a,b,c){c.forEach(function(c){for(var d=[c.index,c.removed.length],e=c.index;e<c.index+c.addedCount;)d.push(b[e]),e++;Array.prototype.splice.apply(a,d)})},C.prototype=S({__proto__:x.prototype,get path(){return this.path_},connect_:function(){P&&(this.directObserver_=w(this,this.object_)),this.check_(void 0,!0)},disconnect_:function(){this.value_=void 0,this.directObserver_&&(this.directObserver_.close(this),this.directObserver_=void 0)},iterateObjects_:function(a){this.path_.iterateObjects(this.object_,a)},check_:function(a,b){var c=this.value_;return this.value_=this.path_.getValueFrom(this.object_),b||g(this.value_,c)?!1:(this.report_([this.value_,c,this]),!0)},setValue:function(a){this.path_&&this.path_.setValueFrom(this.object_,a)}});var mb={};D.prototype=S({__proto__:x.prototype,connect_:function(){if(P){for(var a,b=!1,c=0;c<this.observed_.length;c+=2)if(a=this.observed_[c],a!==mb){b=!0;break}b&&(this.directObserver_=w(this,a))}this.check_(void 0,!this.reportChangesOnOpen_)},disconnect_:function(){for(var a=0;a<this.observed_.length;a+=2)this.observed_[a]===mb&&this.observed_[a+1].close();this.observed_.length=0,this.value_.length=0,this.directObserver_&&(this.directObserver_.close(this),this.directObserver_=void 0)},addPath:function(a,b){if(this.state_!=eb&&this.state_!=hb)throw Error("Cannot add paths once started.");var b=m(b);if(this.observed_.push(a,b),this.reportChangesOnOpen_){var c=this.observed_.length/2-1;this.value_[c]=b.getValueFrom(a)}},addObserver:function(a){if(this.state_!=eb&&this.state_!=hb)throw Error("Cannot add observers once started.");if(this.observed_.push(mb,a),this.reportChangesOnOpen_){var b=this.observed_.length/2-1;this.value_[b]=a.open(this.deliver,this)}},startReset:function(){if(this.state_!=fb)throw Error("Can only reset while open");this.state_=hb,this.disconnect_()},finishReset:function(){if(this.state_!=hb)throw Error("Can only finishReset after startReset");return this.state_=fb,this.connect_(),this.value_},iterateObjects_:function(a){for(var b,c=0;c<this.observed_.length;c+=2)b=this.observed_[c],b!==mb&&this.observed_[c+1].iterateObjects(b,a)},check_:function(a,b){for(var c,d=0;d<this.observed_.length;d+=2){var e,f=this.observed_[d],h=this.observed_[d+1];if(f===mb){var i=h;e=this.state_===eb?i.open(this.deliver,this):i.discardChanges()}else e=h.getValueFrom(f);b?this.value_[d/2]=e:g(e,this.value_[d/2])||(c=c||[],c[d/2]=this.value_[d/2],this.value_[d/2]=e)}return c?(this.report_([this.value_,c,this.observed_]),!0):!1}}),F.prototype={open:function(a,b){return this.callback_=a,this.target_=b,this.value_=this.getValueFn_(this.observable_.open(this.observedCallback_,this)),this.value_},observedCallback_:function(a){if(a=this.getValueFn_(a),!g(a,this.value_)){var b=this.value_;this.value_=a,this.callback_.call(this.target_,this.value_,b)}},discardChanges:function(){return this.value_=this.getValueFn_(this.observable_.discardChanges()),this.value_},deliver:function(){return this.observable_.deliver()},setValue:function(a){return a=this.setValueFn_(a),!this.dontPassThroughSet_&&this.observable_.setValue?this.observable_.setValue(a):void 0},close:function(){this.observable_&&this.observable_.close(),this.callback_=void 0,this.target_=void 0,this.observable_=void 0,this.value_=void 0,this.getValueFn_=void 0,this.setValueFn_=void 0}};var nb={add:!0,update:!0,"delete":!0},ob=0,pb=1,qb=2,rb=3;I.prototype={calcEditDistances:function(a,b,c,d,e,f){for(var g=f-e+1,h=c-b+1,i=new Array(g),j=0;g>j;j++)i[j]=new Array(h),i[j][0]=j;for(var k=0;h>k;k++)i[0][k]=k;for(var j=1;g>j;j++)for(var k=1;h>k;k++)if(this.equals(a[b+k-1],d[e+j-1]))i[j][k]=i[j-1][k-1];else{var l=i[j-1][k]+1,m=i[j][k-1]+1;i[j][k]=m>l?l:m}return i},spliceOperationsFromEditDistances:function(a){for(var b=a.length-1,c=a[0].length-1,d=a[b][c],e=[];b>0||c>0;)if(0!=b)if(0!=c){var f,g=a[b-1][c-1],h=a[b-1][c],i=a[b][c-1];f=i>h?g>h?h:g:g>i?i:g,f==g?(g==d?e.push(ob):(e.push(pb),d=g),b--,c--):f==h?(e.push(rb),b--,d=h):(e.push(qb),c--,d=i)}else e.push(rb),b--;else e.push(qb),c--;return e.reverse(),e},calcSplices:function(a,b,c,d,e,f){var g=0,h=0,i=Math.min(c-b,f-e);if(0==b&&0==e&&(g=this.sharedPrefix(a,d,i)),c==a.length&&f==d.length&&(h=this.sharedSuffix(a,d,i-g)),b+=g,e+=g,c-=h,f-=h,c-b==0&&f-e==0)return[];if(b==c){for(var j=H(b,[],0);f>e;)j.removed.push(d[e++]);return[j]}if(e==f)return[H(b,[],c-b)];for(var k=this.spliceOperationsFromEditDistances(this.calcEditDistances(a,b,c,d,e,f)),j=void 0,l=[],m=b,n=e,o=0;o<k.length;o++)switch(k[o]){case ob:j&&(l.push(j),j=void 0),m++,n++;break;case pb:j||(j=H(m,[],0)),j.addedCount++,m++,j.removed.push(d[n]),n++;break;case qb:j||(j=H(m,[],0)),j.addedCount++,m++;break;case rb:j||(j=H(m,[],0)),j.removed.push(d[n]),n++}return j&&l.push(j),l},sharedPrefix:function(a,b,c){for(var d=0;c>d;d++)if(!this.equals(a[d],b[d]))return d;return c},sharedSuffix:function(a,b,c){for(var d=a.length,e=b.length,f=0;c>f&&this.equals(a[--d],b[--e]);)f++;return f},calculateSplices:function(a,b){return this.calcSplices(a,0,a.length,b,0,b.length)},equals:function(a,b){return a===b}};var sb=new I;a.Observer=x,a.Observer.runEOM_=bb,a.Observer.observerSentinel_=mb,a.Observer.hasObjectObserve=P,a.ArrayObserver=B,a.ArrayObserver.calculateSplices=function(a,b){return sb.calculateSplices(a,b)},a.ArraySplice=I,a.ObjectObserver=A,a.PathObserver=C,a.CompoundObserver=D,a.Path=l,a.ObserverTransform=F}("undefined"!=typeof global&&global&&"undefined"!=typeof module&&module?global:this||window),window.ShadowDOMPolyfill={},function(a){"use strict";function b(){if("undefined"!=typeof chrome&&chrome.app&&chrome.app.runtime)return!1;if(navigator.getDeviceStorage)return!1;try{var a=new Function("return true;");return a()}catch(b){return!1}}function c(a){if(!a)throw new Error("Assertion failed")}function d(a,b){for(var c=N(b),d=0;d<c.length;d++){var e=c[d];M(a,e,O(b,e))}return a}function e(a,b){for(var c=N(b),d=0;d<c.length;d++){var e=c[d];switch(e){case"arguments":case"caller":case"length":case"name":case"prototype":case"toString":continue}M(a,e,O(b,e))}return a}function f(a,b){for(var c=0;c<b.length;c++)if(b[c]in a)return b[c]}function g(a,b,c){P.value=c,M(a,b,P)}function h(a){var b=a.__proto__||Object.getPrototypeOf(a),c=I.get(b);if(c)return c;var d=h(b),e=v(d);return s(b,e,a),e}function i(a,b){q(a,b,!0)}function j(a,b){q(b,a,!1)}function k(a){return/^on[a-z]+$/.test(a)}function l(a){return/^\w[a-zA-Z_0-9]*$/.test(a)}function m(a){return L&&l(a)?new Function("return this.__impl4cf1e782hg__."+a):function(){return this.__impl4cf1e782hg__[a]}}function n(a){return L&&l(a)?new Function("v","this.__impl4cf1e782hg__."+a+" = v"):function(b){this.__impl4cf1e782hg__[a]=b}}function o(a){return L&&l(a)?new Function("return this.__impl4cf1e782hg__."+a+".apply(this.__impl4cf1e782hg__, arguments)"):function(){return this.__impl4cf1e782hg__[a].apply(this.__impl4cf1e782hg__,arguments)}}function p(a,b){try{return Object.getOwnPropertyDescriptor(a,b)}catch(c){return R}}function q(b,c,d){for(var e=N(b),f=0;f<e.length;f++){var g=e[f];if("polymerBlackList_"!==g&&!(g in c||b.polymerBlackList_&&b.polymerBlackList_[g])){Q&&b.__lookupGetter__(g);var h,i,j=p(b,g);if(d&&"function"==typeof j.value)c[g]=o(g);else{var l=k(g);h=l?a.getEventHandlerGetter(g):m(g),(j.writable||j.set||S)&&(i=l?a.getEventHandlerSetter(g):n(g)),M(c,g,{get:h,set:i,configurable:j.configurable,enumerable:j.enumerable})}}}}function r(a,b,c){var d=a.prototype;s(d,b,c),e(b,a)}function s(a,b,d){var e=b.prototype;c(void 0===I.get(a)),I.set(a,b),J.set(e,a),i(a,e),d&&j(e,d),g(e,"constructor",b),b.prototype=e}function t(a,b){return I.get(b.prototype)===a}function u(a){var b=Object.getPrototypeOf(a),c=h(b),d=v(c);return s(b,d,a),d}function v(a){function b(b){a.call(this,b)}var c=Object.create(a.prototype);return c.constructor=b,b.prototype=c,b}function w(a){return a&&a.__impl4cf1e782hg__}function x(a){return!w(a)}function y(a){return null===a?null:(c(x(a)),a.__wrapper8e3dd93a60__||(a.__wrapper8e3dd93a60__=new(h(a))(a)))}function z(a){return null===a?null:(c(w(a)),a.__impl4cf1e782hg__)}function A(a){return a.__impl4cf1e782hg__}function B(a,b){b.__impl4cf1e782hg__=a,a.__wrapper8e3dd93a60__=b}function C(a){return a&&w(a)?z(a):a}function D(a){return a&&!w(a)?y(a):a}function E(a,b){null!==b&&(c(x(a)),c(void 0===b||w(b)),a.__wrapper8e3dd93a60__=b)}function F(a,b,c){T.get=c,M(a.prototype,b,T)}function G(a,b){F(a,b,function(){return y(this.__impl4cf1e782hg__[b])})}function H(a,b){a.forEach(function(a){b.forEach(function(b){a.prototype[b]=function(){var a=D(this);return a[b].apply(a,arguments)}})})}var I=new WeakMap,J=new WeakMap,K=Object.create(null),L=b(),M=Object.defineProperty,N=Object.getOwnPropertyNames,O=Object.getOwnPropertyDescriptor,P={value:void 0,configurable:!0,enumerable:!1,writable:!0};N(window);var Q=/Firefox/.test(navigator.userAgent),R={get:function(){},set:function(){},configurable:!0,enumerable:!0},S=function(){var a=Object.getOwnPropertyDescriptor(Node.prototype,"nodeType");return!!a&&"set"in a}(),T={get:void 0,configurable:!0,enumerable:!0};a.assert=c,a.constructorTable=I,a.defineGetter=F,a.defineWrapGetter=G,a.forwardMethodsToWrapper=H,a.isWrapper=w,a.isWrapperFor=t,a.mixin=d,a.nativePrototypeTable=J,a.oneOf=f,a.registerObject=u,a.registerWrapper=r,a.rewrap=E,a.setWrapper=B,a.unsafeUnwrap=A,a.unwrap=z,a.unwrapIfNeeded=C,a.wrap=y,a.wrapIfNeeded=D,a.wrappers=K}(window.ShadowDOMPolyfill),function(a){"use strict";function b(){g=!1;var a=f.slice(0);f=[];for(var b=0;b<a.length;b++)a[b]()}function c(a){f.push(a),g||(g=!0,d(b,0))}var d,e=window.MutationObserver,f=[],g=!1;if(e){var h=1,i=new e(b),j=document.createTextNode(h);i.observe(j,{characterData:!0}),d=function(){h=(h+1)%2,j.data=h}}else d=window.setImmediate||window.setTimeout;a.setEndOfMicrotask=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(){p||(k(c),p=!0)}function c(){for(p=!1;o.length;){var a=o;o=[],a.sort(function(a,b){return a.uid_-b.uid_});for(var b=0;b<a.length;b++){var c=a[b],d=c.takeRecords();f(c),d.length&&c.callback_(d,c)}}}function d(a,b){this.type=a,this.target=b,this.addedNodes=new m.NodeList,this.removedNodes=new m.NodeList,this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function e(a,b){for(;a;a=a.parentNode){var c=n.get(a);if(c)for(var d=0;d<c.length;d++){var e=c[d];e.options.subtree&&e.addTransientObserver(b)}}}function f(a){for(var b=0;b<a.nodes_.length;b++){var c=a.nodes_[b],d=n.get(c);if(!d)return;for(var e=0;e<d.length;e++){var f=d[e];f.observer===a&&f.removeTransientObservers()}}}function g(a,c,e){for(var f=Object.create(null),g=Object.create(null),h=a;h;h=h.parentNode){var i=n.get(h);if(i)for(var j=0;j<i.length;j++){var k=i[j],l=k.options;if((h===a||l.subtree)&&!("attributes"===c&&!l.attributes||"attributes"===c&&l.attributeFilter&&(null!==e.namespace||-1===l.attributeFilter.indexOf(e.name))||"characterData"===c&&!l.characterData||"childList"===c&&!l.childList)){var m=k.observer;f[m.uid_]=m,("attributes"===c&&l.attributeOldValue||"characterData"===c&&l.characterDataOldValue)&&(g[m.uid_]=e.oldValue)}}}var p=!1;for(var q in f){var m=f[q],r=new d(c,a);"name"in e&&"namespace"in e&&(r.attributeName=e.name,r.attributeNamespace=e.namespace),e.addedNodes&&(r.addedNodes=e.addedNodes),e.removedNodes&&(r.removedNodes=e.removedNodes),e.previousSibling&&(r.previousSibling=e.previousSibling),e.nextSibling&&(r.nextSibling=e.nextSibling),void 0!==g[q]&&(r.oldValue=g[q]),m.records_.length||(o.push(m),p=!0),m.records_.push(r)}p&&b()}function h(a){if(this.childList=!!a.childList,this.subtree=!!a.subtree,this.attributes="attributes"in a||!("attributeOldValue"in a||"attributeFilter"in a)?!!a.attributes:!0,this.characterData="characterDataOldValue"in a&&!("characterData"in a)?!0:!!a.characterData,!this.attributes&&(a.attributeOldValue||"attributeFilter"in a)||!this.characterData&&a.characterDataOldValue)throw new TypeError;if(this.characterData=!!a.characterData,this.attributeOldValue=!!a.attributeOldValue,this.characterDataOldValue=!!a.characterDataOldValue,"attributeFilter"in a){if(null==a.attributeFilter||"object"!=typeof a.attributeFilter)throw new TypeError;this.attributeFilter=q.call(a.attributeFilter)}else this.attributeFilter=null}function i(a){this.callback_=a,this.nodes_=[],this.records_=[],this.uid_=++r}function j(a,b,c){this.observer=a,this.target=b,this.options=c,this.transientObservedNodes=[]}var k=a.setEndOfMicrotask,l=a.wrapIfNeeded,m=a.wrappers,n=new WeakMap,o=[],p=!1,q=Array.prototype.slice,r=0;i.prototype={constructor:i,observe:function(a,b){a=l(a);var c,d=new h(b),e=n.get(a);e||n.set(a,e=[]);for(var f=0;f<e.length;f++)e[f].observer===this&&(c=e[f],c.removeTransientObservers(),c.options=d);c||(c=new j(this,a,d),e.push(c),this.nodes_.push(a))},disconnect:function(){this.nodes_.forEach(function(a){for(var b=n.get(a),c=0;c<b.length;c++){var d=b[c];if(d.observer===this){b.splice(c,1);break}}},this),this.records_=[]},takeRecords:function(){var a=this.records_;return this.records_=[],a}},j.prototype={addTransientObserver:function(a){if(a!==this.target){this.transientObservedNodes.push(a);var b=n.get(a);b||n.set(a,b=[]),b.push(this)}},removeTransientObservers:function(){var a=this.transientObservedNodes;this.transientObservedNodes=[];for(var b=0;b<a.length;b++)for(var c=a[b],d=n.get(c),e=0;e<d.length;e++)if(d[e]===this){d.splice(e,1);break}}},a.enqueueMutation=g,a.registerTransientObservers=e,a.wrappers.MutationObserver=i,a.wrappers.MutationRecord=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a,b){this.root=a,this.parent=b}function c(a,b){if(a.treeScope_!==b){a.treeScope_=b;for(var d=a.shadowRoot;d;d=d.olderShadowRoot)d.treeScope_.parent=b;for(var e=a.firstChild;e;e=e.nextSibling)c(e,b)}}function d(c){if(c instanceof a.wrappers.Window,c.treeScope_)return c.treeScope_;var e,f=c.parentNode;return e=f?d(f):new b(c,null),c.treeScope_=e}b.prototype={get renderer(){return this.root instanceof a.wrappers.ShadowRoot?a.getRendererForHost(this.root.host):null},contains:function(a){for(;a;a=a.parent)if(a===this)return!0;return!1}},a.TreeScope=b,a.getTreeScope=d,a.setTreeScope=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){return a instanceof T.ShadowRoot}function c(a){return M(a).root}function d(a,d){var h=[],i=a;for(h.push(i);i;){var j=g(i);if(j&&j.length>0){for(var k=0;k<j.length;k++){var m=j[k];if(f(m)){var n=c(m),o=n.olderShadowRoot;o&&h.push(o)}h.push(m)}i=j[j.length-1]}else if(b(i)){if(l(a,i)&&e(d))break;i=i.host,h.push(i)}else i=i.parentNode,i&&h.push(i)}return h}function e(a){if(!a)return!1;switch(a.type){case"abort":case"error":case"select":case"change":case"load":case"reset":case"resize":case"scroll":case"selectstart":return!0}return!1}function f(a){return a instanceof HTMLShadowElement}function g(b){return a.getDestinationInsertionPoints(b)}function h(a,b){if(0===a.length)return b;b instanceof T.Window&&(b=b.document);for(var c=M(b),d=a[0],e=M(d),f=j(c,e),g=0;g<a.length;g++){var h=a[g];if(M(h)===f)return h}return a[a.length-1]}function i(a){for(var b=[];a;a=a.parent)b.push(a);return b}function j(a,b){for(var c=i(a),d=i(b),e=null;c.length>0&&d.length>0;){var f=c.pop(),g=d.pop();if(f!==g)break;e=f}return e}function k(a,b,c){b instanceof T.Window&&(b=b.document);var e,f=M(b),g=M(c),h=d(c,a),e=j(f,g);e||(e=g.root);for(var i=e;i;i=i.parent)for(var k=0;k<h.length;k++){var l=h[k];if(M(l)===i)return l}return null}function l(a,b){return M(a)===M(b)}function m(a){if(!V.get(a)&&(V.set(a,!0),o(S(a),S(a.target)),K)){var b=K;throw K=null,b}}function n(a){switch(a.type){case"load":case"beforeunload":case"unload":return!0}return!1}function o(b,c){if(W.get(b))throw new Error("InvalidStateError");W.set(b,!0),a.renderAllPending();var e,f,g;if(n(b)&&!b.bubbles){var h=c;h instanceof T.Document&&(g=h.defaultView)&&(f=h,e=[])}if(!e)if(c instanceof T.Window)g=c,e=[];else if(e=d(c,b),!n(b)){var h=e[e.length-1];h instanceof T.Document&&(g=h.defaultView)}return cb.set(b,e),p(b,e,g,f)&&q(b,e,g,f)&&r(b,e,g,f),$.set(b,db),Y.delete(b,null),W.delete(b),b.defaultPrevented}function p(a,b,c,d){var e=eb;if(c&&!s(c,a,e,b,d))return!1;for(var f=b.length-1;f>0;f--)if(!s(b[f],a,e,b,d))return!1;return!0}function q(a,b,c,d){var e=fb,f=b[0]||c;return s(f,a,e,b,d)}function r(a,b,c,d){for(var e=gb,f=1;f<b.length;f++)if(!s(b[f],a,e,b,d))return;c&&b.length>0&&s(c,a,e,b,d)}function s(a,b,c,d,e){var f=U.get(a);if(!f)return!0;var g=e||h(d,a);if(g===a){if(c===eb)return!0;c===gb&&(c=fb)}else if(c===gb&&!b.bubbles)return!0;if("relatedTarget"in b){var i=R(b),j=i.relatedTarget;if(j){if(j instanceof Object&&j.addEventListener){var l=S(j),m=k(b,a,l);if(m===g)return!0}else m=null;Z.set(b,m)}}$.set(b,c);var n=b.type,o=!1;X.set(b,g),Y.set(b,a),f.depth++;for(var p=0,q=f.length;q>p;p++){var r=f[p];if(r.removed)o=!0;else if(!(r.type!==n||!r.capture&&c===eb||r.capture&&c===gb))try{if("function"==typeof r.handler?r.handler.call(a,b):r.handler.handleEvent(b),ab.get(b))return!1}catch(s){K||(K=s)}}if(f.depth--,o&&0===f.depth){var t=f.slice();f.length=0;for(var p=0;p<t.length;p++)t[p].removed||f.push(t[p])}return!_.get(b)}function t(a,b,c){this.type=a,this.handler=b,this.capture=Boolean(c)}function u(a,b){if(!(a instanceof hb))return S(y(hb,"Event",a,b));var c=a;return sb||"beforeunload"!==c.type||this instanceof z?void P(c,this):new z(c)}function v(a){return a&&a.relatedTarget?Object.create(a,{relatedTarget:{value:R(a.relatedTarget)}}):a}function w(a,b,c){var d=window[a],e=function(b,c){return b instanceof d?void P(b,this):S(y(d,a,b,c))};if(e.prototype=Object.create(b.prototype),c&&N(e.prototype,c),d)try{O(d,e,new d("temp"))}catch(f){O(d,e,document.createEvent(a))}return e}function x(a,b){return function(){arguments[b]=R(arguments[b]);var c=R(this);c[a].apply(c,arguments)}}function y(a,b,c,d){if(qb)return new a(c,v(d));var e=R(document.createEvent(b)),f=pb[b],g=[c];return Object.keys(f).forEach(function(a){var b=null!=d&&a in d?d[a]:f[a];"relatedTarget"===a&&(b=R(b)),g.push(b)}),e["init"+b].apply(e,g),e}function z(a){u.call(this,a)}function A(a){return"function"==typeof a?!0:a&&a.handleEvent}function B(a){switch(a){case"DOMAttrModified":case"DOMAttributeNameChanged":case"DOMCharacterDataModified":case"DOMElementNameChanged":case"DOMNodeInserted":case"DOMNodeInsertedIntoDocument":case"DOMNodeRemoved":case"DOMNodeRemovedFromDocument":case"DOMSubtreeModified":return!0}return!1}function C(a){P(a,this)}function D(a){return a instanceof T.ShadowRoot&&(a=a.host),R(a)}function E(a,b){var c=U.get(a);if(c)for(var d=0;d<c.length;d++)if(!c[d].removed&&c[d].type===b)return!0;return!1}function F(a,b){for(var c=R(a);c;c=c.parentNode)if(E(S(c),b))return!0;return!1}function G(a){L(a,ub)}function H(b,c,e,f){a.renderAllPending();var g=S(vb.call(Q(c),e,f));if(!g)return null;var i=d(g,null),j=i.lastIndexOf(b);return-1==j?null:(i=i.slice(0,j),h(i,b))}function I(a){return function(){var b=bb.get(this);return b&&b[a]&&b[a].value||null}}function J(a){var b=a.slice(2);
return function(c){var d=bb.get(this);d||(d=Object.create(null),bb.set(this,d));var e=d[a];if(e&&this.removeEventListener(b,e.wrapped,!1),"function"==typeof c){var f=function(b){var d=c.call(this,b);d===!1?b.preventDefault():"onbeforeunload"===a&&"string"==typeof d&&(b.returnValue=d)};this.addEventListener(b,f,!1),d[a]={value:c,wrapped:f}}}}var K,L=a.forwardMethodsToWrapper,M=a.getTreeScope,N=a.mixin,O=a.registerWrapper,P=a.setWrapper,Q=a.unsafeUnwrap,R=a.unwrap,S=a.wrap,T=a.wrappers,U=(new WeakMap,new WeakMap),V=new WeakMap,W=new WeakMap,X=new WeakMap,Y=new WeakMap,Z=new WeakMap,$=new WeakMap,_=new WeakMap,ab=new WeakMap,bb=new WeakMap,cb=new WeakMap,db=0,eb=1,fb=2,gb=3;t.prototype={equals:function(a){return this.handler===a.handler&&this.type===a.type&&this.capture===a.capture},get removed(){return null===this.handler},remove:function(){this.handler=null}};var hb=window.Event;hb.prototype.polymerBlackList_={returnValue:!0,keyLocation:!0},u.prototype={get target(){return X.get(this)},get currentTarget(){return Y.get(this)},get eventPhase(){return $.get(this)},get path(){var a=cb.get(this);return a?a.slice():[]},stopPropagation:function(){_.set(this,!0)},stopImmediatePropagation:function(){_.set(this,!0),ab.set(this,!0)}},O(hb,u,document.createEvent("Event"));var ib=w("UIEvent",u),jb=w("CustomEvent",u),kb={get relatedTarget(){var a=Z.get(this);return void 0!==a?a:S(R(this).relatedTarget)}},lb=N({initMouseEvent:x("initMouseEvent",14)},kb),mb=N({initFocusEvent:x("initFocusEvent",5)},kb),nb=w("MouseEvent",ib,lb),ob=w("FocusEvent",ib,mb),pb=Object.create(null),qb=function(){try{new window.FocusEvent("focus")}catch(a){return!1}return!0}();if(!qb){var rb=function(a,b,c){if(c){var d=pb[c];b=N(N({},d),b)}pb[a]=b};rb("Event",{bubbles:!1,cancelable:!1}),rb("CustomEvent",{detail:null},"Event"),rb("UIEvent",{view:null,detail:0},"Event"),rb("MouseEvent",{screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:null},"UIEvent"),rb("FocusEvent",{relatedTarget:null},"UIEvent")}var sb=window.BeforeUnloadEvent;z.prototype=Object.create(u.prototype),N(z.prototype,{get returnValue(){return Q(this).returnValue},set returnValue(a){Q(this).returnValue=a}}),sb&&O(sb,z);var tb=window.EventTarget,ub=["addEventListener","removeEventListener","dispatchEvent"];[Node,Window].forEach(function(a){var b=a.prototype;ub.forEach(function(a){Object.defineProperty(b,a+"_",{value:b[a]})})}),C.prototype={addEventListener:function(a,b,c){if(A(b)&&!B(a)){var d=new t(a,b,c),e=U.get(this);if(e){for(var f=0;f<e.length;f++)if(d.equals(e[f]))return}else e=[],e.depth=0,U.set(this,e);e.push(d);var g=D(this);g.addEventListener_(a,m,!0)}},removeEventListener:function(a,b,c){c=Boolean(c);var d=U.get(this);if(d){for(var e=0,f=!1,g=0;g<d.length;g++)d[g].type===a&&d[g].capture===c&&(e++,d[g].handler===b&&(f=!0,d[g].remove()));if(f&&1===e){var h=D(this);h.removeEventListener_(a,m,!0)}}},dispatchEvent:function(b){var c=R(b),d=c.type;V.set(c,!1),a.renderAllPending();var e;F(this,d)||(e=function(){},this.addEventListener(d,e,!0));try{return R(this).dispatchEvent_(c)}finally{e&&this.removeEventListener(d,e,!0)}}},tb&&O(tb,C);var vb=document.elementFromPoint;a.elementFromPoint=H,a.getEventHandlerGetter=I,a.getEventHandlerSetter=J,a.wrapEventTargetMethods=G,a.wrappers.BeforeUnloadEvent=z,a.wrappers.CustomEvent=jb,a.wrappers.Event=u,a.wrappers.EventTarget=C,a.wrappers.FocusEvent=ob,a.wrappers.MouseEvent=nb,a.wrappers.UIEvent=ib}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a,b){Object.defineProperty(a,b,p)}function c(a){j(a,this)}function d(){this.length=0,b(this,"length")}function e(a){for(var b=new d,e=0;e<a.length;e++)b[e]=new c(a[e]);return b.length=e,b}function f(a){g.call(this,a)}var g=a.wrappers.UIEvent,h=a.mixin,i=a.registerWrapper,j=a.setWrapper,k=a.unsafeUnwrap,l=a.wrap,m=window.TouchEvent;if(m){var n;try{n=document.createEvent("TouchEvent")}catch(o){return}var p={enumerable:!1};c.prototype={get target(){return l(k(this).target)}};var q={configurable:!0,enumerable:!0,get:null};["clientX","clientY","screenX","screenY","pageX","pageY","identifier","webkitRadiusX","webkitRadiusY","webkitRotationAngle","webkitForce"].forEach(function(a){q.get=function(){return k(this)[a]},Object.defineProperty(c.prototype,a,q)}),d.prototype={item:function(a){return this[a]}},f.prototype=Object.create(g.prototype),h(f.prototype,{get touches(){return e(k(this).touches)},get targetTouches(){return e(k(this).targetTouches)},get changedTouches(){return e(k(this).changedTouches)},initTouchEvent:function(){throw new Error("Not implemented")}}),i(m,f,n),a.wrappers.Touch=c,a.wrappers.TouchEvent=f,a.wrappers.TouchList=d}}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a,b){Object.defineProperty(a,b,h)}function c(){this.length=0,b(this,"length")}function d(a){if(null==a)return a;for(var b=new c,d=0,e=a.length;e>d;d++)b[d]=g(a[d]);return b.length=e,b}function e(a,b){a.prototype[b]=function(){return d(f(this)[b].apply(f(this),arguments))}}var f=a.unsafeUnwrap,g=a.wrap,h={enumerable:!1};c.prototype={item:function(a){return this[a]}},b(c.prototype,"item"),a.wrappers.NodeList=c,a.addWrapNodeListMethod=e,a.wrapNodeList=d}(window.ShadowDOMPolyfill),function(a){"use strict";a.wrapHTMLCollection=a.wrapNodeList,a.wrappers.HTMLCollection=a.wrappers.NodeList}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){A(a instanceof w)}function c(a){var b=new y;return b[0]=a,b.length=1,b}function d(a,b,c){C(b,"childList",{removedNodes:c,previousSibling:a.previousSibling,nextSibling:a.nextSibling})}function e(a,b){C(a,"childList",{removedNodes:b})}function f(a,b,d,e){if(a instanceof DocumentFragment){var f=h(a);P=!0;for(var g=f.length-1;g>=0;g--)a.removeChild(f[g]),f[g].parentNode_=b;P=!1;for(var g=0;g<f.length;g++)f[g].previousSibling_=f[g-1]||d,f[g].nextSibling_=f[g+1]||e;return d&&(d.nextSibling_=f[0]),e&&(e.previousSibling_=f[f.length-1]),f}var f=c(a),i=a.parentNode;return i&&i.removeChild(a),a.parentNode_=b,a.previousSibling_=d,a.nextSibling_=e,d&&(d.nextSibling_=a),e&&(e.previousSibling_=a),f}function g(a){if(a instanceof DocumentFragment)return h(a);var b=c(a),e=a.parentNode;return e&&d(a,e,b),b}function h(a){for(var b=new y,c=0,d=a.firstChild;d;d=d.nextSibling)b[c++]=d;return b.length=c,e(a,b),b}function i(a){return a}function j(a,b){I(a,b),a.nodeIsInserted_()}function k(a,b){for(var c=D(b),d=0;d<a.length;d++)j(a[d],c)}function l(a){I(a,new z(a,null))}function m(a){for(var b=0;b<a.length;b++)l(a[b])}function n(a,b){var c=a.nodeType===w.DOCUMENT_NODE?a:a.ownerDocument;c!==b.ownerDocument&&c.adoptNode(b)}function o(b,c){if(c.length){var d=b.ownerDocument;if(d!==c[0].ownerDocument)for(var e=0;e<c.length;e++)a.adoptNodeNoRemove(c[e],d)}}function p(a,b){o(a,b);var c=b.length;if(1===c)return K(b[0]);for(var d=K(a.ownerDocument.createDocumentFragment()),e=0;c>e;e++)d.appendChild(K(b[e]));return d}function q(a){if(void 0!==a.firstChild_)for(var b=a.firstChild_;b;){var c=b;b=b.nextSibling_,c.parentNode_=c.previousSibling_=c.nextSibling_=void 0}a.firstChild_=a.lastChild_=void 0}function r(a){if(a.invalidateShadowRenderer()){for(var b=a.firstChild;b;){A(b.parentNode===a);var c=b.nextSibling,d=K(b),e=d.parentNode;e&&W.call(e,d),b.previousSibling_=b.nextSibling_=b.parentNode_=null,b=c}a.firstChild_=a.lastChild_=null}else for(var c,f=K(a),g=f.firstChild;g;)c=g.nextSibling,W.call(f,g),g=c}function s(a){var b=a.parentNode;return b&&b.invalidateShadowRenderer()}function t(a){for(var b,c=0;c<a.length;c++)b=a[c],b.parentNode.removeChild(b)}function u(a,b,c){var d;if(d=M(c?Q.call(c,J(a),!1):R.call(J(a),!1)),b){for(var e=a.firstChild;e;e=e.nextSibling)d.appendChild(u(e,!0,c));if(a instanceof O.HTMLTemplateElement)for(var f=d.content,e=a.content.firstChild;e;e=e.nextSibling)f.appendChild(u(e,!0,c))}return d}function v(a,b){if(!b||D(a)!==D(b))return!1;for(var c=b;c;c=c.parentNode)if(c===a)return!0;return!1}function w(a){A(a instanceof S),x.call(this,a),this.parentNode_=void 0,this.firstChild_=void 0,this.lastChild_=void 0,this.nextSibling_=void 0,this.previousSibling_=void 0,this.treeScope_=void 0}var x=a.wrappers.EventTarget,y=a.wrappers.NodeList,z=a.TreeScope,A=a.assert,B=a.defineWrapGetter,C=a.enqueueMutation,D=a.getTreeScope,E=a.isWrapper,F=a.mixin,G=a.registerTransientObservers,H=a.registerWrapper,I=a.setTreeScope,J=a.unsafeUnwrap,K=a.unwrap,L=a.unwrapIfNeeded,M=a.wrap,N=a.wrapIfNeeded,O=a.wrappers,P=!1,Q=document.importNode,R=window.Node.prototype.cloneNode,S=window.Node,T=window.DocumentFragment,U=(S.prototype.appendChild,S.prototype.compareDocumentPosition),V=S.prototype.insertBefore,W=S.prototype.removeChild,X=S.prototype.replaceChild,Y=/Trident/.test(navigator.userAgent),Z=Y?function(a,b){try{W.call(a,b)}catch(c){if(!(a instanceof T))throw c}}:function(a,b){W.call(a,b)};w.prototype=Object.create(x.prototype),F(w.prototype,{appendChild:function(a){return this.insertBefore(a,null)},insertBefore:function(a,c){b(a);var d;c?E(c)?d=K(c):(d=c,c=M(d)):(c=null,d=null),c&&A(c.parentNode===this);var e,h=c?c.previousSibling:this.lastChild,i=!this.invalidateShadowRenderer()&&!s(a);if(e=i?g(a):f(a,this,h,c),i)n(this,a),q(this),V.call(J(this),K(a),d);else{h||(this.firstChild_=e[0]),c||(this.lastChild_=e[e.length-1],void 0===this.firstChild_&&(this.firstChild_=this.firstChild));var j=d?d.parentNode:J(this);j?V.call(j,p(this,e),d):o(this,e)}return C(this,"childList",{addedNodes:e,nextSibling:c,previousSibling:h}),k(e,this),a},removeChild:function(a){if(b(a),a.parentNode!==this){for(var d=!1,e=(this.childNodes,this.firstChild);e;e=e.nextSibling)if(e===a){d=!0;break}if(!d)throw new Error("NotFoundError")}var f=K(a),g=a.nextSibling,h=a.previousSibling;if(this.invalidateShadowRenderer()){var i=this.firstChild,j=this.lastChild,k=f.parentNode;k&&Z(k,f),i===a&&(this.firstChild_=g),j===a&&(this.lastChild_=h),h&&(h.nextSibling_=g),g&&(g.previousSibling_=h),a.previousSibling_=a.nextSibling_=a.parentNode_=void 0}else q(this),Z(J(this),f);return P||C(this,"childList",{removedNodes:c(a),nextSibling:g,previousSibling:h}),G(this,a),a},replaceChild:function(a,d){b(a);var e;if(E(d)?e=K(d):(e=d,d=M(e)),d.parentNode!==this)throw new Error("NotFoundError");var h,i=d.nextSibling,j=d.previousSibling,m=!this.invalidateShadowRenderer()&&!s(a);return m?h=g(a):(i===a&&(i=a.nextSibling),h=f(a,this,j,i)),m?(n(this,a),q(this),X.call(J(this),K(a),e)):(this.firstChild===d&&(this.firstChild_=h[0]),this.lastChild===d&&(this.lastChild_=h[h.length-1]),d.previousSibling_=d.nextSibling_=d.parentNode_=void 0,e.parentNode&&X.call(e.parentNode,p(this,h),e)),C(this,"childList",{addedNodes:h,removedNodes:c(d),nextSibling:i,previousSibling:j}),l(d),k(h,this),d},nodeIsInserted_:function(){for(var a=this.firstChild;a;a=a.nextSibling)a.nodeIsInserted_()},hasChildNodes:function(){return null!==this.firstChild},get parentNode(){return void 0!==this.parentNode_?this.parentNode_:M(J(this).parentNode)},get firstChild(){return void 0!==this.firstChild_?this.firstChild_:M(J(this).firstChild)},get lastChild(){return void 0!==this.lastChild_?this.lastChild_:M(J(this).lastChild)},get nextSibling(){return void 0!==this.nextSibling_?this.nextSibling_:M(J(this).nextSibling)},get previousSibling(){return void 0!==this.previousSibling_?this.previousSibling_:M(J(this).previousSibling)},get parentElement(){for(var a=this.parentNode;a&&a.nodeType!==w.ELEMENT_NODE;)a=a.parentNode;return a},get textContent(){for(var a="",b=this.firstChild;b;b=b.nextSibling)b.nodeType!=w.COMMENT_NODE&&(a+=b.textContent);return a},set textContent(a){var b=i(this.childNodes);if(this.invalidateShadowRenderer()){if(r(this),""!==a){var c=J(this).ownerDocument.createTextNode(a);this.appendChild(c)}}else q(this),J(this).textContent=a;var d=i(this.childNodes);C(this,"childList",{addedNodes:d,removedNodes:b}),m(b),k(d,this)},get childNodes(){for(var a=new y,b=0,c=this.firstChild;c;c=c.nextSibling)a[b++]=c;return a.length=b,a},cloneNode:function(a){return u(this,a)},contains:function(a){return v(this,N(a))},compareDocumentPosition:function(a){return U.call(J(this),L(a))},normalize:function(){for(var a,b,c=i(this.childNodes),d=[],e="",f=0;f<c.length;f++)b=c[f],b.nodeType===w.TEXT_NODE?a||b.data.length?a?(e+=b.data,d.push(b)):a=b:this.removeNode(b):(a&&d.length&&(a.data+=e,t(d)),d=[],e="",a=null,b.childNodes.length&&b.normalize());a&&d.length&&(a.data+=e,t(d))}}),B(w,"ownerDocument"),H(S,w,document.createDocumentFragment()),delete w.prototype.querySelector,delete w.prototype.querySelectorAll,w.prototype=F(Object.create(x.prototype),w.prototype),a.cloneNode=u,a.nodeWasAdded=j,a.nodeWasRemoved=l,a.nodesWereAdded=k,a.nodesWereRemoved=m,a.originalInsertBefore=V,a.originalRemoveChild=W,a.snapshotNodeList=i,a.wrappers.Node=w}(window.ShadowDOMPolyfill),function(a){"use strict";function b(b,c,d,e){for(var f=null,g=null,h=0,i=b.length;i>h;h++)f=s(b[h]),!e&&(g=q(f).root)&&g instanceof a.wrappers.ShadowRoot||(d[c++]=f);return c}function c(a){return String(a).replace(/\/deep\//g," ")}function d(a,b){for(var c,e=a.firstElementChild;e;){if(e.matches(b))return e;if(c=d(e,b))return c;e=e.nextElementSibling}return null}function e(a,b){return a.matches(b)}function f(a,b,c){var d=a.localName;return d===b||d===c&&a.namespaceURI===D}function g(){return!0}function h(a,b,c){return a.localName===c}function i(a,b){return a.namespaceURI===b}function j(a,b,c){return a.namespaceURI===b&&a.localName===c}function k(a,b,c,d,e,f){for(var g=a.firstElementChild;g;)d(g,e,f)&&(c[b++]=g),b=k(g,b,c,d,e,f),g=g.nextElementSibling;return b}function l(c,d,e,f,g){var h,i=r(this),j=q(this).root;if(j instanceof a.wrappers.ShadowRoot)return k(this,d,e,c,f,null);if(i instanceof B)h=w.call(i,f);else{if(!(i instanceof C))return k(this,d,e,c,f,null);h=v.call(i,f)}return b(h,d,e,g)}function m(c,d,e,f,g){var h,i=r(this),j=q(this).root;if(j instanceof a.wrappers.ShadowRoot)return k(this,d,e,c,f,g);if(i instanceof B)h=y.call(i,f,g);else{if(!(i instanceof C))return k(this,d,e,c,f,g);h=x.call(i,f,g)}return b(h,d,e,!1)}function n(c,d,e,f,g){var h,i=r(this),j=q(this).root;if(j instanceof a.wrappers.ShadowRoot)return k(this,d,e,c,f,g);if(i instanceof B)h=A.call(i,f,g);else{if(!(i instanceof C))return k(this,d,e,c,f,g);h=z.call(i,f,g)}return b(h,d,e,!1)}var o=a.wrappers.HTMLCollection,p=a.wrappers.NodeList,q=a.getTreeScope,r=a.unsafeUnwrap,s=a.wrap,t=document.querySelector,u=document.documentElement.querySelector,v=document.querySelectorAll,w=document.documentElement.querySelectorAll,x=document.getElementsByTagName,y=document.documentElement.getElementsByTagName,z=document.getElementsByTagNameNS,A=document.documentElement.getElementsByTagNameNS,B=window.Element,C=window.HTMLDocument||window.Document,D="http://www.w3.org/1999/xhtml",E={querySelector:function(b){var e=c(b),f=e!==b;b=e;var g,h=r(this),i=q(this).root;if(i instanceof a.wrappers.ShadowRoot)return d(this,b);if(h instanceof B)g=s(u.call(h,b));else{if(!(h instanceof C))return d(this,b);g=s(t.call(h,b))}return g&&!f&&(i=q(g).root)&&i instanceof a.wrappers.ShadowRoot?d(this,b):g},querySelectorAll:function(a){var b=c(a),d=b!==a;a=b;var f=new p;return f.length=l.call(this,e,0,f,a,d),f}},F={getElementsByTagName:function(a){var b=new o,c="*"===a?g:f;return b.length=m.call(this,c,0,b,a,a.toLowerCase()),b},getElementsByClassName:function(a){return this.querySelectorAll("."+a)},getElementsByTagNameNS:function(a,b){var c=new o,d=null;return d="*"===a?"*"===b?g:h:"*"===b?i:j,c.length=n.call(this,d,0,c,a||null,b),c}};a.GetElementsByInterface=F,a.SelectorsInterface=E}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){for(;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}function c(a){for(;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}var d=a.wrappers.NodeList,e={get firstElementChild(){return b(this.firstChild)},get lastElementChild(){return c(this.lastChild)},get childElementCount(){for(var a=0,b=this.firstElementChild;b;b=b.nextElementSibling)a++;return a},get children(){for(var a=new d,b=0,c=this.firstElementChild;c;c=c.nextElementSibling)a[b++]=c;return a.length=b,a},remove:function(){var a=this.parentNode;a&&a.removeChild(this)}},f={get nextElementSibling(){return b(this.nextSibling)},get previousElementSibling(){return c(this.previousSibling)}};a.ChildNodeInterface=f,a.ParentNodeInterface=e}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){d.call(this,a)}var c=a.ChildNodeInterface,d=a.wrappers.Node,e=a.enqueueMutation,f=a.mixin,g=a.registerWrapper,h=a.unsafeUnwrap,i=window.CharacterData;b.prototype=Object.create(d.prototype),f(b.prototype,{get textContent(){return this.data},set textContent(a){this.data=a},get data(){return h(this).data},set data(a){var b=h(this).data;e(this,"characterData",{oldValue:b}),h(this).data=a}}),f(b.prototype,c),g(i,b,document.createTextNode("")),a.wrappers.CharacterData=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){return a>>>0}function c(a){d.call(this,a)}var d=a.wrappers.CharacterData,e=(a.enqueueMutation,a.mixin),f=a.registerWrapper,g=window.Text;c.prototype=Object.create(d.prototype),e(c.prototype,{splitText:function(a){a=b(a);var c=this.data;if(a>c.length)throw new Error("IndexSizeError");var d=c.slice(0,a),e=c.slice(a);this.data=d;var f=this.ownerDocument.createTextNode(e);return this.parentNode&&this.parentNode.insertBefore(f,this.nextSibling),f}}),f(g,c,document.createTextNode("")),a.wrappers.Text=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(b){a.invalidateRendererBasedOnAttribute(b,"class")}function c(a,b){d(a,this),this.ownerElement_=b}var d=a.setWrapper,e=a.unsafeUnwrap;c.prototype={constructor:c,get length(){return e(this).length},item:function(a){return e(this).item(a)},contains:function(a){return e(this).contains(a)},add:function(){e(this).add.apply(e(this),arguments),b(this.ownerElement_)},remove:function(){e(this).remove.apply(e(this),arguments),b(this.ownerElement_)},toggle:function(){var a=e(this).toggle.apply(e(this),arguments);return b(this.ownerElement_),a},toString:function(){return e(this).toString()}},a.wrappers.DOMTokenList=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(b,c){var d=b.parentNode;if(d&&d.shadowRoot){var e=a.getRendererForHost(d);e.dependsOnAttribute(c)&&e.invalidate()}}function c(a,b,c){k(a,"attributes",{name:b,namespace:null,oldValue:c})}function d(a){g.call(this,a)}var e=a.ChildNodeInterface,f=a.GetElementsByInterface,g=a.wrappers.Node,h=a.wrappers.DOMTokenList,i=a.ParentNodeInterface,j=a.SelectorsInterface,k=(a.addWrapNodeListMethod,a.enqueueMutation),l=a.mixin,m=(a.oneOf,a.registerWrapper),n=a.unsafeUnwrap,o=a.wrappers,p=window.Element,q=["matches","mozMatchesSelector","msMatchesSelector","webkitMatchesSelector"].filter(function(a){return p.prototype[a]}),r=q[0],s=p.prototype[r],t=new WeakMap;d.prototype=Object.create(g.prototype),l(d.prototype,{createShadowRoot:function(){var b=new o.ShadowRoot(this);n(this).polymerShadowRoot_=b;var c=a.getRendererForHost(this);return c.invalidate(),b},get shadowRoot(){return n(this).polymerShadowRoot_||null},setAttribute:function(a,d){var e=n(this).getAttribute(a);n(this).setAttribute(a,d),c(this,a,e),b(this,a)},removeAttribute:function(a){var d=n(this).getAttribute(a);n(this).removeAttribute(a),c(this,a,d),b(this,a)},matches:function(a){return s.call(n(this),a)},get classList(){var a=t.get(this);return a||t.set(this,a=new h(n(this).classList,this)),a},get className(){return n(this).className},set className(a){this.setAttribute("class",a)},get id(){return n(this).id},set id(a){this.setAttribute("id",a)}}),q.forEach(function(a){"matches"!==a&&(d.prototype[a]=function(a){return this.matches(a)})}),p.prototype.webkitCreateShadowRoot&&(d.prototype.webkitCreateShadowRoot=d.prototype.createShadowRoot),l(d.prototype,e),l(d.prototype,f),l(d.prototype,i),l(d.prototype,j),m(p,d,document.createElementNS(null,"x")),a.invalidateRendererBasedOnAttribute=b,a.matchesNames=q,a.wrappers.Element=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){switch(a){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"\xa0":return"&nbsp;"}}function c(a){return a.replace(A,b)}function d(a){return a.replace(B,b)}function e(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=!0;return b}function f(a,b){switch(a.nodeType){case Node.ELEMENT_NODE:for(var e,f=a.tagName.toLowerCase(),h="<"+f,i=a.attributes,j=0;e=i[j];j++)h+=" "+e.name+'="'+c(e.value)+'"';return h+=">",C[f]?h:h+g(a)+"</"+f+">";case Node.TEXT_NODE:var k=a.data;return b&&D[b.localName]?k:d(k);case Node.COMMENT_NODE:return"<!--"+a.data+"-->";default:throw console.error(a),new Error("not implemented")}}function g(a){a instanceof z.HTMLTemplateElement&&(a=a.content);for(var b="",c=a.firstChild;c;c=c.nextSibling)b+=f(c,a);return b}function h(a,b,c){var d=c||"div";a.textContent="";var e=x(a.ownerDocument.createElement(d));e.innerHTML=b;for(var f;f=e.firstChild;)a.appendChild(y(f))}function i(a){o.call(this,a)}function j(a,b){var c=x(a.cloneNode(!1));c.innerHTML=b;for(var d,e=x(document.createDocumentFragment());d=c.firstChild;)e.appendChild(d);return y(e)}function k(b){return function(){return a.renderAllPending(),w(this)[b]}}function l(a){p(i,a,k(a))}function m(b){Object.defineProperty(i.prototype,b,{get:k(b),set:function(c){a.renderAllPending(),w(this)[b]=c},configurable:!0,enumerable:!0})}function n(b){Object.defineProperty(i.prototype,b,{value:function(){return a.renderAllPending(),w(this)[b].apply(w(this),arguments)},configurable:!0,enumerable:!0})}var o=a.wrappers.Element,p=a.defineGetter,q=a.enqueueMutation,r=a.mixin,s=a.nodesWereAdded,t=a.nodesWereRemoved,u=a.registerWrapper,v=a.snapshotNodeList,w=a.unsafeUnwrap,x=a.unwrap,y=a.wrap,z=a.wrappers,A=/[&\u00A0"]/g,B=/[&\u00A0<>]/g,C=e(["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"]),D=e(["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"]),E=/MSIE/.test(navigator.userAgent),F=window.HTMLElement,G=window.HTMLTemplateElement;i.prototype=Object.create(o.prototype),r(i.prototype,{get innerHTML(){return g(this)},set innerHTML(a){if(E&&D[this.localName])return void(this.textContent=a);var b=v(this.childNodes);this.invalidateShadowRenderer()?this instanceof z.HTMLTemplateElement?h(this.content,a):h(this,a,this.tagName):!G&&this instanceof z.HTMLTemplateElement?h(this.content,a):w(this).innerHTML=a;var c=v(this.childNodes);q(this,"childList",{addedNodes:c,removedNodes:b}),t(b),s(c,this)},get outerHTML(){return f(this,this.parentNode)},set outerHTML(a){var b=this.parentNode;if(b){b.invalidateShadowRenderer();var c=j(b,a);b.replaceChild(c,this)}},insertAdjacentHTML:function(a,b){var c,d;switch(String(a).toLowerCase()){case"beforebegin":c=this.parentNode,d=this;break;case"afterend":c=this.parentNode,d=this.nextSibling;break;case"afterbegin":c=this,d=this.firstChild;break;case"beforeend":c=this,d=null;break;default:return}var e=j(c,b);c.insertBefore(e,d)},get hidden(){return this.hasAttribute("hidden")},set hidden(a){a?this.setAttribute("hidden",""):this.removeAttribute("hidden")}}),["clientHeight","clientLeft","clientTop","clientWidth","offsetHeight","offsetLeft","offsetTop","offsetWidth","scrollHeight","scrollWidth"].forEach(l),["scrollLeft","scrollTop"].forEach(m),["getBoundingClientRect","getClientRects","scrollIntoView"].forEach(n),u(F,i,document.createElement("b")),a.wrappers.HTMLElement=i,a.getInnerHTML=g,a.setInnerHTML=h}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=a.unsafeUnwrap,g=a.wrap,h=window.HTMLCanvasElement;b.prototype=Object.create(c.prototype),d(b.prototype,{getContext:function(){var a=f(this).getContext.apply(f(this),arguments);return a&&g(a)}}),e(h,b,document.createElement("canvas")),a.wrappers.HTMLCanvasElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=window.HTMLContentElement;b.prototype=Object.create(c.prototype),d(b.prototype,{constructor:b,get select(){return this.getAttribute("select")},set select(a){this.setAttribute("select",a)},setAttribute:function(a,b){c.prototype.setAttribute.call(this,a,b),"select"===String(a).toLowerCase()&&this.invalidateShadowRenderer(!0)}}),f&&e(f,b),a.wrappers.HTMLContentElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=a.wrapHTMLCollection,g=a.unwrap,h=window.HTMLFormElement;b.prototype=Object.create(c.prototype),d(b.prototype,{get elements(){return f(g(this).elements)}}),e(h,b,document.createElement("form")),a.wrappers.HTMLFormElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){d.call(this,a)}function c(a,b){if(!(this instanceof c))throw new TypeError("DOM object constructor cannot be called as a function.");var e=f(document.createElement("img"));d.call(this,e),g(e,this),void 0!==a&&(e.width=a),void 0!==b&&(e.height=b)}var d=a.wrappers.HTMLElement,e=a.registerWrapper,f=a.unwrap,g=a.rewrap,h=window.HTMLImageElement;b.prototype=Object.create(d.prototype),e(h,b,document.createElement("img")),c.prototype=b.prototype,a.wrappers.HTMLImageElement=b,a.wrappers.Image=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=(a.mixin,a.wrappers.NodeList,a.registerWrapper),e=window.HTMLShadowElement;b.prototype=Object.create(c.prototype),b.prototype.constructor=b,e&&d(e,b),a.wrappers.HTMLShadowElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){if(!a.defaultView)return a;var b=l.get(a);if(!b){for(b=a.implementation.createHTMLDocument("");b.lastChild;)b.removeChild(b.lastChild);l.set(a,b)}return b}function c(a){for(var c,d=b(a.ownerDocument),e=i(d.createDocumentFragment());c=a.firstChild;)e.appendChild(c);return e}function d(a){if(e.call(this,a),!m){var b=c(a);k.set(this,j(b))}}var e=a.wrappers.HTMLElement,f=a.mixin,g=a.registerWrapper,h=a.unsafeUnwrap,i=a.unwrap,j=a.wrap,k=new WeakMap,l=new WeakMap,m=window.HTMLTemplateElement;d.prototype=Object.create(e.prototype),f(d.prototype,{constructor:d,get content(){return m?j(h(this).content):k.get(this)}}),m&&g(m,d),a.wrappers.HTMLTemplateElement=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.registerWrapper,e=window.HTMLMediaElement;e&&(b.prototype=Object.create(c.prototype),d(e,b,document.createElement("audio")),a.wrappers.HTMLMediaElement=b)}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){d.call(this,a)}function c(a){if(!(this instanceof c))throw new TypeError("DOM object constructor cannot be called as a function.");var b=f(document.createElement("audio"));d.call(this,b),g(b,this),b.setAttribute("preload","auto"),void 0!==a&&b.setAttribute("src",a)}var d=a.wrappers.HTMLMediaElement,e=a.registerWrapper,f=a.unwrap,g=a.rewrap,h=window.HTMLAudioElement;h&&(b.prototype=Object.create(d.prototype),e(h,b,document.createElement("audio")),c.prototype=b.prototype,a.wrappers.HTMLAudioElement=b,a.wrappers.Audio=c)}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){return a.replace(/\s+/g," ").trim()}function c(a){e.call(this,a)}function d(a,b,c,f){if(!(this instanceof d))throw new TypeError("DOM object constructor cannot be called as a function.");var g=i(document.createElement("option"));e.call(this,g),h(g,this),void 0!==a&&(g.text=a),void 0!==b&&g.setAttribute("value",b),c===!0&&g.setAttribute("selected",""),g.selected=f===!0}var e=a.wrappers.HTMLElement,f=a.mixin,g=a.registerWrapper,h=a.rewrap,i=a.unwrap,j=a.wrap,k=window.HTMLOptionElement;c.prototype=Object.create(e.prototype),f(c.prototype,{get text(){return b(this.textContent)},set text(a){this.textContent=b(String(a))},get form(){return j(i(this).form)}}),g(k,c,document.createElement("option")),d.prototype=c.prototype,a.wrappers.HTMLOptionElement=c,a.wrappers.Option=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=a.unwrap,g=a.wrap,h=window.HTMLSelectElement;b.prototype=Object.create(c.prototype),d(b.prototype,{add:function(a,b){"object"==typeof b&&(b=f(b)),f(this).add(f(a),b)},remove:function(a){return void 0===a?void c.prototype.remove.call(this):("object"==typeof a&&(a=f(a)),void f(this).remove(a))},get form(){return g(f(this).form)}}),e(h,b,document.createElement("select")),a.wrappers.HTMLSelectElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=a.unwrap,g=a.wrap,h=a.wrapHTMLCollection,i=window.HTMLTableElement;b.prototype=Object.create(c.prototype),d(b.prototype,{get caption(){return g(f(this).caption)},createCaption:function(){return g(f(this).createCaption())},get tHead(){return g(f(this).tHead)},createTHead:function(){return g(f(this).createTHead())},createTFoot:function(){return g(f(this).createTFoot())},get tFoot(){return g(f(this).tFoot)},get tBodies(){return h(f(this).tBodies)},createTBody:function(){return g(f(this).createTBody())},get rows(){return h(f(this).rows)},insertRow:function(a){return g(f(this).insertRow(a))}}),e(i,b,document.createElement("table")),a.wrappers.HTMLTableElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=a.wrapHTMLCollection,g=a.unwrap,h=a.wrap,i=window.HTMLTableSectionElement;b.prototype=Object.create(c.prototype),d(b.prototype,{constructor:b,get rows(){return f(g(this).rows)},insertRow:function(a){return h(g(this).insertRow(a))}}),e(i,b,document.createElement("thead")),a.wrappers.HTMLTableSectionElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=a.wrapHTMLCollection,g=a.unwrap,h=a.wrap,i=window.HTMLTableRowElement;b.prototype=Object.create(c.prototype),d(b.prototype,{get cells(){return f(g(this).cells)},insertCell:function(a){return h(g(this).insertCell(a))}}),e(i,b,document.createElement("tr")),a.wrappers.HTMLTableRowElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){switch(a.localName){case"content":return new c(a);case"shadow":return new e(a);case"template":return new f(a)}d.call(this,a)}var c=a.wrappers.HTMLContentElement,d=a.wrappers.HTMLElement,e=a.wrappers.HTMLShadowElement,f=a.wrappers.HTMLTemplateElement,g=(a.mixin,a.registerWrapper),h=window.HTMLUnknownElement;b.prototype=Object.create(d.prototype),g(h,b),a.wrappers.HTMLUnknownElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";var b=a.wrappers.Element,c=a.wrappers.HTMLElement,d=a.registerObject,e="http://www.w3.org/2000/svg",f=document.createElementNS(e,"title"),g=d(f),h=Object.getPrototypeOf(g.prototype).constructor;if(!("classList"in f)){var i=Object.getOwnPropertyDescriptor(b.prototype,"classList");Object.defineProperty(c.prototype,"classList",i),delete b.prototype.classList}a.wrappers.SVGElement=h}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){m.call(this,a)}var c=a.mixin,d=a.registerWrapper,e=a.unwrap,f=a.wrap,g=window.SVGUseElement,h="http://www.w3.org/2000/svg",i=f(document.createElementNS(h,"g")),j=document.createElementNS(h,"use"),k=i.constructor,l=Object.getPrototypeOf(k.prototype),m=l.constructor;b.prototype=Object.create(l),"instanceRoot"in j&&c(b.prototype,{get instanceRoot(){return f(e(this).instanceRoot)},get animatedInstanceRoot(){return f(e(this).animatedInstanceRoot)}}),d(g,b,j),a.wrappers.SVGUseElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.EventTarget,d=a.mixin,e=a.registerWrapper,f=a.unsafeUnwrap,g=a.wrap,h=window.SVGElementInstance;h&&(b.prototype=Object.create(c.prototype),d(b.prototype,{get correspondingElement(){return g(f(this).correspondingElement)
},get correspondingUseElement(){return g(f(this).correspondingUseElement)},get parentNode(){return g(f(this).parentNode)},get childNodes(){throw new Error("Not implemented")},get firstChild(){return g(f(this).firstChild)},get lastChild(){return g(f(this).lastChild)},get previousSibling(){return g(f(this).previousSibling)},get nextSibling(){return g(f(this).nextSibling)}}),e(h,b),a.wrappers.SVGElementInstance=b)}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){e(a,this)}var c=a.mixin,d=a.registerWrapper,e=a.setWrapper,f=a.unsafeUnwrap,g=a.unwrap,h=a.unwrapIfNeeded,i=a.wrap,j=window.CanvasRenderingContext2D;c(b.prototype,{get canvas(){return i(f(this).canvas)},drawImage:function(){arguments[0]=h(arguments[0]),f(this).drawImage.apply(f(this),arguments)},createPattern:function(){return arguments[0]=g(arguments[0]),f(this).createPattern.apply(f(this),arguments)}}),d(j,b,document.createElement("canvas").getContext("2d")),a.wrappers.CanvasRenderingContext2D=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){e(a,this)}var c=a.mixin,d=a.registerWrapper,e=a.setWrapper,f=a.unsafeUnwrap,g=a.unwrapIfNeeded,h=a.wrap,i=window.WebGLRenderingContext;if(i){c(b.prototype,{get canvas(){return h(f(this).canvas)},texImage2D:function(){arguments[5]=g(arguments[5]),f(this).texImage2D.apply(f(this),arguments)},texSubImage2D:function(){arguments[6]=g(arguments[6]),f(this).texSubImage2D.apply(f(this),arguments)}});var j=/WebKit/.test(navigator.userAgent)?{drawingBufferHeight:null,drawingBufferWidth:null}:{};d(i,b,j),a.wrappers.WebGLRenderingContext=b}}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){d(a,this)}var c=a.registerWrapper,d=a.setWrapper,e=a.unsafeUnwrap,f=a.unwrap,g=a.unwrapIfNeeded,h=a.wrap,i=window.Range;b.prototype={get startContainer(){return h(e(this).startContainer)},get endContainer(){return h(e(this).endContainer)},get commonAncestorContainer(){return h(e(this).commonAncestorContainer)},setStart:function(a,b){e(this).setStart(g(a),b)},setEnd:function(a,b){e(this).setEnd(g(a),b)},setStartBefore:function(a){e(this).setStartBefore(g(a))},setStartAfter:function(a){e(this).setStartAfter(g(a))},setEndBefore:function(a){e(this).setEndBefore(g(a))},setEndAfter:function(a){e(this).setEndAfter(g(a))},selectNode:function(a){e(this).selectNode(g(a))},selectNodeContents:function(a){e(this).selectNodeContents(g(a))},compareBoundaryPoints:function(a,b){return e(this).compareBoundaryPoints(a,f(b))},extractContents:function(){return h(e(this).extractContents())},cloneContents:function(){return h(e(this).cloneContents())},insertNode:function(a){e(this).insertNode(g(a))},surroundContents:function(a){e(this).surroundContents(g(a))},cloneRange:function(){return h(e(this).cloneRange())},isPointInRange:function(a,b){return e(this).isPointInRange(g(a),b)},comparePoint:function(a,b){return e(this).comparePoint(g(a),b)},intersectsNode:function(a){return e(this).intersectsNode(g(a))},toString:function(){return e(this).toString()}},i.prototype.createContextualFragment&&(b.prototype.createContextualFragment=function(a){return h(e(this).createContextualFragment(a))}),c(window.Range,b,document.createRange()),a.wrappers.Range=b}(window.ShadowDOMPolyfill),function(a){"use strict";var b=a.GetElementsByInterface,c=a.ParentNodeInterface,d=a.SelectorsInterface,e=a.mixin,f=a.registerObject,g=f(document.createDocumentFragment());e(g.prototype,c),e(g.prototype,d),e(g.prototype,b);var h=f(document.createComment(""));a.wrappers.Comment=h,a.wrappers.DocumentFragment=g}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){var b=l(k(a).ownerDocument.createDocumentFragment());c.call(this,b),i(b,this);var e=a.shadowRoot;n.set(this,e),this.treeScope_=new d(this,g(e||a)),m.set(this,a)}var c=a.wrappers.DocumentFragment,d=a.TreeScope,e=a.elementFromPoint,f=a.getInnerHTML,g=a.getTreeScope,h=a.mixin,i=a.rewrap,j=a.setInnerHTML,k=a.unsafeUnwrap,l=a.unwrap,m=new WeakMap,n=new WeakMap,o=/[ \t\n\r\f]/;b.prototype=Object.create(c.prototype),h(b.prototype,{constructor:b,get innerHTML(){return f(this)},set innerHTML(a){j(this,a),this.invalidateShadowRenderer()},get olderShadowRoot(){return n.get(this)||null},get host(){return m.get(this)||null},invalidateShadowRenderer:function(){return m.get(this).invalidateShadowRenderer()},elementFromPoint:function(a,b){return e(this,this.ownerDocument,a,b)},getElementById:function(a){return o.test(a)?null:this.querySelector('[id="'+a+'"]')}}),a.wrappers.ShadowRoot=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){a.previousSibling_=a.previousSibling,a.nextSibling_=a.nextSibling,a.parentNode_=a.parentNode}function c(c,e,f){var g=H(c),h=H(e),i=f?H(f):null;if(d(e),b(e),f)c.firstChild===f&&(c.firstChild_=f),f.previousSibling_=f.previousSibling;else{c.lastChild_=c.lastChild,c.lastChild===c.firstChild&&(c.firstChild_=c.firstChild);var j=I(g.lastChild);j&&(j.nextSibling_=j.nextSibling)}a.originalInsertBefore.call(g,h,i)}function d(c){var d=H(c),e=d.parentNode;if(e){var f=I(e);b(c),c.previousSibling&&(c.previousSibling.nextSibling_=c),c.nextSibling&&(c.nextSibling.previousSibling_=c),f.lastChild===c&&(f.lastChild_=c),f.firstChild===c&&(f.firstChild_=c),a.originalRemoveChild.call(e,d)}}function e(a){J.set(a,[])}function f(a){var b=J.get(a);return b||J.set(a,b=[]),b}function g(a){for(var b=[],c=0,d=a.firstChild;d;d=d.nextSibling)b[c++]=d;return b}function h(){for(var a=0;a<N.length;a++){var b=N[a],c=b.parentRenderer;c&&c.dirty||b.render()}N=[]}function i(){y=null,h()}function j(a){var b=L.get(a);return b||(b=new n(a),L.set(a,b)),b}function k(a){var b=E(a).root;return b instanceof D?b:null}function l(a){return j(a.host)}function m(a){this.skip=!1,this.node=a,this.childNodes=[]}function n(a){this.host=a,this.dirty=!1,this.invalidateAttributes(),this.associateNode(a)}function o(a){for(var b=[],c=a.firstChild;c;c=c.nextSibling)v(c)?b.push.apply(b,f(c)):b.push(c);return b}function p(a){if(a instanceof B)return a;if(a instanceof A)return null;for(var b=a.firstChild;b;b=b.nextSibling){var c=p(b);if(c)return c}return null}function q(a,b){f(b).push(a);var c=K.get(a);c?c.push(b):K.set(a,[b])}function r(a){return K.get(a)}function s(a){K.set(a,void 0)}function t(a,b){var c=b.getAttribute("select");if(!c)return!0;if(c=c.trim(),!c)return!0;if(!(a instanceof z))return!1;if(!P.test(c))return!1;try{return a.matches(c)}catch(d){return!1}}function u(a,b){var c=r(b);return c&&c[c.length-1]===a}function v(a){return a instanceof A||a instanceof B}function w(a){return a.shadowRoot}function x(a){for(var b=[],c=a.shadowRoot;c;c=c.olderShadowRoot)b.push(c);return b}var y,z=a.wrappers.Element,A=a.wrappers.HTMLContentElement,B=a.wrappers.HTMLShadowElement,C=a.wrappers.Node,D=a.wrappers.ShadowRoot,E=(a.assert,a.getTreeScope),F=(a.mixin,a.oneOf),G=a.unsafeUnwrap,H=a.unwrap,I=a.wrap,J=new WeakMap,K=new WeakMap,L=new WeakMap,M=F(window,["requestAnimationFrame","mozRequestAnimationFrame","webkitRequestAnimationFrame","setTimeout"]),N=[],O=new ArraySplice;O.equals=function(a,b){return H(a.node)===b},m.prototype={append:function(a){var b=new m(a);return this.childNodes.push(b),b},sync:function(a){if(!this.skip){for(var b=this.node,e=this.childNodes,f=g(H(b)),h=a||new WeakMap,i=O.calculateSplices(e,f),j=0,k=0,l=0,m=0;m<i.length;m++){for(var n=i[m];l<n.index;l++)k++,e[j++].sync(h);for(var o=n.removed.length,p=0;o>p;p++){var q=I(f[k++]);h.get(q)||d(q)}for(var r=n.addedCount,s=f[k]&&I(f[k]),p=0;r>p;p++){var t=e[j++],u=t.node;c(b,u,s),h.set(u,!0),t.sync(h)}l+=r}for(var m=l;m<e.length;m++)e[m].sync(h)}}},n.prototype={render:function(a){if(this.dirty){this.invalidateAttributes();var b=this.host;this.distribution(b);var c=a||new m(b);this.buildRenderTree(c,b);var d=!a;d&&c.sync(),this.dirty=!1}},get parentRenderer(){return E(this.host).renderer},invalidate:function(){if(!this.dirty){this.dirty=!0;var a=this.parentRenderer;if(a&&a.invalidate(),N.push(this),y)return;y=window[M](i,0)}},distribution:function(a){this.resetAllSubtrees(a),this.distributionResolution(a)},resetAll:function(a){v(a)?e(a):s(a),this.resetAllSubtrees(a)},resetAllSubtrees:function(a){for(var b=a.firstChild;b;b=b.nextSibling)this.resetAll(b);a.shadowRoot&&this.resetAll(a.shadowRoot),a.olderShadowRoot&&this.resetAll(a.olderShadowRoot)},distributionResolution:function(a){if(w(a)){for(var b=a,c=o(b),d=x(b),e=0;e<d.length;e++)this.poolDistribution(d[e],c);for(var e=d.length-1;e>=0;e--){var f=d[e],g=p(f);if(g){var h=f.olderShadowRoot;h&&(c=o(h));for(var i=0;i<c.length;i++)q(c[i],g)}this.distributionResolution(f)}}for(var j=a.firstChild;j;j=j.nextSibling)this.distributionResolution(j)},poolDistribution:function(a,b){if(!(a instanceof B))if(a instanceof A){var c=a;this.updateDependentAttributes(c.getAttribute("select"));for(var d=!1,e=0;e<b.length;e++){var a=b[e];a&&t(a,c)&&(q(a,c),b[e]=void 0,d=!0)}if(!d)for(var f=c.firstChild;f;f=f.nextSibling)q(f,c)}else for(var f=a.firstChild;f;f=f.nextSibling)this.poolDistribution(f,b)},buildRenderTree:function(a,b){for(var c=this.compose(b),d=0;d<c.length;d++){var e=c[d],f=a.append(e);this.buildRenderTree(f,e)}if(w(b)){var g=j(b);g.dirty=!1}},compose:function(a){for(var b=[],c=a.shadowRoot||a,d=c.firstChild;d;d=d.nextSibling)if(v(d)){this.associateNode(c);for(var e=f(d),g=0;g<e.length;g++){var h=e[g];u(d,h)&&b.push(h)}}else b.push(d);return b},invalidateAttributes:function(){this.attributes=Object.create(null)},updateDependentAttributes:function(a){if(a){var b=this.attributes;/\.\w+/.test(a)&&(b["class"]=!0),/#\w+/.test(a)&&(b.id=!0),a.replace(/\[\s*([^\s=\|~\]]+)/g,function(a,c){b[c]=!0})}},dependsOnAttribute:function(a){return this.attributes[a]},associateNode:function(a){G(a).polymerShadowRenderer_=this}};var P=/^(:not\()?[*.#[a-zA-Z_|]/;C.prototype.invalidateShadowRenderer=function(){var a=G(this).polymerShadowRenderer_;return a?(a.invalidate(),!0):!1},A.prototype.getDistributedNodes=B.prototype.getDistributedNodes=function(){return h(),f(this)},z.prototype.getDestinationInsertionPoints=function(){return h(),r(this)||[]},A.prototype.nodeIsInserted_=B.prototype.nodeIsInserted_=function(){this.invalidateShadowRenderer();var a,b=k(this);b&&(a=l(b)),G(this).polymerShadowRenderer_=a,a&&a.invalidate()},a.getRendererForHost=j,a.getShadowTrees=x,a.renderAllPending=h,a.getDestinationInsertionPoints=r,a.visual={insertBefore:c,remove:d}}(window.ShadowDOMPolyfill),function(a){"use strict";function b(b){if(window[b]){d(!a.wrappers[b]);var i=function(a){c.call(this,a)};i.prototype=Object.create(c.prototype),e(i.prototype,{get form(){return h(g(this).form)}}),f(window[b],i,document.createElement(b.slice(4,-7))),a.wrappers[b]=i}}var c=a.wrappers.HTMLElement,d=a.assert,e=a.mixin,f=a.registerWrapper,g=a.unwrap,h=a.wrap,i=["HTMLButtonElement","HTMLFieldSetElement","HTMLInputElement","HTMLKeygenElement","HTMLLabelElement","HTMLLegendElement","HTMLObjectElement","HTMLOutputElement","HTMLTextAreaElement"];i.forEach(b)}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){d(a,this)}{var c=a.registerWrapper,d=a.setWrapper,e=a.unsafeUnwrap,f=a.unwrap,g=a.unwrapIfNeeded,h=a.wrap;window.Selection}b.prototype={get anchorNode(){return h(e(this).anchorNode)},get focusNode(){return h(e(this).focusNode)},addRange:function(a){e(this).addRange(f(a))},collapse:function(a,b){e(this).collapse(g(a),b)},containsNode:function(a,b){return e(this).containsNode(g(a),b)},extend:function(a,b){e(this).extend(g(a),b)},getRangeAt:function(a){return h(e(this).getRangeAt(a))},removeRange:function(a){e(this).removeRange(f(a))},selectAllChildren:function(a){e(this).selectAllChildren(g(a))},toString:function(){return e(this).toString()}},c(window.Selection,b,window.getSelection()),a.wrappers.Selection=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){k.call(this,a),this.treeScope_=new p(this,null)}function c(a){var c=document[a];b.prototype[a]=function(){return C(c.apply(A(this),arguments))}}function d(a,b){F.call(A(b),B(a)),e(a,b)}function e(a,b){a.shadowRoot&&b.adoptNode(a.shadowRoot),a instanceof o&&f(a,b);for(var c=a.firstChild;c;c=c.nextSibling)e(c,b)}function f(a,b){var c=a.olderShadowRoot;c&&b.adoptNode(c)}function g(a){z(a,this)}function h(a,b){var c=document.implementation[b];a.prototype[b]=function(){return C(c.apply(A(this),arguments))}}function i(a,b){var c=document.implementation[b];a.prototype[b]=function(){return c.apply(A(this),arguments)}}var j=a.GetElementsByInterface,k=a.wrappers.Node,l=a.ParentNodeInterface,m=a.wrappers.Selection,n=a.SelectorsInterface,o=a.wrappers.ShadowRoot,p=a.TreeScope,q=a.cloneNode,r=a.defineWrapGetter,s=a.elementFromPoint,t=a.forwardMethodsToWrapper,u=a.matchesNames,v=a.mixin,w=a.registerWrapper,x=a.renderAllPending,y=a.rewrap,z=a.setWrapper,A=a.unsafeUnwrap,B=a.unwrap,C=a.wrap,D=a.wrapEventTargetMethods,E=(a.wrapNodeList,new WeakMap);b.prototype=Object.create(k.prototype),r(b,"documentElement"),r(b,"body"),r(b,"head"),["createComment","createDocumentFragment","createElement","createElementNS","createEvent","createEventNS","createRange","createTextNode","getElementById"].forEach(c);var F=document.adoptNode,G=document.getSelection;if(v(b.prototype,{adoptNode:function(a){return a.parentNode&&a.parentNode.removeChild(a),d(a,this),a},elementFromPoint:function(a,b){return s(this,this,a,b)},importNode:function(a,b){return q(a,b,A(this))},getSelection:function(){return x(),new m(G.call(B(this)))},getElementsByName:function(a){return n.querySelectorAll.call(this,"[name="+JSON.stringify(String(a))+"]")}}),document.registerElement){var H=document.registerElement;b.prototype.registerElement=function(b,c){function d(a){return a?void z(a,this):f?document.createElement(f,b):document.createElement(b)}var e,f;if(void 0!==c&&(e=c.prototype,f=c.extends),e||(e=Object.create(HTMLElement.prototype)),a.nativePrototypeTable.get(e))throw new Error("NotSupportedError");for(var g,h=Object.getPrototypeOf(e),i=[];h&&!(g=a.nativePrototypeTable.get(h));)i.push(h),h=Object.getPrototypeOf(h);if(!g)throw new Error("NotSupportedError");for(var j=Object.create(g),k=i.length-1;k>=0;k--)j=Object.create(j);["createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"].forEach(function(a){var b=e[a];b&&(j[a]=function(){C(this)instanceof d||y(this),b.apply(C(this),arguments)})});var l={prototype:j};f&&(l.extends=f),d.prototype=e,d.prototype.constructor=d,a.constructorTable.set(j,d),a.nativePrototypeTable.set(e,j);H.call(B(this),b,l);return d},t([window.HTMLDocument||window.Document],["registerElement"])}t([window.HTMLBodyElement,window.HTMLDocument||window.Document,window.HTMLHeadElement,window.HTMLHtmlElement],["appendChild","compareDocumentPosition","contains","getElementsByClassName","getElementsByTagName","getElementsByTagNameNS","insertBefore","querySelector","querySelectorAll","removeChild","replaceChild"].concat(u)),t([window.HTMLDocument||window.Document],["adoptNode","importNode","contains","createComment","createDocumentFragment","createElement","createElementNS","createEvent","createEventNS","createRange","createTextNode","elementFromPoint","getElementById","getElementsByName","getSelection"]),v(b.prototype,j),v(b.prototype,l),v(b.prototype,n),v(b.prototype,{get implementation(){var a=E.get(this);return a?a:(a=new g(B(this).implementation),E.set(this,a),a)},get defaultView(){return C(B(this).defaultView)}}),w(window.Document,b,document.implementation.createHTMLDocument("")),window.HTMLDocument&&w(window.HTMLDocument,b),D([window.HTMLBodyElement,window.HTMLDocument||window.Document,window.HTMLHeadElement]),h(g,"createDocumentType"),h(g,"createDocument"),h(g,"createHTMLDocument"),i(g,"hasFeature"),w(window.DOMImplementation,g),t([window.DOMImplementation],["createDocumentType","createDocument","createHTMLDocument","hasFeature"]),a.adoptNodeNoRemove=d,a.wrappers.DOMImplementation=g,a.wrappers.Document=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.EventTarget,d=a.wrappers.Selection,e=a.mixin,f=a.registerWrapper,g=a.renderAllPending,h=a.unwrap,i=a.unwrapIfNeeded,j=a.wrap,k=window.Window,l=window.getComputedStyle,m=window.getDefaultComputedStyle,n=window.getSelection;b.prototype=Object.create(c.prototype),k.prototype.getComputedStyle=function(a,b){return j(this||window).getComputedStyle(i(a),b)},m&&(k.prototype.getDefaultComputedStyle=function(a,b){return j(this||window).getDefaultComputedStyle(i(a),b)}),k.prototype.getSelection=function(){return j(this||window).getSelection()},delete window.getComputedStyle,delete window.getDefaultComputedStyle,delete window.getSelection,["addEventListener","removeEventListener","dispatchEvent"].forEach(function(a){k.prototype[a]=function(){var b=j(this||window);return b[a].apply(b,arguments)},delete window[a]}),e(b.prototype,{getComputedStyle:function(a,b){return g(),l.call(h(this),i(a),b)},getSelection:function(){return g(),new d(n.call(h(this)))},get document(){return j(h(this).document)}}),m&&(b.prototype.getDefaultComputedStyle=function(a,b){return g(),m.call(h(this),i(a),b)}),f(k,b,window),a.wrappers.Window=b}(window.ShadowDOMPolyfill),function(a){"use strict";var b=a.unwrap,c=window.DataTransfer||window.Clipboard,d=c.prototype.setDragImage;d&&(c.prototype.setDragImage=function(a,c,e){d.call(this,b(a),c,e)})}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){var b;b=a instanceof f?a:new f(a&&e(a)),d(b,this)}var c=a.registerWrapper,d=a.setWrapper,e=a.unwrap,f=window.FormData;c(f,b,new f),a.wrappers.FormData=b}(window.ShadowDOMPolyfill),function(a){"use strict";var b=a.unwrapIfNeeded,c=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(a){return c.call(this,b(a))}}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){var b=c[a],d=window[b];if(d){var e=document.createElement(a),f=e.constructor;window[b]=f}}var c=(a.isWrapperFor,{a:"HTMLAnchorElement",area:"HTMLAreaElement",audio:"HTMLAudioElement",base:"HTMLBaseElement",body:"HTMLBodyElement",br:"HTMLBRElement",button:"HTMLButtonElement",canvas:"HTMLCanvasElement",caption:"HTMLTableCaptionElement",col:"HTMLTableColElement",content:"HTMLContentElement",data:"HTMLDataElement",datalist:"HTMLDataListElement",del:"HTMLModElement",dir:"HTMLDirectoryElement",div:"HTMLDivElement",dl:"HTMLDListElement",embed:"HTMLEmbedElement",fieldset:"HTMLFieldSetElement",font:"HTMLFontElement",form:"HTMLFormElement",frame:"HTMLFrameElement",frameset:"HTMLFrameSetElement",h1:"HTMLHeadingElement",head:"HTMLHeadElement",hr:"HTMLHRElement",html:"HTMLHtmlElement",iframe:"HTMLIFrameElement",img:"HTMLImageElement",input:"HTMLInputElement",keygen:"HTMLKeygenElement",label:"HTMLLabelElement",legend:"HTMLLegendElement",li:"HTMLLIElement",link:"HTMLLinkElement",map:"HTMLMapElement",marquee:"HTMLMarqueeElement",menu:"HTMLMenuElement",menuitem:"HTMLMenuItemElement",meta:"HTMLMetaElement",meter:"HTMLMeterElement",object:"HTMLObjectElement",ol:"HTMLOListElement",optgroup:"HTMLOptGroupElement",option:"HTMLOptionElement",output:"HTMLOutputElement",p:"HTMLParagraphElement",param:"HTMLParamElement",pre:"HTMLPreElement",progress:"HTMLProgressElement",q:"HTMLQuoteElement",script:"HTMLScriptElement",select:"HTMLSelectElement",shadow:"HTMLShadowElement",source:"HTMLSourceElement",span:"HTMLSpanElement",style:"HTMLStyleElement",table:"HTMLTableElement",tbody:"HTMLTableSectionElement",template:"HTMLTemplateElement",textarea:"HTMLTextAreaElement",thead:"HTMLTableSectionElement",time:"HTMLTimeElement",title:"HTMLTitleElement",tr:"HTMLTableRowElement",track:"HTMLTrackElement",ul:"HTMLUListElement",video:"HTMLVideoElement"});Object.keys(c).forEach(b),Object.getOwnPropertyNames(a.wrappers).forEach(function(b){window[b]=a.wrappers[b]})}(window.ShadowDOMPolyfill),function(a){function b(a,c){var d,e,f,g,h=a.firstElementChild;for(e=[],f=a.shadowRoot;f;)e.push(f),f=f.olderShadowRoot;for(g=e.length-1;g>=0;g--)if(d=e[g].querySelector(c))return d;for(;h;){if(d=b(h,c))return d;h=h.nextElementSibling}return null}function c(a,b,d){var e,f,g,h,i,j=a.firstElementChild;for(g=[],f=a.shadowRoot;f;)g.push(f),f=f.olderShadowRoot;for(h=g.length-1;h>=0;h--)for(e=g[h].querySelectorAll(b),i=0;i<e.length;i++)d.push(e[i]);for(;j;)c(j,b,d),j=j.nextElementSibling;return d}window.wrap=ShadowDOMPolyfill.wrapIfNeeded,window.unwrap=ShadowDOMPolyfill.unwrapIfNeeded,Object.defineProperty(Element.prototype,"webkitShadowRoot",Object.getOwnPropertyDescriptor(Element.prototype,"shadowRoot"));var d=Element.prototype.createShadowRoot;Element.prototype.createShadowRoot=function(){var a=d.call(this);return CustomElements.watchShadow(this),a},Element.prototype.webkitCreateShadowRoot=Element.prototype.createShadowRoot,a.queryAllShadows=function(a,d,e){return e?c(a,d,[]):b(a,d)}}(window.Platform),function(a){function b(a,b){var c="";return Array.prototype.forEach.call(a,function(a){c+=a.textContent+"\n\n"}),b||(c=c.replace(l,"")),c}function c(a){var b=document.createElement("style");return b.textContent=a,b}function d(a){var b=c(a);document.head.appendChild(b);var d=[];if(b.sheet)try{d=b.sheet.cssRules}catch(e){}else console.warn("sheet not found",b);return b.parentNode.removeChild(b),d}function e(){v.initialized=!0,document.body.appendChild(v);var a=v.contentDocument,b=a.createElement("base");b.href=document.baseURI,a.head.appendChild(b)}function f(a){v.initialized||e(),document.body.appendChild(v),a(v.contentDocument),document.body.removeChild(v)}function g(a,b){if(b){var e;if(a.match("@import")&&x){var g=c(a);f(function(a){a.head.appendChild(g.impl),e=Array.prototype.slice.call(g.sheet.cssRules,0),b(e)})}else e=d(a),b(e)}}function h(a){a&&j().appendChild(document.createTextNode(a))}function i(a,b){var d=c(a);d.setAttribute(b,""),d.setAttribute(z,""),document.head.appendChild(d)}function j(){return w||(w=document.createElement("style"),w.setAttribute(z,""),w[z]=!0),w}var k={strictStyling:!1,registry:{},shimStyling:function(a,c,d){var e=this.prepareRoot(a,c,d),f=this.isTypeExtension(d),g=this.makeScopeSelector(c,f),h=b(e,!0);h=this.scopeCssText(h,g),a&&(a.shimmedStyle=h),this.addCssToDocument(h,c)},shimStyle:function(a,b){return this.shimCssText(a.textContent,b)},shimCssText:function(a,b){return a=this.insertDirectives(a),this.scopeCssText(a,b)},makeScopeSelector:function(a,b){return a?b?"[is="+a+"]":a:""},isTypeExtension:function(a){return a&&a.indexOf("-")<0},prepareRoot:function(a,b,c){var d=this.registerRoot(a,b,c);return this.replaceTextInStyles(d.rootStyles,this.insertDirectives),this.removeStyles(a,d.rootStyles),this.strictStyling&&this.applyScopeToContent(a,b),d.scopeStyles},removeStyles:function(a,b){for(var c,d=0,e=b.length;e>d&&(c=b[d]);d++)c.parentNode.removeChild(c)},registerRoot:function(a,b,c){var d=this.registry[b]={root:a,name:b,extendsName:c},e=this.findStyles(a);d.rootStyles=e,d.scopeStyles=d.rootStyles;var f=this.registry[d.extendsName];return f&&(d.scopeStyles=f.scopeStyles.concat(d.scopeStyles)),d},findStyles:function(a){if(!a)return[];var b=a.querySelectorAll("style");return Array.prototype.filter.call(b,function(a){return!a.hasAttribute(A)})},applyScopeToContent:function(a,b){a&&(Array.prototype.forEach.call(a.querySelectorAll("*"),function(a){a.setAttribute(b,"")}),Array.prototype.forEach.call(a.querySelectorAll("template"),function(a){this.applyScopeToContent(a.content,b)},this))},insertDirectives:function(a){return a=this.insertPolyfillDirectivesInCssText(a),this.insertPolyfillRulesInCssText(a)},insertPolyfillDirectivesInCssText:function(a){return a=a.replace(m,function(a,b){return b.slice(0,-2)+"{"}),a.replace(n,function(a,b){return b+" {"})},insertPolyfillRulesInCssText:function(a){return a=a.replace(o,function(a,b){return b.slice(0,-1)}),a.replace(p,function(a,b,c,d){var e=a.replace(b,"").replace(c,"");return d+e})},scopeCssText:function(a,b){var c=this.extractUnscopedRulesFromCssText(a);if(a=this.insertPolyfillHostInCssText(a),a=this.convertColonHost(a),a=this.convertColonHostContext(a),a=this.convertShadowDOMSelectors(a),b){var a,d=this;g(a,function(c){a=d.scopeRules(c,b)})}return a=a+"\n"+c,a.trim()},extractUnscopedRulesFromCssText:function(a){for(var b,c="";b=q.exec(a);)c+=b[1].slice(0,-1)+"\n\n";for(;b=r.exec(a);)c+=b[0].replace(b[2],"").replace(b[1],b[3])+"\n\n";return c},convertColonHost:function(a){return this.convertColonRule(a,cssColonHostRe,this.colonHostPartReplacer)},convertColonHostContext:function(a){return this.convertColonRule(a,cssColonHostContextRe,this.colonHostContextPartReplacer)},convertColonRule:function(a,b,c){return a.replace(b,function(a,b,d,e){if(b=polyfillHostNoCombinator,d){for(var f,g=d.split(","),h=[],i=0,j=g.length;j>i&&(f=g[i]);i++)f=f.trim(),h.push(c(b,f,e));return h.join(",")}return b+e})},colonHostContextPartReplacer:function(a,b,c){return b.match(s)?this.colonHostPartReplacer(a,b,c):a+b+c+", "+b+" "+a+c},colonHostPartReplacer:function(a,b,c){return a+b.replace(s,"")+c},convertShadowDOMSelectors:function(a){for(var b=0;b<shadowDOMSelectorsRe.length;b++)a=a.replace(shadowDOMSelectorsRe[b]," ");return a},scopeRules:function(a,b){var c="";return a&&Array.prototype.forEach.call(a,function(a){if(a.selectorText&&a.style&&void 0!==a.style.cssText)c+=this.scopeSelector(a.selectorText,b,this.strictStyling)+" {\n	",c+=this.propertiesFromRule(a)+"\n}\n\n";else if(a.type===CSSRule.MEDIA_RULE)c+="@media "+a.media.mediaText+" {\n",c+=this.scopeRules(a.cssRules,b),c+="\n}\n\n";else try{a.cssText&&(c+=a.cssText+"\n\n")}catch(d){a.type===CSSRule.KEYFRAMES_RULE&&a.cssRules&&(c+=this.ieSafeCssTextFromKeyFrameRule(a))}},this),c},ieSafeCssTextFromKeyFrameRule:function(a){var b="@keyframes "+a.name+" {";return Array.prototype.forEach.call(a.cssRules,function(a){b+=" "+a.keyText+" {"+a.style.cssText+"}"}),b+=" }"},scopeSelector:function(a,b,c){var d=[],e=a.split(",");return e.forEach(function(a){a=a.trim(),this.selectorNeedsScoping(a,b)&&(a=c&&!a.match(polyfillHostNoCombinator)?this.applyStrictSelectorScope(a,b):this.applySelectorScope(a,b)),d.push(a)},this),d.join(", ")},selectorNeedsScoping:function(a,b){if(Array.isArray(b))return!0;var c=this.makeScopeMatcher(b);return!a.match(c)},makeScopeMatcher:function(a){return a=a.replace(/\[/g,"\\[").replace(/\[/g,"\\]"),new RegExp("^("+a+")"+selectorReSuffix,"m")},applySelectorScope:function(a,b){return Array.isArray(b)?this.applySelectorScopeList(a,b):this.applySimpleSelectorScope(a,b)},applySelectorScopeList:function(a,b){for(var c,d=[],e=0;c=b[e];e++)d.push(this.applySimpleSelectorScope(a,c));return d.join(", ")},applySimpleSelectorScope:function(a,b){return a.match(polyfillHostRe)?(a=a.replace(polyfillHostNoCombinator,b),a.replace(polyfillHostRe,b+" ")):b+" "+a},applyStrictSelectorScope:function(a,b){b=b.replace(/\[is=([^\]]*)\]/g,"$1");var c=[" ",">","+","~"],d=a,e="["+b+"]";return c.forEach(function(a){var b=d.split(a);d=b.map(function(a){var b=a.trim().replace(polyfillHostRe,"");return b&&c.indexOf(b)<0&&b.indexOf(e)<0&&(a=b.replace(/([^:]*)(:*)(.*)/,"$1"+e+"$2$3")),a}).join(a)}),d},insertPolyfillHostInCssText:function(a){return a.replace(colonHostContextRe,t).replace(colonHostRe,s)},propertiesFromRule:function(a){var b=a.style.cssText;a.style.content&&!a.style.content.match(/['"]+|attr/)&&(b=b.replace(/content:[^;]*;/g,"content: '"+a.style.content+"';"));var c=a.style;for(var d in c)"initial"===c[d]&&(b+=d+": initial; ");return b},replaceTextInStyles:function(a,b){a&&b&&(a instanceof Array||(a=[a]),Array.prototype.forEach.call(a,function(a){a.textContent=b.call(this,a.textContent)},this))},addCssToDocument:function(a,b){a.match("@import")?i(a,b):h(a)}},l=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,m=/\/\*\s*@polyfill ([^*]*\*+([^/*][^*]*\*+)*\/)([^{]*?){/gim,n=/polyfill-next-selector[^}]*content\:[\s]*?['"](.*?)['"][;\s]*}([^{]*?){/gim,o=/\/\*\s@polyfill-rule([^*]*\*+([^/*][^*]*\*+)*)\//gim,p=/(polyfill-rule)[^}]*(content\:[\s]*['"](.*?)['"])[;\s]*[^}]*}/gim,q=/\/\*\s@polyfill-unscoped-rule([^*]*\*+([^/*][^*]*\*+)*)\//gim,r=/(polyfill-unscoped-rule)[^}]*(content\:[\s]*['"](.*?)['"])[;\s]*[^}]*}/gim,s="-shadowcsshost",t="-shadowcsscontext",u=")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)";cssColonHostRe=new RegExp("("+s+u,"gim"),cssColonHostContextRe=new RegExp("("+t+u,"gim"),selectorReSuffix="([>\\s~+[.,{:][\\s\\S]*)?$",colonHostRe=/\:host/gim,colonHostContextRe=/\:host-context/gim,polyfillHostNoCombinator=s+"-no-combinator",polyfillHostRe=new RegExp(s,"gim"),polyfillHostContextRe=new RegExp(t,"gim"),shadowDOMSelectorsRe=[/\^\^/g,/\^/g,/\/shadow\//g,/\/shadow-deep\//g,/::shadow/g,/\/deep\//g,/::content/g];var v=document.createElement("iframe");v.style.display="none";var w,x=navigator.userAgent.match("Chrome"),y="shim-shadowdom",z="shim-shadowdom-css",A="no-shim";if(window.ShadowDOMPolyfill){h("style { display: none !important; }\n");var B=wrap(document),C=B.querySelector("head");C.insertBefore(j(),C.childNodes[0]),document.addEventListener("DOMContentLoaded",function(){a.urlResolver;if(window.HTMLImports&&!HTMLImports.useNative){var b="link[rel=stylesheet]["+y+"]",c="style["+y+"]";HTMLImports.importer.documentPreloadSelectors+=","+b,HTMLImports.importer.importsPreloadSelectors+=","+b,HTMLImports.parser.documentSelectors=[HTMLImports.parser.documentSelectors,b,c].join(",");var d=HTMLImports.parser.parseGeneric;HTMLImports.parser.parseGeneric=function(a){if(!a[z]){var b=a.__importElement||a;if(!b.hasAttribute(y))return void d.call(this,a);a.__resource&&(b=a.ownerDocument.createElement("style"),b.textContent=a.__resource),HTMLImports.path.resolveUrlsInStyle(b),b.textContent=k.shimStyle(b),b.removeAttribute(y,""),b.setAttribute(z,""),b[z]=!0,b.parentNode!==C&&(a.parentNode===C?C.replaceChild(b,a):this.addElementToDocument(b)),b.__importParsed=!0,this.markParsingComplete(a),this.parseNext()}};var e=HTMLImports.parser.hasResource;HTMLImports.parser.hasResource=function(a){return"link"===a.localName&&"stylesheet"===a.rel&&a.hasAttribute(y)?a.__resource:e.call(this,a)}}})}a.ShadowCSS=k}(window.Platform)):!function(){window.wrap=window.unwrap=function(a){return a},addEventListener("DOMContentLoaded",function(){if(CustomElements.useNative===!1){var a=Element.prototype.createShadowRoot;Element.prototype.createShadowRoot=function(){var b=a.call(this);return CustomElements.watchShadow(this),b}}})}(window.Platform),function(a){"use strict";function b(a){return void 0!==m[a]}function c(){h.call(this),this._isInvalid=!0}function d(a){return""==a&&c.call(this),a.toLowerCase()}function e(a){var b=a.charCodeAt(0);return b>32&&127>b&&-1==[34,35,60,62,63,96].indexOf(b)?a:encodeURIComponent(a)}function f(a){var b=a.charCodeAt(0);return b>32&&127>b&&-1==[34,35,60,62,96].indexOf(b)?a:encodeURIComponent(a)}function g(a,g,h){function i(a){t.push(a)}var j=g||"scheme start",k=0,l="",r=!1,s=!1,t=[];a:for(;(a[k-1]!=o||0==k)&&!this._isInvalid;){var u=a[k];switch(j){case"scheme start":if(!u||!p.test(u)){if(g){i("Invalid scheme.");break a}l="",j="no scheme";continue}l+=u.toLowerCase(),j="scheme";break;case"scheme":if(u&&q.test(u))l+=u.toLowerCase();else{if(":"!=u){if(g){if(o==u)break a;i("Code point not allowed in scheme: "+u);break a}l="",k=0,j="no scheme";continue}if(this._scheme=l,l="",g)break a;b(this._scheme)&&(this._isRelative=!0),j="file"==this._scheme?"relative":this._isRelative&&h&&h._scheme==this._scheme?"relative or authority":this._isRelative?"authority first slash":"scheme data"}break;case"scheme data":"?"==u?(query="?",j="query"):"#"==u?(this._fragment="#",j="fragment"):o!=u&&"	"!=u&&"\n"!=u&&"\r"!=u&&(this._schemeData+=e(u));break;case"no scheme":if(h&&b(h._scheme)){j="relative";continue}i("Missing scheme."),c.call(this);break;case"relative or authority":if("/"!=u||"/"!=a[k+1]){i("Expected /, got: "+u),j="relative";continue}j="authority ignore slashes";break;case"relative":if(this._isRelative=!0,"file"!=this._scheme&&(this._scheme=h._scheme),o==u){this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._query=h._query;break a}if("/"==u||"\\"==u)"\\"==u&&i("\\ is an invalid code point."),j="relative slash";else if("?"==u)this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._query="?",j="query";
else{if("#"!=u){var v=a[k+1],w=a[k+2];("file"!=this._scheme||!p.test(u)||":"!=v&&"|"!=v||o!=w&&"/"!=w&&"\\"!=w&&"?"!=w&&"#"!=w)&&(this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._path.pop()),j="relative path";continue}this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._query=h._query,this._fragment="#",j="fragment"}break;case"relative slash":if("/"!=u&&"\\"!=u){"file"!=this._scheme&&(this._host=h._host,this._port=h._port),j="relative path";continue}"\\"==u&&i("\\ is an invalid code point."),j="file"==this._scheme?"file host":"authority ignore slashes";break;case"authority first slash":if("/"!=u){i("Expected '/', got: "+u),j="authority ignore slashes";continue}j="authority second slash";break;case"authority second slash":if(j="authority ignore slashes","/"!=u){i("Expected '/', got: "+u);continue}break;case"authority ignore slashes":if("/"!=u&&"\\"!=u){j="authority";continue}i("Expected authority, got: "+u);break;case"authority":if("@"==u){r&&(i("@ already seen."),l+="%40"),r=!0;for(var x=0;x<l.length;x++){var y=l[x];if("	"!=y&&"\n"!=y&&"\r"!=y)if(":"!=y||null!==this._password){var z=e(y);null!==this._password?this._password+=z:this._username+=z}else this._password="";else i("Invalid whitespace in authority.")}l=""}else{if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u){k-=l.length,l="",j="host";continue}l+=u}break;case"file host":if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u){2!=l.length||!p.test(l[0])||":"!=l[1]&&"|"!=l[1]?0==l.length?j="relative path start":(this._host=d.call(this,l),l="",j="relative path start"):j="relative path";continue}"	"==u||"\n"==u||"\r"==u?i("Invalid whitespace in file host."):l+=u;break;case"host":case"hostname":if(":"!=u||s){if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u){if(this._host=d.call(this,l),l="",j="relative path start",g)break a;continue}"	"!=u&&"\n"!=u&&"\r"!=u?("["==u?s=!0:"]"==u&&(s=!1),l+=u):i("Invalid code point in host/hostname: "+u)}else if(this._host=d.call(this,l),l="",j="port","hostname"==g)break a;break;case"port":if(/[0-9]/.test(u))l+=u;else{if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u||g){if(""!=l){var A=parseInt(l,10);A!=m[this._scheme]&&(this._port=A+""),l=""}if(g)break a;j="relative path start";continue}"	"==u||"\n"==u||"\r"==u?i("Invalid code point in port: "+u):c.call(this)}break;case"relative path start":if("\\"==u&&i("'\\' not allowed in path."),j="relative path","/"!=u&&"\\"!=u)continue;break;case"relative path":if(o!=u&&"/"!=u&&"\\"!=u&&(g||"?"!=u&&"#"!=u))"	"!=u&&"\n"!=u&&"\r"!=u&&(l+=e(u));else{"\\"==u&&i("\\ not allowed in relative path.");var B;(B=n[l.toLowerCase()])&&(l=B),".."==l?(this._path.pop(),"/"!=u&&"\\"!=u&&this._path.push("")):"."==l&&"/"!=u&&"\\"!=u?this._path.push(""):"."!=l&&("file"==this._scheme&&0==this._path.length&&2==l.length&&p.test(l[0])&&"|"==l[1]&&(l=l[0]+":"),this._path.push(l)),l="","?"==u?(this._query="?",j="query"):"#"==u&&(this._fragment="#",j="fragment")}break;case"query":g||"#"!=u?o!=u&&"	"!=u&&"\n"!=u&&"\r"!=u&&(this._query+=f(u)):(this._fragment="#",j="fragment");break;case"fragment":o!=u&&"	"!=u&&"\n"!=u&&"\r"!=u&&(this._fragment+=u)}k++}}function h(){this._scheme="",this._schemeData="",this._username="",this._password=null,this._host="",this._port="",this._path=[],this._query="",this._fragment="",this._isInvalid=!1,this._isRelative=!1}function i(a,b){void 0===b||b instanceof i||(b=new i(String(b))),this._url=a,h.call(this);var c=a.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g,"");g.call(this,c,null,b)}var j=!1;if(!a.forceJURL)try{var k=new URL("b","http://a");j="http://a/b"===k.href}catch(l){}if(!j){var m=Object.create(null);m.ftp=21,m.file=0,m.gopher=70,m.http=80,m.https=443,m.ws=80,m.wss=443;var n=Object.create(null);n["%2e"]=".",n[".%2e"]="..",n["%2e."]="..",n["%2e%2e"]="..";var o=void 0,p=/[a-zA-Z]/,q=/[a-zA-Z0-9\+\-\.]/;i.prototype={get href(){if(this._isInvalid)return this._url;var a="";return(""!=this._username||null!=this._password)&&(a=this._username+(null!=this._password?":"+this._password:"")+"@"),this.protocol+(this._isRelative?"//"+a+this.host:"")+this.pathname+this._query+this._fragment},set href(a){h.call(this),g.call(this,a)},get protocol(){return this._scheme+":"},set protocol(a){this._isInvalid||g.call(this,a+":","scheme start")},get host(){return this._isInvalid?"":this._port?this._host+":"+this._port:this._host},set host(a){!this._isInvalid&&this._isRelative&&g.call(this,a,"host")},get hostname(){return this._host},set hostname(a){!this._isInvalid&&this._isRelative&&g.call(this,a,"hostname")},get port(){return this._port},set port(a){!this._isInvalid&&this._isRelative&&g.call(this,a,"port")},get pathname(){return this._isInvalid?"":this._isRelative?"/"+this._path.join("/"):this._schemeData},set pathname(a){!this._isInvalid&&this._isRelative&&(this._path=[],g.call(this,a,"relative path start"))},get search(){return this._isInvalid||!this._query||"?"==this._query?"":this._query},set search(a){!this._isInvalid&&this._isRelative&&(this._query="?","?"==a[0]&&(a=a.slice(1)),g.call(this,a,"query"))},get hash(){return this._isInvalid||!this._fragment||"#"==this._fragment?"":this._fragment},set hash(a){this._isInvalid||(this._fragment="#","#"==a[0]&&(a=a.slice(1)),g.call(this,a,"fragment"))}};var r=a.URL;r&&(i.createObjectURL=function(){return r.createObjectURL.apply(r,arguments)},i.revokeObjectURL=function(a){r.revokeObjectURL(a)}),a.URL=i}}(this),function(){Function.prototype.bind||(Function.prototype.bind=function(a){var b=this,c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();return d.push.apply(d,arguments),b.apply(a,d)}})}(window.Platform),function(a){"use strict";if(!window.performance){var b=Date.now();window.performance={now:function(){return Date.now()-b}}}window.requestAnimationFrame||(window.requestAnimationFrame=function(){var a=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;return a?function(b){return a(function(){b(performance.now())})}:function(a){return window.setTimeout(a,1e3/60)}}()),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(){return window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||function(a){clearTimeout(a)}}());var c=[],d=function(){Array.prototype.push.call(arguments,document._currentScript),c.push(arguments)};window.Polymer=d,a.consumeDeclarations=function(b){a.consumeDeclarations=function(){throw"Possible attempt to load Polymer twice"},b&&b(c),c=null},window.addEventListener("DOMContentLoaded",function(){window.Polymer===d&&(window.Polymer=function(){console.error('You tried to use polymer without loading it first. To load polymer, <link rel="import" href="components/polymer/polymer.html">')})})}(window.Platform),function(a){function b(a){u.push(a),t||(t=!0,q(d))}function c(a){return window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(a)||a}function d(){t=!1;var a=u;u=[],a.sort(function(a,b){return a.uid_-b.uid_});var b=!1;a.forEach(function(a){var c=a.takeRecords();e(a),c.length&&(a.callback_(c,a),b=!0)}),b&&d()}function e(a){a.nodes_.forEach(function(b){var c=p.get(b);c&&c.forEach(function(b){b.observer===a&&b.removeTransientObservers()})})}function f(a,b){for(var c=a;c;c=c.parentNode){var d=p.get(c);if(d)for(var e=0;e<d.length;e++){var f=d[e],g=f.options;if(c===a||g.subtree){var h=b(g);h&&f.enqueue(h)}}}}function g(a){this.callback_=a,this.nodes_=[],this.records_=[],this.uid_=++v}function h(a,b){this.type=a,this.target=b,this.addedNodes=[],this.removedNodes=[],this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function i(a){var b=new h(a.type,a.target);return b.addedNodes=a.addedNodes.slice(),b.removedNodes=a.removedNodes.slice(),b.previousSibling=a.previousSibling,b.nextSibling=a.nextSibling,b.attributeName=a.attributeName,b.attributeNamespace=a.attributeNamespace,b.oldValue=a.oldValue,b}function j(a,b){return w=new h(a,b)}function k(a){return x?x:(x=i(w),x.oldValue=a,x)}function l(){w=x=void 0}function m(a){return a===x||a===w}function n(a,b){return a===b?a:x&&m(a)?x:null}function o(a,b,c){this.observer=a,this.target=b,this.options=c,this.transientObservedNodes=[]}var p=new WeakMap,q=window.msSetImmediate;if(!q){var r=[],s=String(Math.random());window.addEventListener("message",function(a){if(a.data===s){var b=r;r=[],b.forEach(function(a){a()})}}),q=function(a){r.push(a),window.postMessage(s,"*")}}var t=!1,u=[],v=0;g.prototype={observe:function(a,b){if(a=c(a),!b.childList&&!b.attributes&&!b.characterData||b.attributeOldValue&&!b.attributes||b.attributeFilter&&b.attributeFilter.length&&!b.attributes||b.characterDataOldValue&&!b.characterData)throw new SyntaxError;var d=p.get(a);d||p.set(a,d=[]);for(var e,f=0;f<d.length;f++)if(d[f].observer===this){e=d[f],e.removeListeners(),e.options=b;break}e||(e=new o(this,a,b),d.push(e),this.nodes_.push(a)),e.addListeners()},disconnect:function(){this.nodes_.forEach(function(a){for(var b=p.get(a),c=0;c<b.length;c++){var d=b[c];if(d.observer===this){d.removeListeners(),b.splice(c,1);break}}},this),this.records_=[]},takeRecords:function(){var a=this.records_;return this.records_=[],a}};var w,x;o.prototype={enqueue:function(a){var c=this.observer.records_,d=c.length;if(c.length>0){var e=c[d-1],f=n(e,a);if(f)return void(c[d-1]=f)}else b(this.observer);c[d]=a},addListeners:function(){this.addListeners_(this.target)},addListeners_:function(a){var b=this.options;b.attributes&&a.addEventListener("DOMAttrModified",this,!0),b.characterData&&a.addEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.addEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.addEventListener("DOMNodeRemoved",this,!0)},removeListeners:function(){this.removeListeners_(this.target)},removeListeners_:function(a){var b=this.options;b.attributes&&a.removeEventListener("DOMAttrModified",this,!0),b.characterData&&a.removeEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.removeEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.removeEventListener("DOMNodeRemoved",this,!0)},addTransientObserver:function(a){if(a!==this.target){this.addListeners_(a),this.transientObservedNodes.push(a);var b=p.get(a);b||p.set(a,b=[]),b.push(this)}},removeTransientObservers:function(){var a=this.transientObservedNodes;this.transientObservedNodes=[],a.forEach(function(a){this.removeListeners_(a);for(var b=p.get(a),c=0;c<b.length;c++)if(b[c]===this){b.splice(c,1);break}},this)},handleEvent:function(a){switch(a.stopImmediatePropagation(),a.type){case"DOMAttrModified":var b=a.attrName,c=a.relatedNode.namespaceURI,d=a.target,e=new j("attributes",d);e.attributeName=b,e.attributeNamespace=c;var g=a.attrChange===MutationEvent.ADDITION?null:a.prevValue;f(d,function(a){return!a.attributes||a.attributeFilter&&a.attributeFilter.length&&-1===a.attributeFilter.indexOf(b)&&-1===a.attributeFilter.indexOf(c)?void 0:a.attributeOldValue?k(g):e});break;case"DOMCharacterDataModified":var d=a.target,e=j("characterData",d),g=a.prevValue;f(d,function(a){return a.characterData?a.characterDataOldValue?k(g):e:void 0});break;case"DOMNodeRemoved":this.addTransientObserver(a.target);case"DOMNodeInserted":var h,i,d=a.relatedNode,m=a.target;"DOMNodeInserted"===a.type?(h=[m],i=[]):(h=[],i=[m]);var n=m.previousSibling,o=m.nextSibling,e=j("childList",d);e.addedNodes=h,e.removedNodes=i,e.previousSibling=n,e.nextSibling=o,f(d,function(a){return a.childList?e:void 0})}l()}},a.JsMutationObserver=g,a.MutationObserver||(a.MutationObserver=g)}(this),window.HTMLImports=window.HTMLImports||{flags:{}},function(a){function b(a,b){b=b||o,d(function(){f(a,b)},b)}function c(a){return"complete"===a.readyState||a.readyState===q}function d(a,b){if(c(b))a&&a();else{var e=function(){("complete"===b.readyState||b.readyState===q)&&(b.removeEventListener(r,e),d(a,b))};b.addEventListener(r,e)}}function e(a){a.target.__loaded=!0}function f(a,b){function c(){h==i&&a&&a()}function d(a){e(a),h++,c()}var f=b.querySelectorAll("link[rel=import]"),h=0,i=f.length;if(i)for(var j,k=0;i>k&&(j=f[k]);k++)g(j)?d.call(j,{target:j}):(j.addEventListener("load",d),j.addEventListener("error",d));else c()}function g(a){return l?a.__loaded:a.__importParsed}function h(a){for(var b,c=0,d=a.length;d>c&&(b=a[c]);c++)i(b)&&j(b)}function i(a){return"link"===a.localName&&"import"===a.rel}function j(a){var b=a.import;b?e({target:a}):(a.addEventListener("load",e),a.addEventListener("error",e))}var k="import"in document.createElement("link"),l=k;isIE=/Trident/.test(navigator.userAgent);var m=Boolean(window.ShadowDOMPolyfill),n=function(a){return m?ShadowDOMPolyfill.wrapIfNeeded(a):a},o=n(document),p={get:function(){var a=HTMLImports.currentScript||document.currentScript||("complete"!==document.readyState?document.scripts[document.scripts.length-1]:null);return n(a)},configurable:!0};Object.defineProperty(document,"_currentScript",p),Object.defineProperty(o,"_currentScript",p);var q=isIE?"complete":"interactive",r="readystatechange";l&&(new MutationObserver(function(a){for(var b,c=0,d=a.length;d>c&&(b=a[c]);c++)b.addedNodes&&h(b.addedNodes)}).observe(document.head,{childList:!0}),function(){if("loading"===document.readyState)for(var a,b=document.querySelectorAll("link[rel=import]"),c=0,d=b.length;d>c&&(a=b[c]);c++)j(a)}()),b(function(){HTMLImports.ready=!0,HTMLImports.readyTime=(new Date).getTime(),o.dispatchEvent(new CustomEvent("HTMLImportsLoaded",{bubbles:!0}))}),a.useNative=l,a.isImportLoaded=g,a.whenReady=b,a.isIE=isIE,a.whenImportsReady=b}(window.HTMLImports),function(a){var b=(a.path,a.xhr),c=a.flags,d=function(a,b){this.cache={},this.onload=a,this.oncomplete=b,this.inflight=0,this.pending={}};d.prototype={addNodes:function(a){this.inflight+=a.length;for(var b,c=0,d=a.length;d>c&&(b=a[c]);c++)this.require(b);this.checkDone()},addNode:function(a){this.inflight++,this.require(a),this.checkDone()},require:function(a){var b=a.src||a.href;a.__nodeUrl=b,this.dedupe(b,a)||this.fetch(b,a)},dedupe:function(a,b){if(this.pending[a])return this.pending[a].push(b),!0;return this.cache[a]?(this.onload(a,b,this.cache[a]),this.tail(),!0):(this.pending[a]=[b],!1)},fetch:function(a,d){if(c.load&&console.log("fetch",a,d),a.match(/^data:/)){var e=a.split(","),f=e[0],g=e[1];g=f.indexOf(";base64")>-1?atob(g):decodeURIComponent(g),setTimeout(function(){this.receive(a,d,null,g)}.bind(this),0)}else{var h=function(b,c,e){this.receive(a,d,b,c,e)}.bind(this);b.load(a,h)}},receive:function(a,b,c,d,e){this.cache[a]=d;for(var f,g=this.pending[a],h=0,i=g.length;i>h&&(f=g[h]);h++)this.onload(a,f,d,c,e),this.tail();this.pending[a]=null},tail:function(){--this.inflight,this.checkDone()},checkDone:function(){this.inflight||this.oncomplete()}},b=b||{async:!0,ok:function(a){return a.status>=200&&a.status<300||304===a.status||0===a.status},load:function(c,d,e){var f=new XMLHttpRequest;return(a.flags.debug||a.flags.bust)&&(c+="?"+Math.random()),f.open("GET",c,b.async),f.addEventListener("readystatechange",function(){if(4===f.readyState){var a=f.getResponseHeader("Location"),c=null;if(a)var c="/"===a.substr(0,1)?location.origin+a:a;d.call(e,!b.ok(f)&&f,f.response||f.responseText,c)}}),f.send(),f},loadDocument:function(a,b,c){this.load(a,b,c).responseType="document"}},a.xhr=b,a.Loader=d}(window.HTMLImports),function(a){function b(a){return"link"===a.localName&&a.rel===g}function c(a){var b=d(a);return"data:text/javascript;charset=utf-8,"+encodeURIComponent(b)}function d(a){return a.textContent+e(a)}function e(a){var b=a.__nodeUrl;if(!b){b=a.ownerDocument.baseURI;var c="["+Math.floor(1e3*(Math.random()+1))+"]",d=a.textContent.match(/Polymer\(['"]([^'"]*)/);c=d&&d[1]||c,b+="/"+c+".js"}return"\n//# sourceURL="+b+"\n"}function f(a){var b=a.ownerDocument.createElement("style");return b.textContent=a.textContent,n.resolveUrlsInStyle(b),b}var g="import",h=a.flags,i=a.isIE,j=window.ShadowDOMPolyfill?window.ShadowDOMPolyfill.wrapIfNeeded(document):document,k={documentSelectors:"link[rel="+g+"]",importsSelectors:["link[rel="+g+"]","link[rel=stylesheet]","style","script:not([type])",'script[type="text/javascript"]'].join(","),map:{link:"parseLink",script:"parseScript",style:"parseStyle"},parseNext:function(){var a=this.nextToParse();a&&this.parse(a)},parse:function(a){if(this.isParsed(a))return void(h.parse&&console.log("[%s] is already parsed",a.localName));var b=this[this.map[a.localName]];b&&(this.markParsing(a),b.call(this,a))},markParsing:function(a){h.parse&&console.log("parsing",a),this.parsingElement=a},markParsingComplete:function(a){a.__importParsed=!0,a.__importElement&&(a.__importElement.__importParsed=!0),this.parsingElement=null,h.parse&&console.log("completed",a)},invalidateParse:function(a){a&&a.__importLink&&(a.__importParsed=a.__importLink.__importParsed=!1,this.parseSoon())},parseSoon:function(){this._parseSoon&&cancelAnimationFrame(this._parseDelay);var a=this;this._parseSoon=requestAnimationFrame(function(){a.parseNext()})},parseImport:function(a){if(HTMLImports.__importsParsingHook&&HTMLImports.__importsParsingHook(a),a.import&&(a.import.__importParsed=!0),this.markParsingComplete(a),a.dispatchEvent(a.__resource&&!a.__error?new CustomEvent("load",{bubbles:!1}):new CustomEvent("error",{bubbles:!1})),a.__pending)for(var b;a.__pending.length;)b=a.__pending.shift(),b&&b({target:a});this.parseNext()},parseLink:function(a){b(a)?this.parseImport(a):(a.href=a.href,this.parseGeneric(a))},parseStyle:function(a){var b=a;a=f(a),a.__importElement=b,this.parseGeneric(a)},parseGeneric:function(a){this.trackElement(a),this.addElementToDocument(a)},rootImportForElement:function(a){for(var b=a;b.ownerDocument.__importLink;)b=b.ownerDocument.__importLink;return b},addElementToDocument:function(a){for(var b=this.rootImportForElement(a.__importElement||a),c=b.__insertedElements=b.__insertedElements||0,d=b.nextElementSibling,e=0;c>e;e++)d=d&&d.nextElementSibling;b.parentNode.insertBefore(a,d)},trackElement:function(a,b){var c=this,d=function(d){b&&b(d),c.markParsingComplete(a),c.parseNext()};if(a.addEventListener("load",d),a.addEventListener("error",d),i&&"style"===a.localName){var e=!1;if(-1==a.textContent.indexOf("@import"))e=!0;else if(a.sheet){e=!0;for(var f,g=a.sheet.cssRules,h=g?g.length:0,j=0;h>j&&(f=g[j]);j++)f.type===CSSRule.IMPORT_RULE&&(e=e&&Boolean(f.styleSheet))}e&&a.dispatchEvent(new CustomEvent("load",{bubbles:!1}))}},parseScript:function(b){var d=document.createElement("script");d.__importElement=b,d.src=b.src?b.src:c(b),a.currentScript=b,this.trackElement(d,function(){d.parentNode.removeChild(d),a.currentScript=null}),this.addElementToDocument(d)},nextToParse:function(){return!this.parsingElement&&this.nextToParseInDoc(j)},nextToParseInDoc:function(a,c){if(a)for(var d,e=a.querySelectorAll(this.parseSelectorsForNode(a)),f=0,g=e.length;g>f&&(d=e[f]);f++)if(!this.isParsed(d))return this.hasResource(d)?b(d)?this.nextToParseInDoc(d.import,d):d:void 0;return c},parseSelectorsForNode:function(a){var b=a.ownerDocument||a;return b===j?this.documentSelectors:this.importsSelectors},isParsed:function(a){return a.__importParsed},hasResource:function(a){return b(a)&&void 0===a.import?!1:!0}},l=/(url\()([^)]*)(\))/g,m=/(@import[\s]+(?!url\())([^;]*)(;)/g,n={resolveUrlsInStyle:function(a){var b=a.ownerDocument,c=b.createElement("a");return a.textContent=this.resolveUrlsInCssText(a.textContent,c),a},resolveUrlsInCssText:function(a,b){var c=this.replaceUrls(a,b,l);return c=this.replaceUrls(c,b,m)},replaceUrls:function(a,b,c){return a.replace(c,function(a,c,d,e){var f=d.replace(/["']/g,"");return b.href=f,f=b.href,c+"'"+f+"'"+e})}};a.parser=k,a.path=n}(HTMLImports),function(a){function b(a){return c(a,g)}function c(a,b){return"link"===a.localName&&a.getAttribute("rel")===b}function d(a,b){var c=a;c instanceof Document||(c=document.implementation.createHTMLDocument(g)),c._URL=b;var d=c.createElement("base");d.setAttribute("href",b),c.baseURI||(c.baseURI=b);var e=c.createElement("meta");return e.setAttribute("charset","utf-8"),c.head.appendChild(e),c.head.appendChild(d),a instanceof Document||(c.body.innerHTML=a),window.HTMLTemplateElement&&HTMLTemplateElement.bootstrap&&HTMLTemplateElement.bootstrap(c),c}var e=a.useNative,f=a.flags,g="import",h=window.ShadowDOMPolyfill?ShadowDOMPolyfill.wrapIfNeeded(document):document;if(e)var i={};else{var j=(a.xhr,a.Loader),k=a.parser,i={documents:{},documentPreloadSelectors:"link[rel="+g+"]",importsPreloadSelectors:["link[rel="+g+"]"].join(","),loadNode:function(a){l.addNode(a)},loadSubtree:function(a){var b=this.marshalNodes(a);l.addNodes(b)},marshalNodes:function(a){return a.querySelectorAll(this.loadSelectorsForNode(a))},loadSelectorsForNode:function(a){var b=a.ownerDocument||a;return b===h?this.documentPreloadSelectors:this.importsPreloadSelectors},loaded:function(a,c,e,g,h){if(f.load&&console.log("loaded",a,c),c.__resource=e,c.__error=g,b(c)){var i=this.documents[a];void 0===i&&(i=g?null:d(e,h||a),i&&(i.__importLink=c,this.bootDocument(i)),this.documents[a]=i),c.import=i}k.parseNext()},bootDocument:function(a){this.loadSubtree(a),this.observe(a),k.parseNext()},loadedAll:function(){k.parseNext()}},l=new j(i.loaded.bind(i),i.loadedAll.bind(i));if(!document.baseURI){var m={get:function(){var a=document.querySelector("base");return a?a.href:window.location.href},configurable:!0};Object.defineProperty(document,"baseURI",m),Object.defineProperty(h,"baseURI",m)}"function"!=typeof window.CustomEvent&&(window.CustomEvent=function(a,b){var c=document.createEvent("HTMLEvents");return c.initEvent(a,b.bubbles===!1?!1:!0,b.cancelable===!1?!1:!0,b.detail),c})}a.importer=i,a.IMPORT_LINK_TYPE=g,a.importLoader=l}(window.HTMLImports),function(a){function b(a){for(var b,d=0,e=a.length;e>d&&(b=a[d]);d++)"childList"===b.type&&b.addedNodes.length&&c(b.addedNodes)}function c(a){for(var b,e,g=0,h=a.length;h>g&&(e=a[g]);g++)b=b||e.ownerDocument,d(e)&&f.loadNode(e),e.children&&e.children.length&&c(e.children)}function d(a){return 1===a.nodeType&&g.call(a,f.loadSelectorsForNode(a))}function e(a){h.observe(a,{childList:!0,subtree:!0})}var f=(a.IMPORT_LINK_TYPE,a.importer),g=(a.parser,HTMLElement.prototype.matches||HTMLElement.prototype.matchesSelector||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector),h=new MutationObserver(b);a.observe=e,f.observe=e}(HTMLImports),function(){function a(){HTMLImports.importer.bootDocument(b)}var b=window.ShadowDOMPolyfill?window.ShadowDOMPolyfill.wrapIfNeeded(document):document;HTMLImports.useNative||("complete"===document.readyState||"interactive"===document.readyState&&!window.attachEvent?a():document.addEventListener("DOMContentLoaded",a))}(),window.CustomElements=window.CustomElements||{flags:{}},function(a){function b(a,c,d){var e=a.firstElementChild;if(!e)for(e=a.firstChild;e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.nextSibling;for(;e;)c(e,d)!==!0&&b(e,c,d),e=e.nextElementSibling;return null}function c(a,b){for(var c=a.shadowRoot;c;)d(c,b),c=c.olderShadowRoot}function d(a,d){b(a,function(a){return d(a)?!0:void c(a,d)}),c(a,d)}function e(a){return h(a)?(i(a),!0):void l(a)}function f(a){d(a,function(a){return e(a)?!0:void 0})}function g(a){return e(a)||f(a)}function h(b){if(!b.__upgraded__&&b.nodeType===Node.ELEMENT_NODE){var c=b.getAttribute("is")||b.localName,d=a.registry[c];if(d)return A.dom&&console.group("upgrade:",b.localName),a.upgrade(b),A.dom&&console.groupEnd(),!0}}function i(a){l(a),r(a)&&d(a,function(a){l(a)})}function j(a){if(E.push(a),!D){D=!0;var b=window.Platform&&window.Platform.endOfMicrotask||setTimeout;b(k)}}function k(){D=!1;for(var a,b=E,c=0,d=b.length;d>c&&(a=b[c]);c++)a();E=[]}function l(a){C?j(function(){m(a)}):m(a)}function m(a){(a.attachedCallback||a.detachedCallback||a.__upgraded__&&A.dom)&&(A.dom&&console.group("inserted:",a.localName),r(a)&&(a.__inserted=(a.__inserted||0)+1,a.__inserted<1&&(a.__inserted=1),a.__inserted>1?A.dom&&console.warn("inserted:",a.localName,"insert/remove count:",a.__inserted):a.attachedCallback&&(A.dom&&console.log("inserted:",a.localName),a.attachedCallback())),A.dom&&console.groupEnd())}function n(a){o(a),d(a,function(a){o(a)})}function o(a){C?j(function(){p(a)}):p(a)}function p(a){(a.attachedCallback||a.detachedCallback||a.__upgraded__&&A.dom)&&(A.dom&&console.group("removed:",a.localName),r(a)||(a.__inserted=(a.__inserted||0)-1,a.__inserted>0&&(a.__inserted=0),a.__inserted<0?A.dom&&console.warn("removed:",a.localName,"insert/remove count:",a.__inserted):a.detachedCallback&&a.detachedCallback()),A.dom&&console.groupEnd())}function q(a){return window.ShadowDOMPolyfill?ShadowDOMPolyfill.wrapIfNeeded(a):a}function r(a){for(var b=a,c=q(document);b;){if(b==c)return!0;b=b.parentNode||b.host}}function s(a){if(a.shadowRoot&&!a.shadowRoot.__watched){A.dom&&console.log("watching shadow-root for: ",a.localName);for(var b=a.shadowRoot;b;)t(b),b=b.olderShadowRoot}}function t(a){a.__watched||(w(a),a.__watched=!0)}function u(a){if(A.dom){var b=a[0];if(b&&"childList"===b.type&&b.addedNodes&&b.addedNodes){for(var c=b.addedNodes[0];c&&c!==document&&!c.host;)c=c.parentNode;var d=c&&(c.URL||c._URL||c.host&&c.host.localName)||"";d=d.split("/?").shift().split("/").pop()}console.group("mutations (%d) [%s]",a.length,d||"")}a.forEach(function(a){"childList"===a.type&&(G(a.addedNodes,function(a){a.localName&&g(a)}),G(a.removedNodes,function(a){a.localName&&n(a)}))}),A.dom&&console.groupEnd()}function v(){u(F.takeRecords()),k()}function w(a){F.observe(a,{childList:!0,subtree:!0})}function x(a){w(a)}function y(a){A.dom&&console.group("upgradeDocument: ",a.baseURI.split("/").pop()),g(a),A.dom&&console.groupEnd()}function z(a){a=q(a);for(var b,c=a.querySelectorAll("link[rel="+B+"]"),d=0,e=c.length;e>d&&(b=c[d]);d++)b.import&&b.import.__parsed&&z(b.import);y(a)}var A=window.logFlags||{},B=window.HTMLImports?HTMLImports.IMPORT_LINK_TYPE:"none",C=!window.MutationObserver||window.MutationObserver===window.JsMutationObserver;a.hasPolyfillMutations=C;var D=!1,E=[],F=new MutationObserver(u),G=Array.prototype.forEach.call.bind(Array.prototype.forEach);a.IMPORT_LINK_TYPE=B,a.watchShadow=s,a.upgradeDocumentTree=z,a.upgradeAll=g,a.upgradeSubtree=f,a.insertedNode=i,a.observeDocument=x,a.upgradeDocument=y,a.takeRecords=v}(window.CustomElements),function(a){function b(b,g){var h=g||{};if(!b)throw new Error("document.registerElement: first argument `name` must not be empty");if(b.indexOf("-")<0)throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '"+String(b)+"'.");if(c(b))throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '"+String(b)+"'. The type name is invalid.");if(n(b))throw new Error("DuplicateDefinitionError: a type with name '"+String(b)+"' is already registered");if(!h.prototype)throw new Error("Options missing required prototype property");return h.__name=b.toLowerCase(),h.lifecycle=h.lifecycle||{},h.ancestry=d(h.extends),e(h),f(h),l(h.prototype),o(h.__name,h),h.ctor=p(h),h.ctor.prototype=h.prototype,h.prototype.constructor=h.ctor,a.ready&&a.upgradeDocumentTree(document),h.ctor}function c(a){for(var b=0;b<y.length;b++)if(a===y[b])return!0}function d(a){var b=n(a);return b?d(b.extends).concat([b]):[]}function e(a){for(var b,c=a.extends,d=0;b=a.ancestry[d];d++)c=b.is&&b.tag;a.tag=c||a.__name,c&&(a.is=a.__name)}function f(a){if(!Object.__proto__){var b=HTMLElement.prototype;if(a.is){var c=document.createElement(a.tag),d=Object.getPrototypeOf(c);d===a.prototype&&(b=d)}for(var e,f=a.prototype;f&&f!==b;)e=Object.getPrototypeOf(f),f.__proto__=e,f=e;a.native=b}}function g(a){return h(B(a.tag),a)}function h(b,c){return c.is&&b.setAttribute("is",c.is),i(b,c),b.__upgraded__=!0,k(b),a.insertedNode(b),a.upgradeSubtree(b),b}function i(a,b){Object.__proto__?a.__proto__=b.prototype:(j(a,b.prototype,b.native),a.__proto__=b.prototype)}function j(a,b,c){for(var d={},e=b;e!==c&&e!==HTMLElement.prototype;){for(var f,g=Object.getOwnPropertyNames(e),h=0;f=g[h];h++)d[f]||(Object.defineProperty(a,f,Object.getOwnPropertyDescriptor(e,f)),d[f]=1);e=Object.getPrototypeOf(e)}}function k(a){a.createdCallback&&a.createdCallback()}function l(a){if(!a.setAttribute._polyfilled){var b=a.setAttribute;a.setAttribute=function(a,c){m.call(this,a,c,b)};var c=a.removeAttribute;a.removeAttribute=function(a){m.call(this,a,null,c)},a.setAttribute._polyfilled=!0}}function m(a,b,c){a=a.toLowerCase();var d=this.getAttribute(a);c.apply(this,arguments);var e=this.getAttribute(a);this.attributeChangedCallback&&e!==d&&this.attributeChangedCallback(a,d,e)}function n(a){return a?z[a.toLowerCase()]:void 0}function o(a,b){z[a]=b}function p(a){return function(){return g(a)}}function q(a,b,c){return a===A?r(b,c):C(a,b)}function r(a,b){var c=n(b||a);if(c){if(a==c.tag&&b==c.is)return new c.ctor;if(!b&&!c.is)return new c.ctor}if(b){var d=r(a);return d.setAttribute("is",b),d}var d=B(a);return a.indexOf("-")>=0&&i(d,HTMLElement),d}function s(a){if(!a.__upgraded__&&a.nodeType===Node.ELEMENT_NODE){var b=a.getAttribute("is"),c=n(b||a.localName);if(c){if(b&&c.tag==a.localName)return h(a,c);if(!b&&!c.extends)return h(a,c)}}}function t(b){var c=D.call(this,b);return a.upgradeAll(c),c}a||(a=window.CustomElements={flags:{}});var u=a.flags,v=Boolean(document.registerElement),w=!u.register&&v&&!window.ShadowDOMPolyfill&&(!window.HTMLImports||HTMLImports.useNative);if(w){var x=function(){};a.registry={},a.upgradeElement=x,a.watchShadow=x,a.upgrade=x,a.upgradeAll=x,a.upgradeSubtree=x,a.observeDocument=x,a.upgradeDocument=x,a.upgradeDocumentTree=x,a.takeRecords=x,a.reservedTagList=[]}else{var y=["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"],z={},A="http://www.w3.org/1999/xhtml",B=document.createElement.bind(document),C=document.createElementNS.bind(document),D=Node.prototype.cloneNode;document.registerElement=b,document.createElement=r,document.createElementNS=q,Node.prototype.cloneNode=t,a.registry=z,a.upgrade=s}var E;E=Object.__proto__||w?function(a,b){return a instanceof b}:function(a,b){for(var c=a;c;){if(c===b.prototype)return!0;c=c.__proto__}return!1},a.instanceof=E,a.reservedTagList=y,document.register=document.registerElement,a.hasNative=v,a.useNative=w}(window.CustomElements),function(a){function b(a){return"link"===a.localName&&a.getAttribute("rel")===c}var c=a.IMPORT_LINK_TYPE,d={selectors:["link[rel="+c+"]"],map:{link:"parseLink"},parse:function(a){if(!a.__parsed){a.__parsed=!0;var b=a.querySelectorAll(d.selectors);e(b,function(a){d[d.map[a.localName]](a)}),CustomElements.upgradeDocument(a),CustomElements.observeDocument(a)}},parseLink:function(a){b(a)&&this.parseImport(a)},parseImport:function(a){a.import&&d.parse(a.import)}},e=Array.prototype.forEach.call.bind(Array.prototype.forEach);a.parser=d,a.IMPORT_LINK_TYPE=c}(window.CustomElements),function(a){function b(){CustomElements.parser.parse(document),CustomElements.upgradeDocument(document),window.HTMLImports&&(HTMLImports.__importsParsingHook=function(a){CustomElements.parser.parse(a.import)}),CustomElements.ready=!0,setTimeout(function(){CustomElements.readyTime=Date.now(),window.HTMLImports&&(CustomElements.elapsed=CustomElements.readyTime-HTMLImports.readyTime),document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})}if("function"!=typeof window.CustomEvent&&(window.CustomEvent=function(a,b){b=b||{};var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,Boolean(b.bubbles),Boolean(b.cancelable),b.detail),c},window.CustomEvent.prototype=window.Event.prototype),"complete"===document.readyState||a.flags.eager)b();else if("interactive"!==document.readyState||window.attachEvent||window.HTMLImports&&!window.HTMLImports.ready){var c=window.HTMLImports&&!HTMLImports.ready?"HTMLImportsLoaded":"DOMContentLoaded";window.addEventListener(c,b)}else b()}(window.CustomElements),function(){if(window.ShadowDOMPolyfill){var a=["upgradeAll","upgradeSubtree","observeDocument","upgradeDocument"],b={};a.forEach(function(a){b[a]=CustomElements[a]
}),a.forEach(function(a){CustomElements[a]=function(c){return b[a](wrap(c))}})}}(),function(){var a=document.createElement("style");a.textContent="body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";var b=document.querySelector("head");b.insertBefore(a,b.firstChild)}(Platform),function(a){function b(a,b){return b=b||[],b.map||(b=[b]),a.apply(this,b.map(d))}function c(a,c,d){var e;switch(arguments.length){case 0:return;case 1:e=null;break;case 2:e=c.apply(this);break;default:e=b(d,c)}f[a]=e}function d(a){return f[a]}function e(a,c){HTMLImports.whenImportsReady(function(){b(c,a)})}var f={};a.marshal=d,a.modularize=c,a.using=e}(window);
//# sourceMappingURL=platform.js.map;
/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version: 0.4.0-d62a0e4
window.PolymerGestures={},function(a){var b=!1,c=document.createElement("meta");if(c.createShadowRoot){var d=c.createShadowRoot(),e=document.createElement("span");d.appendChild(e),c.addEventListener("testpath",function(a){a.path&&(b=a.path[0]===e),a.stopPropagation()});var f=new CustomEvent("testpath",{bubbles:!0});document.head.appendChild(c),e.dispatchEvent(f),c.parentNode.removeChild(c),d=e=null}c=null;var g={shadow:function(a){return a?a.shadowRoot||a.webkitShadowRoot:void 0},canTarget:function(a){return a&&Boolean(a.elementFromPoint)},targetingShadow:function(a){var b=this.shadow(a);return this.canTarget(b)?b:void 0},olderShadow:function(a){var b=a.olderShadowRoot;if(!b){var c=a.querySelector("shadow");c&&(b=c.olderShadowRoot)}return b},allShadows:function(a){for(var b=[],c=this.shadow(a);c;)b.push(c),c=this.olderShadow(c);return b},searchRoot:function(a,b,c){var d,e;return a?(d=a.elementFromPoint(b,c),d?e=this.targetingShadow(d):a!==document&&(e=this.olderShadow(a)),this.searchRoot(e,b,c)||d):void 0},owner:function(a){if(!a)return document;for(var b=a;b.parentNode;)b=b.parentNode;return b.nodeType!=Node.DOCUMENT_NODE&&b.nodeType!=Node.DOCUMENT_FRAGMENT_NODE&&(b=document),b},findTarget:function(a){if(b&&a.path&&a.path.length)return a.path[0];var c=a.clientX,d=a.clientY,e=this.owner(a.target);return e.elementFromPoint(c,d)||(e=document),this.searchRoot(e,c,d)},findTouchAction:function(a){var c;if(b&&a.path&&a.path.length){for(var d=a.path,e=0;e<d.length;e++)if(c=d[e],c.nodeType===Node.ELEMENT_NODE&&c.hasAttribute("touch-action"))return c.getAttribute("touch-action")}else for(c=a.target;c;){if(c.nodeType===Node.ELEMENT_NODE&&c.hasAttribute("touch-action"))return c.getAttribute("touch-action");c=c.parentNode||c.host}return"auto"},LCA:function(a,b){if(a===b)return a;if(a&&!b)return a;if(b&&!a)return b;if(!b&&!a)return document;if(a.contains&&a.contains(b))return a;if(b.contains&&b.contains(a))return b;var c=this.depth(a),d=this.depth(b),e=c-d;for(e>=0?a=this.walk(a,e):b=this.walk(b,-e);a&&b&&a!==b;)a=a.parentNode||a.host,b=b.parentNode||b.host;return a},walk:function(a,b){for(var c=0;a&&b>c;c++)a=a.parentNode||a.host;return a},depth:function(a){for(var b=0;a;)b++,a=a.parentNode||a.host;return b},deepContains:function(a,b){var c=this.LCA(a,b);return c===a},insideNode:function(a,b,c){var d=a.getBoundingClientRect();return d.left<=b&&b<=d.right&&d.top<=c&&c<=d.bottom},path:function(a){var c;if(b&&a.path&&a.path.length)c=a.path;else{c=[];for(var d=this.findTarget(a);d;)c.push(d),d=d.parentNode||d.host}return c}};a.targetFinding=g,a.findTarget=g.findTarget.bind(g),a.deepContains=g.deepContains.bind(g),a.insideNode=g.insideNode}(window.PolymerGestures),function(){function a(a){return"html /deep/ "+b(a)}function b(a){return'[touch-action="'+a+'"]'}function c(a){return"{ -ms-touch-action: "+a+"; touch-action: "+a+";}"}var d=["none","auto","pan-x","pan-y",{rule:"pan-x pan-y",selectors:["pan-x pan-y","pan-y pan-x"]},"manipulation"],e="",f="string"==typeof document.head.style.touchAction,g=!window.ShadowDOMPolyfill&&document.head.createShadowRoot;if(f){d.forEach(function(d){String(d)===d?(e+=b(d)+c(d)+"\n",g&&(e+=a(d)+c(d)+"\n")):(e+=d.selectors.map(b)+c(d.rule)+"\n",g&&(e+=d.selectors.map(a)+c(d.rule)+"\n"))});var h=document.createElement("style");h.textContent=e,document.head.appendChild(h)}}(),function(a){var b=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","pageX","pageY"],c=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0],d=function(){return function(){}},e={preventTap:d,makeBaseEvent:function(a,b){var c=document.createEvent("Event");return c.initEvent(a,b.bubbles||!1,b.cancelable||!1),c.preventTap=e.preventTap(c),c},makeGestureEvent:function(a,b){b=b||Object.create(null);for(var c,d=this.makeBaseEvent(a,b),e=0,f=Object.keys(b);e<f.length;e++)c=f[e],d[c]=b[c];return d},makePointerEvent:function(a,d){d=d||Object.create(null);for(var e,f=this.makeBaseEvent(a,d),g=0;g<b.length;g++)e=b[g],f[e]=d[e]||c[g];f.buttons=d.buttons||0;var h=0;return h=d.pressure?d.pressure:f.buttons?.5:0,f.x=f.clientX,f.y=f.clientY,f.pointerId=d.pointerId||0,f.width=d.width||0,f.height=d.height||0,f.pressure=h,f.tiltX=d.tiltX||0,f.tiltY=d.tiltY||0,f.pointerType=d.pointerType||"",f.hwTimestamp=d.hwTimestamp||0,f.isPrimary=d.isPrimary||!1,f._source=d._source||"",f}};a.eventFactory=e}(window.PolymerGestures),function(a){function b(){if(c){var a=new Map;return a.pointers=d,a}this.keys=[],this.values=[]}var c=window.Map&&window.Map.prototype.forEach,d=function(){return this.size};b.prototype={set:function(a,b){var c=this.keys.indexOf(a);c>-1?this.values[c]=b:(this.keys.push(a),this.values.push(b))},has:function(a){return this.keys.indexOf(a)>-1},"delete":function(a){var b=this.keys.indexOf(a);b>-1&&(this.keys.splice(b,1),this.values.splice(b,1))},get:function(a){var b=this.keys.indexOf(a);return this.values[b]},clear:function(){this.keys.length=0,this.values.length=0},forEach:function(a,b){this.values.forEach(function(c,d){a.call(b,c,this.keys[d],this)},this)},pointers:function(){return this.keys.length}},a.PointerMap=b}(window.PolymerGestures),function(a){var b,c=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","buttons","pointerId","width","height","pressure","tiltX","tiltY","pointerType","hwTimestamp","isPrimary","type","target","currentTarget","which","pageX","pageY","timeStamp","preventTap","tapPrevented","_source"],d=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0,0,0,0,0,0,"",0,!1,"",null,null,0,0,0,0,function(){},!1],e="undefined"!=typeof SVGElementInstance,f=a.eventFactory,g={IS_IOS:!1,pointermap:new a.PointerMap,requiredGestures:new a.PointerMap,eventMap:Object.create(null),eventSources:Object.create(null),eventSourceList:[],gestures:[],dependencyMap:{down:{listeners:0,index:-1},up:{listeners:0,index:-1}},gestureQueue:[],registerSource:function(a,b){var c=b,d=c.events;d&&(d.forEach(function(a){c[a]&&(this.eventMap[a]=c[a].bind(c))},this),this.eventSources[a]=c,this.eventSourceList.push(c))},registerGesture:function(a,b){var c=Object.create(null);c.listeners=0,c.index=this.gestures.length;for(var d,e=0;e<b.exposes.length;e++)d=b.exposes[e].toLowerCase(),this.dependencyMap[d]=c;this.gestures.push(b)},register:function(a,b){for(var c,d=this.eventSourceList.length,e=0;d>e&&(c=this.eventSourceList[e]);e++)c.register.call(c,a,b)},unregister:function(a){for(var b,c=this.eventSourceList.length,d=0;c>d&&(b=this.eventSourceList[d]);d++)b.unregister.call(b,a)},down:function(a){this.requiredGestures.set(a.pointerId,b),this.fireEvent("down",a)},move:function(a){a.type="move",this.fillGestureQueue(a)},up:function(a){this.fireEvent("up",a),this.requiredGestures.delete(a.pointerId)},cancel:function(a){a.tapPrevented=!0,this.fireEvent("up",a),this.requiredGestures.delete(a.pointerId)},addGestureDependency:function(a,b){var c=a._pgEvents;if(c)for(var d,e,f,g=Object.keys(c),h=0;h<g.length;h++)f=g[h],c[f]>0&&(d=this.dependencyMap[f],e=d?d.index:-1,b[e]=!0)},eventHandler:function(c){var d=c.type;if("touchstart"===d||"mousedown"===d||"pointerdown"===d||"MSPointerDown"===d)if(c._handledByPG||(b={}),this.IS_IOS)for(var e,f=a.targetFinding.path(c),g=0;g<f.length;g++)e=f[g],this.addGestureDependency(e,b);else this.addGestureDependency(c.currentTarget,b);if(!c._handledByPG){var h=this.eventMap&&this.eventMap[d];h&&h(c),c._handledByPG=!0}},listen:function(a,b){for(var c,d=0,e=b.length;e>d&&(c=b[d]);d++)this.addEvent(a,c)},unlisten:function(a,b){for(var c,d=0,e=b.length;e>d&&(c=b[d]);d++)this.removeEvent(a,c)},addEvent:function(a,b){a.addEventListener(b,this.boundHandler)},removeEvent:function(a,b){a.removeEventListener(b,this.boundHandler)},makeEvent:function(a,b){var c=f.makePointerEvent(a,b);return c.preventDefault=b.preventDefault,c.tapPrevented=b.tapPrevented,c._target=c._target||b.target,c},fireEvent:function(a,b){var c=this.makeEvent(a,b);return this.dispatchEvent(c)},cloneEvent:function(a){for(var b,f=Object.create(null),g=0;g<c.length;g++)b=c[g],f[b]=a[b]||d[g],("target"===b||"relatedTarget"===b)&&e&&f[b]instanceof SVGElementInstance&&(f[b]=f[b].correspondingUseElement);return f.preventDefault=function(){a.preventDefault()},f},dispatchEvent:function(a){var b=a._target;if(b){b.dispatchEvent(a);var c=this.cloneEvent(a);c.target=b,this.fillGestureQueue(c)}},gestureTrigger:function(){for(var a,b,c=0;c<this.gestureQueue.length;c++){a=this.gestureQueue[c],b=a._requiredGestures;for(var d,e,f=0;f<this.gestures.length;f++)b[f]&&(d=this.gestures[f],e=d[a.type],e&&e.call(d,a))}this.gestureQueue.length=0},fillGestureQueue:function(a){this.gestureQueue.length||requestAnimationFrame(this.boundGestureTrigger),a._requiredGestures=this.requiredGestures.get(a.pointerId),this.gestureQueue.push(a)}};g.boundHandler=g.eventHandler.bind(g),g.boundGestureTrigger=g.gestureTrigger.bind(g),a.dispatcher=g,a.activateGesture=function(a,b){var c=b.toLowerCase(),d=g.dependencyMap[c];if(d){var e=g.gestures[d.index];if(a._pgListeners||(g.register(a),a._pgListeners=0),e){var f,h=e.defaultActions&&e.defaultActions[c];switch(a.nodeType){case Node.ELEMENT_NODE:f=a;break;case Node.DOCUMENT_FRAGMENT_NODE:f=a.host;break;default:f=null}h&&f&&!f.hasAttribute("touch-action")&&f.setAttribute("touch-action",h)}a._pgEvents||(a._pgEvents={}),a._pgEvents[c]=(a._pgEvents[c]||0)+1,a._pgListeners++}return Boolean(d)},a.addEventListener=function(b,c,d,e){d&&(a.activateGesture(b,c),b.addEventListener(c,d,e))},a.deactivateGesture=function(a,b){var c=b.toLowerCase(),d=g.dependencyMap[c];return d&&(a._pgListeners>0&&a._pgListeners--,0===a._pgListeners&&g.unregister(a),a._pgEvents&&(a._pgEvents[c]>0?a._pgEvents[c]--:a._pgEvents[c]=0)),Boolean(d)},a.removeEventListener=function(b,c,d,e){d&&(a.deactivateGesture(b,c),b.removeEventListener(c,d,e))}}(window.PolymerGestures),function(a){var b=a.dispatcher,c=b.pointermap,d=25,e=[0,1,4,2],f=!1;try{f=1===new MouseEvent("test",{buttons:1}).buttons}catch(g){}var h={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup"],exposes:["down","up","move"],register:function(a){b.listen(a,this.events)},unregister:function(a){a!==document&&b.unlisten(a,this.events)},lastTouches:[],isEventSimulatedFromTouch:function(a){for(var b,c=this.lastTouches,e=a.clientX,f=a.clientY,g=0,h=c.length;h>g&&(b=c[g]);g++){var i=Math.abs(e-b.x),j=Math.abs(f-b.y);if(d>=i&&d>=j)return!0}},prepareEvent:function(a){var c=b.cloneEvent(a);return c.pointerId=this.POINTER_ID,c.isPrimary=!0,c.pointerType=this.POINTER_TYPE,c._source="mouse",f||(c.buttons=e[c.which]||0),c},mousedown:function(d){if(!this.isEventSimulatedFromTouch(d)){var e=c.has(this.POINTER_ID);e&&this.mouseup(d);var f=this.prepareEvent(d);f.target=a.findTarget(d),c.set(this.POINTER_ID,f.target),b.down(f)}},mousemove:function(a){if(!this.isEventSimulatedFromTouch(a)){var d=c.get(this.POINTER_ID);if(d){var e=this.prepareEvent(a);e.target=d,0===e.buttons?(b.cancel(e),this.cleanupMouse()):b.move(e)}}},mouseup:function(d){if(!this.isEventSimulatedFromTouch(d)){var e=this.prepareEvent(d);e.relatedTarget=a.findTarget(d),e.target=c.get(this.POINTER_ID),b.up(e),this.cleanupMouse()}},cleanupMouse:function(){c["delete"](this.POINTER_ID)}};a.mouseEvents=h}(window.PolymerGestures),function(a){var b=a.dispatcher,c=(a.targetFinding.allShadows.bind(a.targetFinding),b.pointermap),d=(Array.prototype.map.call.bind(Array.prototype.map),2500),e=200,f=20,g=!1,h={IS_IOS:!1,events:["touchstart","touchmove","touchend","touchcancel"],exposes:["down","up","move"],register:function(a,c){(this.IS_IOS?c:!c)&&b.listen(a,this.events)},unregister:function(a){this.IS_IOS||b.unlisten(a,this.events)},scrollTypes:{EMITTER:"none",XSCROLLER:"pan-x",YSCROLLER:"pan-y"},touchActionToScrollType:function(a){var b=a,c=this.scrollTypes;return b===c.EMITTER?"none":b===c.XSCROLLER?"X":b===c.YSCROLLER?"Y":"XY"},POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(a){return this.firstTouch===a.identifier},setPrimaryTouch:function(a){(0===c.pointers()||1===c.pointers()&&c.has(1))&&(this.firstTouch=a.identifier,this.firstXY={X:a.clientX,Y:a.clientY},this.scrolling=null,this.cancelResetClickCount())},removePrimaryPointer:function(a){a.isPrimary&&(this.firstTouch=null,this.firstXY=null,this.resetClickCount())},clickCount:0,resetId:null,resetClickCount:function(){var a=function(){this.clickCount=0,this.resetId=null}.bind(this);this.resetId=setTimeout(a,e)},cancelResetClickCount:function(){this.resetId&&clearTimeout(this.resetId)},typeToButtons:function(a){var b=0;return("touchstart"===a||"touchmove"===a)&&(b=1),b},findTarget:function(b,d){if("touchstart"===this.currentTouchEvent.type){if(this.isPrimaryTouch(b)){var e={clientX:b.clientX,clientY:b.clientY,path:this.currentTouchEvent.path,target:this.currentTouchEvent.target};return a.findTarget(e)}return a.findTarget(b)}return c.get(d)},touchToPointer:function(a){var c=this.currentTouchEvent,d=b.cloneEvent(a),e=d.pointerId=a.identifier+2;d.target=this.findTarget(a,e),d.bubbles=!0,d.cancelable=!0,d.detail=this.clickCount,d.buttons=this.typeToButtons(c.type),d.width=a.webkitRadiusX||a.radiusX||0,d.height=a.webkitRadiusY||a.radiusY||0,d.pressure=a.webkitForce||a.force||.5,d.isPrimary=this.isPrimaryTouch(a),d.pointerType=this.POINTER_TYPE,d._source="touch";var f=this;return d.preventDefault=function(){f.scrolling=!1,f.firstXY=null,c.preventDefault()},d},processTouches:function(a,b){var d=a.changedTouches;this.currentTouchEvent=a;for(var e,f,g=0;g<d.length;g++)e=d[g],f=this.touchToPointer(e),"touchstart"===a.type&&c.set(f.pointerId,f.target),c.has(f.pointerId)&&b.call(this,f),("touchend"===a.type||a._cancel)&&this.cleanUpPointer(f)},shouldScroll:function(b){if(this.firstXY){var c,d=a.targetFinding.findTouchAction(b),e=this.touchActionToScrollType(d);if("none"===e)c=!1;else if("XY"===e)c=!0;else{var f=b.changedTouches[0],g=e,h="Y"===e?"X":"Y",i=Math.abs(f["client"+g]-this.firstXY[g]),j=Math.abs(f["client"+h]-this.firstXY[h]);c=i>=j}return c}},findTouch:function(a,b){for(var c,d=0,e=a.length;e>d&&(c=a[d]);d++)if(c.identifier===b)return!0},vacuumTouches:function(a){var b=a.touches;if(c.pointers()>=b.length){var d=[];c.forEach(function(a,c){if(1!==c&&!this.findTouch(b,c-2)){var e=a;d.push(e)}},this),d.forEach(function(a){this.cancel(a),c.delete(a.pointerId)})}},touchstart:function(a){this.vacuumTouches(a),this.setPrimaryTouch(a.changedTouches[0]),this.dedupSynthMouse(a),this.scrolling||(this.clickCount++,this.processTouches(a,this.down))},down:function(a){b.down(a)},touchmove:function(a){if(g)a.cancelable&&this.processTouches(a,this.move);else if(this.scrolling){if(this.firstXY){var b=a.changedTouches[0],c=b.clientX-this.firstXY.X,d=b.clientY-this.firstXY.Y,e=Math.sqrt(c*c+d*d);e>=f&&(this.touchcancel(a),this.scrolling=!0,this.firstXY=null)}}else null===this.scrolling&&this.shouldScroll(a)?this.scrolling=!0:(this.scrolling=!1,a.preventDefault(),this.processTouches(a,this.move))},move:function(a){b.move(a)},touchend:function(a){this.dedupSynthMouse(a),this.processTouches(a,this.up)},up:function(c){c.relatedTarget=a.findTarget(c),b.up(c)},cancel:function(a){b.cancel(a)},touchcancel:function(a){a._cancel=!0,this.processTouches(a,this.cancel)},cleanUpPointer:function(a){c["delete"](a.pointerId),this.removePrimaryPointer(a)},dedupSynthMouse:function(b){var c=a.mouseEvents.lastTouches,e=b.changedTouches[0];if(this.isPrimaryTouch(e)){var f={x:e.clientX,y:e.clientY};c.push(f);var g=function(a,b){var c=a.indexOf(b);c>-1&&a.splice(c,1)}.bind(null,c,f);setTimeout(g,d)}}};a.touchEvents=h}(window.PolymerGestures),function(a){var b=a.dispatcher,c=b.pointermap,d=window.MSPointerEvent&&"number"==typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,e={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerCancel"],register:function(a){b.listen(a,this.events)},unregister:function(a){a!==document&&b.unlisten(a,this.events)},POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(a){var c=a;return c=b.cloneEvent(a),d&&(c.pointerType=this.POINTER_TYPES[a.pointerType]),c._source="ms",c},cleanup:function(a){c["delete"](a)},MSPointerDown:function(d){var e=this.prepareEvent(d);e.target=a.findTarget(d),c.set(d.pointerId,e.target),b.down(e)},MSPointerMove:function(a){var d=c.get(a.pointerId);if(d){var e=this.prepareEvent(a);e.target=d,b.move(e)}},MSPointerUp:function(d){var e=this.prepareEvent(d);e.relatedTarget=a.findTarget(d),e.target=c.get(e.pointerId),b.up(e),this.cleanup(d.pointerId)},MSPointerCancel:function(d){var e=this.prepareEvent(d);e.relatedTarget=a.findTarget(d),e.target=c.get(e.pointerId),b.cancel(e),this.cleanup(d.pointerId)}};a.msEvents=e}(window.PolymerGestures),function(a){var b=a.dispatcher,c=b.pointermap,d={events:["pointerdown","pointermove","pointerup","pointercancel"],prepareEvent:function(a){var c=b.cloneEvent(a);return c._source="pointer",c},register:function(a){b.listen(a,this.events)},unregister:function(a){a!==document&&b.unlisten(a,this.events)},cleanup:function(a){c["delete"](a)},pointerdown:function(d){var e=this.prepareEvent(d);e.target=a.findTarget(d),c.set(e.pointerId,e.target),b.down(e)},pointermove:function(a){var d=c.get(a.pointerId);if(d){var e=this.prepareEvent(a);e.target=d,b.move(e)}},pointerup:function(d){var e=this.prepareEvent(d);e.relatedTarget=a.findTarget(d),e.target=c.get(e.pointerId),b.up(e),this.cleanup(d.pointerId)},pointercancel:function(d){var e=this.prepareEvent(d);e.relatedTarget=a.findTarget(d),e.target=c.get(e.pointerId),b.cancel(e),this.cleanup(d.pointerId)}};a.pointerEvents=d}(window.PolymerGestures),function(a){var b=a.dispatcher,c=window.navigator;window.PointerEvent?b.registerSource("pointer",a.pointerEvents):c.msPointerEnabled?b.registerSource("ms",a.msEvents):(b.registerSource("mouse",a.mouseEvents),void 0!==window.ontouchstart&&b.registerSource("touch",a.touchEvents));var d=navigator.userAgent,e=d.match(/iPad|iPhone|iPod/)&&"ontouchstart"in window;b.IS_IOS=e,a.touchEvents.IS_IOS=e,b.register(document,!0)}(window.PolymerGestures),function(a){var b=a.dispatcher,c=a.eventFactory,d=new a.PointerMap,e={events:["down","move","up"],exposes:["trackstart","track","trackx","tracky","trackend"],defaultActions:{track:"none",trackx:"pan-y",tracky:"pan-x"},WIGGLE_THRESHOLD:4,clampDir:function(a){return a>0?1:-1},calcPositionDelta:function(a,b){var c=0,d=0;return a&&b&&(c=b.pageX-a.pageX,d=b.pageY-a.pageY),{x:c,y:d}},fireTrack:function(a,b,d){var e=d,f=this.calcPositionDelta(e.downEvent,b),g=this.calcPositionDelta(e.lastMoveEvent,b);if(g.x)e.xDirection=this.clampDir(g.x);else if("trackx"===a)return;if(g.y)e.yDirection=this.clampDir(g.y);else if("tracky"===a)return;var h={bubbles:!0,cancelable:!0,trackInfo:e.trackInfo,relatedTarget:b.relatedTarget,pointerType:b.pointerType,pointerId:b.pointerId,_source:"track"};"tracky"!==a&&(h.x=b.x,h.dx=f.x,h.ddx=g.x,h.clientX=b.clientX,h.pageX=b.pageX,h.screenX=b.screenX,h.xDirection=e.xDirection),"trackx"!==a&&(h.dy=f.y,h.ddy=g.y,h.y=b.y,h.clientY=b.clientY,h.pageY=b.pageY,h.screenY=b.screenY,h.yDirection=e.yDirection);var i=c.makeGestureEvent(a,h);e.downTarget.dispatchEvent(i)},down:function(a){if(a.isPrimary&&("mouse"===a.pointerType?1===a.buttons:!0)){var b={downEvent:a,downTarget:a.target,trackInfo:{},lastMoveEvent:null,xDirection:0,yDirection:0,tracking:!1};d.set(a.pointerId,b)}},move:function(a){var b=d.get(a.pointerId);if(b){if(!b.tracking){var c=this.calcPositionDelta(b.downEvent,a),e=c.x*c.x+c.y*c.y;e>this.WIGGLE_THRESHOLD&&(b.tracking=!0,b.lastMoveEvent=b.downEvent,this.fireTrack("trackstart",a,b))}b.tracking&&(this.fireTrack("track",a,b),this.fireTrack("trackx",a,b),this.fireTrack("tracky",a,b)),b.lastMoveEvent=a}},up:function(a){var b=d.get(a.pointerId);b&&(b.tracking&&this.fireTrack("trackend",a,b),d.delete(a.pointerId))}};b.registerGesture("track",e)}(window.PolymerGestures),function(a){var b=a.dispatcher,c=a.eventFactory,d={HOLD_DELAY:200,WIGGLE_THRESHOLD:16,events:["down","move","up"],exposes:["hold","holdpulse","release"],heldPointer:null,holdJob:null,pulse:function(){var a=Date.now()-this.heldPointer.timeStamp,b=this.held?"holdpulse":"hold";this.fireHold(b,a),this.held=!0},cancel:function(){clearInterval(this.holdJob),this.held&&this.fireHold("release"),this.held=!1,this.heldPointer=null,this.target=null,this.holdJob=null},down:function(a){a.isPrimary&&!this.heldPointer&&(this.heldPointer=a,this.target=a.target,this.holdJob=setInterval(this.pulse.bind(this),this.HOLD_DELAY))},up:function(a){this.heldPointer&&this.heldPointer.pointerId===a.pointerId&&this.cancel()},move:function(a){if(this.heldPointer&&this.heldPointer.pointerId===a.pointerId){var b=a.clientX-this.heldPointer.clientX,c=a.clientY-this.heldPointer.clientY;b*b+c*c>this.WIGGLE_THRESHOLD&&this.cancel()}},fireHold:function(a,b){var d={bubbles:!0,cancelable:!0,pointerType:this.heldPointer.pointerType,pointerId:this.heldPointer.pointerId,x:this.heldPointer.clientX,y:this.heldPointer.clientY,_source:"hold"};b&&(d.holdTime=b);var e=c.makeGestureEvent(a,d);this.target.dispatchEvent(e)}};b.registerGesture("hold",d)}(window.PolymerGestures),function(a){var b=a.dispatcher,c=a.eventFactory,d=new a.PointerMap,e={events:["down","up"],exposes:["tap"],down:function(a){a.isPrimary&&!a.tapPrevented&&d.set(a.pointerId,{target:a.target,buttons:a.buttons,x:a.clientX,y:a.clientY})},shouldTap:function(a,b){return"mouse"===a.pointerType?1===b.buttons:!a.tapPrevented},up:function(b){var e=d.get(b.pointerId);if(e&&this.shouldTap(b,e)){var f=a.targetFinding.LCA(e.target,b.relatedTarget);if(f){var g=c.makeGestureEvent("tap",{bubbles:!0,cancelable:!0,x:b.clientX,y:b.clientY,detail:b.detail,pointerType:b.pointerType,pointerId:b.pointerId,altKey:b.altKey,ctrlKey:b.ctrlKey,metaKey:b.metaKey,shiftKey:b.shiftKey,_source:"tap"});f.dispatchEvent(g)}}d.delete(b.pointerId)}};c.preventTap=function(a){return function(){a.tapPrevented=!0,d.delete(a.pointerId)}},b.registerGesture("tap",e)}(window.PolymerGestures),function(a){"use strict";function b(a,b){if(!a)throw new Error("ASSERT: "+b)}function c(a){return a>=48&&57>=a}function d(a){return 32===a||9===a||11===a||12===a||160===a||a>=5760&&"\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\ufeff".indexOf(String.fromCharCode(a))>0}function e(a){return 10===a||13===a||8232===a||8233===a}function f(a){return 36===a||95===a||a>=65&&90>=a||a>=97&&122>=a}function g(a){return 36===a||95===a||a>=65&&90>=a||a>=97&&122>=a||a>=48&&57>=a}function h(a){return"this"===a}function i(){for(;Y>X&&d(W.charCodeAt(X));)++X}function j(){var a,b;for(a=X++;Y>X&&(b=W.charCodeAt(X),g(b));)++X;return W.slice(a,X)}function k(){var a,b,c;return a=X,b=j(),c=1===b.length?S.Identifier:h(b)?S.Keyword:"null"===b?S.NullLiteral:"true"===b||"false"===b?S.BooleanLiteral:S.Identifier,{type:c,value:b,range:[a,X]}}function l(){var a,b,c=X,d=W.charCodeAt(X),e=W[X];switch(d){case 46:case 40:case 41:case 59:case 44:case 123:case 125:case 91:case 93:case 58:case 63:return++X,{type:S.Punctuator,value:String.fromCharCode(d),range:[c,X]};default:if(a=W.charCodeAt(X+1),61===a)switch(d){case 37:case 38:case 42:case 43:case 45:case 47:case 60:case 62:case 124:return X+=2,{type:S.Punctuator,value:String.fromCharCode(d)+String.fromCharCode(a),range:[c,X]};case 33:case 61:return X+=2,61===W.charCodeAt(X)&&++X,{type:S.Punctuator,value:W.slice(c,X),range:[c,X]}}}return b=W[X+1],e===b&&"&|".indexOf(e)>=0?(X+=2,{type:S.Punctuator,value:e+b,range:[c,X]}):"<>=!+-*%&|^/".indexOf(e)>=0?(++X,{type:S.Punctuator,value:e,range:[c,X]}):void s({},V.UnexpectedToken,"ILLEGAL")}function m(){var a,d,e;if(e=W[X],b(c(e.charCodeAt(0))||"."===e,"Numeric literal must start with a decimal digit or a decimal point"),d=X,a="","."!==e){for(a=W[X++],e=W[X],"0"===a&&e&&c(e.charCodeAt(0))&&s({},V.UnexpectedToken,"ILLEGAL");c(W.charCodeAt(X));)a+=W[X++];e=W[X]}if("."===e){for(a+=W[X++];c(W.charCodeAt(X));)a+=W[X++];e=W[X]}if("e"===e||"E"===e)if(a+=W[X++],e=W[X],("+"===e||"-"===e)&&(a+=W[X++]),c(W.charCodeAt(X)))for(;c(W.charCodeAt(X));)a+=W[X++];else s({},V.UnexpectedToken,"ILLEGAL");return f(W.charCodeAt(X))&&s({},V.UnexpectedToken,"ILLEGAL"),{type:S.NumericLiteral,value:parseFloat(a),range:[d,X]}}function n(){var a,c,d,f="",g=!1;for(a=W[X],b("'"===a||'"'===a,"String literal must starts with a quote"),c=X,++X;Y>X;){if(d=W[X++],d===a){a="";break}if("\\"===d)if(d=W[X++],d&&e(d.charCodeAt(0)))"\r"===d&&"\n"===W[X]&&++X;else switch(d){case"n":f+="\n";break;case"r":f+="\r";break;case"t":f+="	";break;case"b":f+="\b";break;case"f":f+="\f";break;case"v":f+="";break;default:f+=d}else{if(e(d.charCodeAt(0)))break;f+=d}}return""!==a&&s({},V.UnexpectedToken,"ILLEGAL"),{type:S.StringLiteral,value:f,octal:g,range:[c,X]}}function o(a){return a.type===S.Identifier||a.type===S.Keyword||a.type===S.BooleanLiteral||a.type===S.NullLiteral}function p(){var a;return i(),X>=Y?{type:S.EOF,range:[X,X]}:(a=W.charCodeAt(X),40===a||41===a||58===a?l():39===a||34===a?n():f(a)?k():46===a?c(W.charCodeAt(X+1))?m():l():c(a)?m():l())}function q(){var a;return a=$,X=a.range[1],$=p(),X=a.range[1],a}function r(){var a;a=X,$=p(),X=a}function s(a,c){var d,e=Array.prototype.slice.call(arguments,2),f=c.replace(/%(\d)/g,function(a,c){return b(c<e.length,"Message reference must be in range"),e[c]});throw d=new Error(f),d.index=X,d.description=f,d}function t(a){s(a,V.UnexpectedToken,a.value)}function u(a){var b=q();(b.type!==S.Punctuator||b.value!==a)&&t(b)}function v(a){return $.type===S.Punctuator&&$.value===a}function w(a){return $.type===S.Keyword&&$.value===a}function x(){var a=[];for(u("[");!v("]");)v(",")?(q(),a.push(null)):(a.push(bb()),v("]")||u(","));return u("]"),Z.createArrayExpression(a)}function y(){var a;return i(),a=q(),a.type===S.StringLiteral||a.type===S.NumericLiteral?Z.createLiteral(a):Z.createIdentifier(a.value)}function z(){var a,b;return a=$,i(),(a.type===S.EOF||a.type===S.Punctuator)&&t(a),b=y(),u(":"),Z.createProperty("init",b,bb())}function A(){var a=[];for(u("{");!v("}");)a.push(z()),v("}")||u(",");return u("}"),Z.createObjectExpression(a)}function B(){var a;return u("("),a=bb(),u(")"),a}function C(){var a,b,c;return v("(")?B():(a=$.type,a===S.Identifier?c=Z.createIdentifier(q().value):a===S.StringLiteral||a===S.NumericLiteral?c=Z.createLiteral(q()):a===S.Keyword?w("this")&&(q(),c=Z.createThisExpression()):a===S.BooleanLiteral?(b=q(),b.value="true"===b.value,c=Z.createLiteral(b)):a===S.NullLiteral?(b=q(),b.value=null,c=Z.createLiteral(b)):v("[")?c=x():v("{")&&(c=A()),c?c:void t(q()))}function D(){var a=[];if(u("("),!v(")"))for(;Y>X&&(a.push(bb()),!v(")"));)u(",");return u(")"),a}function E(){var a;return a=q(),o(a)||t(a),Z.createIdentifier(a.value)}function F(){return u("."),E()}function G(){var a;return u("["),a=bb(),u("]"),a}function H(){var a,b,c;for(a=C();;)if(v("["))c=G(),a=Z.createMemberExpression("[",a,c);else if(v("."))c=F(),a=Z.createMemberExpression(".",a,c);else{if(!v("("))break;b=D(),a=Z.createCallExpression(a,b)}return a}function I(){var a,b;return $.type!==S.Punctuator&&$.type!==S.Keyword?b=ab():v("+")||v("-")||v("!")?(a=q(),b=I(),b=Z.createUnaryExpression(a.value,b)):w("delete")||w("void")||w("typeof")?s({},V.UnexpectedToken):b=ab(),b}function J(a){var b=0;if(a.type!==S.Punctuator&&a.type!==S.Keyword)return 0;switch(a.value){case"||":b=1;break;case"&&":b=2;break;case"==":case"!=":case"===":case"!==":b=6;break;case"<":case">":case"<=":case">=":case"instanceof":b=7;break;case"in":b=7;break;case"+":case"-":b=9;break;case"*":case"/":case"%":b=11}return b}function K(){var a,b,c,d,e,f,g,h;if(g=I(),b=$,c=J(b),0===c)return g;for(b.prec=c,q(),e=I(),d=[g,b,e];(c=J($))>0;){for(;d.length>2&&c<=d[d.length-2].prec;)e=d.pop(),f=d.pop().value,g=d.pop(),a=Z.createBinaryExpression(f,g,e),d.push(a);b=q(),b.prec=c,d.push(b),a=I(),d.push(a)}for(h=d.length-1,a=d[h];h>1;)a=Z.createBinaryExpression(d[h-1].value,d[h-2],a),h-=2;return a}function L(){var a,b,c;return a=K(),v("?")&&(q(),b=L(),u(":"),c=L(),a=Z.createConditionalExpression(a,b,c)),a}function M(){var a,b;return a=q(),a.type!==S.Identifier&&t(a),b=v("(")?D():[],Z.createFilter(a.value,b)}function N(){for(;v("|");)q(),M()}function O(){i(),r();var a=bb();a&&(","===$.value||"in"==$.value&&a.type===U.Identifier?Q(a):(N(),"as"===$.value?P(a):Z.createTopLevel(a))),$.type!==S.EOF&&t($)}function P(a){q();var b=q().value;Z.createAsExpression(a,b)}function Q(a){var b;","===$.value&&(q(),$.type!==S.Identifier&&t($),b=q().value),q();var c=bb();N(),Z.createInExpression(a.name,b,c)}function R(a,b){return Z=b,W=a,X=0,Y=W.length,$=null,_={labelSet:{}},O()}var S,T,U,V,W,X,Y,Z,$,_;S={BooleanLiteral:1,EOF:2,Identifier:3,Keyword:4,NullLiteral:5,NumericLiteral:6,Punctuator:7,StringLiteral:8},T={},T[S.BooleanLiteral]="Boolean",T[S.EOF]="<end>",T[S.Identifier]="Identifier",T[S.Keyword]="Keyword",T[S.NullLiteral]="Null",T[S.NumericLiteral]="Numeric",T[S.Punctuator]="Punctuator",T[S.StringLiteral]="String",U={ArrayExpression:"ArrayExpression",BinaryExpression:"BinaryExpression",CallExpression:"CallExpression",ConditionalExpression:"ConditionalExpression",EmptyStatement:"EmptyStatement",ExpressionStatement:"ExpressionStatement",Identifier:"Identifier",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",ObjectExpression:"ObjectExpression",Program:"Program",Property:"Property",ThisExpression:"ThisExpression",UnaryExpression:"UnaryExpression"},V={UnexpectedToken:"Unexpected token %0",UnknownLabel:"Undefined label '%0'",Redeclaration:"%0 '%1' has already been declared"};var ab=H,bb=L;a.esprima={parse:R}}(this),function(a){"use strict";function b(a,b,d,e){var f;try{if(f=c(a),f.scopeIdent&&(d.nodeType!==Node.ELEMENT_NODE||"TEMPLATE"!==d.tagName||"bind"!==b&&"repeat"!==b))throw Error("as and in can only be used within <template bind/repeat>")}catch(g){return void console.error("Invalid expression syntax: "+a,g)}return function(a,b,c){var d=f.getBinding(a,e,c);return f.scopeIdent&&d&&(b.polymerExpressionScopeIdent_=f.scopeIdent,f.indexIdent&&(b.polymerExpressionIndexIdent_=f.indexIdent)),d}}function c(a){var b=q[a];if(!b){var c=new j;esprima.parse(a,c),b=new l(c),q[a]=b}return b}function d(a){this.value=a,this.valueFn_=void 0}function e(a){this.name=a,this.path=Path.get(a)}function f(a,b,c){this.computed="["==c,this.dynamicDeps="function"==typeof a||a.dynamicDeps||this.computed&&!(b instanceof d),this.simplePath=!this.dynamicDeps&&(b instanceof e||b instanceof d)&&(a instanceof f||a instanceof e),this.object=this.simplePath?a:i(a),this.property=!this.computed||this.simplePath?b:i(b)}function g(a,b){this.name=a,this.args=[];for(var c=0;c<b.length;c++)this.args[c]=i(b[c])}function h(){throw Error("Not Implemented")}function i(a){return"function"==typeof a?a:a.valueFn()}function j(){this.expression=null,this.filters=[],this.deps={},this.currentPath=void 0,this.scopeIdent=void 0,this.indexIdent=void 0,this.dynamicDeps=!1}function k(a){this.value_=a}function l(a){if(this.scopeIdent=a.scopeIdent,this.indexIdent=a.indexIdent,!a.expression)throw Error("No expression found.");this.expression=a.expression,i(this.expression),this.filters=a.filters,this.dynamicDeps=a.dynamicDeps}function m(a){return String(a).replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}function n(a,b){for(;a[t]&&!Object.prototype.hasOwnProperty.call(a,b);)a=a[t];return a}function o(a){switch(a){case"":return!1;case"false":case"null":case"true":return!0}return isNaN(Number(a))?!1:!0}function p(){}var q=Object.create(null);d.prototype={valueFn:function(){if(!this.valueFn_){var a=this.value;this.valueFn_=function(){return a}}return this.valueFn_}},e.prototype={valueFn:function(){if(!this.valueFn_){var a=(this.name,this.path);this.valueFn_=function(b,c){return c&&c.addPath(b,a),a.getValueFrom(b)}}return this.valueFn_},setValue:function(a,b){return 1==this.path.length,a=n(a,this.path[0]),this.path.setValueFrom(a,b)}},f.prototype={get fullPath(){if(!this.fullPath_){var a=this.object instanceof f?this.object.fullPath.slice():[this.object.name];
a.push(this.property instanceof e?this.property.name:this.property.value),this.fullPath_=Path.get(a)}return this.fullPath_},valueFn:function(){if(!this.valueFn_){var a=this.object;if(this.simplePath){var b=this.fullPath;this.valueFn_=function(a,c){return c&&c.addPath(a,b),b.getValueFrom(a)}}else if(this.computed){var c=this.property;this.valueFn_=function(b,d,e){var f=a(b,d,e),g=c(b,d,e);return d&&d.addPath(f,[g]),f?f[g]:void 0}}else{var b=Path.get(this.property.name);this.valueFn_=function(c,d,e){var f=a(c,d,e);return d&&d.addPath(f,b),b.getValueFrom(f)}}}return this.valueFn_},setValue:function(a,b){if(this.simplePath)return this.fullPath.setValueFrom(a,b),b;var c=this.object(a),d=this.property instanceof e?this.property.name:this.property(a);return c[d]=b}},g.prototype={transform:function(a,b,c,d,e){var f=c[this.name],g=a;if(f)g=void 0;else if(f=g[this.name],!f)return void console.error("Cannot find function or filter: "+this.name);if(d?f=f.toModel:"function"==typeof f.toDOM&&(f=f.toDOM),"function"!=typeof f)return void console.error("Cannot find function or filter: "+this.name);for(var h=e||[],j=0;j<this.args.length;j++)h.push(i(this.args[j])(a,b,c));return f.apply(g,h)}};var r={"+":function(a){return+a},"-":function(a){return-a},"!":function(a){return!a}},s={"+":function(a,b){return a+b},"-":function(a,b){return a-b},"*":function(a,b){return a*b},"/":function(a,b){return a/b},"%":function(a,b){return a%b},"<":function(a,b){return b>a},">":function(a,b){return a>b},"<=":function(a,b){return b>=a},">=":function(a,b){return a>=b},"==":function(a,b){return a==b},"!=":function(a,b){return a!=b},"===":function(a,b){return a===b},"!==":function(a,b){return a!==b},"&&":function(a,b){return a&&b},"||":function(a,b){return a||b}};j.prototype={createUnaryExpression:function(a,b){if(!r[a])throw Error("Disallowed operator: "+a);return b=i(b),function(c,d,e){return r[a](b(c,d,e))}},createBinaryExpression:function(a,b,c){if(!s[a])throw Error("Disallowed operator: "+a);switch(b=i(b),c=i(c),a){case"||":return this.dynamicDeps=!0,function(a,d,e){return b(a,d,e)||c(a,d,e)};case"&&":return this.dynamicDeps=!0,function(a,d,e){return b(a,d,e)&&c(a,d,e)}}return function(d,e,f){return s[a](b(d,e,f),c(d,e,f))}},createConditionalExpression:function(a,b,c){return a=i(a),b=i(b),c=i(c),this.dynamicDeps=!0,function(d,e,f){return a(d,e,f)?b(d,e,f):c(d,e,f)}},createIdentifier:function(a){var b=new e(a);return b.type="Identifier",b},createMemberExpression:function(a,b,c){var d=new f(b,c,a);return d.dynamicDeps&&(this.dynamicDeps=!0),d},createCallExpression:function(a,b){if(!(a instanceof e))throw Error("Only identifier function invocations are allowed");var c=new g(a.name,b);return function(a,b,d){return c.transform(a,b,d,!1)}},createLiteral:function(a){return new d(a.value)},createArrayExpression:function(a){for(var b=0;b<a.length;b++)a[b]=i(a[b]);return function(b,c,d){for(var e=[],f=0;f<a.length;f++)e.push(a[f](b,c,d));return e}},createProperty:function(a,b,c){return{key:b instanceof e?b.name:b.value,value:c}},createObjectExpression:function(a){for(var b=0;b<a.length;b++)a[b].value=i(a[b].value);return function(b,c,d){for(var e={},f=0;f<a.length;f++)e[a[f].key]=a[f].value(b,c,d);return e}},createFilter:function(a,b){this.filters.push(new g(a,b))},createAsExpression:function(a,b){this.expression=a,this.scopeIdent=b},createInExpression:function(a,b,c){this.expression=c,this.scopeIdent=a,this.indexIdent=b},createTopLevel:function(a){this.expression=a},createThisExpression:h},k.prototype={open:function(){return this.value_},discardChanges:function(){return this.value_},deliver:function(){},close:function(){}},l.prototype={getBinding:function(a,b,c){function d(){if(h)return h=!1,g;i.dynamicDeps&&f.startReset();var c=i.getValue(a,i.dynamicDeps?f:void 0,b);return i.dynamicDeps&&f.finishReset(),c}function e(c){return i.setValue(a,c,b),c}if(c)return this.getValue(a,void 0,b);var f=new CompoundObserver,g=this.getValue(a,f,b),h=!0,i=this;return new ObserverTransform(f,d,e,!0)},getValue:function(a,b,c){for(var d=i(this.expression)(a,b,c),e=0;e<this.filters.length;e++)d=this.filters[e].transform(a,b,c,!1,[d]);return d},setValue:function(a,b,c){for(var d=this.filters?this.filters.length:0;d-->0;)b=this.filters[d].transform(a,void 0,c,!0,[b]);return this.expression.setValue?this.expression.setValue(a,b):void 0}};var t="@"+Math.random().toString(36).slice(2);p.prototype={styleObject:function(a){var b=[];for(var c in a)b.push(m(c)+": "+a[c]);return b.join("; ")},tokenList:function(a){var b=[];for(var c in a)a[c]&&b.push(c);return b.join(" ")},prepareInstancePositionChanged:function(a){var b=a.polymerExpressionIndexIdent_;if(b)return function(a,c){a.model[b]=c}},prepareBinding:function(a,c,d){var e=Path.get(a);{if(o(a)||!e.valid)return b(a,c,d,this);if(1==e.length)return function(a,b,c){if(c)return e.getValueFrom(a);var d=n(a,e[0]);return new PathObserver(d,e)}}},prepareInstanceModel:function(a){var b=a.polymerExpressionScopeIdent_;if(b){var c=a.templateInstance?a.templateInstance.model:a.model,d=a.polymerExpressionIndexIdent_;return function(a){return u(c,a,b,d)}}}};var u="__proto__"in{}?function(a,b,c,d){var e={};return e[c]=b,e[d]=void 0,e[t]=a,e.__proto__=a,e}:function(a,b,c,d){var e=Object.create(a);return Object.defineProperty(e,c,{value:b,configurable:!0,writable:!0}),Object.defineProperty(e,d,{value:void 0,configurable:!0,writable:!0}),Object.defineProperty(e,t,{value:a,configurable:!0,writable:!0}),e};a.PolymerExpressions=p,p.getExpression=c}(this),Polymer={version:"0.4.0-8d32e76"},"function"==typeof window.Polymer&&(Polymer={}),window.Platform||(logFlags=window.logFlags||{},Platform={flush:function(){}},CustomElements={useNative:!0,ready:!0,takeRecords:function(){},"instanceof":function(a,b){return a instanceof b}},HTMLImports={useNative:!0},addEventListener("HTMLImportsLoaded",function(){document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))}),ShadowDOMPolyfill=null,wrap=unwrap=function(a){return a}),function(a){function b(a,b){b=b||o,d(function(){f(a,b)},b)}function c(a){return"complete"===a.readyState||a.readyState===q}function d(a,b){if(c(b))a&&a();else{var e=function(){("complete"===b.readyState||b.readyState===q)&&(b.removeEventListener(r,e),d(a,b))};b.addEventListener(r,e)}}function e(a){a.target.__loaded=!0}function f(a,b){function c(){h==i&&a&&a()}function d(a){e(a),h++,c()}var f=b.querySelectorAll("link[rel=import]"),h=0,i=f.length;if(i)for(var j,k=0;i>k&&(j=f[k]);k++)g(j)?d.call(j,{target:j}):(j.addEventListener("load",d),j.addEventListener("error",d));else c()}function g(a){return l?a.__loaded:a.__importParsed}function h(a){for(var b,c=0,d=a.length;d>c&&(b=a[c]);c++)i(b)&&j(b)}function i(a){return"link"===a.localName&&"import"===a.rel}function j(a){var b=a.import;b?e({target:a}):(a.addEventListener("load",e),a.addEventListener("error",e))}var k="import"in document.createElement("link"),l=k;isIE=/Trident/.test(navigator.userAgent);var m=Boolean(window.ShadowDOMPolyfill),n=function(a){return m?ShadowDOMPolyfill.wrapIfNeeded(a):a},o=n(document),p={get:function(){var a=HTMLImports.currentScript||document.currentScript||("complete"!==document.readyState?document.scripts[document.scripts.length-1]:null);return n(a)},configurable:!0};Object.defineProperty(document,"_currentScript",p),Object.defineProperty(o,"_currentScript",p);var q=isIE?"complete":"interactive",r="readystatechange";l&&(new MutationObserver(function(a){for(var b,c=0,d=a.length;d>c&&(b=a[c]);c++)b.addedNodes&&h(b.addedNodes)}).observe(document.head,{childList:!0}),function(){if("loading"===document.readyState)for(var a,b=document.querySelectorAll("link[rel=import]"),c=0,d=b.length;d>c&&(a=b[c]);c++)j(a)}()),b(function(){HTMLImports.ready=!0,HTMLImports.readyTime=(new Date).getTime(),o.dispatchEvent(new CustomEvent("HTMLImportsLoaded",{bubbles:!0}))}),a.useNative=l,a.isImportLoaded=g,a.whenReady=b,a.isIE=isIE,a.whenImportsReady=b}(window.HTMLImports),function(a){function b(a,b){return b=b||[],b.map||(b=[b]),a.apply(this,b.map(d))}function c(a,c,d){var e;switch(arguments.length){case 0:return;case 1:e=null;break;case 2:e=c.apply(this);break;default:e=b(d,c)}f[a]=e}function d(a){return f[a]}function e(a,c){HTMLImports.whenImportsReady(function(){b(c,a)})}var f={};a.marshal=d,a.modularize=c,a.using=e}(window),function(){var a=document.createElement("style");a.textContent="body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; } \n";var b=document.querySelector("head");b.insertBefore(a,b.firstChild)}(Platform),function(a){"use strict";function b(){function a(a){b=a}if("function"!=typeof Object.observe||"function"!=typeof Array.observe)return!1;var b=[],c={},d=[];return Object.observe(c,a),Array.observe(d,a),c.id=1,c.id=2,delete c.id,d.push(1,2),d.length=0,Object.deliverChangeRecords(a),5!==b.length?!1:"add"!=b[0].type||"update"!=b[1].type||"delete"!=b[2].type||"splice"!=b[3].type||"splice"!=b[4].type?!1:(Object.unobserve(c,a),Array.unobserve(d,a),!0)}function c(){if("undefined"!=typeof chrome&&chrome.app&&chrome.app.runtime)return!1;if("undefined"!=typeof navigator&&navigator.getDeviceStorage)return!1;try{var a=new Function("","return true;");return a()}catch(b){return!1}}function d(a){return+a===a>>>0&&""!==a}function e(a){return+a}function f(a){return a===Object(a)}function g(a,b){return a===b?0!==a||1/a===1/b:R(a)&&R(b)?!0:a!==a&&b!==b}function h(a){if(void 0===a)return"eof";var b=a.charCodeAt(0);switch(b){case 91:case 93:case 46:case 34:case 39:case 48:return a;case 95:case 36:return"ident";case 32:case 9:case 10:case 13:case 160:case 65279:case 8232:case 8233:return"ws"}return b>=97&&122>=b||b>=65&&90>=b?"ident":b>=49&&57>=b?"number":"else"}function i(){}function j(a){function b(){if(!(m>=a.length)){var b=a[m+1];return"inSingleQuote"==n&&"'"==b||"inDoubleQuote"==n&&'"'==b?(m++,d=b,o.append(),!0):void 0}}for(var c,d,e,f,g,j,k,l=[],m=-1,n="beforePath",o={push:function(){void 0!==e&&(l.push(e),e=void 0)},append:function(){void 0===e?e=d:e+=d}};n;)if(m++,c=a[m],"\\"!=c||!b(n)){if(f=h(c),k=W[n],g=k[f]||k["else"]||"error","error"==g)return;if(n=g[0],j=o[g[1]]||i,d=void 0===g[2]?c:g[2],j(),"afterPath"===n)return l}}function k(a){return V.test(a)}function l(a,b){if(b!==X)throw Error("Use Path.get to retrieve path objects");for(var c=0;c<a.length;c++)this.push(String(a[c]));Q&&this.length&&(this.getValueFrom=this.compiledGetValueFromFn())}function m(a){if(a instanceof l)return a;if((null==a||0==a.length)&&(a=""),"string"!=typeof a){if(d(a.length))return new l(a,X);a=String(a)}var b=Y[a];if(b)return b;var c=j(a);if(!c)return Z;var b=new l(c,X);return Y[a]=b,b}function n(a){return d(a)?"["+a+"]":'["'+a.replace(/"/g,'\\"')+'"]'}function o(b){for(var c=0;_>c&&b.check_();)c++;return O&&(a.dirtyCheckCycleCount=c),c>0}function p(a){for(var b in a)return!1;return!0}function q(a){return p(a.added)&&p(a.removed)&&p(a.changed)}function r(a,b){var c={},d={},e={};for(var f in b){var g=a[f];(void 0===g||g!==b[f])&&(f in a?g!==b[f]&&(e[f]=g):d[f]=void 0)}for(var f in a)f in b||(c[f]=a[f]);return Array.isArray(a)&&a.length!==b.length&&(e.length=a.length),{added:c,removed:d,changed:e}}function s(){if(!ab.length)return!1;for(var a=0;a<ab.length;a++)ab[a]();return ab.length=0,!0}function t(){function a(a){b&&b.state_===fb&&!d&&b.check_(a)}var b,c,d=!1,e=!0;return{open:function(c){if(b)throw Error("ObservedObject in use");e||Object.deliverChangeRecords(a),b=c,e=!1},observe:function(b,d){c=b,d?Array.observe(c,a):Object.observe(c,a)},deliver:function(b){d=b,Object.deliverChangeRecords(a),d=!1},close:function(){b=void 0,Object.unobserve(c,a),cb.push(this)}}}function u(a,b,c){var d=cb.pop()||t();return d.open(a),d.observe(b,c),d}function v(){function a(b,f){b&&(b===d&&(e[f]=!0),h.indexOf(b)<0&&(h.push(b),Object.observe(b,c)),a(Object.getPrototypeOf(b),f))}function b(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.object!==d||e[c.name]||"setPrototype"===c.type)return!1}return!0}function c(c){if(!b(c)){for(var d,e=0;e<g.length;e++)d=g[e],d.state_==fb&&d.iterateObjects_(a);for(var e=0;e<g.length;e++)d=g[e],d.state_==fb&&d.check_()}}var d,e,f=0,g=[],h=[],i={object:void 0,objects:h,open:function(b,c){d||(d=c,e={}),g.push(b),f++,b.iterateObjects_(a)},close:function(){if(f--,!(f>0)){for(var a=0;a<h.length;a++)Object.unobserve(h[a],c),x.unobservedCount++;g.length=0,h.length=0,d=void 0,e=void 0,db.push(this)}}};return i}function w(a,b){return $&&$.object===b||($=db.pop()||v(),$.object=b),$.open(a,b),$}function x(){this.state_=eb,this.callback_=void 0,this.target_=void 0,this.directObserver_=void 0,this.value_=void 0,this.id_=ib++}function y(a){x._allObserversCount++,kb&&jb.push(a)}function z(){x._allObserversCount--}function A(a){x.call(this),this.value_=a,this.oldObject_=void 0}function B(a){if(!Array.isArray(a))throw Error("Provided object is not an Array");A.call(this,a)}function C(a,b){x.call(this),this.object_=a,this.path_=m(b),this.directObserver_=void 0}function D(a){x.call(this),this.reportChangesOnOpen_=a,this.value_=[],this.directObserver_=void 0,this.observed_=[]}function E(a){return a}function F(a,b,c,d){this.callback_=void 0,this.target_=void 0,this.value_=void 0,this.observable_=a,this.getValueFn_=b||E,this.setValueFn_=c||E,this.dontPassThroughSet_=d}function G(a,b,c){for(var d={},e={},f=0;f<b.length;f++){var g=b[f];nb[g.type]?(g.name in c||(c[g.name]=g.oldValue),"update"!=g.type&&("add"!=g.type?g.name in d?(delete d[g.name],delete c[g.name]):e[g.name]=!0:g.name in e?delete e[g.name]:d[g.name]=!0)):(console.error("Unknown changeRecord type: "+g.type),console.error(g))}for(var h in d)d[h]=a[h];for(var h in e)e[h]=void 0;var i={};for(var h in c)if(!(h in d||h in e)){var j=a[h];c[h]!==j&&(i[h]=j)}return{added:d,removed:e,changed:i}}function H(a,b,c){return{index:a,removed:b,addedCount:c}}function I(){}function J(a,b,c,d,e,f){return sb.calcSplices(a,b,c,d,e,f)}function K(a,b,c,d){return c>b||a>d?-1:b==c||d==a?0:c>a?d>b?b-c:d-c:b>d?d-a:b-a}function L(a,b,c,d){for(var e=H(b,c,d),f=!1,g=0,h=0;h<a.length;h++){var i=a[h];if(i.index+=g,!f){var j=K(e.index,e.index+e.removed.length,i.index,i.index+i.addedCount);if(j>=0){a.splice(h,1),h--,g-=i.addedCount-i.removed.length,e.addedCount+=i.addedCount-j;var k=e.removed.length+i.removed.length-j;if(e.addedCount||k){var c=i.removed;if(e.index<i.index){var l=e.removed.slice(0,i.index-e.index);Array.prototype.push.apply(l,c),c=l}if(e.index+e.removed.length>i.index+i.addedCount){var m=e.removed.slice(i.index+i.addedCount-e.index);Array.prototype.push.apply(c,m)}e.removed=c,i.index<e.index&&(e.index=i.index)}else f=!0}else if(e.index<i.index){f=!0,a.splice(h,0,e),h++;var n=e.addedCount-e.removed.length;i.index+=n,g+=n}}}f||a.push(e)}function M(a,b){for(var c=[],f=0;f<b.length;f++){var g=b[f];switch(g.type){case"splice":L(c,g.index,g.removed.slice(),g.addedCount);break;case"add":case"update":case"delete":if(!d(g.name))continue;var h=e(g.name);if(0>h)continue;L(c,h,[g.oldValue],1);break;default:console.error("Unexpected record type: "+JSON.stringify(g))}}return c}function N(a,b){var c=[];return M(a,b).forEach(function(b){return 1==b.addedCount&&1==b.removed.length?void(b.removed[0]!==a[b.index]&&c.push(b)):void(c=c.concat(J(a,b.index,b.index+b.addedCount,b.removed,0,b.removed.length)))}),c}var O=a.testingExposeCycleCount,P=b(),Q=c(),R=a.Number.isNaN||function(b){return"number"==typeof b&&a.isNaN(b)},S="__proto__"in{}?function(a){return a}:function(a){var b=a.__proto__;if(!b)return a;var c=Object.create(b);return Object.getOwnPropertyNames(a).forEach(function(b){Object.defineProperty(c,b,Object.getOwnPropertyDescriptor(a,b))}),c},T="[$_a-zA-Z]",U="[$_a-zA-Z0-9]",V=new RegExp("^"+T+"+"+U+"*$"),W={beforePath:{ws:["beforePath"],ident:["inIdent","append"],"[":["beforeElement"],eof:["afterPath"]},inPath:{ws:["inPath"],".":["beforeIdent"],"[":["beforeElement"],eof:["afterPath"]},beforeIdent:{ws:["beforeIdent"],ident:["inIdent","append"]},inIdent:{ident:["inIdent","append"],0:["inIdent","append"],number:["inIdent","append"],ws:["inPath","push"],".":["beforeIdent","push"],"[":["beforeElement","push"],eof:["afterPath","push"]},beforeElement:{ws:["beforeElement"],0:["afterZero","append"],number:["inIndex","append"],"'":["inSingleQuote","append",""],'"':["inDoubleQuote","append",""]},afterZero:{ws:["afterElement","push"],"]":["inPath","push"]},inIndex:{0:["inIndex","append"],number:["inIndex","append"],ws:["afterElement"],"]":["inPath","push"]},inSingleQuote:{"'":["afterElement"],eof:["error"],"else":["inSingleQuote","append"]},inDoubleQuote:{'"':["afterElement"],eof:["error"],"else":["inDoubleQuote","append"]},afterElement:{ws:["afterElement"],"]":["inPath","push"]}},X={},Y={};l.get=m,l.prototype=S({__proto__:[],valid:!0,toString:function(){for(var a="",b=0;b<this.length;b++){var c=this[b];a+=k(c)?b?"."+c:c:n(c)}return a},getValueFrom:function(a){for(var b=0;b<this.length;b++){if(null==a)return;a=a[this[b]]}return a},iterateObjects:function(a,b){for(var c=0;c<this.length;c++){if(c&&(a=a[this[c-1]]),!f(a))return;b(a,this[0])}},compiledGetValueFromFn:function(){var a="",b="obj";a+="if (obj != null";for(var c,d=0;d<this.length-1;d++)c=this[d],b+=k(c)?"."+c:n(c),a+=" &&\n     "+b+" != null";a+=")\n";var c=this[d];return b+=k(c)?"."+c:n(c),a+="  return "+b+";\nelse\n  return undefined;",new Function("obj",a)},setValueFrom:function(a,b){if(!this.length)return!1;for(var c=0;c<this.length-1;c++){if(!f(a))return!1;a=a[this[c]]}return f(a)?(a[this[c]]=b,!0):!1}});var Z=new l("",X);Z.valid=!1,Z.getValueFrom=Z.setValueFrom=function(){};var $,_=1e3,ab=[],bb=P?function(){var a={pingPong:!0},b=!1;return Object.observe(a,function(){s(),b=!1}),function(c){ab.push(c),b||(b=!0,a.pingPong=!a.pingPong)}}():function(){return function(a){ab.push(a)}}(),cb=[],db=[],eb=0,fb=1,gb=2,hb=3,ib=1;x.prototype={open:function(a,b){if(this.state_!=eb)throw Error("Observer has already been opened.");return y(this),this.callback_=a,this.target_=b,this.connect_(),this.state_=fb,this.value_},close:function(){this.state_==fb&&(z(this),this.disconnect_(),this.value_=void 0,this.callback_=void 0,this.target_=void 0,this.state_=gb)},deliver:function(){this.state_==fb&&o(this)},report_:function(a){try{this.callback_.apply(this.target_,a)}catch(b){x._errorThrownDuringCallback=!0,console.error("Exception caught during observer callback: "+(b.stack||b))}},discardChanges:function(){return this.check_(void 0,!0),this.value_}};var jb,kb=!P;x._allObserversCount=0,kb&&(jb=[]);var lb=!1;a.Platform=a.Platform||{},a.Platform.performMicrotaskCheckpoint=function(){if(!lb&&kb){lb=!0;var b,c,d=0;do{d++,c=jb,jb=[],b=!1;for(var e=0;e<c.length;e++){var f=c[e];f.state_==fb&&(f.check_()&&(b=!0),jb.push(f))}s()&&(b=!0)}while(_>d&&b);O&&(a.dirtyCheckCycleCount=d),lb=!1}},kb&&(a.Platform.clearObservers=function(){jb=[]}),A.prototype=S({__proto__:x.prototype,arrayObserve:!1,connect_:function(){P?this.directObserver_=u(this,this.value_,this.arrayObserve):this.oldObject_=this.copyObject(this.value_)},copyObject:function(a){var b=Array.isArray(a)?[]:{};for(var c in a)b[c]=a[c];return Array.isArray(a)&&(b.length=a.length),b},check_:function(a){var b,c;if(P){if(!a)return!1;c={},b=G(this.value_,a,c)}else c=this.oldObject_,b=r(this.value_,this.oldObject_);return q(b)?!1:(P||(this.oldObject_=this.copyObject(this.value_)),this.report_([b.added||{},b.removed||{},b.changed||{},function(a){return c[a]}]),!0)},disconnect_:function(){P?(this.directObserver_.close(),this.directObserver_=void 0):this.oldObject_=void 0},deliver:function(){this.state_==fb&&(P?this.directObserver_.deliver(!1):o(this))},discardChanges:function(){return this.directObserver_?this.directObserver_.deliver(!0):this.oldObject_=this.copyObject(this.value_),this.value_}}),B.prototype=S({__proto__:A.prototype,arrayObserve:!0,copyObject:function(a){return a.slice()},check_:function(a){var b;if(P){if(!a)return!1;b=N(this.value_,a)}else b=J(this.value_,0,this.value_.length,this.oldObject_,0,this.oldObject_.length);return b&&b.length?(P||(this.oldObject_=this.copyObject(this.value_)),this.report_([b]),!0):!1}}),B.applySplices=function(a,b,c){c.forEach(function(c){for(var d=[c.index,c.removed.length],e=c.index;e<c.index+c.addedCount;)d.push(b[e]),e++;Array.prototype.splice.apply(a,d)})},C.prototype=S({__proto__:x.prototype,get path(){return this.path_},connect_:function(){P&&(this.directObserver_=w(this,this.object_)),this.check_(void 0,!0)},disconnect_:function(){this.value_=void 0,this.directObserver_&&(this.directObserver_.close(this),this.directObserver_=void 0)},iterateObjects_:function(a){this.path_.iterateObjects(this.object_,a)},check_:function(a,b){var c=this.value_;return this.value_=this.path_.getValueFrom(this.object_),b||g(this.value_,c)?!1:(this.report_([this.value_,c,this]),!0)},setValue:function(a){this.path_&&this.path_.setValueFrom(this.object_,a)}});var mb={};D.prototype=S({__proto__:x.prototype,connect_:function(){if(P){for(var a,b=!1,c=0;c<this.observed_.length;c+=2)if(a=this.observed_[c],a!==mb){b=!0;break}b&&(this.directObserver_=w(this,a))}this.check_(void 0,!this.reportChangesOnOpen_)},disconnect_:function(){for(var a=0;a<this.observed_.length;a+=2)this.observed_[a]===mb&&this.observed_[a+1].close();this.observed_.length=0,this.value_.length=0,this.directObserver_&&(this.directObserver_.close(this),this.directObserver_=void 0)},addPath:function(a,b){if(this.state_!=eb&&this.state_!=hb)throw Error("Cannot add paths once started.");var b=m(b);if(this.observed_.push(a,b),this.reportChangesOnOpen_){var c=this.observed_.length/2-1;this.value_[c]=b.getValueFrom(a)}},addObserver:function(a){if(this.state_!=eb&&this.state_!=hb)throw Error("Cannot add observers once started.");if(this.observed_.push(mb,a),this.reportChangesOnOpen_){var b=this.observed_.length/2-1;this.value_[b]=a.open(this.deliver,this)}},startReset:function(){if(this.state_!=fb)throw Error("Can only reset while open");this.state_=hb,this.disconnect_()},finishReset:function(){if(this.state_!=hb)throw Error("Can only finishReset after startReset");return this.state_=fb,this.connect_(),this.value_},iterateObjects_:function(a){for(var b,c=0;c<this.observed_.length;c+=2)b=this.observed_[c],b!==mb&&this.observed_[c+1].iterateObjects(b,a)},check_:function(a,b){for(var c,d=0;d<this.observed_.length;d+=2){var e,f=this.observed_[d],h=this.observed_[d+1];if(f===mb){var i=h;e=this.state_===eb?i.open(this.deliver,this):i.discardChanges()}else e=h.getValueFrom(f);b?this.value_[d/2]=e:g(e,this.value_[d/2])||(c=c||[],c[d/2]=this.value_[d/2],this.value_[d/2]=e)}return c?(this.report_([this.value_,c,this.observed_]),!0):!1}}),F.prototype={open:function(a,b){return this.callback_=a,this.target_=b,this.value_=this.getValueFn_(this.observable_.open(this.observedCallback_,this)),this.value_},observedCallback_:function(a){if(a=this.getValueFn_(a),!g(a,this.value_)){var b=this.value_;this.value_=a,this.callback_.call(this.target_,this.value_,b)}},discardChanges:function(){return this.value_=this.getValueFn_(this.observable_.discardChanges()),this.value_},deliver:function(){return this.observable_.deliver()},setValue:function(a){return a=this.setValueFn_(a),!this.dontPassThroughSet_&&this.observable_.setValue?this.observable_.setValue(a):void 0},close:function(){this.observable_&&this.observable_.close(),this.callback_=void 0,this.target_=void 0,this.observable_=void 0,this.value_=void 0,this.getValueFn_=void 0,this.setValueFn_=void 0}};var nb={add:!0,update:!0,"delete":!0},ob=0,pb=1,qb=2,rb=3;I.prototype={calcEditDistances:function(a,b,c,d,e,f){for(var g=f-e+1,h=c-b+1,i=new Array(g),j=0;g>j;j++)i[j]=new Array(h),i[j][0]=j;for(var k=0;h>k;k++)i[0][k]=k;for(var j=1;g>j;j++)for(var k=1;h>k;k++)if(this.equals(a[b+k-1],d[e+j-1]))i[j][k]=i[j-1][k-1];else{var l=i[j-1][k]+1,m=i[j][k-1]+1;i[j][k]=m>l?l:m}return i},spliceOperationsFromEditDistances:function(a){for(var b=a.length-1,c=a[0].length-1,d=a[b][c],e=[];b>0||c>0;)if(0!=b)if(0!=c){var f,g=a[b-1][c-1],h=a[b-1][c],i=a[b][c-1];f=i>h?g>h?h:g:g>i?i:g,f==g?(g==d?e.push(ob):(e.push(pb),d=g),b--,c--):f==h?(e.push(rb),b--,d=h):(e.push(qb),c--,d=i)}else e.push(rb),b--;else e.push(qb),c--;return e.reverse(),e},calcSplices:function(a,b,c,d,e,f){var g=0,h=0,i=Math.min(c-b,f-e);if(0==b&&0==e&&(g=this.sharedPrefix(a,d,i)),c==a.length&&f==d.length&&(h=this.sharedSuffix(a,d,i-g)),b+=g,e+=g,c-=h,f-=h,c-b==0&&f-e==0)return[];if(b==c){for(var j=H(b,[],0);f>e;)j.removed.push(d[e++]);return[j]}if(e==f)return[H(b,[],c-b)];for(var k=this.spliceOperationsFromEditDistances(this.calcEditDistances(a,b,c,d,e,f)),j=void 0,l=[],m=b,n=e,o=0;o<k.length;o++)switch(k[o]){case ob:j&&(l.push(j),j=void 0),m++,n++;break;case pb:j||(j=H(m,[],0)),j.addedCount++,m++,j.removed.push(d[n]),n++;break;case qb:j||(j=H(m,[],0)),j.addedCount++,m++;break;case rb:j||(j=H(m,[],0)),j.removed.push(d[n]),n++}return j&&l.push(j),l},sharedPrefix:function(a,b,c){for(var d=0;c>d;d++)if(!this.equals(a[d],b[d]))return d;return c},sharedSuffix:function(a,b,c){for(var d=a.length,e=b.length,f=0;c>f&&this.equals(a[--d],b[--e]);)f++;return f},calculateSplices:function(a,b){return this.calcSplices(a,0,a.length,b,0,b.length)},equals:function(a,b){return a===b}};var sb=new I;a.Observer=x,a.Observer.runEOM_=bb,a.Observer.observerSentinel_=mb,a.Observer.hasObjectObserve=P,a.ArrayObserver=B,a.ArrayObserver.calculateSplices=function(a,b){return sb.calculateSplices(a,b)},a.ArraySplice=I,a.ObjectObserver=A,a.PathObserver=C,a.CompoundObserver=D,a.Path=l,a.ObserverTransform=F}("undefined"!=typeof global&&global&&"undefined"!=typeof module&&module?global:this||window),function(){"use strict";function a(a){for(;a.parentNode;)a=a.parentNode;return"function"==typeof a.getElementById?a:null}function b(a,b,c){var d=a.bindings_;return d||(d=a.bindings_={}),d[b]&&c[b].close(),d[b]=c}function c(a,b,c){return c}function d(a){return null==a?"":a}function e(a,b){a.data=d(b)}function f(a){return function(b){return e(a,b)}}function g(a,b,c,e){return c?void(e?a.setAttribute(b,""):a.removeAttribute(b)):void a.setAttribute(b,d(e))}function h(a,b,c){return function(d){g(a,b,c,d)}}function i(a){switch(a.type){case"checkbox":return u;case"radio":case"select-multiple":case"select-one":return"change";case"range":if(/Trident|MSIE/.test(navigator.userAgent))return"change";default:return"input"}}function j(a,b,c,e){a[b]=(e||d)(c)}function k(a,b,c){return function(d){return j(a,b,d,c)}}function l(){}function m(a,b,c,d){function e(){c.setValue(a[b]),c.discardChanges(),(d||l)(a),Platform.performMicrotaskCheckpoint()}var f=i(a);return a.addEventListener(f,e),{close:function(){a.removeEventListener(f,e),c.close()},observable_:c}}function n(a){return Boolean(a)}function o(b){if(b.form)return s(b.form.elements,function(a){return a!=b&&"INPUT"==a.tagName&&"radio"==a.type&&a.name==b.name});var c=a(b);if(!c)return[];var d=c.querySelectorAll('input[type="radio"][name="'+b.name+'"]');return s(d,function(a){return a!=b&&!a.form})}function p(a){"INPUT"===a.tagName&&"radio"===a.type&&o(a).forEach(function(a){var b=a.bindings_.checked;b&&b.observable_.setValue(!1)})}function q(a,b){var c,e,f,g=a.parentNode;g instanceof HTMLSelectElement&&g.bindings_&&g.bindings_.value&&(c=g,e=c.bindings_.value,f=c.value),a.value=d(b),c&&c.value!=f&&(e.observable_.setValue(c.value),e.observable_.discardChanges(),Platform.performMicrotaskCheckpoint())}function r(a){return function(b){q(a,b)}}var s=Array.prototype.filter.call.bind(Array.prototype.filter);Node.prototype.bind=function(a,b){console.error("Unhandled binding to Node: ",this,a,b)},Node.prototype.bindFinished=function(){};var t=c;Object.defineProperty(Platform,"enableBindingsReflection",{get:function(){return t===b},set:function(a){return t=a?b:c,a},configurable:!0}),Text.prototype.bind=function(a,b,c){if("textContent"!==a)return Node.prototype.bind.call(this,a,b,c);if(c)return e(this,b);var d=b;return e(this,d.open(f(this))),t(this,a,d)},Element.prototype.bind=function(a,b,c){var d="?"==a[a.length-1];if(d&&(this.removeAttribute(a),a=a.slice(0,-1)),c)return g(this,a,d,b);var e=b;return g(this,a,d,e.open(h(this,a,d))),t(this,a,e)};var u;!function(){var a=document.createElement("div"),b=a.appendChild(document.createElement("input"));b.setAttribute("type","checkbox");var c,d=0;b.addEventListener("click",function(){d++,c=c||"click"}),b.addEventListener("change",function(){d++,c=c||"change"});var e=document.createEvent("MouseEvent");e.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),b.dispatchEvent(e),u=1==d?"change":c}(),HTMLInputElement.prototype.bind=function(a,c,e){if("value"!==a&&"checked"!==a)return HTMLElement.prototype.bind.call(this,a,c,e);this.removeAttribute(a);var f="checked"==a?n:d,g="checked"==a?p:l;if(e)return j(this,a,c,f);var h=c,i=m(this,a,h,g);return j(this,a,h.open(k(this,a,f)),f),b(this,a,i)},HTMLTextAreaElement.prototype.bind=function(a,b,c){if("value"!==a)return HTMLElement.prototype.bind.call(this,a,b,c);if(this.removeAttribute("value"),c)return j(this,"value",b);var e=b,f=m(this,"value",e);return j(this,"value",e.open(k(this,"value",d))),t(this,a,f)},HTMLOptionElement.prototype.bind=function(a,b,c){if("value"!==a)return HTMLElement.prototype.bind.call(this,a,b,c);if(this.removeAttribute("value"),c)return q(this,b);var d=b,e=m(this,"value",d);return q(this,d.open(r(this))),t(this,a,e)},HTMLSelectElement.prototype.bind=function(a,c,d){if("selectedindex"===a&&(a="selectedIndex"),"selectedIndex"!==a&&"value"!==a)return HTMLElement.prototype.bind.call(this,a,c,d);if(this.removeAttribute(a),d)return j(this,a,c);var e=c,f=m(this,a,e);return j(this,a,e.open(k(this,a))),b(this,a,f)}}(this),function(a){"use strict";function b(a){if(!a)throw new Error("Assertion failed")}function c(a){for(var b;b=a.parentNode;)a=b;return a}function d(a,b){if(b){for(var d,e="#"+b;!d&&(a=c(a),a.protoContent_?d=a.protoContent_.querySelector(e):a.getElementById&&(d=a.getElementById(b)),!d&&a.templateCreator_);)a=a.templateCreator_;return d}}function e(a){return"template"==a.tagName&&"http://www.w3.org/2000/svg"==a.namespaceURI}function f(a){return"TEMPLATE"==a.tagName&&"http://www.w3.org/1999/xhtml"==a.namespaceURI}function g(a){return Boolean(L[a.tagName]&&a.hasAttribute("template"))}function h(a){return void 0===a.isTemplate_&&(a.isTemplate_="TEMPLATE"==a.tagName||g(a)),a.isTemplate_}function i(a,b){var c=a.querySelectorAll(N);h(a)&&b(a),G(c,b)}function j(a){function b(a){HTMLTemplateElement.decorate(a)||j(a.content)}i(a,b)}function k(a,b){Object.getOwnPropertyNames(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))})}function l(a){var b=a.ownerDocument;if(!b.defaultView)return b;var c=b.templateContentsOwner_;if(!c){for(c=b.implementation.createHTMLDocument("");c.lastChild;)c.removeChild(c.lastChild);b.templateContentsOwner_=c}return c}function m(a){if(!a.stagingDocument_){var b=a.ownerDocument;if(!b.stagingDocument_){b.stagingDocument_=b.implementation.createHTMLDocument(""),b.stagingDocument_.isStagingDocument=!0;var c=b.stagingDocument_.createElement("base");c.href=document.baseURI,b.stagingDocument_.head.appendChild(c),b.stagingDocument_.stagingDocument_=b.stagingDocument_}a.stagingDocument_=b.stagingDocument_}return a.stagingDocument_}function n(a){var b=a.ownerDocument.createElement("template");a.parentNode.insertBefore(b,a);for(var c=a.attributes,d=c.length;d-->0;){var e=c[d];K[e.name]&&("template"!==e.name&&b.setAttribute(e.name,e.value),a.removeAttribute(e.name))}return b}function o(a){var b=a.ownerDocument.createElement("template");a.parentNode.insertBefore(b,a);for(var c=a.attributes,d=c.length;d-->0;){var e=c[d];b.setAttribute(e.name,e.value),a.removeAttribute(e.name)}return a.parentNode.removeChild(a),b}function p(a,b,c){var d=a.content;if(c)return void d.appendChild(b);for(var e;e=b.firstChild;)d.appendChild(e)}function q(a){P?a.__proto__=HTMLTemplateElement.prototype:k(a,HTMLTemplateElement.prototype)}function r(a){a.setModelFn_||(a.setModelFn_=function(){a.setModelFnScheduled_=!1;var b=z(a,a.delegate_&&a.delegate_.prepareBinding);
w(a,b,a.model_)}),a.setModelFnScheduled_||(a.setModelFnScheduled_=!0,Observer.runEOM_(a.setModelFn_))}function s(a,b,c,d){if(a&&a.length){for(var e,f=a.length,g=0,h=0,i=0,j=!0;f>h;){var g=a.indexOf("{{",h),k=a.indexOf("[[",h),l=!1,m="}}";if(k>=0&&(0>g||g>k)&&(g=k,l=!0,m="]]"),i=0>g?-1:a.indexOf(m,g+2),0>i){if(!e)return;e.push(a.slice(h));break}e=e||[],e.push(a.slice(h,g));var n=a.slice(g+2,i).trim();e.push(l),j=j&&l;var o=d&&d(n,b,c);e.push(null==o?Path.get(n):null),e.push(o),h=i+2}return h===f&&e.push(""),e.hasOnePath=5===e.length,e.isSimplePath=e.hasOnePath&&""==e[0]&&""==e[4],e.onlyOneTime=j,e.combinator=function(a){for(var b=e[0],c=1;c<e.length;c+=4){var d=e.hasOnePath?a:a[(c-1)/4];void 0!==d&&(b+=d),b+=e[c+3]}return b},e}}function t(a,b,c,d){if(b.hasOnePath){var e=b[3],f=e?e(d,c,!0):b[2].getValueFrom(d);return b.isSimplePath?f:b.combinator(f)}for(var g=[],h=1;h<b.length;h+=4){var e=b[h+2];g[(h-1)/4]=e?e(d,c):b[h+1].getValueFrom(d)}return b.combinator(g)}function u(a,b,c,d){var e=b[3],f=e?e(d,c,!1):new PathObserver(d,b[2]);return b.isSimplePath?f:new ObserverTransform(f,b.combinator)}function v(a,b,c,d){if(b.onlyOneTime)return t(a,b,c,d);if(b.hasOnePath)return u(a,b,c,d);for(var e=new CompoundObserver,f=1;f<b.length;f+=4){var g=b[f],h=b[f+2];if(h){var i=h(d,c,g);g?e.addPath(i):e.addObserver(i)}else{var j=b[f+1];g?e.addPath(j.getValueFrom(d)):e.addPath(d,j)}}return new ObserverTransform(e,b.combinator)}function w(a,b,c,d){for(var e=0;e<b.length;e+=2){var f=b[e],g=b[e+1],h=v(f,g,a,c),i=a.bind(f,h,g.onlyOneTime);i&&d&&d.push(i)}if(a.bindFinished(),b.isTemplate){a.model_=c;var j=a.processBindingDirectives_(b);d&&j&&d.push(j)}}function x(a,b,c){var d=a.getAttribute(b);return s(""==d?"{{}}":d,b,a,c)}function y(a,c){b(a);for(var d=[],e=0;e<a.attributes.length;e++){for(var f=a.attributes[e],g=f.name,i=f.value;"_"===g[0];)g=g.substring(1);if(!h(a)||g!==J&&g!==H&&g!==I){var j=s(i,g,a,c);j&&d.push(g,j)}}return h(a)&&(d.isTemplate=!0,d.if=x(a,J,c),d.bind=x(a,H,c),d.repeat=x(a,I,c),!d.if||d.bind||d.repeat||(d.bind=s("{{}}",H,a,c))),d}function z(a,b){if(a.nodeType===Node.ELEMENT_NODE)return y(a,b);if(a.nodeType===Node.TEXT_NODE){var c=s(a.data,"textContent",a,b);if(c)return["textContent",c]}return[]}function A(a,b,c,d,e,f,g){for(var h=b.appendChild(c.importNode(a,!1)),i=0,j=a.firstChild;j;j=j.nextSibling)A(j,h,c,d.children[i++],e,f,g);return d.isTemplate&&(HTMLTemplateElement.decorate(h,a),f&&h.setDelegate_(f)),w(h,d,e,g),h}function B(a,b){var c=z(a,b);c.children={};for(var d=0,e=a.firstChild;e;e=e.nextSibling)c.children[d++]=B(e,b);return c}function C(a){var b=a.id_;return b||(b=a.id_=S++),b}function D(a,b){var c=C(a);if(b){var d=b.bindingMaps[c];return d||(d=b.bindingMaps[c]=B(a,b.prepareBinding)||[]),d}var d=a.bindingMap_;return d||(d=a.bindingMap_=B(a,void 0)||[]),d}function E(a){this.closed=!1,this.templateElement_=a,this.instances=[],this.deps=void 0,this.iteratedValue=[],this.presentValue=void 0,this.arrayObserver=void 0}var F,G=Array.prototype.forEach.call.bind(Array.prototype.forEach);a.Map&&"function"==typeof a.Map.prototype.forEach?F=a.Map:(F=function(){this.keys=[],this.values=[]},F.prototype={set:function(a,b){var c=this.keys.indexOf(a);0>c?(this.keys.push(a),this.values.push(b)):this.values[c]=b},get:function(a){var b=this.keys.indexOf(a);if(!(0>b))return this.values[b]},"delete":function(a){var b=this.keys.indexOf(a);return 0>b?!1:(this.keys.splice(b,1),this.values.splice(b,1),!0)},forEach:function(a,b){for(var c=0;c<this.keys.length;c++)a.call(b||this,this.values[c],this.keys[c],this)}});"function"!=typeof document.contains&&(Document.prototype.contains=function(a){return a===this||a.parentNode===this?!0:this.documentElement.contains(a)});var H="bind",I="repeat",J="if",K={template:!0,repeat:!0,bind:!0,ref:!0},L={THEAD:!0,TBODY:!0,TFOOT:!0,TH:!0,TR:!0,TD:!0,COLGROUP:!0,COL:!0,CAPTION:!0,OPTION:!0,OPTGROUP:!0},M="undefined"!=typeof HTMLTemplateElement;M&&!function(){var a=document.createElement("template"),b=a.content.ownerDocument,c=b.appendChild(b.createElement("html")),d=c.appendChild(b.createElement("head")),e=b.createElement("base");e.href=document.baseURI,d.appendChild(e)}();var N="template, "+Object.keys(L).map(function(a){return a.toLowerCase()+"[template]"}).join(", ");document.addEventListener("DOMContentLoaded",function(){j(document),Platform.performMicrotaskCheckpoint()},!1),M||(a.HTMLTemplateElement=function(){throw TypeError("Illegal constructor")});var O,P="__proto__"in{};"function"==typeof MutationObserver&&(O=new MutationObserver(function(a){for(var b=0;b<a.length;b++)a[b].target.refChanged_()})),HTMLTemplateElement.decorate=function(a,c){if(a.templateIsDecorated_)return!1;var d=a;d.templateIsDecorated_=!0;var h=f(d)&&M,i=h,k=!h,m=!1;if(h||(g(d)?(b(!c),d=n(a),d.templateIsDecorated_=!0,h=M,m=!0):e(d)&&(d=o(a),d.templateIsDecorated_=!0,h=M)),!h){q(d);var r=l(d);d.content_=r.createDocumentFragment()}return c?d.instanceRef_=c:k?p(d,a,m):i&&j(d.content),!0},HTMLTemplateElement.bootstrap=j;var Q=a.HTMLUnknownElement||HTMLElement,R={get:function(){return this.content_},enumerable:!0,configurable:!0};M||(HTMLTemplateElement.prototype=Object.create(Q.prototype),Object.defineProperty(HTMLTemplateElement.prototype,"content",R)),k(HTMLTemplateElement.prototype,{bind:function(a,b,c){if("ref"!=a)return Element.prototype.bind.call(this,a,b,c);var d=this,e=c?b:b.open(function(a){d.setAttribute("ref",a),d.refChanged_()});return this.setAttribute("ref",e),this.refChanged_(),c?void 0:(this.bindings_?this.bindings_.ref=b:this.bindings_={ref:b},b)},processBindingDirectives_:function(a){return this.iterator_&&this.iterator_.closeDeps(),a.if||a.bind||a.repeat?(this.iterator_||(this.iterator_=new E(this)),this.iterator_.updateDependencies(a,this.model_),O&&O.observe(this,{attributes:!0,attributeFilter:["ref"]}),this.iterator_):void(this.iterator_&&(this.iterator_.close(),this.iterator_=void 0))},createInstance:function(a,b,c){b?c=this.newDelegate_(b):c||(c=this.delegate_),this.refContent_||(this.refContent_=this.ref_.content);var d=this.refContent_;if(null===d.firstChild)return T;var e=D(d,c),f=m(this),g=f.createDocumentFragment();g.templateCreator_=this,g.protoContent_=d,g.bindings_=[],g.terminator_=null;for(var h=g.templateInstance_={firstNode:null,lastNode:null,model:a},i=0,j=!1,k=d.firstChild;k;k=k.nextSibling){null===k.nextSibling&&(j=!0);var l=A(k,g,f,e.children[i++],a,c,g.bindings_);l.templateInstance_=h,j&&(g.terminator_=l)}return h.firstNode=g.firstChild,h.lastNode=g.lastChild,g.templateCreator_=void 0,g.protoContent_=void 0,g},get model(){return this.model_},set model(a){this.model_=a,r(this)},get bindingDelegate(){return this.delegate_&&this.delegate_.raw},refChanged_:function(){this.iterator_&&this.refContent_!==this.ref_.content&&(this.refContent_=void 0,this.iterator_.valueChanged(),this.iterator_.updateIteratedValue(this.iterator_.getUpdatedValue()))},clear:function(){this.model_=void 0,this.delegate_=void 0,this.bindings_&&this.bindings_.ref&&this.bindings_.ref.close(),this.refContent_=void 0,this.iterator_&&(this.iterator_.valueChanged(),this.iterator_.close(),this.iterator_=void 0)},setDelegate_:function(a){this.delegate_=a,this.bindingMap_=void 0,this.iterator_&&(this.iterator_.instancePositionChangedFn_=void 0,this.iterator_.instanceModelFn_=void 0)},newDelegate_:function(a){function b(b){var c=a&&a[b];if("function"==typeof c)return function(){return c.apply(a,arguments)}}if(a)return{bindingMaps:{},raw:a,prepareBinding:b("prepareBinding"),prepareInstanceModel:b("prepareInstanceModel"),prepareInstancePositionChanged:b("prepareInstancePositionChanged")}},set bindingDelegate(a){if(this.delegate_)throw Error("Template must be cleared before a new bindingDelegate can be assigned");this.setDelegate_(this.newDelegate_(a))},get ref_(){var a=d(this,this.getAttribute("ref"));if(a||(a=this.instanceRef_),!a)return this;var b=a.ref_;return b?b:a}});var S=1;Object.defineProperty(Node.prototype,"templateInstance",{get:function(){var a=this.templateInstance_;return a?a:this.parentNode?this.parentNode.templateInstance:void 0}});var T=document.createDocumentFragment();T.bindings_=[],T.terminator_=null,E.prototype={closeDeps:function(){var a=this.deps;a&&(a.ifOneTime===!1&&a.ifValue.close(),a.oneTime===!1&&a.value.close())},updateDependencies:function(a,b){this.closeDeps();var c=this.deps={},d=this.templateElement_,e=!0;if(a.if){if(c.hasIf=!0,c.ifOneTime=a.if.onlyOneTime,c.ifValue=v(J,a.if,d,b),e=c.ifValue,c.ifOneTime&&!e)return void this.valueChanged();c.ifOneTime||(e=e.open(this.updateIfValue,this))}a.repeat?(c.repeat=!0,c.oneTime=a.repeat.onlyOneTime,c.value=v(I,a.repeat,d,b)):(c.repeat=!1,c.oneTime=a.bind.onlyOneTime,c.value=v(H,a.bind,d,b));var f=c.value;return c.oneTime||(f=f.open(this.updateIteratedValue,this)),e?void this.updateValue(f):void this.valueChanged()},getUpdatedValue:function(){var a=this.deps.value;return this.deps.oneTime||(a=a.discardChanges()),a},updateIfValue:function(a){return a?void this.updateValue(this.getUpdatedValue()):void this.valueChanged()},updateIteratedValue:function(a){if(this.deps.hasIf){var b=this.deps.ifValue;if(this.deps.ifOneTime||(b=b.discardChanges()),!b)return void this.valueChanged()}this.updateValue(a)},updateValue:function(a){this.deps.repeat||(a=[a]);var b=this.deps.repeat&&!this.deps.oneTime&&Array.isArray(a);this.valueChanged(a,b)},valueChanged:function(a,b){Array.isArray(a)||(a=[]),a!==this.iteratedValue&&(this.unobserve(),this.presentValue=a,b&&(this.arrayObserver=new ArrayObserver(this.presentValue),this.arrayObserver.open(this.handleSplices,this)),this.handleSplices(ArrayObserver.calculateSplices(this.presentValue,this.iteratedValue)))},getLastInstanceNode:function(a){if(-1==a)return this.templateElement_;var b=this.instances[a],c=b.terminator_;if(!c)return this.getLastInstanceNode(a-1);if(c.nodeType!==Node.ELEMENT_NODE||this.templateElement_===c)return c;var d=c.iterator_;return d?d.getLastTemplateNode():c},getLastTemplateNode:function(){return this.getLastInstanceNode(this.instances.length-1)},insertInstanceAt:function(a,b){var c=this.getLastInstanceNode(a-1),d=this.templateElement_.parentNode;this.instances.splice(a,0,b),d.insertBefore(b,c.nextSibling)},extractInstanceAt:function(a){for(var b=this.getLastInstanceNode(a-1),c=this.getLastInstanceNode(a),d=this.templateElement_.parentNode,e=this.instances.splice(a,1)[0];c!==b;){var f=b.nextSibling;f==c&&(c=b),e.appendChild(d.removeChild(f))}return e},getDelegateFn:function(a){return a=a&&a(this.templateElement_),"function"==typeof a?a:null},handleSplices:function(a){if(!this.closed&&a.length){var b=this.templateElement_;if(!b.parentNode)return void this.close();ArrayObserver.applySplices(this.iteratedValue,this.presentValue,a);var c=b.delegate_;void 0===this.instanceModelFn_&&(this.instanceModelFn_=this.getDelegateFn(c&&c.prepareInstanceModel)),void 0===this.instancePositionChangedFn_&&(this.instancePositionChangedFn_=this.getDelegateFn(c&&c.prepareInstancePositionChanged));for(var d=new F,e=0,f=0;f<a.length;f++){for(var g=a[f],h=g.removed,i=0;i<h.length;i++){var j=h[i],k=this.extractInstanceAt(g.index+e);k!==T&&d.set(j,k)}e-=g.addedCount}for(var f=0;f<a.length;f++)for(var g=a[f],l=g.index;l<g.index+g.addedCount;l++){var j=this.iteratedValue[l],k=d.get(j);k?d.delete(j):(this.instanceModelFn_&&(j=this.instanceModelFn_(j)),k=void 0===j?T:b.createInstance(j,void 0,c)),this.insertInstanceAt(l,k)}d.forEach(function(a){this.closeInstanceBindings(a)},this),this.instancePositionChangedFn_&&this.reportInstancesMoved(a)}},reportInstanceMoved:function(a){var b=this.instances[a];b!==T&&this.instancePositionChangedFn_(b.templateInstance_,a)},reportInstancesMoved:function(a){for(var b=0,c=0,d=0;d<a.length;d++){var e=a[d];if(0!=c)for(;b<e.index;)this.reportInstanceMoved(b),b++;else b=e.index;for(;b<e.index+e.addedCount;)this.reportInstanceMoved(b),b++;c+=e.addedCount-e.removed.length}if(0!=c)for(var f=this.instances.length;f>b;)this.reportInstanceMoved(b),b++},closeInstanceBindings:function(a){for(var b=a.bindings_,c=0;c<b.length;c++)b[c].close()},unobserve:function(){this.arrayObserver&&(this.arrayObserver.close(),this.arrayObserver=void 0)},close:function(){if(!this.closed){this.unobserve();for(var a=0;a<this.instances.length;a++)this.closeInstanceBindings(this.instances[a]);this.instances.length=0,this.closeDeps(),this.templateElement_.iterator_=void 0,this.closed=!0}}},HTMLTemplateElement.forAllTemplatesFrom_=i}(this),function(a){function b(a){f.textContent=d++,e.push(a)}function c(){for(;e.length;)e.shift()()}var d=0,e=[],f=document.createTextNode("");new(window.MutationObserver||JsMutationObserver)(c).observe(f,{characterData:!0}),a.endOfMicrotask=b}(Platform),function(a){function b(){e||(e=!0,a.endOfMicrotask(function(){e=!1,logFlags.data&&console.group("Platform.flush()"),a.performMicrotaskCheckpoint(),logFlags.data&&console.groupEnd()}))}var c=document.createElement("style");c.textContent="template {display: none !important;} /* injected by platform.js */";var d=document.querySelector("head");d.insertBefore(c,d.firstChild);var e;if(Observer.hasObjectObserve)b=function(){};else{var f=125;window.addEventListener("WebComponentsReady",function(){b(),a.flushPoll=setInterval(b,f)})}if(window.CustomElements&&!CustomElements.useNative){var g=Document.prototype.importNode;Document.prototype.importNode=function(a,b){var c=g.call(this,a,b);return CustomElements.upgradeAll(c),c}}a.flush=b}(window.Platform),function(a){function b(a,b,d,e){return a.replace(e,function(a,e,f,g){var h=f.replace(/["']/g,"");return h=c(b,h,d),e+"'"+h+"'"+g})}function c(a,b,c){if(b&&"/"===b[0])return b;var e=new URL(b,a);return c?e.href:d(e.href)}function d(a){var b=new URL(document.baseURI),c=new URL(a,b);return c.host===b.host&&c.port===b.port&&c.protocol===b.protocol?e(b,c):a}function e(a,b){for(var c=a.pathname,d=b.pathname,e=c.split("/"),f=d.split("/");e.length&&e[0]===f[0];)e.shift(),f.shift();for(var g=0,h=e.length-1;h>g;g++)f.unshift("..");return f.join("/")+b.search+b.hash}var f={resolveDom:function(a,b){b=b||a.ownerDocument.baseURI,this.resolveAttributes(a,b),this.resolveStyles(a,b);var c=a.querySelectorAll("template");if(c)for(var d,e=0,f=c.length;f>e&&(d=c[e]);e++)d.content&&this.resolveDom(d.content,b)},resolveTemplate:function(a){this.resolveDom(a.content,a.ownerDocument.baseURI)},resolveStyles:function(a,b){var c=a.querySelectorAll("style");if(c)for(var d,e=0,f=c.length;f>e&&(d=c[e]);e++)this.resolveStyle(d,b)},resolveStyle:function(a,b){b=b||a.ownerDocument.baseURI,a.textContent=this.resolveCssText(a.textContent,b)},resolveCssText:function(a,c,d){return a=b(a,c,d,g),b(a,c,d,h)},resolveAttributes:function(a,b){a.hasAttributes&&a.hasAttributes()&&this.resolveElementAttributes(a,b);var c=a&&a.querySelectorAll(j);if(c)for(var d,e=0,f=c.length;f>e&&(d=c[e]);e++)this.resolveElementAttributes(d,b)},resolveElementAttributes:function(a,d){d=d||a.ownerDocument.baseURI,i.forEach(function(e){var f,h=a.attributes[e],i=h&&h.value;i&&i.search(k)<0&&(f="style"===e?b(i,d,!1,g):c(d,i),h.value=f)})}},g=/(url\()([^)]*)(\))/g,h=/(@import[\s]+(?!url\())([^;]*)(;)/g,i=["href","src","action","style","url"],j="["+i.join("],[")+"]",k="{{.*}}";a.urlResolver=f}(Polymer),function(a){function b(a){this.cache=Object.create(null),this.map=Object.create(null),this.requests=0,this.regex=a}var c=Platform.endOfMicrotask;b.prototype={extractUrls:function(a,b){for(var c,d,e=[];c=this.regex.exec(a);)d=new URL(c[1],b),e.push({matched:c[0],url:d.href});return e},process:function(a,b,c){var d=this.extractUrls(a,b),e=c.bind(null,this.map);this.fetch(d,e)},fetch:function(a,b){var c=a.length;if(!c)return b();for(var d,e,f,g=function(){0===--c&&b()},h=0;c>h;h++)d=a[h],f=d.url,e=this.cache[f],e||(e=this.xhr(f),e.match=d,this.cache[f]=e),e.wait(g)},handleXhr:function(a){var b=a.match,c=b.url,d=a.response||a.responseText||"";this.map[c]=d,this.fetch(this.extractUrls(d,c),a.resolve)},xhr:function(a){this.requests++;var b=new XMLHttpRequest;return b.open("GET",a,!0),b.send(),b.onerror=b.onload=this.handleXhr.bind(this,b),b.pending=[],b.resolve=function(){for(var a=b.pending,c=0;c<a.length;c++)a[c]();b.pending=null},b.wait=function(a){b.pending?b.pending.push(a):c(a)},b}},a.Loader=b}(Polymer),function(a){function b(){this.loader=new d(this.regex)}var c=a.urlResolver,d=a.Loader;b.prototype={regex:/@import\s+(?:url)?["'\(]*([^'"\)]*)['"\)]*;/g,resolve:function(a,b,c){var d=function(d){c(this.flatten(a,b,d))}.bind(this);this.loader.process(a,b,d)},resolveNode:function(a,b,c){var d=a.textContent,e=function(b){a.textContent=b,c(a)};this.resolve(d,b,e)},flatten:function(a,b,d){for(var e,f,g,h=this.loader.extractUrls(a,b),i=0;i<h.length;i++)e=h[i],f=e.url,g=c.resolveCssText(d[f],f,!0),g=this.flatten(g,b,d),a=a.replace(e.matched,g);return a},loadStyles:function(a,b,c){function d(){f++,f===g&&c&&c()}for(var e,f=0,g=a.length,h=0;g>h&&(e=a[h]);h++)this.resolveNode(e,b,d)}};var e=new b;a.styleResolver=e}(Polymer),function(a){function b(a,b){return a&&b&&Object.getOwnPropertyNames(b).forEach(function(c){var d=Object.getOwnPropertyDescriptor(b,c);d&&(Object.defineProperty(a,c,d),"function"==typeof d.value&&(d.value.nom=c))}),a}function c(a){for(var b=a||{},c=1;c<arguments.length;c++){var e=arguments[c];try{for(var f in e)d(f,e,b)}catch(g){}}return b}function d(a,b,c){var d=e(b,a);Object.defineProperty(c,a,d)}function e(a,b){if(a){var c=Object.getOwnPropertyDescriptor(a,b);return c||e(Object.getPrototypeOf(a),b)}}a.extend=b,a.mixin=c,Platform.mixin=c}(Polymer),function(a){function b(a,b,d){return a?a.stop():a=new c(this),a.go(b,d),a}var c=function(a){this.context=a,this.boundComplete=this.complete.bind(this)};c.prototype={go:function(a,b){this.callback=a;var c;b?(c=setTimeout(this.boundComplete,b),this.handle=function(){clearTimeout(c)}):(c=requestAnimationFrame(this.boundComplete),this.handle=function(){cancelAnimationFrame(c)})},stop:function(){this.handle&&(this.handle(),this.handle=null)},complete:function(){this.handle&&(this.stop(),this.callback.call(this.context))}},a.job=b}(Polymer),function(a){function b(a,b,c){var d="string"==typeof a?document.createElement(a):a.cloneNode(!0);if(d.innerHTML=b,c)for(var e in c)d.setAttribute(e,c[e]);return d}var c={};HTMLElement.register=function(a,b){c[a]=b},HTMLElement.getPrototypeForTag=function(a){var b=a?c[a]:HTMLElement.prototype;return b||Object.getPrototypeOf(document.createElement(a))};var d=Event.prototype.stopPropagation;Event.prototype.stopPropagation=function(){this.cancelBubble=!0,d.apply(this,arguments)};var e=DOMTokenList.prototype.add,f=DOMTokenList.prototype.remove;DOMTokenList.prototype.add=function(){for(var a=0;a<arguments.length;a++)e.call(this,arguments[a])},DOMTokenList.prototype.remove=function(){for(var a=0;a<arguments.length;a++)f.call(this,arguments[a])},DOMTokenList.prototype.toggle=function(a,b){1==arguments.length&&(b=!this.contains(a)),b?this.add(a):this.remove(a)},DOMTokenList.prototype.switch=function(a,b){a&&this.remove(a),b&&this.add(b)};var g=function(){return Array.prototype.slice.call(this)},h=window.NamedNodeMap||window.MozNamedAttrMap||{};NodeList.prototype.array=g,h.prototype.array=g,HTMLCollection.prototype.array=g,a.createDOM=b}(Polymer),function(a){function b(a){var e=b.caller,g=e.nom,h=e._super;h||(g||(g=e.nom=c.call(this,e)),g||console.warn("called super() on a method not installed declaratively (has no .nom property)"),h=d(e,g,f(this)));var i=h[g];return i?(i._super||d(i,g,h),i.apply(this,a||[])):void 0}function c(a){for(var b=this.__proto__;b&&b!==HTMLElement.prototype;){for(var c,d=Object.getOwnPropertyNames(b),e=0,f=d.length;f>e&&(c=d[e]);e++){var g=Object.getOwnPropertyDescriptor(b,c);if("function"==typeof g.value&&g.value===a)return c}b=b.__proto__}}function d(a,b,c){var d=e(c,b,a);return d[b]&&(d[b].nom=b),a._super=d}function e(a,b,c){for(;a;){if(a[b]!==c&&a[b])return a;a=f(a)}return Object}function f(a){return a.__proto__}a.super=b}(Polymer),function(a){function b(a){return a}function c(a,b){var c=typeof b;return b instanceof Date&&(c="date"),d[c](a,b)}var d={string:b,undefined:b,date:function(a){return new Date(Date.parse(a)||Date.now())},"boolean":function(a){return""===a?!0:"false"===a?!1:!!a},number:function(a){var b=parseFloat(a);return 0===b&&(b=parseInt(a)),isNaN(b)?a:b},object:function(a,b){if(null===b)return a;try{return JSON.parse(a.replace(/'/g,'"'))}catch(c){return a}},"function":function(a,b){return b}};a.deserializeValue=c}(Polymer),function(a){var b=a.extend,c={};c.declaration={},c.instance={},c.publish=function(a,c){for(var d in a)b(c,a[d])},a.api=c}(Polymer),function(a){var b={async:function(a,b,c){Platform.flush(),b=b&&b.length?b:[b];var d=function(){(this[a]||a).apply(this,b)}.bind(this),e=c?setTimeout(d,c):requestAnimationFrame(d);return c?e:~e},cancelAsync:function(a){0>a?cancelAnimationFrame(~a):clearTimeout(a)},fire:function(a,b,c,d,e){var f=c||this,b=null===b||void 0===b?{}:b,g=new CustomEvent(a,{bubbles:void 0!==d?d:!0,cancelable:void 0!==e?e:!0,detail:b});return f.dispatchEvent(g),g},asyncFire:function(){this.async("fire",arguments)},classFollows:function(a,b,c){b&&b.classList.remove(c),a&&a.classList.add(c)},injectBoundHTML:function(a,b){var c=document.createElement("template");c.innerHTML=a;var d=this.instanceTemplate(c);return b&&(b.textContent="",b.appendChild(d)),d}},c=function(){},d={};b.asyncMethod=b.async,a.api.instance.utils=b,a.nop=c,a.nob=d}(Polymer),function(a){var b=window.logFlags||{},c="on-",d={EVENT_PREFIX:c,addHostListeners:function(){var a=this.eventDelegates;b.events&&Object.keys(a).length>0&&console.log("[%s] addHostListeners:",this.localName,a);for(var c in a){var d=a[c];PolymerGestures.addEventListener(this,c,this.element.getEventHandler(this,this,d))}},dispatchMethod:function(a,c,d){if(a){b.events&&console.group("[%s] dispatch [%s]",a.localName,c);var e="function"==typeof c?c:a[c];e&&e[d?"apply":"call"](a,d),b.events&&console.groupEnd(),Platform.flush()}}};a.api.instance.events=d,a.addEventListener=function(a,b,c,d){PolymerGestures.addEventListener(wrap(a),b,c,d)},a.removeEventListener=function(a,b,c,d){PolymerGestures.removeEventListener(wrap(a),b,c,d)}}(Polymer),function(a){var b={copyInstanceAttributes:function(){var a=this._instanceAttributes;for(var b in a)this.hasAttribute(b)||this.setAttribute(b,a[b])},takeAttributes:function(){if(this._publishLC)for(var a,b=0,c=this.attributes,d=c.length;(a=c[b])&&d>b;b++)this.attributeToProperty(a.name,a.value)},attributeToProperty:function(b,c){var b=this.propertyForAttribute(b);if(b){if(c&&c.search(a.bindPattern)>=0)return;var d=this[b],c=this.deserializeValue(c,d);c!==d&&(this[b]=c)}},propertyForAttribute:function(a){var b=this._publishLC&&this._publishLC[a];return b},deserializeValue:function(b,c){return a.deserializeValue(b,c)},serializeValue:function(a,b){return"boolean"===b?a?"":void 0:"object"!==b&&"function"!==b&&void 0!==a?a:void 0},reflectPropertyToAttribute:function(a){var b=typeof this[a],c=this.serializeValue(this[a],b);void 0!==c?this.setAttribute(a,c):"boolean"===b&&this.removeAttribute(a)}};a.api.instance.attributes=b}(Polymer),function(a){function b(a,b){return a===b?0!==a||1/a===1/b:f(a)&&f(b)?!0:a!==a&&b!==b}function c(a,b){return void 0===b&&null===a?b:null===b||void 0===b?a:b}var d=window.logFlags||{},e={object:void 0,type:"update",name:void 0,oldValue:void 0},f=Number.isNaN||function(a){return"number"==typeof a&&isNaN(a)},g={createPropertyObserver:function(){var a=this._observeNames;if(a&&a.length){var b=this._propertyObserver=new CompoundObserver(!0);this.registerObserver(b);for(var c,d=0,e=a.length;e>d&&(c=a[d]);d++)b.addPath(this,c),this.observeArrayValue(c,this[c],null)}},openPropertyObserver:function(){this._propertyObserver&&this._propertyObserver.open(this.notifyPropertyChanges,this)},notifyPropertyChanges:function(a,b,c){var d,e,f={};for(var g in b)if(d=c[2*g+1],e=this.observe[d]){var h=b[g],i=a[g];this.observeArrayValue(d,i,h),f[e]||(void 0!==h&&null!==h||void 0!==i&&null!==i)&&(f[e]=!0,this.invokeMethod(e,[h,i,arguments]))}},deliverChanges:function(){this._propertyObserver&&this._propertyObserver.deliver()},propertyChanged_:function(a){this.reflect[a]&&this.reflectPropertyToAttribute(a)},observeArrayValue:function(a,b,c){var e=this.observe[a];if(e&&(Array.isArray(c)&&(d.observe&&console.log("[%s] observeArrayValue: unregister observer [%s]",this.localName,a),this.closeNamedObserver(a+"__array")),Array.isArray(b))){d.observe&&console.log("[%s] observeArrayValue: register observer [%s]",this.localName,a,b);var f=new ArrayObserver(b);f.open(function(a){this.invokeMethod(e,[a])},this),this.registerNamedObserver(a+"__array",f)}},emitPropertyChangeRecord:function(a,c,d){if(!b(c,d)&&(this.propertyChanged_(a,c,d),Observer.hasObjectObserve)){var f=this.notifier_;f||(f=this.notifier_=Object.getNotifier(this)),e.object=this,e.name=a,e.oldValue=d,f.notify(e)}},bindToAccessor:function(a,c,d){function e(b,c){j[f]=b;var d=j[h];d&&"function"==typeof d.setValue&&d.setValue(b),j.emitPropertyChangeRecord(a,b,c)}var f=a+"_",g=a+"Observable_",h=a+"ComputedBoundObservable_";this[g]=c;var i=this[f],j=this,k=c.open(e);if(d&&!b(i,k)){var l=d(i,k);b(k,l)||(k=l,c.setValue&&c.setValue(k))}e(k,i);var m={close:function(){c.close(),j[g]=void 0,j[h]=void 0}};return this.registerObserver(m),m},createComputedProperties:function(){if(this._computedNames)for(var a=0;a<this._computedNames.length;a++){var b=this._computedNames[a],c=this.computed[b];try{var d=PolymerExpressions.getExpression(c),e=d.getBinding(this,this.element.syntax);this.bindToAccessor(b,e)}catch(f){console.error("Failed to create computed property",f)}}},bindProperty:function(a,b,d){if(d)return void(this[a]=b);var e=this.element.prototype.computed;if(e&&e[a]){var f=a+"ComputedBoundObservable_";return void(this[f]=b)}return this.bindToAccessor(a,b,c)},invokeMethod:function(a,b){var c=this[a]||a;"function"==typeof c&&c.apply(this,b)},registerObserver:function(a){return this._observers?void this._observers.push(a):void(this._observers=[a])},closeObservers:function(){if(this._observers){for(var a=this._observers,b=0;b<a.length;b++){var c=a[b];c&&"function"==typeof c.close&&c.close()}this._observers=[]}},registerNamedObserver:function(a,b){var c=this._namedObservers||(this._namedObservers={});c[a]=b},closeNamedObserver:function(a){var b=this._namedObservers;return b&&b[a]?(b[a].close(),b[a]=null,!0):void 0},closeNamedObservers:function(){if(this._namedObservers){for(var a in this._namedObservers)this.closeNamedObserver(a);this._namedObservers={}}}};a.api.instance.properties=g}(Polymer),function(a){var b=window.logFlags||0,c={instanceTemplate:function(a){HTMLTemplateElement.decorate(a);for(var b=this.syntax||!a.bindingDelegate&&this.element.syntax,c=a.createInstance(this,b),d=c.bindings_,e=0;e<d.length;e++)this.registerObserver(d[e]);return c},bind:function(a,b,c){var d=this.propertyForAttribute(a);if(d){var e=this.bindProperty(d,b,c);return Platform.enableBindingsReflection&&e&&(e.path=b.path_,this._recordBinding(d,e)),this.reflect[d]&&this.reflectPropertyToAttribute(d),e}return this.mixinSuper(arguments)},bindFinished:function(){this.makeElementReady()},_recordBinding:function(a,b){this.bindings_=this.bindings_||{},this.bindings_[a]=b},asyncUnbindAll:function(){this._unbound||(b.unbind&&console.log("[%s] asyncUnbindAll",this.localName),this._unbindAllJob=this.job(this._unbindAllJob,this.unbindAll,0))},unbindAll:function(){this._unbound||(this.closeObservers(),this.closeNamedObservers(),this._unbound=!0)},cancelUnbindAll:function(){return this._unbound?void(b.unbind&&console.warn("[%s] already unbound, cannot cancel unbindAll",this.localName)):(b.unbind&&console.log("[%s] cancelUnbindAll",this.localName),void(this._unbindAllJob&&(this._unbindAllJob=this._unbindAllJob.stop())))}},d=/\{\{([^{}]*)}}/;a.bindPattern=d,a.api.instance.mdv=c}(Polymer),function(a){function b(a){return a.hasOwnProperty("PolymerBase")}function c(){}var d={PolymerBase:!0,job:function(a,b,c){if("string"!=typeof a)return Polymer.job.call(this,a,b,c);var d="___"+a;this[d]=Polymer.job.call(this,this[d],b,c)},"super":Polymer.super,created:function(){},ready:function(){},createdCallback:function(){this.templateInstance&&this.templateInstance.model&&console.warn("Attributes on "+this.localName+" were data bound prior to Polymer upgrading the element. This may result in incorrect binding types."),this.created(),this.prepareElement(),this.ownerDocument.isStagingDocument||this.makeElementReady()},prepareElement:function(){return this._elementPrepared?void console.warn("Element already prepared",this.localName):(this._elementPrepared=!0,this.shadowRoots={},this.createPropertyObserver(),this.openPropertyObserver(),this.copyInstanceAttributes(),this.takeAttributes(),void this.addHostListeners())},makeElementReady:function(){this._readied||(this._readied=!0,this.createComputedProperties(),this.parseDeclarations(this.__proto__),this.removeAttribute("unresolved"),this.ready())},attachedCallback:function(){this.cancelUnbindAll(),this.attached&&this.attached(),this.enteredView&&this.enteredView(),this.hasBeenAttached||(this.hasBeenAttached=!0,this.domReady&&this.async("domReady"))},detachedCallback:function(){this.preventDispose||this.asyncUnbindAll(),this.detached&&this.detached(),this.leftView&&this.leftView()},enteredViewCallback:function(){this.attachedCallback()},leftViewCallback:function(){this.detachedCallback()},enteredDocumentCallback:function(){this.attachedCallback()},leftDocumentCallback:function(){this.detachedCallback()},parseDeclarations:function(a){a&&a.element&&(this.parseDeclarations(a.__proto__),a.parseDeclaration.call(this,a.element))},parseDeclaration:function(a){var b=this.fetchTemplate(a);if(b){var c=this.shadowFromTemplate(b);this.shadowRoots[a.name]=c}},fetchTemplate:function(a){return a.querySelector("template")},shadowFromTemplate:function(a){if(a){var b=this.createShadowRoot(),c=this.instanceTemplate(a);return b.appendChild(c),this.shadowRootReady(b,a),b}},lightFromTemplate:function(a,b){if(a){this.eventController=this;var c=this.instanceTemplate(a);return b?this.insertBefore(c,b):this.appendChild(c),this.shadowRootReady(this),c}},shadowRootReady:function(a){this.marshalNodeReferences(a)},marshalNodeReferences:function(a){var b=this.$=this.$||{};if(a)for(var c,d=a.querySelectorAll("[id]"),e=0,f=d.length;f>e&&(c=d[e]);e++)b[c.id]=c},attributeChangedCallback:function(a){"class"!==a&&"style"!==a&&this.attributeToProperty(a,this.getAttribute(a)),this.attributeChanged&&this.attributeChanged.apply(this,arguments)},onMutation:function(a,b){var c=new MutationObserver(function(a){b.call(this,c,a),c.disconnect()}.bind(this));c.observe(a,{childList:!0,subtree:!0})}};c.prototype=d,d.constructor=c,a.Base=c,a.isBase=b,a.api.instance.base=d}(Polymer),function(a){function b(a){return a.__proto__}function c(a,b){var c="",d=!1;b&&(c=b.localName,d=b.hasAttribute("is"));var e=Platform.ShadowCSS.makeScopeSelector(c,d);return Platform.ShadowCSS.shimCssText(a,e)}var d=(window.logFlags||{},window.ShadowDOMPolyfill),e="element",f="controller",g={STYLE_SCOPE_ATTRIBUTE:e,installControllerStyles:function(){var a=this.findStyleScope();if(a&&!this.scopeHasNamedStyle(a,this.localName)){for(var c=b(this),d="";c&&c.element;)d+=c.element.cssTextForScope(f),c=b(c);d&&this.installScopeCssText(d,a)}},installScopeStyle:function(a,b,c){var c=c||this.findStyleScope(),b=b||"";if(c&&!this.scopeHasNamedStyle(c,this.localName+b)){var d="";if(a instanceof Array)for(var e,f=0,g=a.length;g>f&&(e=a[f]);f++)d+=e.textContent+"\n\n";else d=a.textContent;this.installScopeCssText(d,c,b)}},installScopeCssText:function(a,b,e){if(b=b||this.findStyleScope(),e=e||"",b){d&&(a=c(a,b.host));var g=this.element.cssTextToScopeStyle(a,f);Polymer.applyStyleToScope(g,b),this.styleCacheForScope(b)[this.localName+e]=!0}},findStyleScope:function(a){for(var b=a||this;b.parentNode;)b=b.parentNode;return b},scopeHasNamedStyle:function(a,b){var c=this.styleCacheForScope(a);return c[b]},styleCacheForScope:function(a){if(d){var b=a.host?a.host.localName:a.localName;
return h[b]||(h[b]={})}return a._scopeStyles=a._scopeStyles||{}}},h={};a.api.instance.styles=g}(Polymer),function(a){function b(a,b){if("string"!=typeof a){var c=b||document._currentScript;if(b=a,a=c&&c.parentNode&&c.parentNode.getAttribute?c.parentNode.getAttribute("name"):"",!a)throw"Element name could not be inferred."}if(f[a])throw"Already registered (Polymer) prototype for element "+a;e(a,b),d(a)}function c(a,b){h[a]=b}function d(a){h[a]&&(h[a].registerWhenReady(),delete h[a])}function e(a,b){return i[a]=b||{}}function f(a){return i[a]}var g=a.extend,h=(a.api,{}),i={};a.getRegisteredPrototype=f,a.waitingForPrototype=c,window.Polymer=b,g(Polymer,a),Platform.consumeDeclarations&&Platform.consumeDeclarations(function(a){if(a)for(var c,d=0,e=a.length;e>d&&(c=a[d]);d++)b.apply(null,c)})}(Polymer),function(a){var b={resolveElementPaths:function(a){Polymer.urlResolver.resolveDom(a)},addResolvePathApi:function(){var a=this.getAttribute("assetpath")||"",b=new URL(a,this.ownerDocument.baseURI);this.prototype.resolvePath=function(a,c){var d=new URL(a,c||b);return d.href}}};a.api.declaration.path=b}(Polymer),function(a){function b(a,b){var c=new URL(a.getAttribute("href"),b).href;return"@import '"+c+"';"}function c(a,b){if(a){b===document&&(b=document.head),i&&(b=document.head);var c=d(a.textContent),e=a.getAttribute(h);e&&c.setAttribute(h,e);var f=b.firstElementChild;if(b===document.head){var g="style["+h+"]",j=document.head.querySelectorAll(g);j.length&&(f=j[j.length-1].nextElementSibling)}b.insertBefore(c,f)}}function d(a,b){b=b||document,b=b.createElement?b:b.ownerDocument;var c=b.createElement("style");return c.textContent=a,c}function e(a){return a&&a.__resource||""}function f(a,b){return q?q.call(a,b):void 0}var g=(window.logFlags||{},a.api.instance.styles),h=g.STYLE_SCOPE_ATTRIBUTE,i=window.ShadowDOMPolyfill,j="style",k="@import",l="link[rel=stylesheet]",m="global",n="polymer-scope",o={loadStyles:function(a){var b=this.fetchTemplate(),c=b&&this.templateContent();if(c){this.convertSheetsToStyles(c);var d=this.findLoadableStyles(c);if(d.length){var e=b.ownerDocument.baseURI;return Polymer.styleResolver.loadStyles(d,e,a)}}a&&a()},convertSheetsToStyles:function(a){for(var c,e,f=a.querySelectorAll(l),g=0,h=f.length;h>g&&(c=f[g]);g++)e=d(b(c,this.ownerDocument.baseURI),this.ownerDocument),this.copySheetAttributes(e,c),c.parentNode.replaceChild(e,c)},copySheetAttributes:function(a,b){for(var c,d=0,e=b.attributes,f=e.length;(c=e[d])&&f>d;d++)"rel"!==c.name&&"href"!==c.name&&a.setAttribute(c.name,c.value)},findLoadableStyles:function(a){var b=[];if(a)for(var c,d=a.querySelectorAll(j),e=0,f=d.length;f>e&&(c=d[e]);e++)c.textContent.match(k)&&b.push(c);return b},installSheets:function(){this.cacheSheets(),this.cacheStyles(),this.installLocalSheets(),this.installGlobalStyles()},cacheSheets:function(){this.sheets=this.findNodes(l),this.sheets.forEach(function(a){a.parentNode&&a.parentNode.removeChild(a)})},cacheStyles:function(){this.styles=this.findNodes(j+"["+n+"]"),this.styles.forEach(function(a){a.parentNode&&a.parentNode.removeChild(a)})},installLocalSheets:function(){var a=this.sheets.filter(function(a){return!a.hasAttribute(n)}),b=this.templateContent();if(b){var c="";if(a.forEach(function(a){c+=e(a)+"\n"}),c){var f=d(c,this.ownerDocument);b.insertBefore(f,b.firstChild)}}},findNodes:function(a,b){var c=this.querySelectorAll(a).array(),d=this.templateContent();if(d){var e=d.querySelectorAll(a).array();c=c.concat(e)}return b?c.filter(b):c},installGlobalStyles:function(){var a=this.styleForScope(m);c(a,document.head)},cssTextForScope:function(a){var b="",c="["+n+"="+a+"]",d=function(a){return f(a,c)},g=this.sheets.filter(d);g.forEach(function(a){b+=e(a)+"\n\n"});var h=this.styles.filter(d);return h.forEach(function(a){b+=a.textContent+"\n\n"}),b},styleForScope:function(a){var b=this.cssTextForScope(a);return this.cssTextToScopeStyle(b,a)},cssTextToScopeStyle:function(a,b){if(a){var c=d(a);return c.setAttribute(h,this.getAttribute("name")+"-"+b),c}}},p=HTMLElement.prototype,q=p.matches||p.matchesSelector||p.webkitMatchesSelector||p.mozMatchesSelector;a.api.declaration.styles=o,a.applyStyleToScope=c}(Polymer),function(a){var b=(window.logFlags||{},a.api.instance.events),c=b.EVENT_PREFIX,d={};["webkitAnimationStart","webkitAnimationEnd","webkitTransitionEnd","DOMFocusOut","DOMFocusIn","DOMMouseScroll"].forEach(function(a){d[a.toLowerCase()]=a});var e={parseHostEvents:function(){var a=this.prototype.eventDelegates;this.addAttributeDelegates(a)},addAttributeDelegates:function(a){for(var b,c=0;b=this.attributes[c];c++)this.hasEventPrefix(b.name)&&(a[this.removeEventPrefix(b.name)]=b.value.replace("{{","").replace("}}","").trim())},hasEventPrefix:function(a){return a&&"o"===a[0]&&"n"===a[1]&&"-"===a[2]},removeEventPrefix:function(a){return a.slice(f)},findController:function(a){for(;a.parentNode;){if(a.eventController)return a.eventController;a=a.parentNode}return a.host},getEventHandler:function(a,b,c){var d=this;return function(e){a&&a.PolymerBase||(a=d.findController(b));var f=[e,e.detail,e.currentTarget];a.dispatchMethod(a,c,f)}},prepareEventBinding:function(a,b){if(this.hasEventPrefix(b)){var c=this.removeEventPrefix(b);c=d[c]||c;var e=this;return function(b,d,f){function g(){return"{{ "+a+" }}"}var h=e.getEventHandler(void 0,d,a);return PolymerGestures.addEventListener(d,c,h),f?void 0:{open:g,discardChanges:g,close:function(){PolymerGestures.removeEventListener(d,c,h)}}}}}},f=c.length;a.api.declaration.events=e}(Polymer),function(a){var b={inferObservers:function(a){var b,c=a.observe;for(var d in a)"Changed"===d.slice(-7)&&(c||(c=a.observe={}),b=d.slice(0,-7),c[b]=c[b]||d)},explodeObservers:function(a){var b=a.observe;if(b){var c={};for(var d in b)for(var e,f=d.split(" "),g=0;e=f[g];g++)c[e]=b[d];a.observe=c}},optimizePropertyMaps:function(a){if(a.observe){var b=a._observeNames=[];for(var c in a.observe)for(var d,e=c.split(" "),f=0;d=e[f];f++)b.push(d)}if(a.publish){var b=a._publishNames=[];for(var c in a.publish)b.push(c)}if(a.computed){var b=a._computedNames=[];for(var c in a.computed)b.push(c)}},publishProperties:function(a,b){var c=a.publish;c&&(this.requireProperties(c,a,b),a._publishLC=this.lowerCaseMap(c))},requireProperties:function(a,b){b.reflect=b.reflect||{};for(var c in a){var d=a[c];d&&void 0!==d.reflect&&(b.reflect[c]=Boolean(d.reflect),d=d.value),void 0!==d&&(b[c]=d)}},lowerCaseMap:function(a){var b={};for(var c in a)b[c.toLowerCase()]=c;return b},createPropertyAccessor:function(a,b){var c=this.prototype,d=a+"_",e=a+"Observable_";c[d]=c[a],Object.defineProperty(c,a,{get:function(){var a=this[e];return a&&a.deliver(),this[d]},set:function(c){if(b)return this[d];var f=this[e];if(f)return void f.setValue(c);var g=this[d];return this[d]=c,this.emitPropertyChangeRecord(a,c,g),c},configurable:!0})},createPropertyAccessors:function(a){var b=a._computedNames;if(b&&b.length)for(var c,d=0,e=b.length;e>d&&(c=b[d]);d++)this.createPropertyAccessor(c,!0);var b=a._publishNames;if(b&&b.length)for(var c,d=0,e=b.length;e>d&&(c=b[d]);d++)a.computed&&a.computed[c]||this.createPropertyAccessor(c)}};a.api.declaration.properties=b}(Polymer),function(a){var b="attributes",c=/\s|,/,d={inheritAttributesObjects:function(a){this.inheritObject(a,"publishLC"),this.inheritObject(a,"_instanceAttributes")},publishAttributes:function(a){var d=this.getAttribute(b);if(d)for(var e,f=a.publish||(a.publish={}),g=d.split(c),h=0,i=g.length;i>h;h++)e=g[h].trim(),e&&void 0===f[e]&&(f[e]=void 0)},accumulateInstanceAttributes:function(){for(var a,b=this.prototype._instanceAttributes,c=this.attributes,d=0,e=c.length;e>d&&(a=c[d]);d++)this.isInstanceAttribute(a.name)&&(b[a.name]=a.value)},isInstanceAttribute:function(a){return!this.blackList[a]&&"on-"!==a.slice(0,3)},blackList:{name:1,"extends":1,constructor:1,noscript:1,assetpath:1,"cache-csstext":1}};d.blackList[b]=1,a.api.declaration.attributes=d}(Polymer),function(a){var b=a.api.declaration.events,c=new PolymerExpressions,d=c.prepareBinding;c.prepareBinding=function(a,e,f){return b.prepareEventBinding(a,e,f)||d.call(c,a,e,f)};var e={syntax:c,fetchTemplate:function(){return this.querySelector("template")},templateContent:function(){var a=this.fetchTemplate();return a&&a.content},installBindingDelegate:function(a){a&&(a.bindingDelegate=this.syntax)}};a.api.declaration.mdv=e}(Polymer),function(a){function b(a){if(!Object.__proto__){var b=Object.getPrototypeOf(a);a.__proto__=b,d(b)&&(b.__proto__=Object.getPrototypeOf(b))}}var c=a.api,d=a.isBase,e=a.extend,f=window.ShadowDOMPolyfill,g={register:function(a,b){this.buildPrototype(a,b),this.registerPrototype(a,b),this.publishConstructor()},buildPrototype:function(b,c){var d=a.getRegisteredPrototype(b),e=this.generateBasePrototype(c);this.desugarBeforeChaining(d,e),this.prototype=this.chainPrototypes(d,e),this.desugarAfterChaining(b,c)},desugarBeforeChaining:function(a,b){a.element=this,this.publishAttributes(a,b),this.publishProperties(a,b),this.inferObservers(a),this.explodeObservers(a)},chainPrototypes:function(a,c){this.inheritMetaData(a,c);var d=this.chainObject(a,c);return b(d),d},inheritMetaData:function(a,b){this.inheritObject("observe",a,b),this.inheritObject("publish",a,b),this.inheritObject("reflect",a,b),this.inheritObject("_publishLC",a,b),this.inheritObject("_instanceAttributes",a,b),this.inheritObject("eventDelegates",a,b)},desugarAfterChaining:function(a,b){this.optimizePropertyMaps(this.prototype),this.createPropertyAccessors(this.prototype),this.installBindingDelegate(this.fetchTemplate()),this.installSheets(),this.resolveElementPaths(this),this.accumulateInstanceAttributes(),this.parseHostEvents(),this.addResolvePathApi(),f&&Platform.ShadowCSS.shimStyling(this.templateContent(),a,b),this.prototype.registerCallback&&this.prototype.registerCallback(this)},publishConstructor:function(){var a=this.getAttribute("constructor");a&&(window[a]=this.ctor)},generateBasePrototype:function(a){var b=this.findBasePrototype(a);if(!b){var b=HTMLElement.getPrototypeForTag(a);b=this.ensureBaseApi(b),h[a]=b}return b},findBasePrototype:function(a){return h[a]},ensureBaseApi:function(a){if(a.PolymerBase)return a;var b=Object.create(a);return c.publish(c.instance,b),this.mixinMethod(b,a,c.instance.mdv,"bind"),b},mixinMethod:function(a,b,c,d){var e=function(a){return b[d].apply(this,a)};a[d]=function(){return this.mixinSuper=e,c[d].apply(this,arguments)}},inheritObject:function(a,b,c){var d=b[a]||{};b[a]=this.chainObject(d,c[a])},registerPrototype:function(a,b){var c={prototype:this.prototype},d=this.findTypeExtension(b);d&&(c.extends=d),HTMLElement.register(a,this.prototype),this.ctor=document.registerElement(a,c)},findTypeExtension:function(a){if(a&&a.indexOf("-")<0)return a;var b=this.findBasePrototype(a);return b.element?this.findTypeExtension(b.element.extends):void 0}},h={};g.chainObject=Object.__proto__?function(a,b){return a&&b&&a!==b&&(a.__proto__=b),a}:function(a,b){if(a&&b&&a!==b){var c=Object.create(b);a=e(c,a)}return a},c.declaration.prototype=g}(Polymer),function(a){function b(a){return document.contains(a)?i:h}function c(){return h.length?h[0]:i[0]}function d(a){e.waitToReady=!0,HTMLImports.whenImportsReady(function(){e.addReadyCallback(a),e.waitToReady=!1,e.check()})}var e={wait:function(a){a.__queue||(a.__queue={},f.push(a))},enqueue:function(a,c,d){var e=a.__queue&&!a.__queue.check;return e&&(b(a).push(a),a.__queue.check=c,a.__queue.go=d),0!==this.indexOf(a)},indexOf:function(a){var c=b(a).indexOf(a);return c>=0&&document.contains(a)&&(c+=HTMLImports.useNative||HTMLImports.ready?h.length:1e9),c},go:function(a){var b=this.remove(a);b&&(a.__queue.flushable=!0,this.addToFlushQueue(b),this.check())},remove:function(a){var c=this.indexOf(a);if(0===c)return b(a).shift()},check:function(){var a=this.nextElement();return a&&a.__queue.check.call(a),this.canReady()?(this.ready(),!0):void 0},nextElement:function(){return c()},canReady:function(){return!this.waitToReady&&this.isEmpty()},isEmpty:function(){for(var a,b=0,c=f.length;c>b&&(a=f[b]);b++)if(a.__queue&&!a.__queue.flushable)return;return!0},addToFlushQueue:function(a){g.push(a)},flush:function(){if(!this.flushing){this.flushing=!0;for(var a;g.length;)a=g.shift(),a.__queue.go.call(a),a.__queue=null;this.flushing=!1}},ready:function(){var a=CustomElements.ready;CustomElements.ready=!1,this.flush(),CustomElements.useNative||CustomElements.upgradeDocumentTree(document),CustomElements.ready=a,Platform.flush(),requestAnimationFrame(this.flushReadyCallbacks)},addReadyCallback:function(a){a&&j.push(a)},flushReadyCallbacks:function(){if(j)for(var a;j.length;)(a=j.shift())()},waitToReady:!0},f=[],g=[],h=[],i=[],j=[];a.elements=f,a.queue=e,a.whenReady=a.whenPolymerReady=d}(Polymer),function(a){function b(a){return Boolean(HTMLElement.getPrototypeForTag(a))}function c(a){return a&&a.indexOf("-")>=0}var d=a.extend,e=a.api,f=a.queue,g=a.whenReady,h=a.getRegisteredPrototype,i=a.waitingForPrototype,j=d(Object.create(HTMLElement.prototype),{createdCallback:function(){this.getAttribute("name")&&this.init()},init:function(){this.name=this.getAttribute("name"),this.extends=this.getAttribute("extends"),f.wait(this),this.loadResources(),this.registerWhenReady()},registerWhenReady:function(){this.registered||this.waitingForPrototype(this.name)||this.waitingForQueue()||this.waitingForResources()||f.go(this)},_register:function(){c(this.extends)&&!b(this.extends)&&console.warn("%s is attempting to extend %s, an unregistered element or one that was not registered with Polymer.",this.name,this.extends),this.register(this.name,this.extends),this.registered=!0},waitingForPrototype:function(a){return h(a)?void 0:(i(a,this),this.handleNoScript(a),!0)},handleNoScript:function(a){this.hasAttribute("noscript")&&!this.noscript&&(this.noscript=!0,Polymer(a))},waitingForResources:function(){return this._needsResources},waitingForQueue:function(){return f.enqueue(this,this.registerWhenReady,this._register)},loadResources:function(){this._needsResources=!0,this.loadStyles(function(){this._needsResources=!1,this.registerWhenReady()}.bind(this))}});e.publish(e.declaration,j),g(function(){document.body.removeAttribute("unresolved"),document.dispatchEvent(new CustomEvent("polymer-ready",{bubbles:!0}))}),document.registerElement("polymer-element",{prototype:j})}(Polymer),function(a){function b(a,b){a?(document.head.appendChild(a),d(b)):b&&b()}function c(a,c){if(a&&a.length){for(var d,e,f=document.createDocumentFragment(),g=0,h=a.length;h>g&&(d=a[g]);g++)e=document.createElement("link"),e.rel="import",e.href=d,f.appendChild(e);b(f,c)}else c&&c()}var d=a.whenPolymerReady;a.import=c,a.importElements=b}(Polymer),function(){var a=document.createElement("polymer-element");a.setAttribute("name","auto-binding"),a.setAttribute("extends","template"),a.init(),Polymer("auto-binding",{createdCallback:function(){this.syntax=this.bindingDelegate=this.makeSyntax(),Polymer.whenPolymerReady(function(){this.model=this,this.setAttribute("bind",""),this.async(function(){this.marshalNodeReferences(this.parentNode),this.fire("template-bound")})}.bind(this))},makeSyntax:function(){var a=Object.create(Polymer.api.declaration.events),b=this;a.findController=function(){return b.model};var c=new PolymerExpressions,d=c.prepareBinding;return c.prepareBinding=function(b,e,f){return a.prepareEventBinding(b,e,f)||d.call(c,b,e,f)},c}})}();
//# sourceMappingURL=polymer.js.map;


  (function() {
    
    var SKIP_ID = 'meta';
    var metaData = {}, metaArray = {};

    Polymer('core-meta', {
      
      /**
       * The type of meta-data.  All meta-data with the same type with be
       * stored together.
       * 
       * @attribute type
       * @type string
       * @default 'default'
       */
      type: 'default',
      
      alwaysPrepare: true,
      
      ready: function() {
        this.register(this.id);
      },
      
      get metaArray() {
        var t = this.type;
        if (!metaArray[t]) {
          metaArray[t] = [];
        }
        return metaArray[t];
      },
      
      get metaData() {
        var t = this.type;
        if (!metaData[t]) {
          metaData[t] = {};
        }
        return metaData[t];
      },
      
      register: function(id, old) {
        if (id && id !== SKIP_ID) {
          this.unregister(this, old);
          this.metaData[id] = this;
          this.metaArray.push(this);
        }
      },
      
      unregister: function(meta, id) {
        delete this.metaData[id || meta.id];
        var i = this.metaArray.indexOf(meta);
        if (i >= 0) {
          this.metaArray.splice(i, 1);
        }
      },
      
      /**
       * Returns a list of all meta-data elements with the same type.
       * 
       * @property list
       * @type array
       * @default []
       */
      get list() {
        return this.metaArray;
      },
      
      /**
       * Retrieves meta-data by ID.
       *
       * @method byId
       * @param {String} id The ID of the meta-data to be returned.
       * @returns Returns meta-data.
       */
      byId: function(id) {
        return this.metaData[id];
      }
      
    });
    
  })();
  
;

    Polymer('core-transition', {
      
      type: 'transition',

      /**
       * Run the animation.
       *
       * @method go
       * @param {Node} node The node to apply the animation on
       * @param {Object} state State info
       */
      go: function(node, state) {
        this.complete(node);
      },

      /**
       * Set up the animation. This may include injecting a stylesheet,
       * applying styles, creating a web animations object, etc.. This
       *
       * @method setup
       * @param {Node} node The animated node
       */
      setup: function(node) {
      },

      /**
       * Tear down the animation.
       *
       * @method teardown
       * @param {Node} node The animated node
       */
      teardown: function(node) {
      },

      /**
       * Called when the animation completes. This function also fires the
       * `core-transitionend` event.
       *
       * @method complete
       * @param {Node} node The animated node
       */
      complete: function(node) {
        this.fire('core-transitionend', null, node);
      },

      /**
       * Utility function to listen to an event on a node once.
       *
       * @method listenOnce
       * @param {Node} node The animated node
       * @param {string} event Name of an event
       * @param {Function} fn Event handler
       * @param {Array} args Additional arguments to pass to `fn`
       */
      listenOnce: function(node, event, fn, args) {
        var self = this;
        var listener = function() {
          fn.apply(self, args);
          node.removeEventListener(event, listener, false);
        }
        node.addEventListener(event, listener, false);
      }

    });
  ;

    Polymer('core-key-helper', {
      ENTER_KEY: 13,
      ESCAPE_KEY: 27
    });
  ;

(function() {

  Polymer('core-overlay-layer', {
    publish: {
      opened: false
    },
    openedChanged: function() {
      this.classList.toggle('core-opened', this.opened);
    },
    /**
     * Adds an element to the overlay layer
     */
    addElement: function(element) {
      if (!this.parentNode) {
        document.querySelector('body').appendChild(this);
      }
      if (element.parentNode !== this) {
        element.__contents = [];
        var ip$ = element.querySelectorAll('content');
        for (var i=0, l=ip$.length, n; (i<l) && (n = ip$[i]); i++) {
          this.moveInsertedElements(n);
          this.cacheDomLocation(n);
          n.parentNode.removeChild(n);
          element.__contents.push(n);
        }
        this.cacheDomLocation(element);
        this.updateEventController(element);
        var h = this.makeHost();
        h.shadowRoot.appendChild(element);
        element.__host = h;
      }
    },
    makeHost: function() {
      var h = document.createElement('overlay-host');
      h.createShadowRoot();
      this.appendChild(h);
      return h;
    },
    moveInsertedElements: function(insertionPoint) {
      var n$ = insertionPoint.getDistributedNodes();
      var parent = insertionPoint.parentNode;
      insertionPoint.__contents = [];
      for (var i=0, l=n$.length, n; (i<l) && (n=n$[i]); i++) {
        this.cacheDomLocation(n);
        this.updateEventController(n);
        insertionPoint.__contents.push(n);
        parent.appendChild(n);  
      }
    },
    updateEventController: function(element) {
      element.eventController = this.element.findController(element);
    },
    /**
     * Removes an element from the overlay layer
     */
    removeElement: function(element) {
      element.eventController = null;
      this.replaceElement(element);
      var h = element.__host;
      if (h) {
        h.parentNode.removeChild(h);
      }
    },
    replaceElement: function(element) {
      if (element.__contents) {
        for (var i=0, c$=element.__contents, c; (c=c$[i]); i++) {
          this.replaceElement(c);
        }
        element.__contents = null;
      }
      if (element.__parentNode) {
        var n = element.__nextElementSibling && element.__nextElementSibling 
            === element.__parentNode ? element.__nextElementSibling : null;
        element.__parentNode.insertBefore(element, n);
      }
    },
    cacheDomLocation: function(element) {
      element.__nextElementSibling = element.nextElementSibling;
      element.__parentNode = element.parentNode;
    }
  });
  
})();
;

(function() {

  Polymer('core-overlay', {

    publish: {
      /**
       * The target element that will be shown when the overlay is 
       * opened. If unspecified, the core-overlay itself is the target.
       *
       * @attribute target
       * @type Object
       * @default the overlay element
       */
      target: null,


      /**
       * A `core-overlay`'s size is guaranteed to be 
       * constrained to the window size. To achieve this, the sizingElement
       * is sized with a max-height/width. By default this element is the 
       * target element, but it can be specifically set to a specific element
       * inside the target if that is more appropriate. This is useful, for 
       * example, when a region inside the overlay should scroll if needed.
       *
       * @attribute sizingTarget
       * @type Object
       * @default the target element
       */
      sizingTarget: null,
    
      /**
       * Set opened to true to show an overlay and to false to hide it.
       * A `core-overlay` may be made initially opened by setting its
       * `opened` attribute.
       * @attribute opened
       * @type boolean
       * @default false
       */
      opened: false,

      /**
       * If true, the overlay has a backdrop darkening the rest of the screen.
       * The backdrop element is attached to the document body and may be styled
       * with the class `core-overlay-backdrop`. When opened the `core-opened`
       * class is applied.
       *
       * @attribute backdrop
       * @type boolean
       * @default false
       */    
      backdrop: false,

      /**
       * If true, the overlay is guaranteed to display above page content.
       *
       * @attribute layered
       * @type boolean
       * @default false
      */
      layered: false,
    
      /**
       * By default an overlay will close automatically if the user
       * taps outside it or presses the escape key. Disable this
       * behavior by setting the `autoCloseDisabled` property to true.
       * @attribute autoCloseDisabled
       * @type boolean
       * @default false
       */
      autoCloseDisabled: false,

      /**
       * By default an overlay will focus its target or an element inside
       * it with the `autoFocus` attribute. Disable this
       * behavior by setting the `autoFocusDisabled` property to true.
       * @attribute autoFocusDisabled
       * @type boolean
       * @default false
       */
      autoFocusDisabled: false,

      /**
       * This property specifies an attribute on elements that should
       * close the overlay on tap. Should not set `closeSelector` if this
       * is set.
       *
       * @attribute closeAttribute
       * @type string
       * @default "core-overlay-toggle"
       */
      closeAttribute: 'core-overlay-toggle',

      /**
       * This property specifies a selector matching elements that should
       * close the overlay on tap. Should not set `closeAttribute` if this
       * is set.
       *
       * @attribute closeSelector
       * @type string
       * @default ""
       */
      closeSelector: '',

      /**
       * The transition property specifies a string which identifies a 
       * <a href="../core-transition/">`core-transition`</a> element that 
       * will be used to help the overlay open and close. The default
       * `core-transition-fade` will cause the overlay to fade in and out.
       *
       * @attribute transition
       * @type string
       * @default 'core-transition-fade'
       */
      transition: 'core-transition-fade'

    },

    captureEventName: 'tap',
    targetListeners: {
      'tap': 'tapHandler',
      'keydown': 'keydownHandler',
      'core-transitionend': 'transitionend'
    },
    
    registerCallback: function(element) {
      this.layer = document.createElement('core-overlay-layer');
      this.keyHelper = document.createElement('core-key-helper');
      this.meta = document.createElement('core-transition');
      this.scrim = document.createElement('div');
      this.scrim.className = 'core-overlay-backdrop';
    },

    ready: function() {
      this.target = this.target || this;
      // flush to ensure styles are installed before paint
      Platform.flush();
    },

    /** 
     * Toggle the opened state of the overlay.
     * @method toggle
     */
    toggle: function() {
      this.opened = !this.opened;
    },

    /** 
     * Open the overlay. This is equivalent to setting the `opened`
     * property to true.
     * @method open
     */
    open: function() {
      this.opened = true;
    },

    /** 
     * Close the overlay. This is equivalent to setting the `opened` 
     * property to false.
     * @method close
     */
    close: function() {
      this.opened = false;
    },

    domReady: function() {
      this.ensureTargetSetup();
    },

    targetChanged: function(old) {
      if (this.target) {
        // really make sure tabIndex is set
        if (this.target.tabIndex < 0) {
          this.target.tabIndex = -1;
        }
        this.addElementListenerList(this.target, this.targetListeners);
        this.target.style.display = 'none';
        this.target.__overlaySetup = false;
      }
      if (old) {
        this.removeElementListenerList(old, this.targetListeners);
        var transition = this.getTransition();
        if (transition) {
          transition.teardown(old);
        } else {
          old.style.position = '';
          old.style.outline = '';
        }
        old.style.display = '';
      }
    },

    transitionChanged: function(old) {
      if (!this.target) {
        return;
      }
      if (old) {
        this.getTransition(old).teardown(this.target);
      }
      this.target.__overlaySetup = false;
    },

    // NOTE: wait to call this until we're as sure as possible that target
    // is styled.
    ensureTargetSetup: function() {
      if (!this.target || this.target.__overlaySetup) {
        return;
      }
      if (!this.sizingTarget) {
        this.sizingTarget = this.target;
      }
      this.target.__overlaySetup = true;
      this.target.style.display = '';
      var transition = this.getTransition();
      if (transition) {
        transition.setup(this.target);
      }
      var computed = getComputedStyle(this.target);
      var style = this.target.style;
      var isStatic = computed.position === 'static';
      var defaultPosition = 'fixed';
      // TODO(sorvell): bc 
      this.targetStyle = {
        position: isStatic ? defaultPosition : computed.position
      };
      if (isStatic) {
        style.position = 'fixed';
      }
      this.target.style.outline = 'none';
      this.target.style.display = 'none';
    },

    openedChanged: function() {
      this.transitioning = true;
      this.ensureTargetSetup();
      this.prepareRenderOpened();
      // async here to allow overlay layer to become visible.
      this.async(function() {
        this.target.style.display = '';
        // force layout to ensure transitions will go
        this.target.offsetWidth;
        this.renderOpened();
      });
      this.fire('core-overlay-open', this.opened);
    },

    // tasks which must occur before opening; e.g. making the element visible
    prepareRenderOpened: function() {
      if (this.opened) {
        addOverlay(this);
      }
      this.prepareBackdrop();
      // async so we don't auto-close immediately via a click.
      this.async(function() {
        if (!this.autoCloseDisabled) {
          this.enableElementListener(this.opened, document,
              this.captureEventName, 'captureHandler', true);
        }
      });
      this.enableElementListener(this.opened, window, 'resize',
          'resizeHandler');

      if (this.opened) {
        // force layout so SD Polyfill renders
        this.target.offsetHeight;
        // TODO(sorvell): bc
        this._shouldPosition = {left: true, top: true};
        // if we are showing, then take care when measuring
        this.prepareMeasure();
        this.updateTargetDimensions();
        this.finishMeasure();
        if (this.layered) {
          this.layer.addElement(this.target);
          this.layer.opened = this.opened;
        }
      }
    },

    // tasks which cause the overlay to actually open; typically play an
    // animation
    renderOpened: function() {
      var transition = this.getTransition();
      if (transition) {
        transition.go(this.target, {opened: this.opened});
      } else {
        this.transitionend();
      }
      this.renderBackdropOpened();
    },

    // finishing tasks; typically called via a transition
    transitionend: function(e) {
      // make sure this is our transition event.
      if (e && e.target !== this.target) {
        return;
      }
      this.transitioning = false;
      if (!this.opened) {
        this.resetTargetDimensions();
        this.target.style.display = 'none';
        this.completeBackdrop();
        removeOverlay(this);
        if (this.layered) {
          if (!currentOverlay()) {
            this.layer.opened = this.opened;
          }
          this.layer.removeElement(this.target);
        }
      }
      this.fire('core-overlay-' + (this.opened ? 'open' : 'close') + 
          '-completed');
      this.applyFocus();
    },

    prepareBackdrop: function() {
      if (this.backdrop && this.opened) {
        if (!this.scrim.parentNode) {
          document.body.appendChild(this.scrim);
          this.scrim.style.zIndex = currentOverlayZ() - 1;
        }
        trackBackdrop(this);
      }
    },

    renderBackdropOpened: function() {
      if (this.backdrop && getBackdrops().length < 2) {
        this.scrim.classList.toggle('core-opened', this.opened);
      }
    },

    completeBackdrop: function() {
      if (this.backdrop) {
        trackBackdrop(this);
        if (getBackdrops().length === 0) {
          this.scrim.parentNode.removeChild(this.scrim);
        }
      }
    },

    prepareMeasure: function() {
      this.target.style.transition = this.target.style.webkitTransition = 'none';
      this.target.style.transform = this.target.style.webkitTransform = 'none';
      this.target.style.display = '';
    },

    finishMeasure: function(target) {
      this.target.style.display = 'none';
      this.target.style.transform = this.target.style.webkitTransform = '';
      // force layout to avoid application of transform
      this.target.offsetWidth;
      this.target.style.transition = this.target.style.webkitTransition = '';
    },

    getTransition: function(name) {
      return this.meta.byId(name || this.transition);
    },

    getFocusNode: function() {
      return this.target.querySelector('[autofocus]') || this.target;
    },

    applyFocus: function() {
      var focusNode = this.getFocusNode();
      if (this.opened) {
        if (!this.autoFocusDisabled) {
          focusNode.focus();
        }
      } else {
        focusNode.blur();
        if (currentOverlay() == this) {
          console.warn('Current core-overlay is attempting to focus itself as next! (bug)');
        } else {
          focusOverlay();
        }
      }
    },

    updateTargetDimensions: function() {
      this.positionTarget();
      this.discoverDimensions();
      this.sizeTarget();
      this.applyDefaultPositioning();
    },

    positionTarget: function() {
      // fire positioning event
      this.fire('core-overlay-position', {target: this.target,
          sizingTarget: this.sizingTarget, opened: this.opened});
    },

    discoverDimensions: function() {
      if (this._dims) {
        return;
      }
      var pos = this.target.style.position;
      // this.target.style.position = 'absolute !important';
      var target = getComputedStyle(this.target);
      var sizer = getComputedStyle(this.sizingTarget);
      this._dims = {
        position: {
          v: target.top !== 'auto' ? 'top' : (target.bottom !== 'auto' ?
            'bottom' : null),
          h: target.left !== 'auto' ? 'left' : (target.right !== 'auto' ?
            'right' : null),
          css: target.position
        },
        size: {
          v: sizer.maxHeight !== 'none',
          h: sizer.maxWidth !== 'none'
        },
        margin: {
          top: parseInt(target.marginTop) || 0,
          right: parseInt(target.marginRight) || 0,
          bottom: parseInt(target.marginBottom) || 0,
          left: parseInt(target.marginLeft) || 0
        }
      };
      // size at top/left if unset
      if (!this._dims.position.v) {
        this.target.style.top = '0px';
      }
      if (!this._dims.position.h) {
        this.target.style.left = '0px';
      }
      this.target.style.position = pos || '';
    },

    sizeTarget: function() {
      this.sizingTarget.style.boxSizing = 'border-box';
      var rect = this.target.getBoundingClientRect();
      if (!this._dims.size.v) {
        this.sizeDimension(rect, this._dims.position.v, 'top', 'bottom', 'Height');
      }
      if (!this._dims.size.h) {
        this.sizeDimension(rect, this._dims.position.h, 'left', 'right', 'Width');
      }
    },

    sizeDimension: function(rect, positionedBy, start, end, extent) {
      var flip = (positionedBy === end);
      var m = flip ? start : end;
      var ws = window['inner' + extent];
      var o = this._dims.margin[m] + (flip ? ws - rect[end] : 
          rect[start]);
      this.sizingTarget.style['max' + extent] = (ws - o) + 'px';
    },

    // vertically and horizontally center if not positioned
    applyDefaultPositioning: function() {
      // only center if position fixed.      
      if (this._dims.position.css !== 'fixed') {
        return; 
      }
      if (!this._dims.position.v) {
        var t = (window.innerHeight - this.target.offsetHeight) / 2;
        t -= this._dims.margin.top;
        this.target.style.top = t + 'px';
      }

      if (!this._dims.position.h) {
        var l = (window.innerWidth - this.target.offsetWidth) / 2;
        l -= this._dims.margin.left;
        this.target.style.left = l + 'px';
      }
    },

    resetTargetDimensions: function() {
      if (!this._dims.size.v) {
        this.sizingTarget.style.maxHeight = '';  
      }
      if (!this._dims.size.h) {
        this.sizingTarget.style.maxWidth = '';  
      }
      this._dims = null;
    },

    tapHandler: function(e) {
      // closeSelector takes precedence since closeAttribute has a default non-null value.
      if (e.target &&
          (this.closeSelector && e.target.matches(this.closeSelector)) ||
          (this.closeAttribute && e.target.hasAttribute(this.closeAttribute))) {
        this.toggle();
      } else {
        if (this.autoCloseJob) {
          this.autoCloseJob.stop();
          this.autoCloseJob = null;
        }
      }
    },
    
    // We use the traditional approach of capturing events on document
    // to to determine if the overlay needs to close. However, due to 
    // ShadowDOM event retargeting, the event target is not useful. Instead
    // of using it, we attempt to close asynchronously and prevent the close
    // if a tap event is immediately heard on the target.
    // TODO(sorvell): This approach will not work with modal. For
    // this we need a scrim.
    captureHandler: function(e) {
      if (!this.autoCloseDisabled && (currentOverlay() == this)) {
        this.autoCloseJob = this.job(this.autoCloseJob, function() {
          this.close();
        });
      }
    },

    keydownHandler: function(e) {
      if (!this.autoCloseDisabled && (e.keyCode == this.keyHelper.ESCAPE_KEY)) {
        this.close();
        e.stopPropagation();
      }
    },

    /**
     * Extensions of core-overlay should implement the `resizeHandler`
     * method to adjust the size and position of the overlay when the 
     * browser window resizes.
     * @method resizeHandler
     */
    resizeHandler: function() {
      this.updateTargetDimensions();
    },

    // TODO(sorvell): these utility methods should not be here.
    addElementListenerList: function(node, events) {
      for (var i in events) {
        this.addElementListener(node, i, events[i]);
      }
    },

    removeElementListenerList: function(node, events) {
      for (var i in events) {
        this.removeElementListener(node, i, events[i]);
      }
    },

    enableElementListener: function(enable, node, event, methodName, capture) {
      if (enable) {
        this.addElementListener(node, event, methodName, capture);
      } else {
        this.removeElementListener(node, event, methodName, capture);
      }
    },

    addElementListener: function(node, event, methodName, capture) {
      var fn = this._makeBoundListener(methodName);
      if (node && fn) {
        Polymer.addEventListener(node, event, fn, capture);
      }
    },

    removeElementListener: function(node, event, methodName, capture) {
      var fn = this._makeBoundListener(methodName);
      if (node && fn) {
        Polymer.removeEventListener(node, event, fn, capture);
      }
    },

    _makeBoundListener: function(methodName) {
      var self = this, method = this[methodName];
      if (!method) {
        return;
      }
      var bound = '_bound' + methodName;
      if (!this[bound]) {
        this[bound] = function(e) {
          method.call(self, e);
        };
      }
      return this[bound];
    },
  });

  // TODO(sorvell): This should be an element with private state so it can
  // be independent of overlay.
  // track overlays for z-index and focus managemant
  var overlays = [];
  function addOverlay(overlay) {
    var z0 = currentOverlayZ();
    overlays.push(overlay);
    var z1 = currentOverlayZ();
    if (z1 <= z0) {
      applyOverlayZ(overlay, z0);
    }
  }

  function removeOverlay(overlay) {
    var i = overlays.indexOf(overlay);
    if (i >= 0) {
      overlays.splice(i, 1);
      setZ(overlay, '');
    }
  }
  
  function applyOverlayZ(overlay, aboveZ) {
    setZ(overlay.target, aboveZ + 2);
  }
  
  function setZ(element, z) {
    element.style.zIndex = z;
  }

  function currentOverlay() {
    return overlays[overlays.length-1];
  }
  
  var DEFAULT_Z = 10;
  
  function currentOverlayZ() {
    var z;
    var current = currentOverlay();
    if (current) {
      var z1 = window.getComputedStyle(current.target).zIndex;
      if (!isNaN(z1)) {
        z = Number(z1);
      }
    }
    return z || DEFAULT_Z;
  }
  
  function focusOverlay() {
    var current = currentOverlay();
    // We have to be careful to focus the next overlay _after_ any current
    // transitions are complete (due to the state being toggled prior to the
    // transition). Otherwise, we risk infinite recursion when a transitioning
    // (closed) overlay becomes the current overlay.
    //
    // NOTE: We make the assumption that any overlay that completes a transition
    // will call into focusOverlay to kick the process back off. Currently:
    // transitionend -> applyFocus -> focusOverlay.
    if (current && !current.transitioning) {
      current.applyFocus();
    }
  }

  var backdrops = [];
  function trackBackdrop(element) {
    if (element.opened) {
      backdrops.push(element);
    } else {
      var i = backdrops.indexOf(element);
      if (i >= 0) {
        backdrops.splice(i, 1);
      }
    }
  }

  function getBackdrops() {
    return backdrops;
  }
})();
;


  Polymer('core-transition-css', {
    
    /**
     * The class that will be applied to all animated nodes.
     *
     * @attribute baseClass
     * @type string
     * @default "core-transition"
     */
    baseClass: 'core-transition',

    /**
     * The class that will be applied to nodes in the opened state.
     *
     * @attribute openedClass
     * @type string
     * @default "core-opened"
     */
    openedClass: 'core-opened',

    /**
     * The class that will be applied to nodes in the closed state.
     *
     * @attribute closedClass
     * @type string
     * @default "core-closed"
     */
    closedClass: 'core-closed',

    /**
     * Event to listen to for animation completion.
     *
     * @attribute completeEventName
     * @type string
     * @default "transitionEnd"
     */
    completeEventName: 'transitionend',

    publish: {
      /**
       * A secondary configuration attribute for the animation. The class
       * `<baseClass>-<transitionType` is applied to the animated node during
       * `setup`.
       *
       * @attribute transitionType
       * @type string
       */
      transitionType: null
    },

    registerCallback: function(element) {
      this.transitionStyle = element.templateContent().firstElementChild;
    },

    // template is just for loading styles, we don't need a shadowRoot
    fetchTemplate: function() {
      return null;
    },

    go: function(node, state) {
      if (state.opened !== undefined) {
        this.transitionOpened(node, state.opened);
      }
    },

    setup: function(node) {
      if (!node._hasTransitionStyle) {
        if (!node.shadowRoot) {
          node.createShadowRoot().innerHTML = '<content></content>';
        }
        this.installScopeStyle(this.transitionStyle, 'transition',
            node.shadowRoot);
        node._hasTransitionStyle = true;
      }
      node.classList.add(this.baseClass);
      if (this.transitionType) {
        node.classList.add(this.baseClass + '-' + this.transitionType);
      }
    },

    teardown: function(node) {
      node.classList.remove(this.baseClass);
      if (this.transitionType) {
        node.classList.remove(this.baseClass + '-' + this.transitionType);
      }
    },

    transitionOpened: function(node, opened) {
      this.listenOnce(node, this.completeEventName, function() {
        node.classList.toggle(this.revealedClass, opened);
        if (!opened) {
          node.classList.remove(this.closedClass);
        }
        this.complete(node);
      });
      node.classList.toggle(this.openedClass, opened);
      node.classList.toggle(this.closedClass, !opened);
    }

  });
;

    Polymer('core-media-query', {

      /**
       * The Boolean return value of the media query
       *
       * @attribute queryMatches
       * @type Boolean
       * @default false
       */
      queryMatches: false,

      /**
       * The CSS media query to evaulate
       *
       * @attribute query
       * @type string
       * @default ''
       */
      query: '',
      ready: function() {
        this._mqHandler = this.queryHandler.bind(this);
        this._mq = null;
      },
      queryChanged: function() {
        if (this._mq) {
          this._mq.removeListener(this._mqHandler);
        }
        var query = this.query;
        if (query[0] !== '(') {
          query = '(' + this.query + ')';
        }
        this._mq = window.matchMedia(query);
        this._mq.addListener(this._mqHandler);
        this.queryHandler(this._mq);
      },
      queryHandler: function(mq) {
        this.queryMatches = mq.matches;
        this.asyncFire('core-media-change', mq);
      }
    });
  ;


  (function() {
  
    var currentToast;
  
    Polymer('paper-toast', {
  
      /**
       * The text shows in a toast.
       *
       * @attribute text
       * @type string
       * @default ''
       */
      text: '',
      
      /**
       * The duration in milliseconds to show the toast.
       *
       * @attribute duration
       * @type number
       * @default 3000
       */
      duration: 3000,
      
      /**
       * Set opened to true to show the toast and to false to hide it.
       *
       * @attribute opened
       * @type boolean
       * @default false
       */
      opened: false,
      
      /**
       * Min-width when the toast changes to narrow layout.  In narrow layout,
       * the toast fits at the bottom of the screen when opened.
       *
       * @attribute responsiveWidth
       * @type string
       * @default '480px'
       */
      responsiveWidth: '480px',
      
      /**
       * If true, the toast can't be swiped.
       *
       * @attribute swipeDisabled
       * @type boolean
       * @default false
       */
      swipeDisabled: false,
      
      eventDelegates: {
        trackstart: 'trackStart',
        track: 'track',
        trackend: 'trackEnd',
        transitionend: 'transitionEnd'
      },
      
      narrowModeChanged: function() {
        this.classList.toggle('fit-bottom', this.narrowMode);
      },
      
      openedChanged: function() {
        if (this.opened) {
          this.dismissJob = this.job(this.dismissJob, this.dismiss, this.duration);
        } else {
          this.dismissJob && this.dismissJob.stop();
          this.dismiss();
        }
      },
      
      /** 
       * Toggle the opened state of the toast.
       * @method toggle
       */
      toggle: function() {
        this.opened = !this.opened;
      },
      
      /** 
       * Show the toast for the specified duration
       * @method show
       */
      show: function() {
        if (currentToast) {
          currentToast.dismiss();
        }
        currentToast = this;
        this.opened = true;
      },
      
      /** 
       * Dismiss the toast and hide it.
       * @method dismiss
       */
      dismiss: function() {
        if (this.dragging) {
          this.shouldDismiss = true;
        } else {
          this.opened = false;
          if (currentToast === this) {
            currentToast = null;
          }
        }
      },
      
      trackStart: function(e) {
        if (!this.swipeDisabled) {
          e.preventTap();
          this.vertical = e.yDirection;
          this.w = this.offsetWidth;
          this.h = this.offsetHeight;
          this.dragging = true;
          this.classList.add('dragging');
        }
      },
      
      track: function(e) {
        if (this.dragging) {
          var s = this.style;
          if (this.vertical) {
            var y = e.dy;
            s.opacity = (this.h - Math.abs(y)) / this.h;
            s.webkitTransform = s.transform =  'translate3d(0, ' + y + 'px, 0)';
          } else {
            var x = e.dx;
            s.opacity = (this.w - Math.abs(x)) / this.w;
            s.webkitTransform = s.transform = 'translate3d(' + x + 'px, 0, 0)';
          }
        }
      },
      
      trackEnd: function(e) {
        if (this.dragging) {
          this.classList.remove('dragging');
          this.style.opacity = null;
          this.style.webkitTransform = this.style.transform = null;
          var cl = this.classList;
          if (this.vertical) {
            cl.toggle('fade-out-down', e.yDirection === 1 && e.dy > 0);
            cl.toggle('fade-out-up', e.yDirection === -1 && e.dy < 0);
          } else {
            cl.toggle('fade-out-right', e.xDirection === 1 && e.dx > 0);
            cl.toggle('fade-out-left', e.xDirection === -1 && e.dx < 0);
          }
          this.dragging = false;
        }
      },
      
      transitionEnd: function() {
        var cl = this.classList;
        if (cl.contains('fade-out-right') || cl.contains('fade-out-left') || 
            cl.contains('fade-out-down') || cl.contains('fade-out-up')) {
          this.dismiss();
          cl.remove('fade-out-right', 'fade-out-left', 
              'fade-out-down', 'fade-out-up');
        } else if (this.shouldDismiss) {
          this.dismiss();
        }
        this.shouldDismiss = false;
      }
  
    });
    
  })();

;

  
    Polymer('core-iconset', {
  
      /**
       * The URL of the iconset image.
       *
       * @attribute src
       * @type string
       * @default ''
       */
      src: '',

      /**
       * The width of the iconset image. This must only be specified if the
       * icons are arranged into separate rows inside the image.
       *
       * @attribute width
       * @type number
       * @default 0
       */
      width: 0,

      /**
       * A space separated list of names corresponding to icons in the iconset
       * image file. This list must be ordered the same as the icon images
       * in the image file.
       *
       * @attribute icons
       * @type string
       * @default ''
       */
      icons: '',

      /**
       * The size of an individual icon. Note that icons must be square.
       *
       * @attribute iconSize
       * @type number
       * @default 24
       */
      iconSize: 24,

      /**
       * The horizontal offset of the icon images in the inconset src image.
       * This is typically used if the image resource contains additional images
       * beside those intended for the iconset.
       *
       * @attribute offsetX
       * @type number
       * @default 0
       */
      offsetX: 0,
      /**
       * The vertical offset of the icon images in the inconset src image.
       * This is typically used if the image resource contains additional images
       * beside those intended for the iconset.
       *
       * @attribute offsetY
       * @type number
       * @default 0
       */
      offsetY: 0,
      type: 'iconset',

      created: function() {
        this.iconMap = {};
        this.iconNames = [];
        this.themes = {};
      },
  
      ready: function() {
        // TODO(sorvell): ensure iconset's src is always relative to the main
        // document
        if (this.src && (this.ownerDocument !== document)) {
          this.src = this.resolvePath(this.src, this.ownerDocument.baseURI);
        }
        this.super();
        this.updateThemes();
      },

      iconsChanged: function() {
        var ox = this.offsetX;
        var oy = this.offsetY;
        this.icons && this.icons.split(/\s+/g).forEach(function(name, i) {
          this.iconNames.push(name);
          this.iconMap[name] = {
            offsetX: ox,
            offsetY: oy
          }
          if (ox + this.iconSize < this.width) {
            ox += this.iconSize;
          } else {
            ox = this.offsetX;
            oy += this.iconSize;
          }
        }, this);
      },

      updateThemes: function() {
        var ts = this.querySelectorAll('property[theme]');
        ts && ts.array().forEach(function(t) {
          this.themes[t.getAttribute('theme')] = {
            offsetX: parseInt(t.getAttribute('offsetX')) || 0,
            offsetY: parseInt(t.getAttribute('offsetY')) || 0
          };
        }, this);
      },

      // TODO(ffu): support retrived by index e.g. getOffset(10);
      /**
       * Returns an object containing `offsetX` and `offsetY` properties which
       * specify the pixel locaion in the iconset's src file for the given
       * `icon` and `theme`. It's uncommon to call this method. It is useful,
       * for example, to manually position a css backgroundImage to the proper
       * offset. It's more common to use the `applyIcon` method.
       *
       * @method getOffset
       * @param {String|Number} icon The name of the icon or the index of the
       * icon within in the icon image.
       * @param {String} theme The name of the theme.
       * @returns {Object} An object specifying the offset of the given icon 
       * within the icon resource file; `offsetX` is the horizontal offset and
       * `offsetY` is the vertical offset. Both values are in pixel units.
       */
      getOffset: function(icon, theme) {
        var i = this.iconMap[icon];
        if (!i) {
          var n = this.iconNames[Number(icon)];
          i = this.iconMap[n];
        }
        var t = this.themes[theme];
        if (i && t) {
          return {
            offsetX: i.offsetX + t.offsetX,
            offsetY: i.offsetY + t.offsetY
          }
        }
        return i;
      },

      /**
       * Applies an icon to the given element as a css background image. This
       * method does not size the element, and it's often necessary to set 
       * the element's height and width so that the background image is visible.
       *
       * @method applyIcon
       * @param {Element} element The element to which the background is
       * applied.
       * @param {String|Number} icon The name or index of the icon to apply.
       * @param {Number} scale (optional, defaults to 1) A scaling factor 
       * with which the icon can be magnified.
       * @return {Element} The icon element.
       */
      applyIcon: function(element, icon, scale) {
        var offset = this.getOffset(icon);
        scale = scale || 1;
        if (element && offset) {
          var icon = element._icon || document.createElement('div');
          var style = icon.style;
          style.backgroundImage = 'url(' + this.src + ')';
          style.backgroundPosition = (-offset.offsetX * scale + 'px') + 
             ' ' + (-offset.offsetY * scale + 'px');
          style.backgroundSize = scale === 1 ? 'auto' :
             this.width * scale + 'px';
          if (icon.parentNode !== element) {
            element.appendChild(icon);
          }
          return icon;
        }
      }

    });

  ;

(function() {
  
  // mono-state
  var meta;
  
  Polymer('core-icon', {

    /**
     * The URL of an image for the icon. If the src property is specified,
     * the icon property should not be.
     *
     * @attribute src
     * @type string
     * @default ''
     */
    src: '',

    /**
     * Specifies the icon name or index in the set of icons available in
     * the icon's icon set. If the icon property is specified,
     * the src property should not be.
     *
     * @attribute icon
     * @type string
     * @default ''
     */
    icon: '',

    /**
     * Alternative text content for accessibility support.
     * If alt is present and not empty, it will set the element's role to img and add an aria-label whose content matches alt.
     * If alt is present and is an empty string, '', it will hide the element from the accessibility layer
     * If alt is not present, it will set the element's role to img and the element will fallback to using the icon attribute for its aria-label.
     * 
     * @attribute alt
     * @type string
     * @default ''
     */
    alt: null,

    observe: {
      'icon': 'updateIcon',
      'alt': 'updateAlt'
    },

    defaultIconset: 'icons',

    ready: function() {
      if (!meta) {
        meta = document.createElement('core-iconset');
      }

      // Allow user-provided `aria-label` in preference to any other text alternative.
      if (this.hasAttribute('aria-label')) {
        // Set `role` if it has not been overridden.
        if (!this.hasAttribute('role')) {
          this.setAttribute('role', 'img');
        }
        return;
      }
      this.updateAlt();
    },

    srcChanged: function() {
      var icon = this._icon || document.createElement('div');
      icon.textContent = '';
      icon.setAttribute('fit', '');
      icon.style.backgroundImage = 'url(' + this.src + ')';
      icon.style.backgroundPosition = 'center';
      icon.style.backgroundSize = '100%';
      if (!icon.parentNode) {
        this.appendChild(icon);
      }
      this._icon = icon;
    },

    getIconset: function(name) {
      return meta.byId(name || this.defaultIconset);
    },

    updateIcon: function(oldVal, newVal) {
      if (!this.icon) {
        this.updateAlt();
        return;
      }
      var parts = String(this.icon).split(':');
      var icon = parts.pop();
      if (icon) {
        var set = this.getIconset(parts.pop());
        if (set) {
          this._icon = set.applyIcon(this, icon);
          if (this._icon) {
            this._icon.setAttribute('fit', '');
          }
        }
      }
      // Check to see if we're using the old icon's name for our a11y fallback
      if (oldVal) {
        if (oldVal.split(':').pop() == this.getAttribute('aria-label')) {
          this.updateAlt();
        }
      }
    },

    updateAlt: function() {
      // Respect the user's decision to remove this element from
      // the a11y tree
      if (this.getAttribute('aria-hidden')) {
        return;
      }

      // Remove element from a11y tree if `alt` is empty, otherwise
      // use `alt` as `aria-label`.
      if (this.alt === '') {
        this.setAttribute('aria-hidden', 'true');
        if (this.hasAttribute('role')) {
          this.removeAttribute('role');
        }
        if (this.hasAttribute('aria-label')) {
          this.removeAttribute('aria-label');
        }
      } else {
        this.setAttribute('aria-label', this.alt ||
                                        this.icon.split(':').pop());
        if (!this.hasAttribute('role')) {
          this.setAttribute('role', 'img');
        }
        if (this.hasAttribute('aria-hidden')) {
          this.removeAttribute('aria-hidden');
        }
      }
    }

  });
  
})();
;


    Polymer('core-iconset-svg', {


      /**
       * The size of an individual icon. Note that icons must be square.
       *
       * @attribute iconSize
       * @type number
       * @default 24
       */
      iconSize: 24,
      type: 'iconset',

      created: function() {
        this._icons = {};
      },

      ready: function() {
        this.super();
        this.updateIcons();
      },

      iconById: function(id) {
        return this._icons[id] || (this._icons[id] = this.querySelector('#' + id));
      },

      cloneIcon: function(id) {
        var icon = this.iconById(id);
        if (icon) {
          var content = icon.cloneNode(true);
          content.removeAttribute('id');
          var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('viewBox', '0 0 ' + this.iconSize + ' ' +
              this.iconSize);
          // NOTE(dfreedm): work around https://crbug.com/370136
          svg.style.pointerEvents = 'none';
          svg.appendChild(content);
          return svg;
        }
      },

      get iconNames() {
        if (!this._iconNames) {
          this._iconNames = this.findIconNames();
        }
        return this._iconNames;
      },

      findIconNames: function() {
        var icons = this.querySelectorAll('[id]').array();
        if (icons.length) {
          return icons.map(function(n){ return n.id });
        }
      },

      /**
       * Applies an icon to the given element. The svg icon is added to the
       * element's shadowRoot if one exists or directly to itself.
       *
       * @method applyIcon
       * @param {Element} element The element to which the icon is
       * applied.
       * @param {String|Number} icon The name the icon to apply.
       * @return {Element} The icon element
       */
      applyIcon: function(element, icon) {
        var root = element;
        // remove old
        var old = root.querySelector('svg');
        if (old) {
          old.remove();
        }
        // install new
        var svg = this.cloneIcon(icon);
        if (!svg) {
          return;
        }
        svg.setAttribute('height', '100%');
        svg.setAttribute('width', '100%');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.style.display = 'block';
        root.insertBefore(svg, root.firstElementChild);
        return svg;
      },
      
      /**
       * Tell users of the iconset, that the set has loaded.
       * This finds all elements matching the selector argument and calls 
       * the method argument on them.
       * @method updateIcons
       * @param selector {string} css selector to identify iconset users, 
       * defaults to '[icon]'
       * @param method {string} method to call on found elements, 
       * defaults to 'updateIcon'
       */
      updateIcons: function(selector, method) {
        selector = selector || '[icon]';
        method = method || 'updateIcon';
        var deep = window.ShadowDOMPolyfill ? '' : 'html /deep/ ';
        var i$ = document.querySelectorAll(deep + selector);
        for (var i=0, e; e=i$[i]; i++) {
          if (e[method]) {
            e[method].call(e);
          }
        }
      }
      

    });

  ;
Polymer('core-toolbar');;

    Polymer('core-selection', {
      /**
       * If true, multiple selections are allowed.
       *
       * @attribute multi
       * @type boolean
       * @default false
       */
      multi: false,
      ready: function() {
        this.clear();
      },
      clear: function() {
        this.selection = [];
      },
      /**
       * Retrieves the selected item(s).
       * @method getSelection
       * @returns Returns the selected item(s). If the multi property is true,
       * getSelection will return an array, otherwise it will return 
       * the selected item or undefined if there is no selection.
      */
      getSelection: function() {
        return this.multi ? this.selection : this.selection[0];
      },
      /**
       * Indicates if a given item is selected.
       * @method isSelected
       * @param {any} item The item whose selection state should be checked.
       * @returns Returns true if `item` is selected.
      */
      isSelected: function(item) {
        return this.selection.indexOf(item) >= 0;
      },
      setItemSelected: function(item, isSelected) {
        if (item !== undefined && item !== null) {
          if (isSelected) {
            this.selection.push(item);
          } else {
            var i = this.selection.indexOf(item);
            if (i >= 0) {
              this.selection.splice(i, 1);
            }
          }
          this.fire("core-select", {isSelected: isSelected, item: item});
        }
      },
      /**
       * Set the selection state for a given `item`. If the multi property
       * is true, then the selected state of `item` will be toggled; otherwise
       * the `item` will be selected.
       * @method select
       * @param {any} item: The item to select.
      */
      select: function(item) {
        if (this.multi) {
          this.toggle(item);
        } else if (this.getSelection() !== item) {
          this.setItemSelected(this.getSelection(), false);
          this.setItemSelected(item, true);
        }
      },
      /**
       * Toggles the selection state for `item`.
       * @method toggle
       * @param {any} item: The item to toggle.
      */
      toggle: function(item) {
        this.setItemSelected(item, !this.isSelected(item));
      }
    });
  ;


    Polymer('core-selector', {

      /**
       * Gets or sets the selected element.  Default to use the index
       * of the item element.
       *
       * If you want a specific attribute value of the element to be
       * used instead of index, set "valueattr" to that attribute name.
       *
       * Example:
       *
       *     <core-selector valueattr="label" selected="foo">
       *       <div label="foo"></div>
       *       <div label="bar"></div>
       *       <div label="zot"></div>
       *     </core-selector>
       *
       * In multi-selection this should be an array of values.
       *
       * Example:
       *
       *     <core-selector id="selector" valueattr="label" multi>
       *       <div label="foo"></div>
       *       <div label="bar"></div>
       *       <div label="zot"></div>
       *     </core-selector>
       *
       *     this.$.selector.selected = ['foo', 'zot'];
       *
       * @attribute selected
       * @type Object
       * @default null
       */
      selected: null,

      /**
       * If true, multiple selections are allowed.
       *
       * @attribute multi
       * @type boolean
       * @default false
       */
      multi: false,

      /**
       * Specifies the attribute to be used for "selected" attribute.
       *
       * @attribute valueattr
       * @type string
       * @default 'name'
       */
      valueattr: 'name',

      /**
       * Specifies the CSS class to be used to add to the selected element.
       * 
       * @attribute selectedClass
       * @type string
       * @default 'core-selected'
       */
      selectedClass: 'core-selected',

      /**
       * Specifies the property to be used to set on the selected element
       * to indicate its active state.
       *
       * @attribute selectedProperty
       * @type string
       * @default ''
       */
      selectedProperty: '',

      /**
       * Specifies the attribute to set on the selected element to indicate
       * its active state.
       *
       * @attribute selectedAttribute
       * @type string
       * @default 'active'
       */
      selectedAttribute: 'active',

      /**
       * Returns the currently selected element. In multi-selection this returns
       * an array of selected elements.
       * Note that you should not use this to set the selection. Instead use
       * `selected`.
       * 
       * @attribute selectedItem
       * @type Object
       * @default null
       */
      selectedItem: null,

      /**
       * In single selection, this returns the model associated with the
       * selected element.
       * Note that you should not use this to set the selection. Instead use 
       * `selected`.
       * 
       * @attribute selectedModel
       * @type Object
       * @default null
       */
      selectedModel: null,

      /**
       * In single selection, this returns the selected index.
       * Note that you should not use this to set the selection. Instead use
       * `selected`.
       *
       * @attribute selectedIndex
       * @type number
       * @default -1
       */
      selectedIndex: -1,

      /**
       * Nodes with local name that are in the list will not be included 
       * in the selection items.  In the following example, `items` returns four
       * `core-item`'s and doesn't include `h3` and `hr`.
       *
       *     <core-selector excludedLocalNames="h3 hr">
       *       <h3>Header</h3>
       *       <core-item>Item1</core-item>
       *       <core-item>Item2</core-item>
       *       <hr>
       *       <core-item>Item3</core-item>
       *       <core-item>Item4</core-item>
       *     </core-selector>
       *
       * @attribute excludedLocalNames
       * @type string
       * @default ''
       */
      excludedLocalNames: '',

      /**
       * The target element that contains items.  If this is not set 
       * core-selector is the container.
       * 
       * @attribute target
       * @type Object
       * @default null
       */
      target: null,

      /**
       * This can be used to query nodes from the target node to be used for 
       * selection items.  Note this only works if `target` is set
       * and is not `core-selector` itself.
       *
       * Example:
       *
       *     <core-selector target="{{$.myForm}}" itemsSelector="input[type=radio]"></core-selector>
       *     <form id="myForm">
       *       <label><input type="radio" name="color" value="red"> Red</label> <br>
       *       <label><input type="radio" name="color" value="green"> Green</label> <br>
       *       <label><input type="radio" name="color" value="blue"> Blue</label> <br>
       *       <p>color = {{color}}</p>
       *     </form>
       * 
       * @attribute itemsSelector
       * @type string
       * @default ''
       */
      itemsSelector: '',

      /**
       * The event that would be fired from the item element to indicate
       * it is being selected.
       *
       * @attribute activateEvent
       * @type string
       * @default 'tap'
       */
      activateEvent: 'tap',

      /**
       * Set this to true to disallow changing the selection via the
       * `activateEvent`.
       *
       * @attribute notap
       * @type boolean
       * @default false
       */
      notap: false,

      defaultExcludedLocalNames: 'template',

      ready: function() {
        this.activateListener = this.activateHandler.bind(this);
        this.itemFilter = this.filterItem.bind(this);
        this.excludedLocalNamesChanged();
        this.observer = new MutationObserver(this.updateSelected.bind(this));
        if (!this.target) {
          this.target = this;
        }
      },

      /**
       * Returns an array of all items.
       *
       * @property items
       */
      get items() {
        if (!this.target) {
          return [];
        }
        var nodes = this.target !== this ? (this.itemsSelector ? 
            this.target.querySelectorAll(this.itemsSelector) : 
                this.target.children) : this.$.items.getDistributedNodes();
        return Array.prototype.filter.call(nodes, this.itemFilter);
      },

      filterItem: function(node) {
        return !this._excludedNames[node.localName];
      },

      excludedLocalNamesChanged: function() {
        this._excludedNames = {};
        var s = this.defaultExcludedLocalNames;
        if (this.excludedLocalNames) {
          s += ' ' + this.excludedLocalNames;
        }
        s.split(/\s+/g).forEach(function(n) {
          this._excludedNames[n] = 1;
        }, this);
      },

      targetChanged: function(old) {
        if (old) {
          this.removeListener(old);
          this.observer.disconnect();
          this.clearSelection();
        }
        if (this.target) {
          this.addListener(this.target);
          this.observer.observe(this.target, {childList: true});
          this.updateSelected();
        }
      },

      addListener: function(node) {
        Polymer.addEventListener(node, this.activateEvent, this.activateListener);
      },

      removeListener: function(node) {
        Polymer.removeEventListener(node, this.activateEvent, this.activateListener);
      },

      /**
       * Returns the selected item(s). If the `multi` property is true,
       * this will return an array, otherwise it will return 
       * the selected item or undefined if there is no selection.
       */
      get selection() {
        return this.$.selection.getSelection();
      },

      selectedChanged: function() {
        this.updateSelected();
      },

      updateSelected: function() {
        this.validateSelected();
        if (this.multi) {
          this.clearSelection();
          this.selected && this.selected.forEach(function(s) {
            this.valueToSelection(s);
          }, this);
        } else {
          this.valueToSelection(this.selected);
        }
      },

      validateSelected: function() {
        // convert to an array for multi-selection
        if (this.multi && !Array.isArray(this.selected) && 
            this.selected !== null && this.selected !== undefined) {
          this.selected = [this.selected];
        }
      },

      clearSelection: function() {
        if (this.multi) {
          this.selection.slice().forEach(function(s) {
            this.$.selection.setItemSelected(s, false);
          }, this);
        } else {
          this.$.selection.setItemSelected(this.selection, false);
        }
        this.selectedItem = null;
        this.$.selection.clear();
      },

      valueToSelection: function(value) {
        var item = (value === null || value === undefined) ? 
            null : this.items[this.valueToIndex(value)];
        this.$.selection.select(item);
      },

      updateSelectedItem: function() {
        this.selectedItem = this.selection;
      },

      selectedItemChanged: function() {
        if (this.selectedItem) {
          var t = this.selectedItem.templateInstance;
          this.selectedModel = t ? t.model : undefined;
        } else {
          this.selectedModel = null;
        }
        this.selectedIndex = this.selectedItem ? 
            parseInt(this.valueToIndex(this.selected)) : -1;
      },

      valueToIndex: function(value) {
        // find an item with value == value and return it's index
        for (var i=0, items=this.items, c; (c=items[i]); i++) {
          if (this.valueForNode(c) == value) {
            return i;
          }
        }
        // if no item found, the value itself is probably the index
        return value;
      },

      valueForNode: function(node) {
        return node[this.valueattr] || node.getAttribute(this.valueattr);
      },

      // events fired from <core-selection> object
      selectionSelect: function(e, detail) {
        this.updateSelectedItem();
        if (detail.item) {
          this.applySelection(detail.item, detail.isSelected);
        }
      },

      applySelection: function(item, isSelected) {
        if (this.selectedClass) {
          item.classList.toggle(this.selectedClass, isSelected);
        }
        if (this.selectedProperty) {
          item[this.selectedProperty] = isSelected;
        }
        if (this.selectedAttribute && item.setAttribute) {
          if (isSelected) {
            item.setAttribute(this.selectedAttribute, '');
          } else {
            item.removeAttribute(this.selectedAttribute);
          }
        }
      },

      // event fired from host
      activateHandler: function(e) {
        if (!this.notap) {
          var i = this.findDistributedTarget(e.target, this.items);
          if (i >= 0) {
            var item = this.items[i];
            var s = this.valueForNode(item) || i;
            if (this.multi) {
              if (this.selected) {
                this.addRemoveSelected(s);
              } else {
                this.selected = [s];
              }
            } else {
              this.selected = s;
            }
            this.asyncFire('core-activate', {item: item});
          }
        }
      },

      addRemoveSelected: function(value) {
        var i = this.selected.indexOf(value);
        if (i >= 0) {
          this.selected.splice(i, 1);
        } else {
          this.selected.push(value);
        }
        this.valueToSelection(value);
      },

      findDistributedTarget: function(target, nodes) {
        // find first ancestor of target (including itself) that
        // is in nodes, if any
        while (target && target != this) {
          var i = Array.prototype.indexOf.call(nodes, target);
          if (i >= 0) {
            return i;
          }
          target = target.parentNode;
        }
      },
      
      selectIndex: function(index) {
        var item = this.items[index];
        if (item) {
          this.selected = this.valueForNode(item) || index;
          return item;
        }
      },
      
      /**
       * Selects the previous item.  This should be used in single selection only.
       *
       * @method selectPrevious
       * @param {boolean} wrap if true and it is already at the first item, wrap to the end
       * @returns the previous item or undefined if there is none
       */
      selectPrevious: function(wrap) {
        var i = wrap && !this.selectedIndex ? this.items.length - 1 : this.selectedIndex - 1;
        return this.selectIndex(i);
      },
      
      /**
       * Selects the next item.  This should be used in single selection only.
       *
       * @method selectNext
       * @param {boolean} wrap if true and it is already at the last item, wrap to the front
       * @returns the next item or undefined if there is none
       */
      selectNext: function(wrap) {
        var i = wrap && this.selectedIndex >= this.items.length - 1 ? 0 : this.selectedIndex + 1;
        return this.selectIndex(i);
      }
      
    });
  ;

(function() {

window.CoreStyle = window.CoreStyle || {
  g: {},
  list: {},
  refMap: {}
};

Polymer('core-style', {
  /**
   * The `id` property should be set if the `core-style` is a producer
   * of styles. In this case, the `core-style` should have text content
   * that is cssText.
   *
   * @attribute id
   * @type string
   * @default ''
   */


  publish: {
    /**
     * The `ref` property should be set if the `core-style` element is a 
     * consumer of styles. Set it to the `id` of the desired `core-style`
     * element.
     *
     * @attribute ref
     * @type string
     * @default ''
     */
    ref: ''
  },

  // static
  g: CoreStyle.g,
  refMap: CoreStyle.refMap,

  /**
   * The `list` is a map of all `core-style` producers stored by `id`. It 
   * should be considered readonly. It's useful for nesting one `core-style`
   * inside another.
   *
   * @attribute list
   * @type object (readonly)
   * @default {map of all `core-style` producers}
   */
  list: CoreStyle.list,

  // if we have an id, we provide style
  // if we have a ref, we consume/require style
  ready: function() {
    if (this.id) {
      this.provide();
    } else {
      this.registerRef(this.ref);
      if (!window.ShadowDOMPolyfill) {
        this.require();
      }  
    }
  },

  // can't shim until attached if using SD polyfill because need to find host
  attached: function() {
    if (!this.id && window.ShadowDOMPolyfill) {
      this.require();
    }
  },

  /****** producer stuff *******/

  provide: function() {
    this.register();
    // we want to do this asap, especially so we can do so before definitions
    // that use this core-style are registered.
    if (this.textContent) {
      this._completeProvide();
    } else {
      this.async(this._completeProvide);
    }
  },

  register: function() {
    var i = this.list[this.id];
    if (i) {
      if (!Array.isArray(i)) {
        this.list[this.id] = [i];
      }
      this.list[this.id].push(this);
    } else {
      this.list[this.id] = this;  
    }
  },

  // stamp into a shadowRoot so we can monitor dom of the bound output
  _completeProvide: function() {
    this.createShadowRoot();
    this.domObserver = new MutationObserver(this.domModified.bind(this))
        .observe(this.shadowRoot, {subtree: true, 
        characterData: true, childList: true});
    this.provideContent();
  },

  provideContent: function() {
    this.ensureTemplate();
    this.shadowRoot.textContent = '';
    this.shadowRoot.appendChild(this.instanceTemplate(this.template));
    this.cssText = this.shadowRoot.textContent;
  },

  ensureTemplate: function() {
    if (!this.template) {
      this.template = this.querySelector('template:not([repeat]):not([bind])');
      // move content into the template
      if (!this.template) {
        this.template = document.createElement('template');
        var n = this.firstChild;
        while (n) {
          this.template.content.appendChild(n.cloneNode(true));
          n = n.nextSibling;
        }
      }
    }
  },

  domModified: function() {
    this.cssText = this.shadowRoot.textContent;
    this.notify();
  },

  // notify instances that reference this element
  notify: function() {
    var s$ = this.refMap[this.id];
    if (s$) {
      for (var i=0, s; (s=s$[i]); i++) {
        s.require();
      }
    }
  },

  /****** consumer stuff *******/

  registerRef: function(ref) {
    //console.log('register', ref);
    this.refMap[this.ref] = this.refMap[this.ref] || [];
    this.refMap[this.ref].push(this);
  },

  applyRef: function(ref) {
    this.ref = ref;
    this.registerRef(this.ref);
    this.require();
  },

  require: function() {
    var cssText = this.cssTextForRef(this.ref);
    //console.log('require', this.ref, cssText);
    if (cssText) {
      this.ensureStyleElement();
      // do nothing if cssText has not changed
      if (this.styleElement._cssText === cssText) {
        return;
      }
      this.styleElement._cssText = cssText;
      if (window.ShadowDOMPolyfill) {
        this.styleElement.textContent = cssText;
        cssText = Platform.ShadowCSS.shimStyle(this.styleElement,
            this.getScopeSelector());
      }
      this.styleElement.textContent = cssText;
    }
  },

  cssTextForRef: function(ref) {
    var s$ = this.byId(ref);
    var cssText = '';
    if (s$) {
      if (Array.isArray(s$)) {
        var p = [];
        for (var i=0, l=s$.length, s; (i<l) && (s=s$[i]); i++) {
          p.push(s.cssText);
        }
        cssText = p.join('\n\n');
      } else {
        cssText = s$.cssText;
      }
    }
    if (s$ && !cssText) {
      console.warn('No styles provided for ref:', ref);
    }
    return cssText;
  },

  byId: function(id) {
    return this.list[id];
  },

  ensureStyleElement: function() {
    if (!this.styleElement) {
      this.styleElement = window.ShadowDOMPolyfill ? 
          this.makeShimStyle() :
          this.makeRootStyle();
    }
    if (!this.styleElement) {
      console.warn(this.localName, 'could not setup style.');
    }
  },

  makeRootStyle: function() {
    var style = document.createElement('style');
    this.appendChild(style);
    return style;
  },

  makeShimStyle: function() {
    var host = this.findHost(this);
    if (host) {
      var name = host.localName;
      var style = document.querySelector('style[' + name + '=' + this.ref +']');
      if (!style) {
        style = document.createElement('style');
        style.setAttribute(name, this.ref);
        document.head.appendChild(style);
      }
      return style;
    }
  },

  getScopeSelector: function() {
    if (!this._scopeSelector) {
      var selector = '', host = this.findHost(this);
      if (host) {
        var typeExtension = host.hasAttribute('is');
        var name = typeExtension ? host.getAttribute('is') : host.localName;
        selector = Platform.ShadowCSS.makeScopeSelector(name, 
            typeExtension);
      }
      this._scopeSelector = selector;
    }
    return this._scopeSelector;
  },

  findHost: function(node) {
    while (node.parentNode) {
      node = node.parentNode;
    }
    return node.host || wrap(document.documentElement);
  },

  /* filters! */
  // TODO(dfreedm): add more filters!

  cycle: function(rgb, amount) {
    if (rgb.match('#')) {
      var o = this.hexToRgb(rgb);
      if (!o) {
        return rgb;
      }
      rgb = 'rgb(' + o.r + ',' + o.b + ',' + o.g + ')';
    }

    function cycleChannel(v) {
      return Math.abs((Number(v) - amount) % 255);
    }

    return rgb.replace(/rgb\(([^,]*),([^,]*),([^,]*)\)/, function(m, a, b, c) {
      return 'rgb(' + cycleChannel(a) + ',' + cycleChannel(b) + ', ' 
          + cycleChannel(c) + ')';
    });
  },

  hexToRgb: function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

});


})();
;


(function () {

// create some basic transition styling data.
var transitions = CoreStyle.g.transitions = CoreStyle.g.transitions || {};
transitions.duration = '500ms';
transitions.heroDelay = '50ms';
transitions.scaleDelay = '500ms';
transitions.cascadeFadeDuration = '250ms';

Polymer('core-transition-pages',{

  publish: {
    /**
     * This class will be applied to the scope element in the `prepare` function.
     * It is removed in the `complete` function. Used to activate a set of CSS
     * rules that need to apply before the transition runs, e.g. a default opacity
     * or transform for the non-active pages.
     *
     * @attribute scopeClass
     * @type string
     * @default ''
     */
    scopeClass: '',

    /**
     * This class will be applied to the scope element in the `go` function. It is
     * remoived in the `complete' function. Generally used to apply a CSS transition
     * rule only during the transition.
     *
     * @attribute activeClass
     * @type string
     * @default ''
     */
    activeClass: '',

    /**
     * Specifies which CSS property to look for when it receives a `transitionEnd` event
     * to determine whether the transition is complete. If not specified, the first
     * transitionEnd event received will complete the transition.
     *
     * @attribute transitionProperty
     * @type string
     * @default ''
     */
    transitionProperty: ''
  },

  /**
   * True if this transition is complete.
   *
   * @attribute completed
   * @type boolean
   * @default false
   */
  completed: false,

  prepare: function(scope, options) {
    this.boundCompleteFn = this.complete.bind(this, scope);
    if (this.scopeClass) {
      scope.classList.add(this.scopeClass);
    }
  },

  go: function(scope, options) {
    this.completed = false;
    if (this.activeClass) {
      scope.classList.add(this.activeClass);
    }
    scope.addEventListener('transitionend', this.boundCompleteFn, false);
  },

  setup: function(scope) {
    if (!scope._pageTransitionStyles) {
      scope._pageTransitionStyles = {};
    }

    var name = this.calcStyleName();
    
    if (!scope._pageTransitionStyles[name]) {
      this.installStyleInScope(scope, name);
      scope._pageTransitionStyles[name] = true;
    }
  },

  calcStyleName: function() {
    return this.id || this.localName;
  },

  installStyleInScope: function(scope, id) {
    if (!scope.shadowRoot) {
      scope.createShadowRoot().innerHTML = '<content></content>';
    }
    var root = scope.shadowRoot;
    var scopeStyle = document.createElement('core-style');
    root.insertBefore(scopeStyle, root.firstChild);
    scopeStyle.applyRef(id);
  },

  complete: function(scope, e) {
    // TODO(yvonne): hack, need to manage completion better
    if (e.propertyName !== 'box-shadow' && (!this.transitionProperty || e.propertyName.indexOf(this.transitionProperty) !== -1)) {
      this.completed = true;
      this.fire('core-transitionend', this, scope);
    }
  },

  // TODO(sorvell): ideally we do this in complete.
  ensureComplete: function(scope) {
    scope.removeEventListener('transitionend', this.boundCompleteFn, false);
    if (this.scopeClass) {
      scope.classList.remove(this.scopeClass);
    }
    if (this.activeClass) {
      scope.classList.remove(this.activeClass);
    }
  }

});

})();

;

(function() {

  var webkitStyles = '-webkit-transition' in document.documentElement.style
  var TRANSITION_CSSNAME = webkitStyles ? '-webkit-transition' : 'transition';
  var TRANSFORM_CSSNAME = webkitStyles ? '-webkit-transform' : 'transform';
  var TRANSITION_NAME = webkitStyles ? 'webkitTransition' : 'transition';
  var TRANSFORM_NAME = webkitStyles ? 'webkitTransform' : 'transform';

  var hasShadowDOMPolyfill = window.ShadowDOMPolyfill;

  Polymer('hero-transition',{

    go: function(scope, options) {
      var props = [
        'border-radius',
        'width',
        'height',
        TRANSFORM_CSSNAME
      ];

      var duration = options && options.duration || 
          (CoreStyle.g.transitions.heroDuration || 
          CoreStyle.g.transitions.duration);

      scope._heroes.forEach(function(h) {
        var d = h.h0.hasAttribute('hero-delayed') ? CoreStyle.g.transitions.heroDelay : '';
        var wt = [];
        props.forEach(function(p) {
          wt.push(p + ' ' + duration + ' ' + options.easing + ' ' + d);
        });

        h.h1.style[TRANSITION_NAME] = wt.join(', ');
        h.h1.style.borderRadius = h.r1;
        h.h1.style[TRANSFORM_NAME] = '';
      });

      this.super(arguments);

      if (!scope._heroes.length) {
        this.completed = true;
      }
    },

    prepare: function(scope, options) {
      this.super(arguments);
      var src = options.src, dst = options.dst;

      if (scope._heroes && scope._heroes.length) {
        this.ensureComplete(scope);
      } else {
        scope._heroes = [];
      }

      // FIXME(yvonne): basic support for nested pages.
      // Look for heroes in the light DOM and one level of shadow DOM of the src and dst,
      // and also in src.selectedItem or dst.selectedItem, then transform the dst hero to src
      var ss = '[hero]';
      var h$ = this.findAllInShadows(src, ss);
      if (src.selectedItem) {
        hs$ = this.findAllInShadows(src.selectedItem, ss);
        hsa$ = [];
        // De-duplicate items
        Array.prototype.forEach.call(hs$, function(hs) {
          if (h$.indexOf(hs) === -1) {
            hsa$.push(hs);
          }
        })
        h$ = h$.concat(hsa$);
      }

      for (var i=0, h0; h0=h$[i]; i++) {
        var v = h0.getAttribute('hero-id');
        var ds = '[hero][hero-id="' + v + '"]';
        var h1 = this.findInShadows(dst, ds);

        if (!h1 && dst.selectedItem) {
          h1 = this.findInShadows(dst.selectedItem, ds);
        }

        // console.log('src', src);
        // console.log('dst', dst, dst.selectedItem);
        // console.log(v, h0, h1);
        if (v && h1) {
          var c0 = getComputedStyle(h0);
          var c1 = getComputedStyle(h1);
          var h = {
            h0: h0,
            b0: h0.getBoundingClientRect(),
            r0: c0.borderRadius,
            h1: h1,
            b1: h1.getBoundingClientRect(),
            r1: c1.borderRadius
          };

          var dl = h.b0.left - h.b1.left;
          var dt = h.b0.top - h.b1.top;
          var sw = h.b0.width / h.b1.width;
          var sh = h.b0.height / h.b1.height;

          // h.scaley = h.h0.hasAttribute('scaley');
          // if (!h.scaley && (sw !== 1 || sh !== 1)) {
          //   sw = sh = 1;
          //   h.h1.style.width = h.b0.width + 'px';
          //   h.h1.style.height = h.b0.height + 'px';
          // }

          // Also animate the border-radius for the circle-to-square transition
          if (h.r0 !== h.r1) {
            h.h1.style.borderRadius = h.r0;
          }

          // console.log(h);

          h.h1.style[TRANSFORM_NAME] = 'translate(' + dl + 'px,' + dt + 'px)' + ' scale(' + sw + ',' + sh + ')';
          h.h1.style[TRANSFORM_NAME + 'Origin'] = '0 0';

          scope._heroes.push(h);
        }
      }

    },

    // carefully look into ::shadow with polyfill specific hack
    findInShadows: function(node, selector) {
      return node.querySelector(selector) || (hasShadowDOMPolyfill ? 
          Platform.queryAllShadows(node, selector) :
          node.querySelector('::shadow ' + selector));
    },

    findAllInShadows: function(node, selector) {
      if (hasShadowDOMPolyfill) {
        var nodes = node.querySelectorAll(selector).array();
        var shadowNodes = Platform.queryAllShadows(node, selector, true);
        return nodes.concat(shadowNodes);
      } else {
        return node.querySelectorAll(selector).array().concat(node.shadowRoot ? node.shadowRoot.querySelectorAll(selector).array() : []);
      }
    },

    ensureComplete: function(scope) {
      this.super(arguments);
      if (scope._heroes) {
        scope._heroes.forEach(function(h) {
          h.h1.style[TRANSITION_NAME] = '';
          h.h1.style[TRANSFORM_NAME] = '';
        });
        scope._heroes = [];
      }
    },

    complete: function(scope, e) {
      // if (e.propertyName === TRANSFORM_CSSNAME) {
        var done = false;
        scope._heroes.forEach(function(h) {
          if (h.h1 === e.path[0]) {
            done = true;
          }
        });

        if (done) {
          this.super(arguments);
        }
      // }
    }

  });

})();
;


  Polymer('core-animated-pages',{

    eventDelegates: {
      'core-transitionend': 'transitionEnd'
    },

    /**
     * A space-delimited string of transitions to use when switching between pages in this element.
     * The strings are `id`s of `core-transition-pages` elements included elsewhere. See the
     * individual transition's document for specific details.
     *
     * @attribute transitions
     * @type string
     * @default ''
     */
    transitions: '',

    selected: 0,

    /**
     * The last page selected. This property is useful to dynamically set transitions based
     * on incoming and outgoing pages.
     *
     * @attribute lastSelected
     * @type Object
     * @default null
     */
    lastSelected: null,

    registerCallback: function() {
      this.tmeta = document.createElement('core-transition');
    },

    created: function() {
      this._transitions = [];
      this.transitioning = [];
    },

    transitionsChanged: function() {
      this._transitions = this.transitions.split(' ');
    },

    _transitionsChanged: function(old) {
      if (this._transitionElements) {
        this._transitionElements.forEach(function(t) {
          t.teardown(this);
        }, this);
      }
      this._transitionElements = [];
      this._transitions.forEach(function(transitionId) {
        var t = this.getTransition(transitionId);
        if (t) {
          this._transitionElements.push(t);
          t.setup(this);
        }
      }, this);
    },

    getTransition: function(transitionId) {
      return this.tmeta.byId(transitionId);
    },

    selectionSelect: function(e, detail) {
      this.updateSelectedItem();
      // Wait to call applySelection when we run the transition
    },

    applyTransition: function(src, dst) {
      if (this.animating) {
        this.cancelAsync(this.animating);
        this.animating = null;
      }

      Platform.flush();

      if (this.transitioning.indexOf(src) === -1) {
        this.transitioning.push(src);
      }
      if (this.transitioning.indexOf(dst) === -1) {
        this.transitioning.push(dst);
      }
      // force src, dst to display 
      src.setAttribute('animate', '');
      dst.setAttribute('animate', '');
      //
      var options = {
        src: src,
        dst: dst,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }

      // fire an event so clients have a chance to do something when the
      // new page becomes visible but before it draws.
      this.fire('core-animated-pages-transition-prepare');

      //
      // prepare transition
      this._transitionElements.forEach(function(transition) {
        transition.prepare(this, options);
      }, this);
      //
      // force layout!
      src.offsetTop;

      //
      // apply selection
      this.applySelection(dst, true);
      this.applySelection(src, false);
      //
      // start transition
      this._transitionElements.forEach(function(transition) {
        transition.go(this, options);
      }, this);

      if (!this._transitionElements.length) {
        this.complete();
      } else {
        this.animating = this.async(this.complete.bind(this), null, 5000);
      }
    },

    complete: function() {
      if (this.animating) {
        this.cancelAsync(this.animating);
        this.animating = null;
      }

      this.transitioning.forEach(function(t) {
        t.removeAttribute('animate');
      });
      this.transitioning = [];

      this._transitionElements.forEach(function(transition) {
        transition.ensureComplete(this);
      }, this);

      this.fire('core-animated-pages-transition-end');
    },
    
    transitionEnd: function(e) {
      if (this.transitioning.length) {
        var completed = true;
        this._transitionElements.forEach(function(transition) {
          if (!transition.completed) {
            completed = false;
          }
        });
        if (completed) {
          this.job('transitionWatch', function() {
            this.complete();
          }, 100);
        }
      }
    },

    selectedChanged: function(old) {
      this.lastSelected = old;
      this.super(arguments);
    },

    selectedItemChanged: function(oldItem) {
      this.super(arguments);

      if (!oldItem) {
        this.applySelection(this.selectedItem, true);
        return;
      }

      if (this.hasAttribute('no-transition') || !this._transitionElements || !this._transitionElements.length) {
        this.applySelection(oldItem, false);
        this.applySelection(this.selectedItem, true);
        return;
      }

      if (oldItem && this.selectedItem) {
        // TODO(sorvell): allow bindings to update first?
        var self = this;
        Platform.flush();
        Platform.endOfMicrotask(function() {
          self.applyTransition(oldItem, self.selectedItem);
        });
      }
    }

  });

;

    Polymer('paper-focusable', {

      publish: {

        /**
         * If true, the button is currently active either because the
         * user is holding down the button, or the button is a toggle
         * and is currently in the active state.
         *
         * @attribute active
         * @type boolean
         * @default false
         */
        active: {value: false, reflect: true},

        /**
         * If true, the element currently has focus due to keyboard
         * navigation.
         *
         * @attribute focused
         * @type boolean
         * @default false
         */
        focused: {value: false, reflect: true},

        /**
         * If true, the user is currently holding down the button.
         *
         * @attribute pressed
         * @type boolean
         * @default false
         */
        pressed: {value: false, reflect: true},

        /**
         * If true, the user cannot interact with this element.
         *
         * @attribute disabled
         * @type boolean
         * @default false
         */
        disabled: {value: false, reflect: true},

        /**
         * If true, the button toggles the active state with each tap.
         * Otherwise, the button becomes active when the user is holding
         * it down.
         *
         * @attribute isToggle
         * @type boolean
         * @default false
         */
        isToggle: {value: false, reflect: false}

      },

      disabledChanged: function() {
        if (this.disabled) {
          this.removeAttribute('tabindex');
        } else {
          this.setAttribute('tabindex', 0);
        }
      },

      downAction: function() {
        this.pressed = true;
        this.focused = false;

        if (this.isToggle) {
          this.active = !this.active;
        } else {
          this.active = true;
        }
      },

      // Pulling up the context menu for an item should focus it; but we need to
      // be careful about how we deal with down/up events surrounding context
      // menus. The up event typically does not fire until the context menu
      // closes: so we focus immediately.
      //
      // This fires _after_ downAction.
      contextMenuAction: function(e) {
        // Note that upAction may fire _again_ on the actual up event.
        this.upAction(e);
        this.focusAction();
      },

      upAction: function() {
        this.pressed = false;

        if (!this.isToggle) {
          this.active = false;
        }
      },

      focusAction: function() {
        if (!this.pressed) {
          // Only render the "focused" state if the element gains focus due to
          // keyboard navigation.
          this.focused = true;
        }
      },

      blurAction: function() {
        this.focused = false;
      }

    });

  ;


  (function() {

    var waveMaxRadius = 150;
    //
    // INK EQUATIONS
    //
    function waveRadiusFn(touchDownMs, touchUpMs, anim) {
      // Convert from ms to s.
      var touchDown = touchDownMs / 1000;
      var touchUp = touchUpMs / 1000;
      var totalElapsed = touchDown + touchUp;
      var ww = anim.width, hh = anim.height;
      // use diagonal size of container to avoid floating point math sadness
      var waveRadius = Math.min(Math.sqrt(ww * ww + hh * hh), waveMaxRadius) * 1.1 + 5;
      var duration = 1.1 - .2 * (waveRadius / waveMaxRadius);
      var tt = (totalElapsed / duration);

      var size = waveRadius * (1 - Math.pow(80, -tt));
      return Math.abs(size);
    }

    function waveOpacityFn(td, tu, anim) {
      // Convert from ms to s.
      var touchDown = td / 1000;
      var touchUp = tu / 1000;
      var totalElapsed = touchDown + touchUp;

      if (tu <= 0) {  // before touch up
        return anim.initialOpacity;
      }
      return Math.max(0, anim.initialOpacity - touchUp * anim.opacityDecayVelocity);
    }

    function waveOuterOpacityFn(td, tu, anim) {
      // Convert from ms to s.
      var touchDown = td / 1000;
      var touchUp = tu / 1000;

      // Linear increase in background opacity, capped at the opacity
      // of the wavefront (waveOpacity).
      var outerOpacity = touchDown * 0.3;
      var waveOpacity = waveOpacityFn(td, tu, anim);
      return Math.max(0, Math.min(outerOpacity, waveOpacity));
    }

    // Determines whether the wave should be completely removed.
    function waveDidFinish(wave, radius, anim) {
      var waveOpacity = waveOpacityFn(wave.tDown, wave.tUp, anim);

      // If the wave opacity is 0 and the radius exceeds the bounds
      // of the element, then this is finished.
      return waveOpacity < 0.01 && radius >= Math.min(wave.maxRadius, waveMaxRadius);
    };

    function waveAtMaximum(wave, radius, anim) {
      var waveOpacity = waveOpacityFn(wave.tDown, wave.tUp, anim);

      return waveOpacity >= anim.initialOpacity && radius >= Math.min(wave.maxRadius, waveMaxRadius);
    }

    //
    // DRAWING
    //
    function drawRipple(ctx, x, y, radius, innerAlpha, outerAlpha) {
      // Only animate opacity and transform
      if (outerAlpha !== undefined) {
        ctx.bg.style.opacity = outerAlpha;
      }
      ctx.wave.style.opacity = innerAlpha;

      var s = radius / (ctx.containerSize / 2);
      var dx = x - (ctx.containerWidth / 2);
      var dy = y - (ctx.containerHeight / 2);

      ctx.wc.style.webkitTransform = 'translate3d(' + dx + 'px,' + dy + 'px,0)';
      ctx.wc.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0)';

      // 2d transform for safari because of border-radius and overflow:hidden clipping bug.
      // https://bugs.webkit.org/show_bug.cgi?id=98538
      ctx.wave.style.webkitTransform = 'scale(' + s + ',' + s + ')';
      ctx.wave.style.transform = 'scale3d(' + s + ',' + s + ',1)';
    }

    //
    // SETUP
    //
    function createWave(elem) {
      var elementStyle = window.getComputedStyle(elem);
      var fgColor = elementStyle.color;

      var inner = document.createElement('div');
      inner.style.backgroundColor = fgColor;
      inner.classList.add('wave');

      var outer = document.createElement('div');
      outer.classList.add('wave-container');
      outer.appendChild(inner);

      var container = elem.$.waves;
      container.appendChild(outer);

      elem.$.bg.style.backgroundColor = fgColor;

      var wave = {
        bg: elem.$.bg,
        wc: outer,
        wave: inner,
        waveColor: fgColor,
        maxRadius: 0,
        isMouseDown: false,
        mouseDownStart: 0.0,
        mouseUpStart: 0.0,
        tDown: 0,
        tUp: 0
      };
      return wave;
    }

    function removeWaveFromScope(scope, wave) {
      if (scope.waves) {
        var pos = scope.waves.indexOf(wave);
        scope.waves.splice(pos, 1);
        // FIXME cache nodes
        wave.wc.remove();
      }
    };

    // Shortcuts.
    var pow = Math.pow;
    var now = Date.now;
    if (window.performance && performance.now) {
      now = performance.now.bind(performance);
    }

    function cssColorWithAlpha(cssColor, alpha) {
        var parts = cssColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (typeof alpha == 'undefined') {
            alpha = 1;
        }
        if (!parts) {
          return 'rgba(255, 255, 255, ' + alpha + ')';
        }
        return 'rgba(' + parts[1] + ', ' + parts[2] + ', ' + parts[3] + ', ' + alpha + ')';
    }

    function dist(p1, p2) {
      return Math.sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2));
    }

    function distanceFromPointToFurthestCorner(point, size) {
      var tl_d = dist(point, {x: 0, y: 0});
      var tr_d = dist(point, {x: size.w, y: 0});
      var bl_d = dist(point, {x: 0, y: size.h});
      var br_d = dist(point, {x: size.w, y: size.h});
      return Math.max(tl_d, tr_d, bl_d, br_d);
    }

    Polymer('paper-ripple', {

      /**
       * The initial opacity set on the wave.
       *
       * @attribute initialOpacity
       * @type number
       * @default 0.25
       */
      initialOpacity: 0.25,

      /**
       * How fast (opacity per second) the wave fades out.
       *
       * @attribute opacityDecayVelocity
       * @type number
       * @default 0.8
       */
      opacityDecayVelocity: 0.8,

      backgroundFill: true,
      pixelDensity: 2,

      eventDelegates: {
        down: 'downAction',
        up: 'upAction'
      },

      ready: function() {
        this.waves = [];
      },

      downAction: function(e) {
        var wave = createWave(this);

        this.cancelled = false;
        wave.isMouseDown = true;
        wave.tDown = 0.0;
        wave.tUp = 0.0;
        wave.mouseUpStart = 0.0;
        wave.mouseDownStart = now();

        var rect = this.getBoundingClientRect();
        var width = rect.width;
        var height = rect.height;
        var touchX = e.x - rect.left;
        var touchY = e.y - rect.top;

        wave.startPosition = {x:touchX, y:touchY};

        if (this.classList.contains("recenteringTouch")) {
          wave.endPosition = {x: width / 2,  y: height / 2};
          wave.slideDistance = dist(wave.startPosition, wave.endPosition);
        }
        wave.containerSize = Math.max(width, height);
        wave.containerWidth = width;
        wave.containerHeight = height;
        wave.maxRadius = distanceFromPointToFurthestCorner(wave.startPosition, {w: width, h: height});

        // The wave is circular so constrain its container to 1:1
        wave.wc.style.top = (wave.containerHeight - wave.containerSize) / 2 + 'px';
        wave.wc.style.left = (wave.containerWidth - wave.containerSize) / 2 + 'px';
        wave.wc.style.width = wave.containerSize + 'px';
        wave.wc.style.height = wave.containerSize + 'px';

        this.waves.push(wave);

        if (!this._loop) {
          this._loop = this.animate.bind(this, {
            width: width,
            height: height
          });
          requestAnimationFrame(this._loop);
        }
        // else there is already a rAF
      },

      upAction: function() {
        for (var i = 0; i < this.waves.length; i++) {
          // Declare the next wave that has mouse down to be mouse'ed up.
          var wave = this.waves[i];
          if (wave.isMouseDown) {
            wave.isMouseDown = false
            wave.mouseUpStart = now();
            wave.mouseDownStart = 0;
            wave.tUp = 0.0;
            break;
          }
        }
        this._loop && requestAnimationFrame(this._loop);
      },

      cancel: function() {
        this.cancelled = true;
      },

      animate: function(ctx) {
        var shouldRenderNextFrame = false;

        var deleteTheseWaves = [];
        // The oldest wave's touch down duration
        var longestTouchDownDuration = 0;
        var longestTouchUpDuration = 0;
        // Save the last known wave color
        var lastWaveColor = null;
        // wave animation values
        var anim = {
          initialOpacity: this.initialOpacity,
          opacityDecayVelocity: this.opacityDecayVelocity,
          height: ctx.height,
          width: ctx.width
        }

        for (var i = 0; i < this.waves.length; i++) {
          var wave = this.waves[i];

          if (wave.mouseDownStart > 0) {
            wave.tDown = now() - wave.mouseDownStart;
          }
          if (wave.mouseUpStart > 0) {
            wave.tUp = now() - wave.mouseUpStart;
          }

          // Determine how long the touch has been up or down.
          var tUp = wave.tUp;
          var tDown = wave.tDown;
          longestTouchDownDuration = Math.max(longestTouchDownDuration, tDown);
          longestTouchUpDuration = Math.max(longestTouchUpDuration, tUp);

          // Obtain the instantenous size and alpha of the ripple.
          var radius = waveRadiusFn(tDown, tUp, anim);
          var waveAlpha =  waveOpacityFn(tDown, tUp, anim);
          var waveColor = cssColorWithAlpha(wave.waveColor, waveAlpha);
          lastWaveColor = wave.waveColor;

          // Position of the ripple.
          var x = wave.startPosition.x;
          var y = wave.startPosition.y;

          // Ripple gravitational pull to the center of the canvas.
          if (wave.endPosition) {

            // This translates from the origin to the center of the view  based on the max dimension of  
            var translateFraction = Math.min(1, radius / wave.containerSize * 2 / Math.sqrt(2) );

            x += translateFraction * (wave.endPosition.x - wave.startPosition.x);
            y += translateFraction * (wave.endPosition.y - wave.startPosition.y);
          }

          // If we do a background fill fade too, work out the correct color.
          var bgFillColor = null;
          if (this.backgroundFill) {
            var bgFillAlpha = waveOuterOpacityFn(tDown, tUp, anim);
            bgFillColor = cssColorWithAlpha(wave.waveColor, bgFillAlpha);
          }

          // Draw the ripple.
          drawRipple(wave, x, y, radius, waveAlpha, bgFillAlpha);

          // Determine whether there is any more rendering to be done.
          var maximumWave = waveAtMaximum(wave, radius, anim);
          var waveDissipated = waveDidFinish(wave, radius, anim);
          var shouldKeepWave = !waveDissipated || maximumWave;
          var shouldRenderWaveAgain = !waveDissipated && !maximumWave;
          shouldRenderNextFrame = shouldRenderNextFrame || shouldRenderWaveAgain;
          if (!shouldKeepWave || this.cancelled) {
            deleteTheseWaves.push(wave);
          }
       }

        if (shouldRenderNextFrame) {
          requestAnimationFrame(this._loop);
        }

        for (var i = 0; i < deleteTheseWaves.length; ++i) {
          var wave = deleteTheseWaves[i];
          removeWaveFromScope(this, wave);
        }

        if (!this.waves.length && this._loop) {
          // clear the background color
          this.$.bg.style.backgroundColor = null;
          this._loop = null;
          this.fire('core-transitionend');
        }
      }

    });

  })();

;

    Polymer('paper-shadow', {

      publish: {
        /**
         * If set, the shadow is applied to this node.
         *
         * @attribute target
         * @type Element
         * @default null
         */
        target: {value: null, reflect: true},

        /**
         * The z-depth of this shadow, from 0-5.
         *
         * @attribute z
         * @type number
         * @default 1
         */
        z: {value: 1, reflect: true},

        /**
         * If true, the shadow animates between z-depth changes.
         *
         * @attribute animated
         * @type boolean
         * @default false
         */
        animated: {value: false, reflect: true},

        /**
         * Workaround: getComputedStyle is wrong sometimes so `paper-shadow`
         * may overwrite the `position` CSS property. Set this property to
         * true to prevent this.
         *
         * @attribute hasPosition
         * @type boolean
         * @default false
         */
        hasPosition: false
      },

      // NOTE: include template so that styles are loaded, but remove
      // so that we can decide dynamically what part to include
      registerCallback: function(polymerElement) {
        var template = polymerElement.querySelector('template');
        this._style = template.content.querySelector('style');
        this._style.removeAttribute('no-shim');
      },

      fetchTemplate: function() {
        return null;
      },

      attached: function() {
        // If no target is bound at attach, default the target to the parent
        // element or shadow host.
        if (!this.target) {
          if (!this.parentElement && this.parentNode.host) {
            this.target = this.parentNode.host;
          } else if (this.parentElement && (window.ShadowDOMPolyfill ? this.parentElement !== wrap(document.body) : this.parentElement !== document.body)) {
            this.target = this.parentElement;
          }
        }
      },

      targetChanged: function(old) {
        if (old) {
          this.removeShadow(old);
        }
        if (this.target) {
          this.addShadow(this.target);
        }
      },

      zChanged: function(old) {
        if (this.target && this.target._paperShadow) {
          var shadow = this.target._paperShadow;
          ['top', 'bottom'].forEach(function(s) {
            shadow[s].classList.remove('paper-shadow-' + s + '-z-' + old);
            shadow[s].classList.add('paper-shadow-' + s + '-z-' + this.z);
          }.bind(this));
        }
      },

      animatedChanged: function() {
        if (this.target && this.target._paperShadow) {
          var shadow = this.target._paperShadow;
          ['top', 'bottom'].forEach(function(s) {
            if (this.animated) {
              shadow[s].classList.add('paper-shadow-animated');
            } else {
              shadow[s].classList.remove('paper-shadow-animated');
            }
          }.bind(this));
        }
      },

      addShadow: function(node) {
        if (node._paperShadow) {
          return;
        }

        if (!node._hasShadowStyle) {
          if (!node.shadowRoot) {
            node.createShadowRoot().innerHTML = '<content></content>';
          }
          this.installScopeStyle(this._style, 'shadow', node.shadowRoot);
          node._hasShadowStyle = true;
        }

        var computed = getComputedStyle(node);
        if (!this.hasPosition && computed.position === 'static') {
          node.style.position = 'relative';
        }
        node.style.overflow = 'visible';

        // Both the top and bottom shadows are children of the target, so
        // it does not affect the classes and CSS properties of the target.
        ['top', 'bottom'].forEach(function(s) {
          var inner = (node._paperShadow && node._paperShadow[s]) || document.createElement('div');
          inner.classList.add('paper-shadow');
          inner.classList.add('paper-shadow-' + s + '-z-' + this.z);
          if (this.animated) {
            inner.classList.add('paper-shadow-animated');
          }

          if (node.shadowRoot) {
            node.shadowRoot.insertBefore(inner, node.shadowRoot.firstChild);
          } else {
            node.insertBefore(inner, node.firstChild);
          }

          node._paperShadow = node._paperShadow || {};
          node._paperShadow[s] = inner;
        }.bind(this));

      },

      removeShadow: function(node) {
        if (!node._paperShadow) {
          return;
        }

        ['top', 'bottom'].forEach(function(s) {
          node._paperShadow[s].remove();
        });
        node._paperShadow = null;

        node.style.position = null;
      }

    });
  ;

    Polymer('paper-button', {

      publish: {

        /**
         * The label of the button.
         *
         * @attribute label
         * @type string
         * @default ''
         */
        label: '',

        /**
         * If true, the button will be styled as a "raised" button.
         *
         * @attribute raisedButton
         * @type boolean
         * @default false
         */
        raisedButton: {value: false, reflect: true},

        /**
         * (optional) The URL of an image for an icon to use in the button.
         * Should not use `icon` property if you are using this property.
         *
         * @attribute iconSrc
         * @type string
         * @default ''
         */
         iconSrc: '',

         /**
          * (optional) Specifies the icon name or index in the set of icons
          * available in the icon set. If using this property, load the icon
          * set separately where the icon is used. Should not use `src`
          * if you are using this property.
          *
          * @attribute icon
          * @type string
          * @default ''
          */
         icon: ''

      },

      z: 1,

      attached: function() {
        if (this.textContent && this.textContent.match(/\S+/)) {
          console.warn('Using textContent to label the button is deprecated. Use the "label" property instead');
          this.label = this.textContent;
        }
      },

      activeChanged: function() {
        this.super();

        if (this.active) {
          // FIXME: remove when paper-ripple can have a default 'down' state.
          if (!this.lastEvent) {
            var rect = this.getBoundingClientRect();
            this.lastEvent = {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2
            }
          }
          this.$.ripple.downAction(this.lastEvent);
        } else {
          this.$.ripple.upAction();
        }
        this.adjustZ();
      },

      focusedChanged: function() {
        this.super();
        this.adjustZ();
      },

      disabledChanged: function() {
        this.super();
        this.adjustZ();
      },

      // waitForSpillCompleted: function(callback) {
      //   this.async(callback, null, (this.$.ink.spillCompleted ? 0 : this.duration));
      // },

      // resetInk: function() {
      //   this.active = false;
      //   this.$.ink.reset();
      // },

      insideButton: function(x, y) {
        var rect = this.getBoundingClientRect();
        return (rect.left <= x) && (x <= rect.right) && (rect.top <= y) && (y <= rect.bottom);
      },

      adjustZ: function() {
        if (this.focused) {
          this.classList.add('paper-shadow-animate-z-1-z-2');
        } else {
          this.classList.remove('paper-shadow-animate-z-1-z-2');

          if (this.active) {
            this.z = 2;
          } else if (this.disabled) {
            this.z = 0;
          } else {
            this.z = 1;
          }

        }
      },

      downAction: function(e) {
        this.super(e);
        this.lastEvent = e;
      },

      labelChanged: function() {
        this.setAttribute('aria-label', this.label);
      }

    });
  ;

  
    Polymer('paper-icon-button', {

      publish: {

        /**
         * If true, the ripple expands to a square to fill the containing box.
         *
         * @attribute fill
         * @type boolean
         * @default false
         */
        fill: {value: false, reflect: true}

      },

      ready: function() {
        this.$.ripple.classList.add('recenteringTouch');
        this.fillChanged();
      },

      fillChanged: function() {
        this.$.ripple.classList.toggle('circle', !this.fill);
      },

      iconChanged: function(oldIcon) {
        if (!this.label) {
          this.setAttribute('aria-label', this.icon);
        }
      }

    });
    
  ;

  (function() {
    /*
     * Chrome uses an older version of DOM Level 3 Keyboard Events
     *
     * Most keys are labeled as text, but some are Unicode codepoints.
     * Values taken from: http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/keyset.html#KeySet-Set
     */
    var KEY_IDENTIFIER = {
      'U+0009': 'tab',
      'U+001B': 'esc',
      'U+0020': 'space',
      'U+002A': '*',
      'U+0030': '0',
      'U+0031': '1',
      'U+0032': '2',
      'U+0033': '3',
      'U+0034': '4',
      'U+0035': '5',
      'U+0036': '6',
      'U+0037': '7',
      'U+0038': '8',
      'U+0039': '9',
      'U+0041': 'a',
      'U+0042': 'b',
      'U+0043': 'c',
      'U+0044': 'd',
      'U+0045': 'e',
      'U+0046': 'f',
      'U+0047': 'g',
      'U+0048': 'h',
      'U+0049': 'i',
      'U+004A': 'j',
      'U+004B': 'k',
      'U+004C': 'l',
      'U+004D': 'm',
      'U+004E': 'n',
      'U+004F': 'o',
      'U+0050': 'p',
      'U+0051': 'q',
      'U+0052': 'r',
      'U+0053': 's',
      'U+0054': 't',
      'U+0055': 'u',
      'U+0056': 'v',
      'U+0057': 'w',
      'U+0058': 'x',
      'U+0059': 'y',
      'U+005A': 'z',
      'U+007F': 'del'
    };

    /*
     * Special table for KeyboardEvent.keyCode.
     * KeyboardEvent.keyIdentifier is better, and KeyBoardEvent.key is even better than that
     *
     * Values from: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent.keyCode#Value_of_keyCode
     */
    var KEY_CODE = {
      13: 'enter',
      27: 'esc',
      33: 'pageup',
      34: 'pagedown',
      35: 'end',
      36: 'home',
      32: 'space',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      46: 'del',
      106: '*'
    };

    /*
     * KeyboardEvent.key is mostly represented by printable character made by the keyboard, with unprintable keys labeled
     * nicely.
     *
     * However, on OS X, Alt+char can make a Unicode character that follows an Apple-specific mapping. In this case, we
     * fall back to .keyCode.
     */
    var KEY_CHAR = /[a-z0-9*]/;

    function transformKey(key) {
      var validKey = '';
      if (key) {
        var lKey = key.toLowerCase();
        if (lKey.length == 1) {
          if (KEY_CHAR.test(lKey)) {
            validKey = lKey;
          }
        } else if (lKey == 'multiply') {
          // numpad '*' can map to Multiply on IE/Windows
          validKey = '*';
        } else {
          validKey = lKey;
        }
      }
      return validKey;
    }

    var IDENT_CHAR = /U\+/;
    function transformKeyIdentifier(keyIdent) {
      var validKey = '';
      if (keyIdent) {
        if (IDENT_CHAR.test(keyIdent)) {
          validKey = KEY_IDENTIFIER[keyIdent];
        } else {
          validKey = keyIdent.toLowerCase();
        }
      }
      return validKey;
    }

    function transformKeyCode(keyCode) {
      var validKey = '';
      if (Number(keyCode)) {
        if (keyCode >= 65 && keyCode <= 90) {
          // ascii a-z
          // lowercase is 32 offset from uppercase
          validKey = String.fromCharCode(32 + keyCode);
        } else if (keyCode >= 112 && keyCode <= 123) {
          // function keys f1-f12
          validKey = 'f' + (keyCode - 112);
        } else if (keyCode >= 48 && keyCode <= 57) {
          // top 0-9 keys
          validKey = String(48 - keyCode);
        } else if (keyCode >= 96 && keyCode <= 105) {
          // num pad 0-9
          validKey = String(96 - keyCode);
        } else {
          validKey = KEY_CODE[keyCode];
        }
      }
      return validKey;
    }

    function keyboardEventToKey(ev) {
      // fall back from .key, to .keyIdentifier, and then to .keyCode
      var normalizedKey = transformKey(ev.key) || transformKeyIdentifier(ev.keyIdentifier) || transformKeyCode(ev.keyCode) || '';
      return {
        shift: ev.shiftKey,
        ctrl: ev.ctrlKey,
        meta: ev.metaKey,
        alt: ev.altKey,
        key: normalizedKey
      };
    }

    /*
     * Input: ctrl+shift+f7 => {ctrl: true, shift: true, key: 'f7'}
     * ctrl/space => {ctrl: true} || {key: space}
     */
    function stringToKey(keyCombo) {
      var keys = keyCombo.split('+');
      var keyObj = Object.create(null);
      keys.forEach(function(key) {
        if (key == 'shift') {
          keyObj.shift = true;
        } else if (key == 'ctrl') {
          keyObj.ctrl = true;
        } else if (key == 'alt') {
          keyObj.alt = true;
        } else {
          keyObj.key = key;
        }
      });
      return keyObj;
    }

    function keyMatches(a, b) {
      return Boolean(a.alt) == Boolean(b.alt) && Boolean(a.ctrl) == Boolean(b.ctrl) && Boolean(a.shift) == Boolean(b.shift) && a.key === b.key;
    }

    /**
     * Fired when a keycombo in `keys` is pressed.
     *
     * @event keys-pressed
     */
    function processKeys(ev) {
      var current = keyboardEventToKey(ev);
      for (var i = 0, dk; i < this._desiredKeys.length; i++) {
        dk = this._desiredKeys[i];
        if (keyMatches(dk, current)) {
          ev.preventDefault();
          ev.stopPropagation();
          this.fire('keys-pressed', current, this, false);
          break;
        }
      }
    }

    function listen(node, handler) {
      if (node && node.addEventListener) {
        node.addEventListener('keydown', handler);
      }
    }

    function unlisten(node, handler) {
      if (node && node.removeEventListener) {
        node.removeEventListener('keydown', handler);
      }
    }

    Polymer('core-a11y-keys', {
      created: function() {
        this._keyHandler = processKeys.bind(this);
      },
      attached: function() {
        listen(this.target, this._keyHandler);
      },
      detached: function() {
        unlisten(this.target, this._keyHandler);
      },
      publish: {
        /**
         * The set of key combinations to listen for.
         *
         * @attribute keys
         * @type string (keys syntax)
         * @default ''
         */
        keys: '',
        /**
         * The node that will fire keyboard events.
         *
         * @attribute target
         * @type Node
         * @default null
         */
        target: null
      },
      keysChanged: function() {
        // * can have multiple mappings: shift+8, * on numpad or Multiply on numpad
        var normalized = this.keys.replace('*', '* shift+*');
        this._desiredKeys = normalized.toLowerCase().split(' ').map(stringToKey);
      },
      targetChanged: function(oldTarget) {
        unlisten(oldTarget, this._keyHandler);
        listen(this.target, this._keyHandler);
      }
    });
  })();
;


  Polymer('core-range', {
    
    /**
     * The number that represents the current value.
     *
     * @attribute value
     * @type number
     * @default 0
     */
    value: 0,
    
    /**
     * The number that indicates the minimum value of the range.
     *
     * @attribute min
     * @type number
     * @default 0
     */
    min: 0,
    
    /**
     * The number that indicates the maximum value of the range.
     *
     * @attribute max
     * @type number
     * @default 100
     */
    max: 100,
    
    /**
     * Specifies the value granularity of the range's value.
     *
     * @attribute step
     * @type number
     * @default 1
     */
    step: 1,
    
    /**
     * Returns the ratio of the value.
     *
     * @attribute ratio
     * @type number
     * @default 0
     */
    ratio: 0,
    
    observe: {
      'value min max step': 'update'
    },
    
    calcRatio: function(value) {
      return (this.clampValue(value) - this.min) / (this.max - this.min);
    },
    
    clampValue: function(value) {
      return Math.min(this.max, Math.max(this.min, this.calcStep(value)));
    },
    
    calcStep: function(value) {
      return this.step ? (Math.round(value / this.step) / (1 / this.step)) : value;
    },
    
    validateValue: function() {
      var v = this.clampValue(this.value);
      this.value = this.oldValue = isNaN(v) ? this.oldValue : v;
      return this.value !== v;
    },
    
    update: function() {
      this.validateValue();
      this.ratio = this.calcRatio(this.value) * 100;
    }
    
  });
  
;


    Polymer('paper-progress', {

      vertical: false,

      axis: 'x',
      crossAxis: 'y',
      dimension: 'width',
      crossDimension: 'height',
      offset: 'offsetWidth',
      start: 'left',
      crossStart: 'bottom',
      edge: 'right',
      crossEdge: 'top',

      verticalChanged: function(wasVertical, isVertical) {
        var values = isVertical
          ? {
            axis: 'y',
            crossAxis: 'x',
            dimension: 'height',
            crossDimension: 'width',
            offset: 'offsetHeight',
            start: 'bottom',
            crossStart: 'left',
            edge: 'top',
            crossEdge: 'right'
          }
          : {
            axis: 'x',
            crossAxis: 'y',
            dimension: 'width',
            crossDimension: 'height',
            offset: 'offsetWidth',
            start: 'left',
            crossStart: 'bottom',
            edge: 'right',
            crossEdge: 'top'
          };

        for (var key in values) {
          this[key] = values[key];
        }
      },

      /**
       * The number that represents the current secondary progress.
       *
       * @attribute secondaryProgress
       * @type number
       * @default 0
       */
      secondaryProgress: 0,

      step: 0,

      observe: {
        'value secondaryProgress min max': 'update'
      },

      update: function() {
        this.super();
        this.secondaryProgress = this.clampValue(this.secondaryProgress);
        this.secondaryRatio = this.calcRatio(this.secondaryProgress) * 100;
      }

    });

  ;


    Polymer('core-input', {
      publish: {
        /**
         * Placeholder text that hints to the user what can be entered in
         * the input.
         *
         * @attribute placeholder
         * @type string
         * @default ''
         */
        placeholder: '',
  
        /**
         * If true, this input cannot be focused and the user cannot change
         * its value.
         *
         * @attribute disabled
         * @type boolean
         * @default false
         */
        disabled: false,
  
        /**
         * If true, the user cannot modify the value of the input.
         *
         * @attribute readonly
         * @type boolean
         * @default false
         */
        readonly: false,

        /**
         * If true, this input will automatically gain focus on page load.
         *
         * @attribute autofocus
         * @type boolean
         * @default false
         */
        autofocus: false,

        /**
         * If true, this input accepts multi-line input like a `<textarea>`
         *
         * @attribute multiline
         * @type boolean
         * @default false
         */
        multiline: false,
  
        /**
         * (multiline only) The height of this text input in rows. The input
         * will scroll internally if more input is entered beyond the size
         * of the component. This property is meaningless if multiline is
         * false. You can also set this property to "fit" and size the
         * component with CSS to make the input fit the CSS size.
         *
         * @attribute rows
         * @type number|'fit'
         * @default 'fit'
         */
        rows: 'fit',
  
        /**
         * The current value of this input. Changing inputValue programmatically
         * will cause value to be out of sync. Instead, change value directly
         * or call commit() after changing inputValue.
         *
         * @attribute inputValue
         * @type string
         * @default ''
         */
        inputValue: '',
  
        /**
         * The value of the input committed by the user, either by changing the
         * inputValue and blurring the input, or by hitting the `enter` key.
         *
         * @attribute value
         * @type string
         * @default ''
         */
        value: '',

        /**
         * Set the input type. Not supported for `multiline`.
         *
         * @attribute type
         * @type string
         * @default text
         */
        type: 'text',

        /**
         * If true, the input is invalid if its value is null.
         *
         * @attribute required
         * @type boolean
         * @default false
         */
        required: false,

        /**
         * A regular expression to validate the input value against. See
         * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes
         * for more info. Not supported if `multiline` is true.
         *
         * @attribute pattern
         * @type string
         * @default '.*'
         */
        // FIXME(yvonne): The default is set to .* because we can't bind to pattern such
        // that the attribute is unset if pattern is null.
        pattern: '.*',

        /**
         * If set, the input is invalid if the value is less than this property. See
         * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes
         * for more info. Not supported if `multiline` is true.
         *
         * @attribute min
         */
        min: null,

        /**
         * If set, the input is invalid if the value is greater than this property. See
         * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes
         * for more info. Not supported if `multiline` is true.
         *
         * @attribute max
         */
        max: null,

        /**
         * If set, the input is invalid if the value is not `min` plus an integral multiple
         * of this property. See
         * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes
         * for more info. Not supported if `multiline` is true.
         *
         * @attribute step
         */
        step: null,

        /**
         * The maximum length of the input value.
         *
         * @attribute maxlength
         * @type number
         */
        maxlength: null,
  
        /**
         * If this property is true, the text input's inputValue failed validation.
         *
         * @attribute invalid
         * @type boolean
         * @default false
         */
        invalid: false,

        /**
         * If this property is true, validate the input as they are entered.
         *
         * @attribute validateImmediately
         * @type boolean
         * @default true
         */
        validateImmediately: true
      },

      ready: function() {
        this.handleTabindex(this.getAttribute('tabindex'));
      },

      disabledChanged: function() {
        if (this.disabled) {
          this.setAttribute('aria-disabled', true);
        } else {
          this.removeAttribute('aria-disabled');
        }
      },

      invalidChanged: function() {
        this.classList.toggle('invalid', this.invalid);
        this.fire('input-'+ (this.invalid ? 'invalid' : 'valid'), {value: this.inputValue});
      },

      inputValueChanged: function() {
        if (this.validateImmediately) {
          this.updateValidity_();
        }
      },

      valueChanged: function() {
        this.inputValue = this.value;
      },

      requiredChanged: function() {
        if (this.validateImmediately) {
          this.updateValidity_();
        }
      },

      attributeChanged: function(attr, oldVal, curVal) {
        if (attr === 'tabindex') {
          this.handleTabindex(curVal);
        }
      },

      handleTabindex: function(tabindex) {
        if (tabindex > 0) {
          this.$.input.setAttribute('tabindex', -1);
        } else {
          this.$.input.removeAttribute('tabindex');
        }
      },

      /**
       * Commits the inputValue to value.
       *
       * @method commit
       */
      commit: function() {
         this.value = this.inputValue;
      },

      updateValidity_: function() {
        if (this.$.input.willValidate) {
          this.invalid = !this.$.input.validity.valid;
        }
      },

      keypressAction: function(e) {
        // disallow non-numeric input if type = number
        if (this.type !== 'number') {
          return;
        }
        var c = String.fromCharCode(e.charCode);
        if (e.charCode !== 0 && !c.match(/[\d-\.e]/)) {
          e.preventDefault();
        }
      },

      inputChangeAction: function() {
        this.commit();
        if (!window.ShadowDOMPolyfill) {
          // re-fire event that does not bubble across shadow roots
          this.fire('change', null, this);
        }
      },

      focusAction: function(e) {
        if (this.getAttribute('tabindex') > 0) {
          // Forward focus to the inner input if tabindex is set on the element
          // This will not cause an infinite loop because focus will not fire on the <input>
          // again if it's already focused.
          this.$.input.focus();
        }
      },

      inputFocusAction: function(e) {
        if (window.ShadowDOMPolyfill) {
          // re-fire non-bubbling event if polyfill
          this.fire('focus', null, this, false);
        }
      },

      inputBlurAction: function() {
        if (window.ShadowDOMPolyfill) {
          // re-fire non-bubbling event
          this.fire('blur', null, this, false);
        }
      },

      /**
       * Forwards to the internal input / textarea element.
       *
       * @method blur
       */
      blur: function() {
        this.$.input.blur();
      },

      /**
       * Forwards to the internal input / textarea element.
       *
       * @method click
       */
      click: function() {
        this.$.input.click();
      },

      /**
       * Forwards to the internal input / textarea element.
       *
       * @method focus
       */
      focus: function() {
        this.$.input.focus();
      },

      /**
       * Forwards to the internal input / textarea element.
       *
       * @method select
       */
      select: function() {
        this.$.input.select();
      },

      /**
       * Forwards to the internal input / textarea element.
       *
       * @method setSelectionRange
       * @param {number} selectionStart
       * @param {number} selectionEnd
       * @param {String} selectionDirection (optional)
       */
      setSelectionRange: function(selectionStart, selectionEnd, selectionDirection) {
        this.$.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
      },

      /**
       * Forwards to the internal input element, not implemented for multiline.
       *
       * @method setRangeText
       * @param {String} replacement
       * @param {number} start (optional)
       * @param {number} end (optional)
       * @param {String} selectMode (optional)
       */
      setRangeText: function(replacement, start, end, selectMode) {
        if (!this.multiline) {
          this.$.input.setRangeText(replacement, start, end, selectMode);
        }
      },

      /**
       * Forwards to the internal input, not implemented for multiline.
       *
       * @method stepDown
       * @param {number} n (optional)
       */
      stepDown: function(n) {
        if (!this.multiline) {
          this.$.input.stepDown(n);
        }
      },

      /**
       * Forwards to the internal input, not implemented for multiline.
       *
       * @method stepUp
       * @param {number} n (optional)
       */
      stepUp: function(n) {
        if (!this.multiline) {
          this.$.input.stepUp(n);
        }
      },

      get willValidate() {
        return this.$.input.willValidate;
      },

      get validity() {
        return this.$.input.validity;
      },

      get validationMessage() {
        return this.$.input.validationMessage;
      },

      /**
       * Forwards to the internal input / textarea element and updates state.
       *
       * @method checkValidity
       * @return {boolean}
       */
      checkValidity: function() {
        var r = this.$.input.checkValidity();
        this.updateValidity_();
        return r;
      },

      /**
       * Forwards to the internal input / textarea element and updates state.
       *
       * @method setCustomValidity
       * @param {number} message
       */
      setCustomValidity: function(message) {
        this.$.input.setCustomValidity(message);
        this.updateValidity_();
      }

    });
  ;


  (function() {

    var paperInput = CoreStyle.g.paperInput = CoreStyle.g.paperInput || {};
    paperInput.focusedColor = '#4059a9';
    paperInput.invalidColor = '#d34336';

    Polymer('paper-input', {

      publish: {
        /**
         * The label for this input. It normally appears as grey text inside
         * the text input and disappears once the user enters text.
         *
         * @attribute label
         * @type string
         * @default ''
         */
        label: '',

        /**
         * If true, the label will "float" above the text input once the
         * user enters text instead of disappearing.
         *
         * @attribute floatingLabel
         * @type boolean
         * @default false
         */
        floatingLabel: false,

        /**
         * (multiline only) If set to a non-zero value, the height of this
         * text input will grow with the value changes until it is maxRows
         * rows tall. If the maximum size does not fit the value, the text
         * input will scroll internally.
         *
         * @attribute maxRows
         * @type number
         * @default 0
         */
        maxRows: 0,

        /**
         * The message to display if the input value fails validation. If this
         * is unset or the empty string, a default message is displayed depending
         * on the type of validation error.
         *
         * @attribute error
         * @type string
         */
        error: '',

        focused: {value: false, reflect: true}

      },

      get inputValueForMirror() {
        var tokens = this.inputValue ? String(this.inputValue).replace(/&/gm, '&amp;').replace(/"/gm, '&quot;').replace(/'/gm, '&#39;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;').split('\n') : [''];

        // Enforce the min and max heights for a multiline input here to
        // avoid measurement
        if (this.multiline) {
          if (this.maxRows && tokens.length > this.maxRows) {
            tokens = tokens.slice(0, this.maxRows);
          }
          while (this.rows && tokens.length < this.rows) {
            tokens.push('');
          }
        }

        return tokens.join('<br>') + '&nbsp;';
      },

      get inputHasValue() {
        // if type = number, the input value is the empty string until a valid number
        // is entered so we must do some hacks here
        return this.inputValue || (this.type === 'number' && !this.validity.valid);
      },

      syncInputValueToMirror: function() {
        this.$.mirror.innerHTML = this.inputValueForMirror;
      },

      ready: function() {
        this.syncInputValueToMirror();
      },

      prepareLabelTransform: function() {
        var toRect = this.$.floatedLabelText.getBoundingClientRect();
        var fromRect = this.$.labelText.getBoundingClientRect();
        if (toRect.width !== 0) {
          var sy = toRect.height / fromRect.height;
          this.$.labelText.cachedTransform =
            'scale3d(' + (toRect.width / fromRect.width) + ',' + sy + ',1) ' +
            'translate3d(0,' + (toRect.top - fromRect.top) / sy + 'px,0)';
        }
      },

      animateFloatingLabel: function() {
        if (!this.floatingLabel || this.labelAnimated) {
          return;
        }

        if (!this.$.labelText.cachedTransform) {
          this.prepareLabelTransform();
        }

        // If there's still no cached transform, the input is invisible so don't
        // do the animation.
        if (!this.$.labelText.cachedTransform) {
          return;
        }

        this.labelAnimated = true;
        // Handle interrupted animation
        this.async(function() {
          this.transitionEndAction();
        }, null, 250);

        if (this.inputHasValue) {
          this.$.labelText.style.webkitTransform = this.$.labelText.cachedTransform;
          this.$.labelText.style.transform = this.$.labelText.cachedTransform;
        } else {
          // Handle if the label started out floating
          if (!this.$.labelText.style.webkitTransform && !this.$.labelText.style.transform) {
            this.$.labelText.style.webkitTransform = this.$.labelText.cachedTransform;
            this.$.labelText.style.transform = this.$.labelText.cachedTransform;
            this.$.labelText.offsetTop;
          }
          this.$.labelText.style.webkitTransform = '';
          this.$.labelText.style.transform = '';
        }
      },

      inputValueChanged: function(old) {
        this.super();

        this.syncInputValueToMirror();
        if (old && !this.inputValue || !old && this.inputValue) {
          this.animateFloatingLabel();
        }
      },

      placeholderChanged: function() {
        this.label = this.placeholder;
      },

      inputFocusAction: function() {
        this.super(arguments);
        this.focused = true;
      },

      inputBlurAction: function(e) {
        this.super(arguments);
        this.focused = false;
      },

      downAction: function(e) {
        if (this.disabled) {
          return;
        }

        if (this.focused) {
          return;
        }

        this.$.input.focus();
        // prevent self-focus
        e.preventDefault();

        // The underline spills from the tap location
        var rect = this.$.underline.getBoundingClientRect();
        var right = e.x - rect.left;
        this.$.focusedUnderline.style.mozTransformOrigin = right + 'px';
        this.$.focusedUnderline.style.webkitTransformOrigin = right + 'px ';
        this.$.focusedUnderline.style.transformOriginX = right + 'px';

        // Animations only run when the user interacts with the input
        this.underlineAnimated = true;

        // Cursor animation only runs if the input is empty
        if (!this.inputHasValue) {
          this.cursorAnimated = true;
        }
        // Handle interrupted animation
        this.async(function() {
          this.transitionEndAction();
        }, null, 250);
      },

      keydownAction: function() {
        this.super();

        // more type = number hacks. see core-input for more info
        if (this.type === 'number') {
          var valid = !this.inputValue && this.validity.valid;
          this.async(function() {
            if (valid !== (!this.inputValue && this.validity.valid)) {
              this.animateFloatingLabel();
            }
          });
        }
      },

      transitionEndAction: function() {
        this.underlineAnimated = false;
        this.cursorAnimated = false;
        this.labelAnimated = false;
      }

    });

  }());

  ;


  Polymer('paper-slider', {

    vertical: false,

    axis: 'x',
    crossAxis: 'y',
    dimension: 'width',
    crossDimension: 'height',
    offset: 'offsetWidth',
    start: 'left',
    crossStart: 'bottom',
    edge: 'right',
    crossEdge: 'top',

    verticalChanged: function(wasVertical, isVertical) {
      var values = isVertical
        ? {
          axis: 'y',
          crossAxis: 'x',
          dimension: 'height',
          crossDimension: 'width',
          offset: 'offsetHeight',
          start: 'bottom',
          crossStart: 'left',
          edge: 'top',
          crossEdge: 'right'
        }
        : {
          axis: 'x',
          crossAxis: 'y',
          dimension: 'width',
          crossDimension: 'height',
          offset: 'offsetWidth',
          start: 'left',
          crossStart: 'bottom',
          edge: 'right',
          crossEdge: 'top'
        };

      for (var key in values) {
        this[key] = values[key];
      }
    },

    /**
     * Fired when the slider's value changes.
     *
     * @event core-change
     */

    /**
     * Fired when the slider's value changes due to user interaction.
     *
     * Changes to the slider's value due to changes in an underlying
     * bound variable will not trigger this event.
     *
     * @event change
     */

    /**
     * If true, the slider thumb snaps to tick marks evenly spaced based
     * on the `step` property value.
     *
     * @attribute snaps
     * @type boolean
     * @default false
     */
    snaps: false,

    /**
     * If true, a pin with numeric value label is shown when the slider thumb
     * is pressed.  Use for settings for which users need to know the exact
     * value of the setting.
     *
     * @attribute pin
     * @type boolean
     * @default false
     */
    pin: false,

    /**
     * If true, this slider is disabled.  A disabled slider cannot be tapped
     * or dragged to change the slider value.
     *
     * @attribute disabled
     * @type boolean
     * @default false
     */
    disabled: false,

    /**
     * The number that represents the current secondary progress.
     *
     * @attribute secondaryProgress
     * @type number
     * @default 0
     */
    secondaryProgress: 0,

    /**
     * If true, an input is shown and user can use it to set the slider value.
     *
     * @attribute editable
     * @type boolean
     * @default false
     */
    editable: false,

    /**
     * The immediate value of the slider.  This value is updated while the user
     * is dragging the slider.
     *
     * @attribute immediateValue
     * @type number
     * @default 0
     */

    observe: {
      'min max step snaps': 'update'
    },

    ready: function() {
      this.verticalChanged(false, this.vertical);
      this.update();
    },

    update: function() {
      this.positionKnob(this.calcRatio(this.value));
      this.updateMarkers();
    },

    valueChanged: function() {
      this.update();
      this.fire('core-change');
    },

    immediateValueChanged: function() {
      if (!this.dragging) {
        this.value = this.immediateValue;
      }
    },

    expandKnob: function() {
      this.expand = true;
    },

    resetKnob: function() {
      this.expandJob && this.expandJob.stop();
      this.expand = false;
    },

    positionKnob: function(ratio) {
      this.immediateValue = this.calcStep(this.calcKnobPosition(ratio)) || 0;
      this._ratio = this.snaps ? this.calcRatio(this.immediateValue) : ratio;
      this.$.sliderKnob.style[this.start] = this._ratio * 100 + '%';
    },

    inputChange: function() {
      this.value = this.$.input.value;
      this.fire('change');
    },

    calcKnobPosition: function(ratio) {
      return (this.max - this.min) * ratio + this.min;
    },

    trackStart: function(e) {
      this._w = this.$.sliderBar[this.offset];
      this._x = this._ratio * this._w;
      this._startx = this._x || 0;
      this._minx = - this._startx;
      this._maxx = this._w - this._startx;
      this.$.sliderKnob.classList.add('dragging');
      this.dragging = true;
      e.preventTap();
    },

    track: function(e) {
      if (e.type !== 'track' + this.axis) {
        return;
      }
      var delta = (this.vertical ? -1 : 1) * e['d'+this.axis];
      var x = Math.min(this._maxx, Math.max(this._minx, delta));
      this._x = this._startx + x;
      this.immediateValue = this.calcStep(
          this.calcKnobPosition(this._x / this._w)) || 0;
      var s =  this.$.sliderKnob.style;
      var offset = (this.snaps ?
          (this.calcRatio(this.immediateValue) * this._w) - this._startx : x);
      offset = (this.vertical ? -1 : 1) * offset + 'px';
      s.transform = s.webkitTransform = 'translate3d('
          + (this.vertical ? '0, ' + offset : offset + ', 0') + ', 0)';
    },

    trackEnd: function() {
      var s =  this.$.sliderKnob.style;
      s.transform = s.webkitTransform = '';
      this.$.sliderKnob.classList.remove('dragging');
      this.dragging = false;
      this.resetKnob();
      this.value = this.immediateValue;
      this.fire('change');
    },

    bardown: function(e) {
      this.transiting = true;
      this._w = this.$.sliderBar[this.offset];
      var rect = this.$.sliderBar.getBoundingClientRect();
      var ratio = (this.vertical ? -1 : 1) * (e[this.axis] - rect[this.start]) / this._w;
      this.positionKnob(ratio);
      this.expandJob = this.job(this.expandJob, this.expandKnob, 60);
      this.fire('change');
    },

    knobTransitionEnd: function(e) {
      if (e.target === this.$.sliderKnob) {
        this.transiting = false;
      }
    },

    updateMarkers: function() {
      this.markers = [], l = (this.max - this.min) / this.step;
      for (var i = 0; i < l; i++) {
        this.markers.push('');
      }
    },

    increment: function() {
      this.value = this.clampValue(this.value + this.step);
    },

    decrement: function() {
      this.value = this.clampValue(this.value - this.step);
    },

    incrementKey: function(ev, keys) {
      if (keys.key === "end") {
        this.value = this.max;
      } else {
        this.increment();
      }
      this.fire('change');
    },

    decrementKey: function(ev, keys) {
      if (keys.key === "home") {
        this.value = this.min;
      } else {
        this.decrement();
      }
      this.fire('change');
    }

  });

;
Polymer('midi-play-bar', {

  player: null,

  // all time values are given in seconds
  offset: 0,
  remaining: 0,
  total: 0,

  // slider is accurate to a hundredth of a second
  resolution: 100,

  playerChanged: function(oldPlayer, newPlayer) {
    var me = this;

    if (oldPlayer) {
      oldPlayer.clearAnimation();
    }

    if (newPlayer) {
      newPlayer.setAnimation(function(data) {
        me.onPlayerUpdate(data);
      });
    }
  },

  loadMidi: function(data) {
    var player = this.player;

    player.currentData = data;
    player.loadMidiFile();
  },

  parseMetadata: function() {
    var data = this.player.data;
    var event;

    for (var i = 0; i < data.length; i++) {
      event = data[i][0].event;

      if (event.type === 'meta' && event.subtype === 'trackName') {
        this.songTitle = event.text;
        return;
      }
    }
  },

  onPlayPause: function() {
    var player = this.player;

    if (player) {
      if (player.playing) {
        player.pause(true);
      }
      else {
        player.resume();
      }
    }
  },

  onPlayerUpdate: function(data) {
    var now = data.now;
    var end = data.end;

    this.offset = now;
    this.remaining = end - now;
    this.total = end;

    if (this.remaining <= 0) {
      this.player.stop();
    }
  },

  pauseForDrag: false,

  onSliderDrag: function() {
    var player = this.player;

    if (player.playing) {
      this.pauseForDrag = true;
      player.pause(true);
    }
  },

  onSliderChange: function(event, data, el) {
    var player = this.player;

    // current time is given in milliseconds
    player.currentTime = el.immediateValue / this.resolution * 1000;

    if (this.pauseForDrag) {
      this.pauseForDrag = false;
      player.resume();
    }
  },

  timeFormat: function(value) {
    var minutes = String(value / 60 >> 0);
    var seconds = String(value - (minutes * 60) >> 0);

    if (seconds.length == 1) {
      // pad with zeroes if necessary
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  }
});;

    Polymer('core-dropdown-overlay',{

      publish: {

        /**
         * The `relatedTarget` is an element used to position the overlay. It should have
         * the same offsetParent as the target.
         *
         * @attribute relatedTarget
         * @type Node
         */
        relatedTarget: null,

        /**
         * The horizontal alignment of the overlay relative to the `relatedTarget`.
         * `left` means the left edges are aligned together and `right` means the right
         * edges are aligned together.
         *
         * @attribute halign
         * @type 'left' | 'right'
         * @default 'auto'
         */
        halign: 'left',

        /**
         * The vertical alignment of the overlay relative to the `relatedTarget`. `top`
         * means the top edges are aligned together and `bottom` means the bottom edges
         * are aligned together.
         *
         * @attribute valign
         * @type 'top' | 'bottom'
         * @default 'top'
         */
        valign: 'top',

        /**
         * A pixel amount around the overlay that will be reserved. It's useful for
         * ensuring that, for example, a shadow displayed outside the overlay will
         * always be visible.
         *
         * @attribute margin
         * @type number
         * @default 0
         */
        margin: 0

      },

      updateTargetDimensions: function() {
        this.measureTarget();
        this.super();
      },

      measureTarget: function() {
        var sizer = this.sizingTarget || this.target;

        /* position offscreen if we're auto-positioning to get the natural width and height of the dropdown */
        sizer.style.position = 'absolute';
        sizer.style.left = '-99999px';
        sizer.style.top = '-99999px';

        var rect = sizer.getBoundingClientRect();

        this._naturalSize = {
          width: rect.width,
          height: rect.height
        };

        sizer.style.position = this.targetStyle.position;
        sizer.style.left = null;
        sizer.style.top = null;
      },

      positionTarget: function() {
        if (!this.relatedTarget) {
          this.super();
          return;
        }

        var t_op = this.target.offsetParent;
        var r_op = this.relatedTarget.offsetParent;
        if (window.ShadowDOMPolyfill) {
          t_op = wrap(t_op);
          r_op = wrap(r_op);
        }

        if (t_op !== r_op && t_op !== this.relatedTarget) {
          console.warn('core-dropdown-overlay: dropdown\'s offsetParent must be the relatedTarget or the relatedTarget\'s offsetParent!');
        }

        // Don't use CSS to handle halign/valign here so _shouldPosition still works.

        var inside = t_op === this.relatedTarget;
        var ref = this.relatedTarget.getBoundingClientRect();

        if (this._shouldPosition.left) {
          var left;
          var ml = -1 * ref.left + (inside ? 0 : this.relatedTarget.offsetLeft) + this.margin;
          if (this.halign === 'right') {
            left = Math.max((inside ? 0 : this.relatedTarget.offsetLeft) + this.relatedTarget.offsetWidth - this._naturalSize.width, ml);
          } else {
            left = inside ? 0 : this.relatedTarget.offsetLeft;
          }
          this.target.style.left = left + 'px';
        }

        if (this._shouldPosition.top) {
          var top;
          var mt = -1 * ref.top + (inside ? 0 : this.relatedTarget.offsetTop) + this.margin;
          if (this.valign === 'bottom') {
            top = Math.max((inside ? 0 : this.relatedTarget.offsetTop) + this.relatedTarget.offsetHeight - this._naturalSize.height, mt);
          } else {
            top = inside ? 0 : this.relatedTarget.offsetTop;
          }
          this.target.style.top = top + 'px';
        }
      },

      sizeTarget: function() {
        var sizer = this.sizingTarget || this.target;

        sizer.style.width = this._naturalSize.width + 'px';
        sizer.style.height = this._naturalSize.height + 'px';

        // XXX: if valign=bottom, maxHeight is too tall

        this.super();
      }

    });
  ;


  Polymer('core-dropdown',{

    publish: {

      /**
       * The element associated with this dropdown, usually the element that triggers
       * the menu.
       *
       * @attribute relatedTarget
       * @type Node
       */
      relatedTarget: null,

      /**
       * If true, the menu is currently visible.
       *
       * @attribute opened
       * @type boolean
       * @default false
       */
      opened: false,

      /**
       * The horizontal alignment of the popup relative to `relatedTarget`. `left`
       * means the left edges are aligned together. `right` means the right edges
       * are aligned together.
       *
       * @attribute halign
       * @type 'left' | 'right'
       * @default 'left'
       */
      halign: 'left',

      /**
       * The vertical alignment of the popup relative to `relatedTarget`. `top` means
       * the top edges are aligned together. `bottom` means the bottom edges are
       * aligned together.
       *
       * @attribute valign
       * @type 'top' | 'bottom'
       * @default 'top'
       */
      valign: 'top',

      /**
       * A pixel amount around the dropdown that will be reserved. It's useful for
       * ensuring that, for example, a shadow displayed outside the dropdown will
       * always be visible.
       *
       * @attribute margin
       * @type number
       * @default 0
       */
      margin: 0,

      /**
       * The transition property specifies a string which identifies a 
       * <a href="../core-transition/">`core-transition`</a> element that 
       * will be used to help the overlay open and close. The default
       * `core-transition-fade` will cause the overlay to fade in and out.
       *
       * @attribute transition
       * @type string
       * @default null
       */
      transition: null

    }

  });

;
Polymer('core-menu');;
/**
 * Copyright 2012 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
'use strict';

var ASSERT_ENABLED = false;
var SVG_NS = 'http://www.w3.org/2000/svg';

function assert(check, message) {
  console.assert(ASSERT_ENABLED,
      'assert should not be called when ASSERT_ENABLED is false');
  console.assert(check, message);
  // Some implementations of console.assert don't actually throw
  if (!check) { throw message; }
}

function detectFeatures() {
  var el = createDummyElement();
  el.style.cssText = 'width: calc(0px);' +
                     'width: -webkit-calc(0px);';
  var calcFunction = el.style.width.split('(')[0];
  function detectProperty(candidateProperties) {
    return [].filter.call(candidateProperties, function(property) {
      return property in el.style;
    })[0];
  }
  var transformProperty = detectProperty([
    'transform',
    'webkitTransform',
    'msTransform']);
  var perspectiveProperty = detectProperty([
    'perspective',
    'webkitPerspective',
    'msPerspective']);
  return {
    calcFunction: calcFunction,
    transformProperty: transformProperty,
    transformOriginProperty: transformProperty + 'Origin',
    perspectiveProperty: perspectiveProperty,
    perspectiveOriginProperty: perspectiveProperty + 'Origin'
  };
}
var features = detectFeatures();

function prefixProperty(property) {
  switch (property) {
    case 'transform':
      return features.transformProperty;
    case 'transformOrigin':
      return features.transformOriginProperty;
    case 'perspective':
      return features.perspectiveProperty;
    case 'perspectiveOrigin':
      return features.perspectiveOriginProperty;
    default:
      return property;
  }
}

function createDummyElement() {
  return document.documentElement.namespaceURI == SVG_NS ?
         document.createElementNS(SVG_NS, 'g') :
         document.createElement('div');
}

var constructorToken = {};
var deprecationsSilenced = {};

var createObject = function(proto, obj) {
  var newObject = Object.create(proto);
  Object.getOwnPropertyNames(obj).forEach(function(name) {
    Object.defineProperty(
        newObject, name, Object.getOwnPropertyDescriptor(obj, name));
  });
  return newObject;
};

var abstractMethod = function() {
  throw 'Abstract method not implemented.';
};

var deprecated = function(name, deprecationDate, advice, plural) {
  if (deprecationsSilenced[name]) {
    return;
  }
  var auxVerb = plural ? 'are' : 'is';
  var today = new Date();
  var cutoffDate = new Date(deprecationDate);
  cutoffDate.setMonth(cutoffDate.getMonth() + 3); // 3 months grace period

  if (today < cutoffDate) {
    console.warn('Web Animations: ' + name +
        ' ' + auxVerb + ' deprecated and will stop working on ' +
        cutoffDate.toDateString() + '. ' + advice);
    deprecationsSilenced[name] = true;
  } else {
    throw new Error(name + ' ' + auxVerb + ' no longer supported. ' + advice);
  }
};

var defineDeprecatedProperty = function(object, property, getFunc, setFunc) {
  var descriptor = {
    get: getFunc,
    configurable: true
  };
  if (setFunc) {
    descriptor.set = setFunc;
  }
  Object.defineProperty(object, property, descriptor);
};

var IndexSizeError = function(message) {
  Error.call(this);
  this.name = 'IndexSizeError';
  this.message = message;
};

IndexSizeError.prototype = Object.create(Error.prototype);



/** @constructor */
var TimingDict = function(timingInput) {
  if (typeof timingInput === 'object') {
    for (var k in timingInput) {
      if (k in TimingDict.prototype) {
        this[k] = timingInput[k];
      }
    }
  } else if (isDefinedAndNotNull(timingInput)) {
    this.duration = Number(timingInput);
  }
};

TimingDict.prototype = {
  delay: 0,
  endDelay: 0,
  fill: 'auto',
  iterationStart: 0,
  iterations: 1,
  duration: 'auto',
  playbackRate: 1,
  direction: 'normal',
  easing: 'linear'
};



/** @constructor */
var Timing = function(token, timingInput, changeHandler) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  this._dict = new TimingDict(timingInput);
  this._changeHandler = changeHandler;
};

Timing.prototype = {
  _timingFunction: function(timedItem) {
    var timingFunction = TimingFunction.createFromString(
        this.easing, timedItem);
    this._timingFunction = function() {
      return timingFunction;
    };
    return timingFunction;
  },
  _invalidateTimingFunction: function() {
    delete this._timingFunction;
  },
  _iterations: function() {
    var value = this._dict.iterations;
    return value < 0 ? 1 : value;
  },
  _duration: function() {
    var value = this._dict.duration;
    return typeof value === 'number' ? value : 'auto';
  },
  _clone: function() {
    return new Timing(
        constructorToken, this._dict, this._updateInternalState.bind(this));
  }
};

// Configures an accessor descriptor for use with Object.defineProperty() to
// allow the property to be changed and enumerated, to match __defineGetter__()
// and __defineSetter__().
var configureDescriptor = function(descriptor) {
  descriptor.configurable = true;
  descriptor.enumerable = true;
  return descriptor;
};

Timing._defineProperty = function(prop) {
  Object.defineProperty(Timing.prototype, prop, configureDescriptor({
    get: function() {
      return this._dict[prop];
    },
    set: function(value) {
      if (isDefinedAndNotNull(value)) {
        if (prop == 'duration' && value == 'auto') {
          // duration is not always a number
        } else if (['delay', 'endDelay', 'iterationStart', 'iterations',
                    'duration', 'playbackRate'].indexOf(prop) >= 0) {
          value = Number(value);
        }
        this._dict[prop] = value;
      } else {
        delete this._dict[prop];
      }
      // FIXME: probably need to implement specialized handling parsing
      // for each property
      if (prop === 'easing') {
        // Cached timing function may be invalid now.
        this._invalidateTimingFunction();
      }
      this._changeHandler();
    }
  }));
};

for (var prop in TimingDict.prototype) {
  Timing._defineProperty(prop);
}

var isDefined = function(val) {
  return typeof val !== 'undefined';
};

var isDefinedAndNotNull = function(val) {
  return isDefined(val) && (val !== null);
};



/** @constructor */
var AnimationTimeline = function(token) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  // TODO: This will probably need to change.
  this._startTime = documentTimeZeroAsClockTime;
};

AnimationTimeline.prototype = {
  get currentTime() {
    if (this._startTime === undefined) {
      this._startTime = documentTimeZeroAsClockTime;
      if (this._startTime === undefined) {
        return null;
      }
    }
    return relativeTime(cachedClockTime(), this._startTime);
  },
  get effectiveCurrentTime() {
    return this.currentTime || 0;
  },
  play: function(source) {
    return new AnimationPlayer(constructorToken, source, this);
  },
  getCurrentPlayers: function() {
    return PLAYERS.filter(function(player) {
      return !player._isPastEndOfActiveInterval();
    });
  },
  toTimelineTime: function(otherTime, other) {
    if ((this.currentTime === null) || (other.currentTime === null)) {
      return null;
    } else {
      return otherTime + other._startTime - this._startTime;
    }
  },
  _pauseAnimationsForTesting: function(pauseAt) {
    PLAYERS.forEach(function(player) {
      player.pause();
      player.currentTime = pauseAt;
    });
  }
};

// TODO: Remove dead players from here?
var PLAYERS = [];
var playersAreSorted = false;
var playerSequenceNumber = 0;

// Methods for event target objects.
var initializeEventTarget = function(eventTarget) {
  eventTarget._handlers = {};
  eventTarget._onHandlers = {};
};
var setOnEventHandler = function(eventTarget, type, handler) {
  if (typeof handler === 'function') {
    eventTarget._onHandlers[type] = {
      callback: handler,
      index: (eventTarget._handlers[type] || []).length
    };
  } else {
    eventTarget._onHandlers[type] = null;
  }
};
var getOnEventHandler = function(eventTarget, type) {
  if (isDefinedAndNotNull(eventTarget._onHandlers[type])) {
    return eventTarget._onHandlers[type].callback;
  }
  return null;
};
var addEventHandler = function(eventTarget, type, handler) {
  if (typeof handler !== 'function') {
    return;
  }
  if (!isDefinedAndNotNull(eventTarget._handlers[type])) {
    eventTarget._handlers[type] = [];
  } else if (eventTarget._handlers[type].indexOf(handler) !== -1) {
    return;
  }
  eventTarget._handlers[type].push(handler);
};
var removeEventHandler = function(eventTarget, type, handler) {
  if (!eventTarget._handlers[type]) {
    return;
  }
  var index = eventTarget._handlers[type].indexOf(handler);
  if (index === -1) {
    return;
  }
  eventTarget._handlers[type].splice(index, 1);
  if (isDefinedAndNotNull(eventTarget._onHandlers[type]) &&
      (index < eventTarget._onHandlers[type].index)) {
    eventTarget._onHandlers[type].index -= 1;
  }
};
var hasEventHandlersForEvent = function(eventTarget, type) {
  return (isDefinedAndNotNull(eventTarget._handlers[type]) &&
      eventTarget._handlers[type].length > 0) ||
      isDefinedAndNotNull(eventTarget._onHandlers[type]);
};
var callEventHandlers = function(eventTarget, type, event) {
  var callbackList;
  if (isDefinedAndNotNull(eventTarget._handlers[type])) {
    callbackList = eventTarget._handlers[type].slice();
  } else {
    callbackList = [];
  }
  if (isDefinedAndNotNull(eventTarget._onHandlers[type])) {
    callbackList.splice(eventTarget._onHandlers[type].index, 0,
        eventTarget._onHandlers[type].callback);
  }
  setTimeout(function() {
    for (var i = 0; i < callbackList.length; i++) {
      callbackList[i].call(eventTarget, event);
    }
  }, 0);
};
var createEventPrototype = function() {
  var prototype = Object.create(window.Event.prototype, {
    type: { get: function() { return this._type; } },
    target: { get: function() { return this._target; } },
    currentTarget: { get: function() { return this._target; } },
    eventPhase: { get: function() { return this._eventPhase; } },
    bubbles: { get: function() { return false; } },
    cancelable: { get: function() { return false; } },
    timeStamp: { get: function() { return this._timeStamp; } },
    defaultPrevented: { get: function() { return false; } }
  });
  prototype._type = '';
  prototype._target = null;
  prototype._eventPhase = Event.NONE;
  prototype._timeStamp = 0;
  prototype._initialize = function(target) {
    this._target = target;
    this._eventPhase = Event.AT_TARGET;
    this._timeStamp = cachedClockTime();
  };
  return prototype;
};



/** @constructor */
var AnimationPlayer = function(token, source, timeline) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  enterModifyCurrentAnimationState();
  try {
    this._registeredOnTimeline = false;
    this._sequenceNumber = playerSequenceNumber++;
    this._timeline = timeline;
    this._startTime =
        this.timeline.currentTime === null ? 0 : this.timeline.currentTime;
    this._storedTimeLag = 0.0;
    this._pausedState = false;
    this._holdTime = null;
    this._previousCurrentTime = null;
    this._playbackRate = 1.0;
    this._hasTicked = false;

    this.source = source;
    this._lastCurrentTime = undefined;
    this._finishedFlag = false;
    initializeEventTarget(this);

    playersAreSorted = false;
    maybeRestartAnimation();
  } finally {
    exitModifyCurrentAnimationState(ensureRetickBeforeGetComputedStyle);
  }
};

AnimationPlayer.prototype = {
  set source(source) {
    enterModifyCurrentAnimationState();
    try {
      if (isDefinedAndNotNull(this.source)) {
        // To prevent infinite recursion.
        var oldTimedItem = this.source;
        this._source = null;
        oldTimedItem._attach(null);
      }
      this._source = source;
      if (isDefinedAndNotNull(this.source)) {
        this.source._attach(this);
        this._update();
        maybeRestartAnimation();
      }
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get source() {
    return this._source;
  },
  // This is the effective current time.
  set currentTime(currentTime) {
    enterModifyCurrentAnimationState();
    try {
      this._currentTime = currentTime;
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get currentTime() {
    return this._currentTime;
  },
  set _currentTime(seekTime) {
    // If we are paused or seeking to a time where limiting applies (i.e. beyond
    // the end in the current direction), update the hold time.
    var sourceContentEnd = this.source ? this.source.endTime : 0;
    if (this.paused ||
        (this.playbackRate > 0 && seekTime >= sourceContentEnd) ||
        (this.playbackRate < 0 && seekTime <= 0)) {
      this._holdTime = seekTime;
    // Otherwise, clear the hold time (it may been set by previously seeking to
    // a limited time) and update the time lag.
    } else {
      this._holdTime = null;
      this._storedTimeLag = (this.timeline.effectiveCurrentTime -
          this.startTime) * this.playbackRate - seekTime;
    }
    this._update();
    maybeRestartAnimation();
  },
  get _currentTime() {
    this._previousCurrentTime = (this.timeline.effectiveCurrentTime -
        this.startTime) * this.playbackRate - this.timeLag;
    return this._previousCurrentTime;
  },
  get _unlimitedCurrentTime() {
    return (this.timeline.effectiveCurrentTime - this.startTime) *
        this.playbackRate - this._storedTimeLag;
  },
  get timeLag() {
    if (this.paused) {
      return this._pauseTimeLag;
    }

    // Apply limiting at start of interval when playing in reverse
    if (this.playbackRate < 0 && this._unlimitedCurrentTime <= 0) {
      if (this._holdTime === null) {
        this._holdTime = Math.min(this._previousCurrentTime, 0);
      }
      return this._pauseTimeLag;
    }

    // Apply limiting at end of interval when playing forwards
    var sourceContentEnd = this.source ? this.source.endTime : 0;
    if (this.playbackRate > 0 &&
        this._unlimitedCurrentTime >= sourceContentEnd) {
      if (this._holdTime === null) {
        this._holdTime = Math.max(this._previousCurrentTime, sourceContentEnd);
      }
      return this._pauseTimeLag;
    }

    // Finished limiting so store pause time lag
    if (this._holdTime !== null) {
      this._storedTimeLag = this._pauseTimeLag;
      this._holdTime = null;
    }

    return this._storedTimeLag;
  },
  get _pauseTimeLag() {
    return ((this.timeline.currentTime || 0) - this.startTime) *
        this.playbackRate - this._holdTime;
  },
  set startTime(startTime) {
    enterModifyCurrentAnimationState();
    try {
      // This seeks by updating _startTime and hence the currentTime. It does
      // not affect _storedTimeLag.
      this._startTime = startTime;
      this._holdTime = null;
      playersAreSorted = false;
      this._update();
      maybeRestartAnimation();
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get startTime() {
    return this._startTime;
  },
  set _paused(isPaused) {
    if (isPaused === this._pausedState) {
      return;
    }
    if (this._pausedState) {
      this._storedTimeLag = this.timeLag;
      this._holdTime = null;
      maybeRestartAnimation();
    } else {
      this._holdTime = this.currentTime;
    }
    this._pausedState = isPaused;
  },
  get paused() {
    return this._pausedState;
  },
  get timeline() {
    return this._timeline;
  },
  set playbackRate(playbackRate) {
    enterModifyCurrentAnimationState();
    try {
      var cachedCurrentTime = this.currentTime;
      // This will impact currentTime, so perform a compensatory seek.
      this._playbackRate = playbackRate;
      this.currentTime = cachedCurrentTime;
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get playbackRate() {
    return this._playbackRate;
  },
  get finished() {
    return this._isLimited;
  },
  get _isLimited() {
    var sourceEnd = this.source ? this.source.endTime : 0;
    return ((this.playbackRate > 0 && this.currentTime >= sourceEnd) ||
        (this.playbackRate < 0 && this.currentTime <= 0));
  },
  cancel: function() {
    this.source = null;
  },
  finish: function() {
    if (this.playbackRate < 0) {
      this.currentTime = 0;
    } else if (this.playbackRate > 0) {
      var sourceEndTime = this.source ? this.source.endTime : 0;
      if (sourceEndTime === Infinity) {
        throw new Error('InvalidStateError');
      }
      this.currentTime = sourceEndTime;
    }
  },
  play: function() {
    this._paused = false;
    if (!this.source) {
      return;
    }
    if (this.playbackRate > 0 &&
        (this.currentTime < 0 ||
         this.currentTime >= this.source.endTime)) {
      this.currentTime = 0;
    } else if (this.playbackRate < 0 &&
        (this.currentTime <= 0 ||
        this.currentTime > this.source.endTime)) {
      this.currentTime = this.source.endTime;
    }
  },
  pause: function() {
    this._paused = true;
  },
  reverse: function() {
    if (this.playbackRate === 0) {
      return;
    }
    if (this.source) {
      if (this.playbackRate > 0 && this.currentTime >= this.source.endTime) {
        this.currentTime = this.source.endTime;
      } else if (this.playbackRate < 0 && this.currentTime < 0) {
        this.currentTime = 0;
      }
    }
    this.playbackRate = -this.playbackRate;
    this._paused = false;
  },
  _update: function() {
    if (this.source !== null) {
      this.source._updateInheritedTime(
          this.timeline.currentTime === null ? null : this._currentTime);
      this._registerOnTimeline();
    }
  },
  _hasFutureAnimation: function() {
    return this.source === null || this.playbackRate === 0 ||
        this.source._hasFutureAnimation(this.playbackRate > 0);
  },
  _isPastEndOfActiveInterval: function() {
    return this.source === null ||
        this.source._isPastEndOfActiveInterval();
  },
  _isCurrent: function() {
    return this.source && this.source._isCurrent();
  },
  _hasFutureEffect: function() {
    return this.source && this.source._hasFutureEffect();
  },
  _getLeafItemsInEffect: function(items) {
    if (this.source) {
      this.source._getLeafItemsInEffect(items);
    }
  },
  _isTargetingElement: function(element) {
    return this.source && this.source._isTargetingElement(element);
  },
  _getAnimationsTargetingElement: function(element, animations) {
    if (this.source) {
      this.source._getAnimationsTargetingElement(element, animations);
    }
  },
  set onfinish(handler) {
    return setOnEventHandler(this, 'finish', handler);
  },
  get onfinish() {
    return getOnEventHandler(this, 'finish');
  },
  addEventListener: function(type, handler) {
    if (type === 'finish') {
      addEventHandler(this, type, handler);
    }
  },
  removeEventListener: function(type, handler) {
    if (type === 'finish') {
      removeEventHandler(this, type, handler);
    }
  },
  _generateEvents: function() {
    if (!this._finishedFlag && this.finished &&
        hasEventHandlersForEvent(this, 'finish')) {
      var event = new AnimationPlayerEvent('finish', {
        currentTime: this.currentTime,
        timelineTime: this.timeline.currentTime
      });
      event._initialize(this);
      callEventHandlers(this, 'finish', event);
    }
    this._finishedFlag = this.finished;

    // The following code is for deprecated TimedItem event handling and should
    // be removed once we stop supporting it.
    if (!isDefinedAndNotNull(this._lastCurrentTime)) {
      this._lastCurrentTime = 0;
    }

    this._lastCurrentTime = this._unlimitedCurrentTime;
  },
  _registerOnTimeline: function() {
    if (!this._registeredOnTimeline) {
      PLAYERS.push(this);
      this._registeredOnTimeline = true;
    }
  },
  _deregisterFromTimeline: function() {
    PLAYERS.splice(PLAYERS.indexOf(this), 1);
    this._registeredOnTimeline = false;
  }
};



/** @constructor */
var AnimationPlayerEvent = function(type, eventInit) {
  this._type = type;
  this.currentTime = eventInit.currentTime;
  this.timelineTime = eventInit.timelineTime;
};

AnimationPlayerEvent.prototype = createEventPrototype();



/** @constructor */
var TimedItem = function(token, timingInput) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  this.timing = new Timing(
      constructorToken, timingInput,
      this._specifiedTimingModified.bind(this));
  this._inheritedTime = null;
  this.currentIteration = null;
  this._iterationTime = null;
  this._animationTime = null;
  this._startTime = 0.0;
  this._player = null;
  this._parent = null;
  this._updateInternalState();
  this._fill = this._resolveFillMode(this.timing.fill);
  initializeEventTarget(this);
};

TimedItem.prototype = {
  // TODO: It would be good to avoid the need for this. We would need to modify
  // call sites to instead rely on a call from the parent.
  get _effectiveParentTime() {
    return this.parent !== null && this.parent._iterationTime !== null ?
        this.parent._iterationTime : 0;
  },
  get localTime() {
    return this._inheritedTime === null ?
        null : this._inheritedTime - this._startTime;
  },
  get startTime() {
    return this._startTime;
  },
  get duration() {
    var result = this.timing._duration();
    if (result === 'auto') {
      result = this._intrinsicDuration();
    }
    return result;
  },
  get activeDuration() {
    var repeatedDuration = this.duration * this.timing._iterations();
    return repeatedDuration / Math.abs(this.timing.playbackRate);
  },
  get endTime() {
    return this._startTime + this.activeDuration + this.timing.delay +
        this.timing.endDelay;
  },
  get parent() {
    return this._parent;
  },
  get previousSibling() {
    if (!this.parent) {
      return null;
    }
    var siblingIndex = this.parent.indexOf(this) - 1;
    if (siblingIndex < 0) {
      return null;
    }
    return this.parent.children[siblingIndex];
  },
  get nextSibling() {
    if (!this.parent) {
      return null;
    }
    var siblingIndex = this.parent.indexOf(this) + 1;
    if (siblingIndex >= this.parent.children.length) {
      return null;
    }
    return this.parent.children[siblingIndex];
  },
  _attach: function(player) {
    // Remove ourselves from our parent, if we have one. This also removes any
    // exsisting player.
    this._reparent(null);
    this._player = player;
  },
  // Takes care of updating the outgoing parent. This is called with a non-null
  // parent only from TimingGroup.splice(), which takes care of calling
  // TimingGroup._childrenStateModified() for the new parent.
  _reparent: function(parent) {
    if (parent === this) {
      throw new Error('parent can not be set to self!');
    }
    enterModifyCurrentAnimationState();
    try {
      if (this._player !== null) {
        this._player.source = null;
        this._player = null;
      }
      if (this.parent !== null) {
        this.remove();
      }
      this._parent = parent;
      // In the case of a AnimationSequence parent, _startTime will be updated
      // by TimingGroup.splice().
      if (this.parent === null || this.parent.type !== 'seq') {
        this._startTime =
            this._stashedStartTime === undefined ? 0.0 : this._stashedStartTime;
        this._stashedStartTime = undefined;
      }
      // In the case of the parent being non-null, _childrenStateModified() will
      // call this via _updateChildInheritedTimes().
      // TODO: Consider optimising this case by skipping this call.
      this._updateTimeMarkers();
    } finally {
      exitModifyCurrentAnimationState(
          Boolean(this.player) ? repeatLastTick : null);
    }
  },
  _intrinsicDuration: function() {
    return 0.0;
  },
  _resolveFillMode: abstractMethod,
  _updateInternalState: function() {
    this._fill = this._resolveFillMode(this.timing.fill);
    if (this.parent) {
      this.parent._childrenStateModified();
    } else if (this._player) {
      this._player._registerOnTimeline();
    }
    this._updateTimeMarkers();
  },
  _specifiedTimingModified: function() {
    enterModifyCurrentAnimationState();
    try {
      this._updateInternalState();
    } finally {
      exitModifyCurrentAnimationState(
          Boolean(this.player) ? repeatLastTick : null);
    }
  },
  // We push time down to children. We could instead have children pull from
  // above, but this is tricky because a TimedItem may use either a parent
  // TimedItem or an AnimationPlayer. This requires either logic in
  // TimedItem, or for TimedItem and AnimationPlayer to implement Timeline
  // (or an equivalent), both of which are ugly.
  _updateInheritedTime: function(inheritedTime) {
    this._inheritedTime = inheritedTime;
    this._updateTimeMarkers();
  },
  _updateAnimationTime: function() {
    if (this.localTime < this.timing.delay) {
      if (this._fill === 'backwards' ||
          this._fill === 'both') {
        this._animationTime = 0;
      } else {
        this._animationTime = null;
      }
    } else if (this.localTime <
        this.timing.delay + this.activeDuration) {
      this._animationTime = this.localTime - this.timing.delay;
    } else {
      if (this._fill === 'forwards' ||
          this._fill === 'both') {
        this._animationTime = this.activeDuration;
      } else {
        this._animationTime = null;
      }
    }
  },
  _updateIterationParamsZeroDuration: function() {
    this._iterationTime = 0;
    var isAtEndOfIterations = this.timing._iterations() !== 0 &&
        this.localTime >= this.timing.delay;
    this.currentIteration = (
        isAtEndOfIterations ?
        this._floorWithOpenClosedRange(
            this.timing.iterationStart + this.timing._iterations(),
            1.0) :
        this._floorWithClosedOpenRange(this.timing.iterationStart, 1.0));
    // Equivalent to unscaledIterationTime below.
    var unscaledFraction = (
        isAtEndOfIterations ?
        this._modulusWithOpenClosedRange(
            this.timing.iterationStart + this.timing._iterations(),
            1.0) :
        this._modulusWithClosedOpenRange(this.timing.iterationStart, 1.0));
    var timingFunction = this.timing._timingFunction(this);
    this._timeFraction = (
        this._isCurrentDirectionForwards() ?
        unscaledFraction :
        1.0 - unscaledFraction);
    ASSERT_ENABLED && assert(
        this._timeFraction >= 0.0 && this._timeFraction <= 1.0,
        'Time fraction should be in the range [0, 1]');
    if (timingFunction) {
      this._timeFraction = timingFunction.scaleTime(this._timeFraction);
    }
  },
  _getAdjustedAnimationTime: function(animationTime) {
    var startOffset =
        multiplyZeroGivesZero(this.timing.iterationStart, this.duration);
    return (this.timing.playbackRate < 0 ?
        (animationTime - this.activeDuration) : animationTime) *
        this.timing.playbackRate + startOffset;
  },
  _scaleIterationTime: function(unscaledIterationTime) {
    return this._isCurrentDirectionForwards() ?
        unscaledIterationTime :
        this.duration - unscaledIterationTime;
  },
  _updateIterationParams: function() {
    var adjustedAnimationTime =
        this._getAdjustedAnimationTime(this._animationTime);
    var repeatedDuration = this.duration * this.timing._iterations();
    var startOffset = this.timing.iterationStart * this.duration;
    var isAtEndOfIterations = (this.timing._iterations() !== 0) &&
        (adjustedAnimationTime - startOffset === repeatedDuration);
    this.currentIteration = isAtEndOfIterations ?
        this._floorWithOpenClosedRange(
            adjustedAnimationTime, this.duration) :
        this._floorWithClosedOpenRange(
            adjustedAnimationTime, this.duration);
    var unscaledIterationTime = isAtEndOfIterations ?
        this._modulusWithOpenClosedRange(
            adjustedAnimationTime, this.duration) :
        this._modulusWithClosedOpenRange(
            adjustedAnimationTime, this.duration);
    this._iterationTime = this._scaleIterationTime(unscaledIterationTime);
    if (this.duration == Infinity) {
      this._timeFraction = 0;
      return;
    }
    this._timeFraction = this._iterationTime / this.duration;
    ASSERT_ENABLED && assert(
        this._timeFraction >= 0.0 && this._timeFraction <= 1.0,
        'Time fraction should be in the range [0, 1], got ' +
        this._timeFraction + ' ' + this._iterationTime + ' ' +
        this.duration + ' ' + isAtEndOfIterations + ' ' +
        unscaledIterationTime);
    var timingFunction = this.timing._timingFunction(this);
    if (timingFunction) {
      this._timeFraction = timingFunction.scaleTime(this._timeFraction);
    }
    this._iterationTime = this._timeFraction * this.duration;
  },
  _updateTimeMarkers: function() {
    if (this.localTime === null) {
      this._animationTime = null;
      this._iterationTime = null;
      this.currentIteration = null;
      this._timeFraction = null;
      return false;
    }
    this._updateAnimationTime();
    if (this._animationTime === null) {
      this._iterationTime = null;
      this.currentIteration = null;
      this._timeFraction = null;
    } else if (this.duration === 0) {
      this._updateIterationParamsZeroDuration();
    } else {
      this._updateIterationParams();
    }
    maybeRestartAnimation();
  },
  _floorWithClosedOpenRange: function(x, range) {
    return Math.floor(x / range);
  },
  _floorWithOpenClosedRange: function(x, range) {
    return Math.ceil(x / range) - 1;
  },
  _modulusWithClosedOpenRange: function(x, range) {
    ASSERT_ENABLED && assert(
        range > 0, 'Range must be strictly positive');
    var modulus = x % range;
    var result = modulus < 0 ? modulus + range : modulus;
    ASSERT_ENABLED && assert(
        result >= 0.0 && result < range,
        'Result should be in the range [0, range)');
    return result;
  },
  _modulusWithOpenClosedRange: function(x, range) {
    var modulus = this._modulusWithClosedOpenRange(x, range);
    var result = modulus === 0 ? range : modulus;
    ASSERT_ENABLED && assert(
        result > 0.0 && result <= range,
        'Result should be in the range (0, range]');
    return result;
  },
  _isCurrentDirectionForwards: function() {
    if (this.timing.direction === 'normal') {
      return true;
    }
    if (this.timing.direction === 'reverse') {
      return false;
    }
    var d = this.currentIteration;
    if (this.timing.direction === 'alternate-reverse') {
      d += 1;
    }
    // TODO: 6.13.3 step 3. wtf?
    return d % 2 === 0;
  },
  clone: abstractMethod,
  before: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this.parent._splice(this.parent.indexOf(this), 0, newItems);
  },
  after: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this.parent._splice(this.parent.indexOf(this) + 1, 0, newItems);
  },
  replace: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this.parent._splice(this.parent.indexOf(this), 1, newItems);
  },
  remove: function() {
    this.parent._splice(this.parent.indexOf(this), 1);
  },
  // Gets the leaf TimedItems currently in effect. Note that this is a superset
  // of the leaf TimedItems in their active interval, as a TimedItem can have an
  // effect outside its active interval due to fill.
  _getLeafItemsInEffect: function(items) {
    if (this._timeFraction !== null) {
      this._getLeafItemsInEffectImpl(items);
    }
  },
  _getLeafItemsInEffectImpl: abstractMethod,
  _hasFutureAnimation: function(timeDirectionForwards) {
    return timeDirectionForwards ? this._inheritedTime < this.endTime :
        this._inheritedTime > this.startTime;
  },
  _isPastEndOfActiveInterval: function() {
    return this._inheritedTime >= this.endTime;
  },
  get player() {
    return this.parent === null ?
        this._player : this.parent.player;
  },
  _isCurrent: function() {
    return !this._isPastEndOfActiveInterval() ||
           (this.parent !== null && this.parent._isCurrent());
  },
  _isTargetingElement: abstractMethod,
  _getAnimationsTargetingElement: abstractMethod,
  _netEffectivePlaybackRate: function() {
    var effectivePlaybackRate = this._isCurrentDirectionForwards() ?
        this.timing.playbackRate : -this.timing.playbackRate;
    return this.parent === null ? effectivePlaybackRate :
        effectivePlaybackRate * this.parent._netEffectivePlaybackRate();
  },
  // Note that this restriction is currently incomplete - for example,
  // Animations which are playing forwards and have a fill of backwards
  // are not in effect unless current.
  // TODO: Complete this restriction.
  _hasFutureEffect: function() {
    return this._isCurrent() || this._fill !== 'none';
  },
  _toSubRanges: function(fromTime, toTime, iterationTimes) {
    if (fromTime > toTime) {
      var revRanges = this._toSubRanges(toTime, fromTime, iterationTimes);
      revRanges.ranges.forEach(function(a) { a.reverse(); });
      revRanges.ranges.reverse();
      revRanges.start = iterationTimes.length - revRanges.start - 1;
      revRanges.delta = -1;
      return revRanges;
    }
    var skipped = 0;
    // TODO: this should be calculatable. This would be more efficient
    // than searching through the list.
    while (iterationTimes[skipped] < fromTime) {
      skipped++;
    }
    var currentStart = fromTime;
    var ranges = [];
    for (var i = skipped; i < iterationTimes.length; i++) {
      if (iterationTimes[i] < toTime) {
        ranges.push([currentStart, iterationTimes[i]]);
        currentStart = iterationTimes[i];
      } else {
        ranges.push([currentStart, toTime]);
        return {start: skipped, delta: 1, ranges: ranges};
      }
    }
    ranges.push([currentStart, toTime]);
    return {start: skipped, delta: 1, ranges: ranges};
  }
};

var TimingEvent = function(
    token, target, type, localTime, timelineTime, iterationIndex, seeked) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  this._initialize(target);
  this._type = type;
  this.localTime = localTime;
  this.timelineTime = timelineTime;
  this.iterationIndex = iterationIndex;
  this.seeked = seeked ? true : false;
};

TimingEvent.prototype = createEventPrototype();

var isEffectCallback = function(animationEffect) {
  return typeof animationEffect === 'function';
};

var interpretAnimationEffect = function(animationEffect) {
  if (animationEffect instanceof AnimationEffect ||
      isEffectCallback(animationEffect)) {
    return animationEffect;
  } else if (isDefinedAndNotNull(animationEffect) &&
      typeof animationEffect === 'object') {
    // The spec requires animationEffect to be an instance of
    // OneOrMoreKeyframes, but this type is just a dictionary or a list of
    // dictionaries, so the best we can do is test for an object.
    return new KeyframeEffect(animationEffect);
  }
  return null;
};

var cloneAnimationEffect = function(animationEffect) {
  if (animationEffect instanceof AnimationEffect) {
    return animationEffect.clone();
  } else if (isEffectCallback(animationEffect)) {
    return animationEffect;
  } else {
    return null;
  }
};



/** @constructor */
var Animation = function(target, animationEffect, timingInput) {
  enterModifyCurrentAnimationState();
  try {
    TimedItem.call(this, constructorToken, timingInput);
    this.effect = interpretAnimationEffect(animationEffect);
    this._target = target;
  } finally {
    exitModifyCurrentAnimationState(null);
  }
};

Animation.prototype = createObject(TimedItem.prototype, {
  _resolveFillMode: function(fillMode) {
    return fillMode === 'auto' ? 'none' : fillMode;
  },
  _sample: function() {
    if (isDefinedAndNotNull(this.effect) &&
        !(this.target instanceof PseudoElementReference)) {
      if (isEffectCallback(this.effect)) {
        this.effect(this._timeFraction, this.target, this);
      } else {
        this.effect._sample(this._timeFraction, this.currentIteration,
            this.target, this.underlyingValue);
      }
    }
  },
  _getLeafItemsInEffectImpl: function(items) {
    items.push(this);
  },
  _isTargetingElement: function(element) {
    return element === this.target;
  },
  _getAnimationsTargetingElement: function(element, animations) {
    if (this._isTargetingElement(element)) {
      animations.push(this);
    }
  },
  get target() {
    return this._target;
  },
  set effect(effect) {
    enterModifyCurrentAnimationState();
    try {
      this._effect = effect;
      this.timing._invalidateTimingFunction();
    } finally {
      exitModifyCurrentAnimationState(
          Boolean(this.player) ? repeatLastTick : null);
    }
  },
  get effect() {
    return this._effect;
  },
  clone: function() {
    return new Animation(this.target,
        cloneAnimationEffect(this.effect), this.timing._dict);
  },
  toString: function() {
    var effectString = '<none>';
    if (this.effect instanceof AnimationEffect) {
      effectString = this.effect.toString();
    } else if (isEffectCallback(this.effect)) {
      effectString = 'Effect callback';
    }
    return 'Animation ' + this.startTime + '-' + this.endTime + ' (' +
        this.localTime + ') ' + effectString;
  }
});

function throwNewHierarchyRequestError() {
  var element = document.createElement('span');
  element.appendChild(element);
}



/** @constructor */
var TimedItemList = function(token, children) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  this._children = children;
  this._getters = 0;
  this._ensureGetters();
};

TimedItemList.prototype = {
  get length() {
    return this._children.length;
  },
  _ensureGetters: function() {
    while (this._getters < this._children.length) {
      this._ensureGetter(this._getters++);
    }
  },
  _ensureGetter: function(i) {
    Object.defineProperty(this, i, {
      get: function() {
        return this._children[i];
      }
    });
  }
};



/** @constructor */
var TimingGroup = function(token, type, children, timing) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  // Take a copy of the children array, as it could be modified as a side-effect
  // of creating this object. See
  // https://github.com/web-animations/web-animations-js/issues/65 for details.
  var childrenCopy = (children && Array.isArray(children)) ?
      children.slice() : [];
  // used by TimedItem via _intrinsicDuration(), so needs to be set before
  // initializing super.
  this.type = type || 'par';
  this._children = [];
  this._cachedTimedItemList = null;
  this._cachedIntrinsicDuration = null;
  TimedItem.call(this, constructorToken, timing);
  // We add children after setting the parent. This means that if an ancestor
  // (including the parent) is specified as a child, it will be removed from our
  // ancestors and used as a child,
  this.append.apply(this, childrenCopy);
};

TimingGroup.prototype = createObject(TimedItem.prototype, {
  _resolveFillMode: function(fillMode) {
    return fillMode === 'auto' ? 'both' : fillMode;
  },
  _childrenStateModified: function() {
    // See _updateChildStartTimes().
    this._isInChildrenStateModified = true;
    if (this._cachedTimedItemList) {
      this._cachedTimedItemList._ensureGetters();
    }
    this._cachedIntrinsicDuration = null;

    // We need to walk up and down the tree to re-layout. endTime and the
    // various durations (which are all calculated lazily) are the only
    // properties of a TimedItem which can affect the layout of its ancestors.
    // So it should be sufficient to simply update start times and time markers
    // on the way down.

    // This calls up to our parent, then calls _updateTimeMarkers().
    this._updateInternalState();
    this._updateChildInheritedTimes();

    // Update child start times before walking down.
    this._updateChildStartTimes();

    this._isInChildrenStateModified = false;
  },
  _updateInheritedTime: function(inheritedTime) {
    this._inheritedTime = inheritedTime;
    this._updateTimeMarkers();
    this._updateChildInheritedTimes();
  },
  _updateChildInheritedTimes: function() {
    for (var i = 0; i < this._children.length; i++) {
      var child = this._children[i];
      child._updateInheritedTime(this._iterationTime);
    }
  },
  _updateChildStartTimes: function() {
    if (this.type === 'seq') {
      var cumulativeStartTime = 0;
      for (var i = 0; i < this._children.length; i++) {
        var child = this._children[i];
        if (child._stashedStartTime === undefined) {
          child._stashedStartTime = child._startTime;
        }
        child._startTime = cumulativeStartTime;
        // Avoid updating the child's inherited time and time markers if this is
        // about to be done in the down phase of _childrenStateModified().
        if (!child._isInChildrenStateModified) {
          // This calls _updateTimeMarkers() on the child.
          child._updateInheritedTime(this._iterationTime);
        }
        cumulativeStartTime += Math.max(0, child.timing.delay +
            child.activeDuration + child.timing.endDelay);
      }
    }
  },
  get children() {
    if (!this._cachedTimedItemList) {
      this._cachedTimedItemList = new TimedItemList(
          constructorToken, this._children);
    }
    return this._cachedTimedItemList;
  },
  get firstChild() {
    return this._children[0];
  },
  get lastChild() {
    return this._children[this.children.length - 1];
  },
  _intrinsicDuration: function() {
    if (!isDefinedAndNotNull(this._cachedIntrinsicDuration)) {
      if (this.type === 'par') {
        var dur = Math.max.apply(undefined, this._children.map(function(a) {
          return a.endTime;
        }));
        this._cachedIntrinsicDuration = Math.max(0, dur);
      } else if (this.type === 'seq') {
        var result = 0;
        this._children.forEach(function(a) {
          result += a.activeDuration + a.timing.delay + a.timing.endDelay;
        });
        this._cachedIntrinsicDuration = result;
      } else {
        throw 'Unsupported type ' + this.type;
      }
    }
    return this._cachedIntrinsicDuration;
  },
  _getLeafItemsInEffectImpl: function(items) {
    for (var i = 0; i < this._children.length; i++) {
      this._children[i]._getLeafItemsInEffect(items);
    }
  },
  clone: function() {
    var children = [];
    this._children.forEach(function(child) {
      children.push(child.clone());
    });
    return this.type === 'par' ?
        new AnimationGroup(children, this.timing._dict) :
        new AnimationSequence(children, this.timing._dict);
  },
  clear: function() {
    this._splice(0, this._children.length);
  },
  append: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this._splice(this._children.length, 0, newItems);
  },
  prepend: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this._splice(0, 0, newItems);
  },
  _addInternal: function(child) {
    this._children.push(child);
    this._childrenStateModified();
  },
  indexOf: function(item) {
    return this._children.indexOf(item);
  },
  _splice: function(start, deleteCount, newItems) {
    enterModifyCurrentAnimationState();
    try {
      var args = arguments;
      if (args.length === 3) {
        args = [start, deleteCount].concat(newItems);
      }
      for (var i = 2; i < args.length; i++) {
        var newChild = args[i];
        if (this._isInclusiveAncestor(newChild)) {
          throwNewHierarchyRequestError();
        }
        newChild._reparent(this);
      }
      var result = Array.prototype.splice.apply(this._children, args);
      for (var i = 0; i < result.length; i++) {
        result[i]._parent = null;
      }
      this._childrenStateModified();
      return result;
    } finally {
      exitModifyCurrentAnimationState(
          Boolean(this.player) ? repeatLastTick : null);
    }
  },
  _isInclusiveAncestor: function(item) {
    for (var ancestor = this; ancestor !== null; ancestor = ancestor.parent) {
      if (ancestor === item) {
        return true;
      }
    }
    return false;
  },
  _isTargetingElement: function(element) {
    return this._children.some(function(child) {
      return child._isTargetingElement(element);
    });
  },
  _getAnimationsTargetingElement: function(element, animations) {
    this._children.map(function(child) {
      return child._getAnimationsTargetingElement(element, animations);
    });
  },
  toString: function() {
    return this.type + ' ' + this.startTime + '-' + this.endTime + ' (' +
        this.localTime + ') ' + ' [' +
        this._children.map(function(a) { return a.toString(); }) + ']';
  }
});



/** @constructor */
var AnimationGroup = function(children, timing, parent) {
  TimingGroup.call(this, constructorToken, 'par', children, timing, parent);
};

AnimationGroup.prototype = Object.create(TimingGroup.prototype);



/** @constructor */
var AnimationSequence = function(children, timing, parent) {
  TimingGroup.call(this, constructorToken, 'seq', children, timing, parent);
};

AnimationSequence.prototype = Object.create(TimingGroup.prototype);



/** @constructor */
var PseudoElementReference = function(element, pseudoElement) {
  this.element = element;
  this.pseudoElement = pseudoElement;
  console.warn('PseudoElementReference is not supported.');
};



/** @constructor */
var MediaReference = function(mediaElement, timing, parent, delta) {
  TimedItem.call(this, constructorToken, timing, parent);
  this._media = mediaElement;

  // We can never be sure when _updateInheritedTime() is going to be called
  // next, due to skipped frames or the player being seeked. Plus the media
  // element's currentTime may drift from our iterationTime. So if a media
  // element has loop set, we can't be sure that we'll stop it before it wraps.
  // For this reason, we simply disable looping.
  // TODO: Maybe we should let it loop if our duration exceeds it's
  // length?
  this._media.loop = false;

  // If the media element has a media controller, we detach it. This mirrors the
  // behaviour when re-parenting a TimedItem, or attaching one to an
  // AnimationPlayer.
  // TODO: It would be neater to assign to MediaElement.controller, but this was
  // broken in Chrome until recently. See crbug.com/226270.
  this._media.mediaGroup = '';

  this._delta = delta;
};

MediaReference.prototype = createObject(TimedItem.prototype, {
  _resolveFillMode: function(fillMode) {
    // TODO: Fill modes for MediaReferences are still undecided. The spec is not
    // clear what 'auto' should mean for TimedItems other than Animations and
    // groups.
    return fillMode === 'auto' ? 'none' : fillMode;
  },
  _intrinsicDuration: function() {
    // TODO: This should probably default to zero. But doing so means that as
    // soon as our inheritedTime is zero, the polyfill deems the animation to be
    // done and stops ticking, so we don't get any further calls to
    // _updateInheritedTime(). One way around this would be to modify
    // TimedItem._isPastEndOfActiveInterval() to recurse down the tree, then we
    // could override it here.
    return isNaN(this._media.duration) ?
        Infinity : this._media.duration / this._media.defaultPlaybackRate;
  },
  _unscaledMediaCurrentTime: function() {
    return this._media.currentTime / this._media.defaultPlaybackRate;
  },
  _getLeafItemsInEffectImpl: function(items) {
    items.push(this);
  },
  _ensurePlaying: function() {
    // The media element is paused when created.
    if (this._media.paused) {
      this._media.play();
    }
  },
  _ensurePaused: function() {
    if (!this._media.paused) {
      this._media.pause();
    }
  },
  _isSeekableUnscaledTime: function(time) {
    var seekTime = time * this._media.defaultPlaybackRate;
    var ranges = this._media.seekable;
    for (var i = 0; i < ranges.length; i++) {
      if (seekTime >= ranges.start(i) && seekTime <= ranges.end(i)) {
        return true;
      }
    }
    return false;
  },
  // Note that a media element's timeline may not start at zero, although its
  // duration is always the timeline time at the end point. This means that an
  // element's duration isn't always it's length and not all values of the
  // timline are seekable. Furthermore, some types of media further limit the
  // range of seekable timeline times. For this reason, we always map an
  // iteration to the range [0, duration] and simply seek to the nearest
  // seekable time.
  _ensureIsAtUnscaledTime: function(time) {
    if (this._unscaledMediaCurrentTime() !== time) {
      this._media.currentTime = time * this._media.defaultPlaybackRate;
    }
  },
  // This is called by the polyfill on each tick when our AnimationPlayer's tree
  // is active.
  _updateInheritedTime: function(inheritedTime) {
    this._inheritedTime = inheritedTime;
    this._updateTimeMarkers();

    // The polyfill uses a sampling model whereby time values are propagated
    // down the tree at each sample. However, for the media item, we need to use
    // play() and pause().

    // Handle the case of being outside our effect interval.
    if (this._iterationTime === null) {
      this._ensureIsAtUnscaledTime(0);
      this._ensurePaused();
      return;
    }

    if (this._iterationTime >= this._intrinsicDuration()) {
      // Our iteration time exceeds the media element's duration, so just make
      // sure the media element is at the end. It will stop automatically, but
      // that could take some time if the seek below is significant, so force
      // it.
      this._ensureIsAtUnscaledTime(this._intrinsicDuration());
      this._ensurePaused();
      return;
    }

    var finalIteration = this._floorWithOpenClosedRange(
        this.timing.iterationStart + this.timing._iterations(), 1.0);
    var endTimeFraction = this._modulusWithOpenClosedRange(
        this.timing.iterationStart + this.timing._iterations(), 1.0);
    if (this.currentIteration === finalIteration &&
        this._timeFraction === endTimeFraction &&
        this._intrinsicDuration() >= this.duration) {
      // We have reached the end of our final iteration, but the media element
      // is not done.
      this._ensureIsAtUnscaledTime(this.duration * endTimeFraction);
      this._ensurePaused();
      return;
    }

    // Set the appropriate playback rate.
    var playbackRate =
        this._media.defaultPlaybackRate * this._netEffectivePlaybackRate();
    if (this._media.playbackRate !== playbackRate) {
      this._media.playbackRate = playbackRate;
    }

    // Set the appropriate play/pause state. Note that we may not be able to
    // seek to the desired time. In this case, the media element's seek
    // algorithm repositions the seek to the nearest seekable time. This is OK,
    // but in this case, we don't want to play the media element, as it prevents
    // us from synchronising properly.
    if (this.player.paused ||
        !this._isSeekableUnscaledTime(this._iterationTime)) {
      this._ensurePaused();
    } else {
      this._ensurePlaying();
    }

    // Seek if required. This could be due to our AnimationPlayer being seeked,
    // or video slippage. We need to handle the fact that the video may not play
    // at exactly the right speed. There's also a variable delay when the video
    // is first played.
    // TODO: What's the right value for this delta?
    var delta = isDefinedAndNotNull(this._delta) ? this._delta :
        0.2 * Math.abs(this._media.playbackRate);
    if (Math.abs(this._iterationTime - this._unscaledMediaCurrentTime()) >
        delta) {
      this._ensureIsAtUnscaledTime(this._iterationTime);
    }
  },
  _isTargetingElement: function(element) {
    return this._media === element;
  },
  _getAnimationsTargetingElement: function() { },
  _attach: function(player) {
    this._ensurePaused();
    TimedItem.prototype._attach.call(this, player);
  }
});



/** @constructor */
var AnimationEffect = function(token) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
};

AnimationEffect.prototype = {
  _sample: abstractMethod,
  clone: abstractMethod,
  toString: abstractMethod
};

var clamp = function(x, min, max) {
  return Math.max(Math.min(x, max), min);
};



/** @constructor */
var MotionPathEffect = function(path, autoRotate, angle, composite) {
  var iterationComposite = undefined;
  var options = autoRotate;
  if (typeof options == 'string' || options instanceof String ||
      angle || composite) {
    // FIXME: add deprecation warning - please pass an options dictionary to
    // MotionPathEffect constructor
  } else if (options) {
    autoRotate = options.autoRotate;
    angle = options.angle;
    composite = options.composite;
    iterationComposite = options.iterationComposite;
  }

  enterModifyCurrentAnimationState();
  try {
    AnimationEffect.call(this, constructorToken);

    this.composite = composite;
    this.iterationComposite = iterationComposite;

    // TODO: path argument is not in the spec -- seems useful since
    // SVGPathSegList doesn't have a constructor.
    this.autoRotate = isDefined(autoRotate) ? autoRotate : 'none';
    this.angle = isDefined(angle) ? angle : 0;
    this._path = document.createElementNS(SVG_NS, 'path');
    if (path instanceof SVGPathSegList) {
      this.segments = path;
    } else {
      var tempPath = document.createElementNS(SVG_NS, 'path');
      tempPath.setAttribute('d', String(path));
      this.segments = tempPath.pathSegList;
    }
  } finally {
    exitModifyCurrentAnimationState(null);
  }
};

MotionPathEffect.prototype = createObject(AnimationEffect.prototype, {
  get composite() {
    return this._composite;
  },
  set composite(value) {
    enterModifyCurrentAnimationState();
    try {
      // Use the default value if an invalid string is specified.
      this._composite = value === 'add' ? 'add' : 'replace';
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get iterationComposite() {
    return this._iterationComposite;
  },
  set iterationComposite(value) {
    enterModifyCurrentAnimationState();
    try {
      // Use the default value if an invalid string is specified.
      this._iterationComposite =
          value === 'accumulate' ? 'accumulate' : 'replace';
      this._updateOffsetPerIteration();
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  _sample: function(timeFraction, currentIteration, target) {
    // TODO: Handle accumulation.
    var lengthAtTimeFraction = this._lengthAtTimeFraction(timeFraction);
    var point = this._path.getPointAtLength(lengthAtTimeFraction);
    var x = point.x - target.offsetWidth / 2;
    var y = point.y - target.offsetHeight / 2;
    if (currentIteration !== 0 && this._offsetPerIteration) {
      x += this._offsetPerIteration.x * currentIteration;
      y += this._offsetPerIteration.y * currentIteration;
    }
    // TODO: calc(point.x - 50%) doesn't work?
    var value = [{t: 'translate', d: [{px: x}, {px: y}]}];
    var angle = this.angle;
    if (this._autoRotate === 'auto-rotate') {
      // Super hacks
      var lastPoint = this._path.getPointAtLength(lengthAtTimeFraction - 0.01);
      var dx = point.x - lastPoint.x;
      var dy = point.y - lastPoint.y;
      var rotation = Math.atan2(dy, dx);
      angle += rotation / 2 / Math.PI * 360;
    }
    value.push({t: 'rotate', d: [angle]});
    compositor.setAnimatedValue(target, 'transform',
        new AddReplaceCompositableValue(value, this.composite));
  },
  _lengthAtTimeFraction: function(timeFraction) {
    var segmentCount = this._cumulativeLengths.length - 1;
    if (!segmentCount) {
      return 0;
    }
    var scaledFraction = timeFraction * segmentCount;
    var index = clamp(Math.floor(scaledFraction), 0, segmentCount);
    return this._cumulativeLengths[index] + ((scaledFraction % 1) * (
        this._cumulativeLengths[index + 1] - this._cumulativeLengths[index]));
  },
  _updateOffsetPerIteration: function() {
    if (this.iterationComposite === 'accumulate' &&
        this._cumulativeLengths &&
        this._cumulativeLengths.length > 0) {
      this._offsetPerIteration = this._path.getPointAtLength(
          this._cumulativeLengths[this._cumulativeLengths.length - 1]);
    } else {
      this._offsetPerIteration = null;
    }
  },
  clone: function() {
    return new MotionPathEffect(this._path.getAttribute('d'));
  },
  toString: function() {
    return '<MotionPathEffect>';
  },
  set autoRotate(autoRotate) {
    enterModifyCurrentAnimationState();
    try {
      this._autoRotate = String(autoRotate);
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get autoRotate() {
    return this._autoRotate;
  },
  set angle(angle) {
    enterModifyCurrentAnimationState();
    try {
      // TODO: This should probably be a string with a unit, but the spec
      //       says it's a double.
      this._angle = Number(angle);
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get angle() {
    return this._angle;
  },
  set segments(segments) {
    enterModifyCurrentAnimationState();
    try {
      var targetSegments = this.segments;
      targetSegments.clear();
      var cumulativeLengths = [0];
      // TODO: *moving* the path segments is not correct, but pathSegList
      //       is read only
      var items = segments.numberOfItems;
      while (targetSegments.numberOfItems < items) {
        var segment = segments.removeItem(0);
        targetSegments.appendItem(segment);
        if (segment.pathSegType !== SVGPathSeg.PATHSEG_MOVETO_REL &&
            segment.pathSegType !== SVGPathSeg.PATHSEG_MOVETO_ABS) {
          cumulativeLengths.push(this._path.getTotalLength());
        }
      }
      this._cumulativeLengths = cumulativeLengths;
      this._updateOffsetPerIteration();
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get segments() {
    return this._path.pathSegList;
  }
});

var shorthandToLonghand = {
  background: [
    'backgroundImage',
    'backgroundPosition',
    'backgroundSize',
    'backgroundRepeat',
    'backgroundAttachment',
    'backgroundOrigin',
    'backgroundClip',
    'backgroundColor'
  ],
  border: [
    'borderTopColor',
    'borderTopStyle',
    'borderTopWidth',
    'borderRightColor',
    'borderRightStyle',
    'borderRightWidth',
    'borderBottomColor',
    'borderBottomStyle',
    'borderBottomWidth',
    'borderLeftColor',
    'borderLeftStyle',
    'borderLeftWidth'
  ],
  borderBottom: [
    'borderBottomWidth',
    'borderBottomStyle',
    'borderBottomColor'
  ],
  borderColor: [
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor'
  ],
  borderLeft: [
    'borderLeftWidth',
    'borderLeftStyle',
    'borderLeftColor'
  ],
  borderRadius: [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius'
  ],
  borderRight: [
    'borderRightWidth',
    'borderRightStyle',
    'borderRightColor'
  ],
  borderTop: [
    'borderTopWidth',
    'borderTopStyle',
    'borderTopColor'
  ],
  borderWidth: [
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth'
  ],
  font: [
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'lineHeight'
  ],
  margin: [
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft'
  ],
  outline: [
    'outlineColor',
    'outlineStyle',
    'outlineWidth'
  ],
  padding: [
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft'
  ]
};

// This delegates parsing shorthand value syntax to the browser.
var shorthandExpanderElem = createDummyElement();
var expandShorthand = function(property, value, result) {
  shorthandExpanderElem.style[property] = value;
  var longProperties = shorthandToLonghand[property];
  for (var i in longProperties) {
    var longProperty = longProperties[i];
    var longhandValue = shorthandExpanderElem.style[longProperty];
    result[longProperty] = longhandValue;
  }
};

var normalizeKeyframeDictionary = function(properties) {
  var result = {
    offset: null,
    composite: null,
    easing: presetTimingFunctions.linear
  };
  var animationProperties = [];
  for (var property in properties) {
    // TODO: Apply the CSS property to IDL attribute algorithm.
    if (property === 'offset') {
      if (typeof properties.offset === 'number') {
        result.offset = properties.offset;
      }
    } else if (property === 'composite') {
      if (properties.composite === 'add' ||
          properties.composite === 'replace') {
        result.composite = properties.composite;
      }
    } else if (property === 'easing') {
      result.easing = TimingFunction.createFromString(properties.easing);
    } else {
      // TODO: Check whether this is a supported property.
      animationProperties.push(property);
    }
  }
  // TODO: Remove prefixed properties if the unprefixed version is also
  // supported and present.
  animationProperties = animationProperties.sort(playerSortFunction);
  for (var i = 0; i < animationProperties.length; i++) {
    // TODO: Apply the IDL attribute to CSS property algorithm.
    var property = animationProperties[i];
    // TODO: The spec does not specify how to handle null values.
    // See https://www.w3.org/Bugs/Public/show_bug.cgi?id=22572
    var value = isDefinedAndNotNull(properties[property]) ?
        properties[property].toString() : '';
    if (property in shorthandToLonghand) {
      expandShorthand(property, value, result);
    } else {
      result[property] = value;
    }
  }
  return result;
};



/** @constructor */
var KeyframeEffect = function(oneOrMoreKeyframeDictionaries,
    composite) {
  enterModifyCurrentAnimationState();
  try {
    AnimationEffect.call(this, constructorToken);

    this.composite = composite;

    this.setFrames(oneOrMoreKeyframeDictionaries);
  } finally {
    exitModifyCurrentAnimationState(null);
  }
};

KeyframeEffect.prototype = createObject(AnimationEffect.prototype, {
  get composite() {
    return this._composite;
  },
  set composite(value) {
    enterModifyCurrentAnimationState();
    try {
      // Use the default value if an invalid string is specified.
      this._composite = value === 'add' ? 'add' : 'replace';
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  getFrames: function() {
    return this._keyframeDictionaries.slice(0);
  },
  setFrames: function(oneOrMoreKeyframeDictionaries) {
    enterModifyCurrentAnimationState();
    try {
      if (!Array.isArray(oneOrMoreKeyframeDictionaries)) {
        oneOrMoreKeyframeDictionaries = [oneOrMoreKeyframeDictionaries];
      }
      this._keyframeDictionaries =
          oneOrMoreKeyframeDictionaries.map(normalizeKeyframeDictionary);
      // Set lazily
      this._cachedPropertySpecificKeyframes = null;
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  _sample: function(timeFraction, currentIteration, target) {
    var frames = this._propertySpecificKeyframes();
    for (var property in frames) {
      compositor.setAnimatedValue(target, property,
          this._sampleForProperty(
              frames[property], timeFraction, currentIteration));
    }
  },
  _sampleForProperty: function(frames, timeFraction, currentIteration) {
    ASSERT_ENABLED && assert(
        frames.length >= 2,
        'Interpolation requires at least two keyframes');

    var startKeyframeIndex;
    var length = frames.length;
    // We extrapolate differently depending on whether or not there are multiple
    // keyframes at offsets of 0 and 1.
    if (timeFraction < 0.0) {
      if (frames[1].offset === 0.0) {
        return new AddReplaceCompositableValue(frames[0].rawValue(),
            this._compositeForKeyframe(frames[0]));
      } else {
        startKeyframeIndex = 0;
      }
    } else if (timeFraction >= 1.0) {
      if (frames[length - 2].offset === 1.0) {
        return new AddReplaceCompositableValue(frames[length - 1].rawValue(),
            this._compositeForKeyframe(frames[length - 1]));
      } else {
        startKeyframeIndex = length - 2;
      }
    } else {
      for (var i = length - 1; i >= 0; i--) {
        if (frames[i].offset <= timeFraction) {
          ASSERT_ENABLED && assert(frames[i].offset !== 1.0);
          startKeyframeIndex = i;
          break;
        }
      }
    }
    var startKeyframe = frames[startKeyframeIndex];
    var endKeyframe = frames[startKeyframeIndex + 1];
    if (startKeyframe.offset === timeFraction) {
      return new AddReplaceCompositableValue(startKeyframe.rawValue(),
          this._compositeForKeyframe(startKeyframe));
    }
    if (endKeyframe.offset === timeFraction) {
      return new AddReplaceCompositableValue(endKeyframe.rawValue(),
          this._compositeForKeyframe(endKeyframe));
    }
    var intervalDistance = (timeFraction - startKeyframe.offset) /
        (endKeyframe.offset - startKeyframe.offset);
    if (startKeyframe.easing) {
      intervalDistance = startKeyframe.easing.scaleTime(intervalDistance);
    }
    return new BlendedCompositableValue(
        new AddReplaceCompositableValue(startKeyframe.rawValue(),
            this._compositeForKeyframe(startKeyframe)),
        new AddReplaceCompositableValue(endKeyframe.rawValue(),
            this._compositeForKeyframe(endKeyframe)),
        intervalDistance);
  },
  _propertySpecificKeyframes: function() {
    if (isDefinedAndNotNull(this._cachedPropertySpecificKeyframes)) {
      return this._cachedPropertySpecificKeyframes;
    }

    this._cachedPropertySpecificKeyframes = {};
    var distributedFrames = this._getDistributedKeyframes();
    for (var i = 0; i < distributedFrames.length; i++) {
      for (var property in distributedFrames[i].cssValues) {
        if (!(property in this._cachedPropertySpecificKeyframes)) {
          this._cachedPropertySpecificKeyframes[property] = [];
        }
        var frame = distributedFrames[i];
        this._cachedPropertySpecificKeyframes[property].push(
            new PropertySpecificKeyframe(frame.offset, frame.composite,
                frame.easing, property, frame.cssValues[property]));
      }
    }

    for (var property in this._cachedPropertySpecificKeyframes) {
      var frames = this._cachedPropertySpecificKeyframes[property];
      ASSERT_ENABLED && assert(
          frames.length > 0,
          'There should always be keyframes for each property');

      // Add synthetic keyframes at offsets of 0 and 1 if required.
      if (frames[0].offset !== 0.0) {
        var keyframe = new PropertySpecificKeyframe(0.0, 'add',
            presetTimingFunctions.linear, property, cssNeutralValue);
        frames.unshift(keyframe);
      }
      if (frames[frames.length - 1].offset !== 1.0) {
        var keyframe = new PropertySpecificKeyframe(1.0, 'add',
            presetTimingFunctions.linear, property, cssNeutralValue);
        frames.push(keyframe);
      }
      ASSERT_ENABLED && assert(
          frames.length >= 2,
          'There should be at least two keyframes including' +
          ' synthetic keyframes');
    }

    return this._cachedPropertySpecificKeyframes;
  },
  clone: function() {
    var result = new KeyframeEffect([], this.composite);
    result._keyframeDictionaries = this._keyframeDictionaries.slice(0);
    return result;
  },
  toString: function() {
    return '<KeyframeEffect>';
  },
  _compositeForKeyframe: function(keyframe) {
    return isDefinedAndNotNull(keyframe.composite) ?
        keyframe.composite : this.composite;
  },
  _allKeyframesUseSameCompositeOperation: function(keyframes) {
    ASSERT_ENABLED && assert(
        keyframes.length >= 1, 'This requires at least one keyframe');
    var composite = this._compositeForKeyframe(keyframes[0]);
    for (var i = 1; i < keyframes.length; i++) {
      if (this._compositeForKeyframe(keyframes[i]) !== composite) {
        return false;
      }
    }
    return true;
  },
  _areKeyframeDictionariesLooselySorted: function() {
    var previousOffset = -Infinity;
    for (var i = 0; i < this._keyframeDictionaries.length; i++) {
      if (isDefinedAndNotNull(this._keyframeDictionaries[i].offset)) {
        if (this._keyframeDictionaries[i].offset < previousOffset) {
          return false;
        }
        previousOffset = this._keyframeDictionaries[i].offset;
      }
    }
    return true;
  },
  // The spec describes both this process and the process for interpretting the
  // properties of a keyframe dictionary as 'normalizing'. Here we use the term
  // 'distributing' to avoid confusion with normalizeKeyframeDictionary().
  _getDistributedKeyframes: function() {
    if (!this._areKeyframeDictionariesLooselySorted()) {
      return [];
    }

    var distributedKeyframes = this._keyframeDictionaries.map(
        KeyframeInternal.createFromNormalizedProperties);

    // Remove keyframes with offsets out of bounds.
    var length = distributedKeyframes.length;
    var count = 0;
    for (var i = 0; i < length; i++) {
      var offset = distributedKeyframes[i].offset;
      if (isDefinedAndNotNull(offset)) {
        if (offset >= 0) {
          break;
        } else {
          count = i;
        }
      }
    }
    distributedKeyframes.splice(0, count);

    length = distributedKeyframes.length;
    count = 0;
    for (var i = length - 1; i >= 0; i--) {
      var offset = distributedKeyframes[i].offset;
      if (isDefinedAndNotNull(offset)) {
        if (offset <= 1) {
          break;
        } else {
          count = length - i;
        }
      }
    }
    distributedKeyframes.splice(length - count, count);

    // Distribute offsets.
    length = distributedKeyframes.length;
    if (length > 1 && !isDefinedAndNotNull(distributedKeyframes[0].offset)) {
      distributedKeyframes[0].offset = 0;
    }
    if (length > 0 &&
        !isDefinedAndNotNull(distributedKeyframes[length - 1].offset)) {
      distributedKeyframes[length - 1].offset = 1;
    }
    var lastOffsetIndex = 0;
    var nextOffsetIndex = 0;
    for (var i = 1; i < distributedKeyframes.length - 1; i++) {
      var keyframe = distributedKeyframes[i];
      if (isDefinedAndNotNull(keyframe.offset)) {
        lastOffsetIndex = i;
        continue;
      }
      if (i > nextOffsetIndex) {
        nextOffsetIndex = i;
        while (!isDefinedAndNotNull(
            distributedKeyframes[nextOffsetIndex].offset)) {
          nextOffsetIndex++;
        }
      }
      var lastOffset = distributedKeyframes[lastOffsetIndex].offset;
      var nextOffset = distributedKeyframes[nextOffsetIndex].offset;
      var unspecifiedKeyframes = nextOffsetIndex - lastOffsetIndex - 1;
      ASSERT_ENABLED && assert(unspecifiedKeyframes > 0);
      var localIndex = i - lastOffsetIndex;
      ASSERT_ENABLED && assert(localIndex > 0);
      distributedKeyframes[i].offset = lastOffset +
          (nextOffset - lastOffset) * localIndex / (unspecifiedKeyframes + 1);
    }

    // Remove invalid property values.
    for (var i = distributedKeyframes.length - 1; i >= 0; i--) {
      var keyframe = distributedKeyframes[i];
      for (var property in keyframe.cssValues) {
        if (!KeyframeInternal.isSupportedPropertyValue(
            keyframe.cssValues[property])) {
          delete(keyframe.cssValues[property]);
        }
      }
      if (Object.keys(keyframe).length === 0) {
        distributedKeyframes.splice(i, 1);
      }
    }

    return distributedKeyframes;
  }
});



/**
 * An internal representation of a keyframe. The Keyframe type from the spec is
 * just a dictionary and is not exposed.
 *
 * @constructor
 */
var KeyframeInternal = function(offset, composite, easing) {
  ASSERT_ENABLED && assert(
      typeof offset === 'number' || offset === null,
      'Invalid offset value');
  ASSERT_ENABLED && assert(
      composite === 'add' || composite === 'replace' || composite === null,
      'Invalid composite value');
  this.offset = offset;
  this.composite = composite;
  this.easing = easing;
  this.cssValues = {};
};

KeyframeInternal.prototype = {
  addPropertyValuePair: function(property, value) {
    ASSERT_ENABLED && assert(!this.cssValues.hasOwnProperty(property));
    this.cssValues[property] = value;
  },
  hasValueForProperty: function(property) {
    return property in this.cssValues;
  }
};

KeyframeInternal.isSupportedPropertyValue = function(value) {
  ASSERT_ENABLED && assert(
      typeof value === 'string' || value === cssNeutralValue);
  // TODO: Check this properly!
  return value !== '';
};

KeyframeInternal.createFromNormalizedProperties = function(properties) {
  ASSERT_ENABLED && assert(
      isDefinedAndNotNull(properties) && typeof properties === 'object',
      'Properties must be an object');
  var keyframe = new KeyframeInternal(properties.offset, properties.composite,
      properties.easing);
  for (var candidate in properties) {
    if (candidate !== 'offset' &&
        candidate !== 'composite' &&
        candidate !== 'easing') {
      keyframe.addPropertyValuePair(candidate, properties[candidate]);
    }
  }
  return keyframe;
};



/** @constructor */
var PropertySpecificKeyframe = function(offset, composite, easing, property,
    cssValue) {
  this.offset = offset;
  this.composite = composite;
  this.easing = easing;
  this.property = property;
  this.cssValue = cssValue;
  // Calculated lazily
  this.cachedRawValue = null;
};

PropertySpecificKeyframe.prototype = {
  rawValue: function() {
    if (!isDefinedAndNotNull(this.cachedRawValue)) {
      this.cachedRawValue = fromCssValue(this.property, this.cssValue);
    }
    return this.cachedRawValue;
  }
};



/** @constructor */
var TimingFunction = function() {
  throw new TypeError('Illegal constructor');
};

TimingFunction.prototype.scaleTime = abstractMethod;

TimingFunction.createFromString = function(spec, timedItem) {
  var preset = presetTimingFunctions[spec];
  if (preset) {
    return preset;
  }
  if (spec === 'paced') {
    if (timedItem instanceof Animation &&
        timedItem.effect instanceof MotionPathEffect) {
      return new PacedTimingFunction(timedItem.effect);
    }
    return presetTimingFunctions.linear;
  }
  var stepMatch = /steps\(\s*(\d+)\s*,\s*(start|end|middle)\s*\)/.exec(spec);
  if (stepMatch) {
    return new StepTimingFunction(Number(stepMatch[1]), stepMatch[2]);
  }
  var bezierMatch =
      /cubic-bezier\(([^,]*),([^,]*),([^,]*),([^)]*)\)/.exec(spec);
  if (bezierMatch) {
    return new CubicBezierTimingFunction([
      Number(bezierMatch[1]),
      Number(bezierMatch[2]),
      Number(bezierMatch[3]),
      Number(bezierMatch[4])
    ]);
  }
  return presetTimingFunctions.linear;
};



/** @constructor */
var CubicBezierTimingFunction = function(spec) {
  this.params = spec;
  this.map = [];
  for (var ii = 0; ii <= 100; ii += 1) {
    var i = ii / 100;
    this.map.push([
      3 * i * (1 - i) * (1 - i) * this.params[0] +
          3 * i * i * (1 - i) * this.params[2] + i * i * i,
      3 * i * (1 - i) * (1 - i) * this.params[1] +
          3 * i * i * (1 - i) * this.params[3] + i * i * i
    ]);
  }
};

CubicBezierTimingFunction.prototype = createObject(TimingFunction.prototype, {
  scaleTime: function(fraction) {
    var fst = 0;
    while (fst !== 100 && fraction > this.map[fst][0]) {
      fst += 1;
    }
    if (fraction === this.map[fst][0] || fst === 0) {
      return this.map[fst][1];
    }
    var yDiff = this.map[fst][1] - this.map[fst - 1][1];
    var xDiff = this.map[fst][0] - this.map[fst - 1][0];
    var p = (fraction - this.map[fst - 1][0]) / xDiff;
    return this.map[fst - 1][1] + p * yDiff;
  }
});



/** @constructor */
var StepTimingFunction = function(numSteps, position) {
  this.numSteps = numSteps;
  this.position = position || 'end';
};

StepTimingFunction.prototype = createObject(TimingFunction.prototype, {
  scaleTime: function(fraction) {
    if (fraction >= 1) {
      return 1;
    }
    var stepSize = 1 / this.numSteps;
    if (this.position === 'start') {
      fraction += stepSize;
    } else if (this.position === 'middle') {
      fraction += stepSize / 2;
    }
    return fraction - fraction % stepSize;
  }
});

var presetTimingFunctions = {
  'linear': null,
  'ease': new CubicBezierTimingFunction([0.25, 0.1, 0.25, 1.0]),
  'ease-in': new CubicBezierTimingFunction([0.42, 0, 1.0, 1.0]),
  'ease-out': new CubicBezierTimingFunction([0, 0, 0.58, 1.0]),
  'ease-in-out': new CubicBezierTimingFunction([0.42, 0, 0.58, 1.0]),
  'step-start': new StepTimingFunction(1, 'start'),
  'step-middle': new StepTimingFunction(1, 'middle'),
  'step-end': new StepTimingFunction(1, 'end')
};



/** @constructor */
var PacedTimingFunction = function(pathEffect) {
  ASSERT_ENABLED && assert(pathEffect instanceof MotionPathEffect);
  this._pathEffect = pathEffect;
  // Range is the portion of the effect over which we pace, normalized to
  // [0, 1].
  this._range = {min: 0, max: 1};
};

PacedTimingFunction.prototype = createObject(TimingFunction.prototype, {
  setRange: function(range) {
    ASSERT_ENABLED && assert(range.min >= 0 && range.min <= 1);
    ASSERT_ENABLED && assert(range.max >= 0 && range.max <= 1);
    ASSERT_ENABLED && assert(range.min < range.max);
    this._range = range;
  },
  scaleTime: function(fraction) {
    var cumulativeLengths = this._pathEffect._cumulativeLengths;
    var numSegments = cumulativeLengths.length - 1;
    if (!cumulativeLengths[numSegments] || fraction <= 0) {
      return this._range.min;
    }
    if (fraction >= 1) {
      return this._range.max;
    }
    var minLength = this.lengthAtIndex(this._range.min * numSegments);
    var maxLength = this.lengthAtIndex(this._range.max * numSegments);
    var length = interp(minLength, maxLength, fraction);
    var leftIndex = this.findLeftIndex(cumulativeLengths, length);
    var leftLength = cumulativeLengths[leftIndex];
    var segmentLength = cumulativeLengths[leftIndex + 1] - leftLength;
    if (segmentLength > 0) {
      return (leftIndex + (length - leftLength) / segmentLength) / numSegments;
    }
    return leftLength / cumulativeLengths.length;
  },
  findLeftIndex: function(array, value) {
    var leftIndex = 0;
    var rightIndex = array.length;
    while (rightIndex - leftIndex > 1) {
      var midIndex = (leftIndex + rightIndex) >> 1;
      if (array[midIndex] <= value) {
        leftIndex = midIndex;
      } else {
        rightIndex = midIndex;
      }
    }
    return leftIndex;
  },
  lengthAtIndex: function(i) {
    ASSERT_ENABLED &&
        console.assert(i >= 0 && i <= cumulativeLengths.length - 1);
    var leftIndex = Math.floor(i);
    var startLength = this._pathEffect._cumulativeLengths[leftIndex];
    var endLength = this._pathEffect._cumulativeLengths[leftIndex + 1];
    var indexFraction = i % 1;
    return interp(startLength, endLength, indexFraction);
  }
});

var interp = function(from, to, f, type) {
  if (Array.isArray(from) || Array.isArray(to)) {
    return interpArray(from, to, f, type);
  }
  var zero = (type && type.indexOf('scale') === 0) ? 1 : 0;
  to = isDefinedAndNotNull(to) ? to : zero;
  from = isDefinedAndNotNull(from) ? from : zero;

  return to * f + from * (1 - f);
};

var interpArray = function(from, to, f, type) {
  ASSERT_ENABLED && assert(
      Array.isArray(from) || from === null,
      'From is not an array or null');
  ASSERT_ENABLED && assert(
      Array.isArray(to) || to === null,
      'To is not an array or null');
  ASSERT_ENABLED && assert(
      from === null || to === null || from.length === to.length,
      'Arrays differ in length ' + from + ' : ' + to);
  var length = from ? from.length : to.length;

  var result = [];
  for (var i = 0; i < length; i++) {
    result[i] = interp(from ? from[i] : null, to ? to[i] : null, f, type);
  }
  return result;
};

var typeWithKeywords = function(keywords, type) {
  var isKeyword;
  if (keywords.length === 1) {
    var keyword = keywords[0];
    isKeyword = function(value) {
      return value === keyword;
    };
  } else {
    isKeyword = function(value) {
      return keywords.indexOf(value) >= 0;
    };
  }
  return createObject(type, {
    add: function(base, delta) {
      if (isKeyword(base) || isKeyword(delta)) {
        return delta;
      }
      return type.add(base, delta);
    },
    interpolate: function(from, to, f) {
      if (isKeyword(from) || isKeyword(to)) {
        return nonNumericType.interpolate(from, to, f);
      }
      return type.interpolate(from, to, f);
    },
    toCssValue: function(value, svgMode) {
      return isKeyword(value) ? value : type.toCssValue(value, svgMode);
    },
    fromCssValue: function(value) {
      return isKeyword(value) ? value : type.fromCssValue(value);
    }
  });
};

var numberType = {
  add: function(base, delta) {
    // If base or delta are 'auto', we fall back to replacement.
    if (base === 'auto' || delta === 'auto') {
      return nonNumericType.add(base, delta);
    }
    return base + delta;
  },
  interpolate: function(from, to, f) {
    // If from or to are 'auto', we fall back to step interpolation.
    if (from === 'auto' || to === 'auto') {
      return nonNumericType.interpolate(from, to);
    }
    return interp(from, to, f);
  },
  toCssValue: function(value) { return value + ''; },
  fromCssValue: function(value) {
    if (value === 'auto') {
      return 'auto';
    }
    var result = Number(value);
    return isNaN(result) ? undefined : result;
  }
};

var integerType = createObject(numberType, {
  interpolate: function(from, to, f) {
    // If from or to are 'auto', we fall back to step interpolation.
    if (from === 'auto' || to === 'auto') {
      return nonNumericType.interpolate(from, to);
    }
    return Math.floor(interp(from, to, f));
  }
});

var fontWeightType = {
  add: function(base, delta) { return base + delta; },
  interpolate: function(from, to, f) {
    return interp(from, to, f);
  },
  toCssValue: function(value) {
    value = Math.round(value / 100) * 100;
    value = clamp(value, 100, 900);
    if (value === 400) {
      return 'normal';
    }
    if (value === 700) {
      return 'bold';
    }
    return String(value);
  },
  fromCssValue: function(value) {
    // TODO: support lighter / darker ?
    var out = Number(value);
    if (isNaN(out) || out < 100 || out > 900 || out % 100 !== 0) {
      return undefined;
    }
    return out;
  }
};

// This regular expression is intentionally permissive, so that
// platform-prefixed versions of calc will still be accepted as
// input. While we are restrictive with the transform property
// name, we need to be able to read underlying calc values from
// computedStyle so can't easily restrict the input here.
var outerCalcRE = /^\s*(-webkit-)?calc\s*\(\s*([^)]*)\)/;
var valueRE = /^\s*(-?[0-9]+(\.[0-9])?[0-9]*)([a-zA-Z%]*)/;
var operatorRE = /^\s*([+-])/;
var autoRE = /^\s*auto/i;
var percentLengthType = {
  zero: function() { return {}; },
  add: function(base, delta) {
    var out = {};
    for (var value in base) {
      out[value] = base[value] + (delta[value] || 0);
    }
    for (value in delta) {
      if (value in base) {
        continue;
      }
      out[value] = delta[value];
    }
    return out;
  },
  interpolate: function(from, to, f) {
    var out = {};
    for (var value in from) {
      out[value] = interp(from[value], to[value], f);
    }
    for (var value in to) {
      if (value in out) {
        continue;
      }
      out[value] = interp(0, to[value], f);
    }
    return out;
  },
  toCssValue: function(value) {
    var s = '';
    var singleValue = true;
    for (var item in value) {
      if (s === '') {
        s = value[item] + item;
      } else if (singleValue) {
        if (value[item] !== 0) {
          s = features.calcFunction +
              '(' + s + ' + ' + value[item] + item + ')';
          singleValue = false;
        }
      } else if (value[item] !== 0) {
        s = s.substring(0, s.length - 1) + ' + ' + value[item] + item + ')';
      }
    }
    return s;
  },
  fromCssValue: function(value) {
    var result = percentLengthType.consumeValueFromString(value);
    if (result) {
      return result.value;
    }
    return undefined;
  },
  consumeValueFromString: function(value) {
    if (!isDefinedAndNotNull(value)) {
      return undefined;
    }
    var autoMatch = autoRE.exec(value);
    if (autoMatch) {
      return {
        value: { auto: true },
        remaining: value.substring(autoMatch[0].length)
      };
    }
    var out = {};
    var calcMatch = outerCalcRE.exec(value);
    if (!calcMatch) {
      var singleValue = valueRE.exec(value);
      if (singleValue && (singleValue.length === 4)) {
        out[singleValue[3]] = Number(singleValue[1]);
        return {
          value: out,
          remaining: value.substring(singleValue[0].length)
        };
      }
      return undefined;
    }
    var remaining = value.substring(calcMatch[0].length);
    var calcInnards = calcMatch[2];
    var firstTime = true;
    while (true) {
      var reversed = false;
      if (firstTime) {
        firstTime = false;
      } else {
        var op = operatorRE.exec(calcInnards);
        if (!op) {
          return undefined;
        }
        if (op[1] === '-') {
          reversed = true;
        }
        calcInnards = calcInnards.substring(op[0].length);
      }
      value = valueRE.exec(calcInnards);
      if (!value) {
        return undefined;
      }
      var valueUnit = value[3];
      var valueNumber = Number(value[1]);
      if (!isDefinedAndNotNull(out[valueUnit])) {
        out[valueUnit] = 0;
      }
      if (reversed) {
        out[valueUnit] -= valueNumber;
      } else {
        out[valueUnit] += valueNumber;
      }
      calcInnards = calcInnards.substring(value[0].length);
      if (/\s*/.exec(calcInnards)[0].length === calcInnards.length) {
        return {
          value: out,
          remaining: remaining
        };
      }
    }
  },
  negate: function(value) {
    var out = {};
    for (var unit in value) {
      out[unit] = -value[unit];
    }
    return out;
  }
};

var percentLengthAutoType = typeWithKeywords(['auto'], percentLengthType);

var positionKeywordRE = /^\s*left|^\s*center|^\s*right|^\s*top|^\s*bottom/i;
var positionType = {
  zero: function() { return [{ px: 0 }, { px: 0 }]; },
  add: function(base, delta) {
    return [
      percentLengthType.add(base[0], delta[0]),
      percentLengthType.add(base[1], delta[1])
    ];
  },
  interpolate: function(from, to, f) {
    return [
      percentLengthType.interpolate(from[0], to[0], f),
      percentLengthType.interpolate(from[1], to[1], f)
    ];
  },
  toCssValue: function(value) {
    return value.map(percentLengthType.toCssValue).join(' ');
  },
  fromCssValue: function(value) {
    var tokens = positionType.consumeAllTokensFromString(value);
    if (!tokens || tokens.length > 4) {
      return undefined;
    }

    if (tokens.length === 1) {
      var token = tokens[0];
      return (positionType.isHorizontalToken(token) ?
          [token, 'center'] : ['center', token]).map(positionType.resolveToken);
    }

    if (tokens.length === 2 &&
        positionType.isHorizontalToken(tokens[0]) &&
        positionType.isVerticalToken(tokens[1])) {
      return tokens.map(positionType.resolveToken);
    }

    if (tokens.filter(positionType.isKeyword).length !== 2) {
      return undefined;
    }

    var out = [undefined, undefined];
    var center = false;
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (!positionType.isKeyword(token)) {
        return undefined;
      }
      if (token === 'center') {
        if (center) {
          return undefined;
        }
        center = true;
        continue;
      }
      var axis = Number(positionType.isVerticalToken(token));
      if (out[axis]) {
        return undefined;
      }
      if (i === tokens.length - 1 || positionType.isKeyword(tokens[i + 1])) {
        out[axis] = positionType.resolveToken(token);
        continue;
      }
      var percentLength = tokens[++i];
      if (token === 'bottom' || token === 'right') {
        percentLength = percentLengthType.negate(percentLength);
        percentLength['%'] = (percentLength['%'] || 0) + 100;
      }
      out[axis] = percentLength;
    }
    if (center) {
      if (!out[0]) {
        out[0] = positionType.resolveToken('center');
      } else if (!out[1]) {
        out[1] = positionType.resolveToken('center');
      } else {
        return undefined;
      }
    }
    return out.every(isDefinedAndNotNull) ? out : undefined;
  },
  consumeAllTokensFromString: function(remaining) {
    var tokens = [];
    while (remaining.trim()) {
      var result = positionType.consumeTokenFromString(remaining);
      if (!result) {
        return undefined;
      }
      tokens.push(result.value);
      remaining = result.remaining;
    }
    return tokens;
  },
  consumeTokenFromString: function(value) {
    var keywordMatch = positionKeywordRE.exec(value);
    if (keywordMatch) {
      return {
        value: keywordMatch[0].trim().toLowerCase(),
        remaining: value.substring(keywordMatch[0].length)
      };
    }
    return percentLengthType.consumeValueFromString(value);
  },
  resolveToken: function(token) {
    if (typeof token === 'string') {
      return percentLengthType.fromCssValue({
        left: '0%',
        center: '50%',
        right: '100%',
        top: '0%',
        bottom: '100%'
      }[token]);
    }
    return token;
  },
  isHorizontalToken: function(token) {
    if (typeof token === 'string') {
      return token in { left: true, center: true, right: true };
    }
    return true;
  },
  isVerticalToken: function(token) {
    if (typeof token === 'string') {
      return token in { top: true, center: true, bottom: true };
    }
    return true;
  },
  isKeyword: function(token) {
    return typeof token === 'string';
  }
};

// Spec: http://dev.w3.org/csswg/css-backgrounds/#background-position
var positionListType = {
  zero: function() { return [positionType.zero()]; },
  add: function(base, delta) {
    var out = [];
    var maxLength = Math.max(base.length, delta.length);
    for (var i = 0; i < maxLength; i++) {
      var basePosition = base[i] ? base[i] : positionType.zero();
      var deltaPosition = delta[i] ? delta[i] : positionType.zero();
      out.push(positionType.add(basePosition, deltaPosition));
    }
    return out;
  },
  interpolate: function(from, to, f) {
    var out = [];
    var maxLength = Math.max(from.length, to.length);
    for (var i = 0; i < maxLength; i++) {
      var fromPosition = from[i] ? from[i] : positionType.zero();
      var toPosition = to[i] ? to[i] : positionType.zero();
      out.push(positionType.interpolate(fromPosition, toPosition, f));
    }
    return out;
  },
  toCssValue: function(value) {
    return value.map(positionType.toCssValue).join(', ');
  },
  fromCssValue: function(value) {
    if (!isDefinedAndNotNull(value)) {
      return undefined;
    }
    if (!value.trim()) {
      return [positionType.fromCssValue('0% 0%')];
    }
    var positionValues = value.split(',');
    var out = positionValues.map(positionType.fromCssValue);
    return out.every(isDefinedAndNotNull) ? out : undefined;
  }
};

var rectangleRE = /rect\(([^,]+),([^,]+),([^,]+),([^)]+)\)/;
var rectangleType = {
  add: function(base, delta) {
    return {
      top: percentLengthType.add(base.top, delta.top),
      right: percentLengthType.add(base.right, delta.right),
      bottom: percentLengthType.add(base.bottom, delta.bottom),
      left: percentLengthType.add(base.left, delta.left)
    };
  },
  interpolate: function(from, to, f) {
    return {
      top: percentLengthType.interpolate(from.top, to.top, f),
      right: percentLengthType.interpolate(from.right, to.right, f),
      bottom: percentLengthType.interpolate(from.bottom, to.bottom, f),
      left: percentLengthType.interpolate(from.left, to.left, f)
    };
  },
  toCssValue: function(value) {
    return 'rect(' +
        percentLengthType.toCssValue(value.top) + ',' +
        percentLengthType.toCssValue(value.right) + ',' +
        percentLengthType.toCssValue(value.bottom) + ',' +
        percentLengthType.toCssValue(value.left) + ')';
  },
  fromCssValue: function(value) {
    var match = rectangleRE.exec(value);
    if (!match) {
      return undefined;
    }
    var out = {
      top: percentLengthType.fromCssValue(match[1]),
      right: percentLengthType.fromCssValue(match[2]),
      bottom: percentLengthType.fromCssValue(match[3]),
      left: percentLengthType.fromCssValue(match[4])
    };
    if (out.top && out.right && out.bottom && out.left) {
      return out;
    }
    return undefined;
  }
};

var originType = {
  zero: function() { return [{'%': 0}, {'%': 0}, {px: 0}]; },
  add: function(base, delta) {
    return [
      percentLengthType.add(base[0], delta[0]),
      percentLengthType.add(base[1], delta[1]),
      percentLengthType.add(base[2], delta[2])
    ];
  },
  interpolate: function(from, to, f) {
    return [
      percentLengthType.interpolate(from[0], to[0], f),
      percentLengthType.interpolate(from[1], to[1], f),
      percentLengthType.interpolate(from[2], to[2], f)
    ];
  },
  toCssValue: function(value) {
    var result = percentLengthType.toCssValue(value[0]) + ' ' +
        percentLengthType.toCssValue(value[1]);
    // Return the third value if it is non-zero.
    for (var unit in value[2]) {
      if (value[2][unit] !== 0) {
        return result + ' ' + percentLengthType.toCssValue(value[2]);
      }
    }
    return result;
  },
  fromCssValue: function(value) {
    var tokens = positionType.consumeAllTokensFromString(value);
    if (!tokens) {
      return undefined;
    }
    var out = ['center', 'center', {px: 0}];
    switch (tokens.length) {
      case 0:
        return originType.zero();
      case 1:
        if (positionType.isHorizontalToken(tokens[0])) {
          out[0] = tokens[0];
        } else if (positionType.isVerticalToken(tokens[0])) {
          out[1] = tokens[0];
        } else {
          return undefined;
        }
        return out.map(positionType.resolveToken);
      case 3:
        if (positionType.isKeyword(tokens[2])) {
          return undefined;
        }
        out[2] = tokens[2];
      case 2:
        if (positionType.isHorizontalToken(tokens[0]) &&
            positionType.isVerticalToken(tokens[1])) {
          out[0] = tokens[0];
          out[1] = tokens[1];
        } else if (positionType.isVerticalToken(tokens[0]) &&
            positionType.isHorizontalToken(tokens[1])) {
          out[0] = tokens[1];
          out[1] = tokens[0];
        } else {
          return undefined;
        }
        return out.map(positionType.resolveToken);
      default:
        return undefined;
    }
  }
};

var shadowType = {
  zero: function() {
    return {
      hOffset: lengthType.zero(),
      vOffset: lengthType.zero()
    };
  },
  _addSingle: function(base, delta) {
    if (base && delta && base.inset !== delta.inset) {
      return delta;
    }
    var result = {
      inset: base ? base.inset : delta.inset,
      hOffset: lengthType.add(
          base ? base.hOffset : lengthType.zero(),
          delta ? delta.hOffset : lengthType.zero()),
      vOffset: lengthType.add(
          base ? base.vOffset : lengthType.zero(),
          delta ? delta.vOffset : lengthType.zero()),
      blur: lengthType.add(
          base && base.blur || lengthType.zero(),
          delta && delta.blur || lengthType.zero())
    };
    if (base && base.spread || delta && delta.spread) {
      result.spread = lengthType.add(
          base && base.spread || lengthType.zero(),
          delta && delta.spread || lengthType.zero());
    }
    if (base && base.color || delta && delta.color) {
      result.color = colorType.add(
          base && base.color || colorType.zero(),
          delta && delta.color || colorType.zero());
    }
    return result;
  },
  add: function(base, delta) {
    var result = [];
    for (var i = 0; i < base.length || i < delta.length; i++) {
      result.push(this._addSingle(base[i], delta[i]));
    }
    return result;
  },
  _interpolateSingle: function(from, to, f) {
    if (from && to && from.inset !== to.inset) {
      return f < 0.5 ? from : to;
    }
    var result = {
      inset: from ? from.inset : to.inset,
      hOffset: lengthType.interpolate(
          from ? from.hOffset : lengthType.zero(),
          to ? to.hOffset : lengthType.zero(), f),
      vOffset: lengthType.interpolate(
          from ? from.vOffset : lengthType.zero(),
          to ? to.vOffset : lengthType.zero(), f),
      blur: lengthType.interpolate(
          from && from.blur || lengthType.zero(),
          to && to.blur || lengthType.zero(), f)
    };
    if (from && from.spread || to && to.spread) {
      result.spread = lengthType.interpolate(
          from && from.spread || lengthType.zero(),
          to && to.spread || lengthType.zero(), f);
    }
    if (from && from.color || to && to.color) {
      result.color = colorType.interpolate(
          from && from.color || colorType.zero(),
          to && to.color || colorType.zero(), f);
    }
    return result;
  },
  interpolate: function(from, to, f) {
    var result = [];
    for (var i = 0; i < from.length || i < to.length; i++) {
      result.push(this._interpolateSingle(from[i], to[i], f));
    }
    return result;
  },
  _toCssValueSingle: function(value) {
    return (value.inset ? 'inset ' : '') +
        lengthType.toCssValue(value.hOffset) + ' ' +
        lengthType.toCssValue(value.vOffset) + ' ' +
        lengthType.toCssValue(value.blur) +
        (value.spread ? ' ' + lengthType.toCssValue(value.spread) : '') +
        (value.color ? ' ' + colorType.toCssValue(value.color) : '');
  },
  toCssValue: function(value) {
    return value.map(this._toCssValueSingle).join(', ');
  },
  fromCssValue: function(value) {
    var shadowRE = /(([^(,]+(\([^)]*\))?)+)/g;
    var match;
    var shadows = [];
    while ((match = shadowRE.exec(value)) !== null) {
      shadows.push(match[0]);
    }

    var result = shadows.map(function(value) {
      if (value === 'none') {
        return shadowType.zero();
      }
      value = value.replace(/^\s+|\s+$/g, '');

      var partsRE = /([^ (]+(\([^)]*\))?)/g;
      var parts = [];
      while ((match = partsRE.exec(value)) !== null) {
        parts.push(match[0]);
      }

      if (parts.length < 2 || parts.length > 7) {
        return undefined;
      }
      var result = {
        inset: false
      };

      var lengths = [];
      while (parts.length) {
        var part = parts.shift();

        var length = lengthType.fromCssValue(part);
        if (length) {
          lengths.push(length);
          continue;
        }

        var color = colorType.fromCssValue(part);
        if (color) {
          result.color = color;
        }

        if (part === 'inset') {
          result.inset = true;
        }
      }

      if (lengths.length < 2 || lengths.length > 4) {
        return undefined;
      }
      result.hOffset = lengths[0];
      result.vOffset = lengths[1];
      if (lengths.length > 2) {
        result.blur = lengths[2];
      }
      if (lengths.length > 3) {
        result.spread = lengths[3];
      }
      return result;
    });

    return result.every(isDefined) ? result : undefined;
  }
};

var nonNumericType = {
  add: function(base, delta) {
    return isDefined(delta) ? delta : base;
  },
  interpolate: function(from, to, f) {
    return f < 0.5 ? from : to;
  },
  toCssValue: function(value) {
    return value;
  },
  fromCssValue: function(value) {
    return value;
  }
};

var visibilityType = createObject(nonNumericType, {
  interpolate: function(from, to, f) {
    if (from !== 'visible' && to !== 'visible') {
      return nonNumericType.interpolate(from, to, f);
    }
    if (f <= 0) {
      return from;
    }
    if (f >= 1) {
      return to;
    }
    return 'visible';
  },
  fromCssValue: function(value) {
    if (['visible', 'hidden', 'collapse'].indexOf(value) !== -1) {
      return value;
    }
    return undefined;
  }
});

var lengthType = percentLengthType;
var lengthAutoType = typeWithKeywords(['auto'], lengthType);

var colorRE = new RegExp(
    '(hsla?|rgba?)\\(' +
    '([\\-0-9]+%?),?\\s*' +
    '([\\-0-9]+%?),?\\s*' +
    '([\\-0-9]+%?)(?:,?\\s*([\\-0-9\\.]+%?))?' +
    '\\)');
var colorHashRE = new RegExp(
    '#([0-9A-Fa-f][0-9A-Fa-f]?)' +
    '([0-9A-Fa-f][0-9A-Fa-f]?)' +
    '([0-9A-Fa-f][0-9A-Fa-f]?)');

function hsl2rgb(h, s, l) {
  // Cribbed from http://dev.w3.org/csswg/css-color/#hsl-color
  // Wrap to 0->360 degrees (IE -10 === 350) then normalize
  h = (((h % 360) + 360) % 360) / 360;
  s = s / 100;
  l = l / 100;
  function hue2rgb(m1, m2, h) {
    if (h < 0) {
      h += 1;
    }
    if (h > 1) {
      h -= 1;
    }
    if (h * 6 < 1) {
      return m1 + (m2 - m1) * h * 6;
    }
    if (h * 2 < 1) {
      return m2;
    }
    if (h * 3 < 2) {
      return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
  }
  var m2;
  if (l <= 0.5) {
    m2 = l * (s + 1);
  } else {
    m2 = l + s - l * s;
  }

  var m1 = l * 2 - m2;
  var r = Math.ceil(hue2rgb(m1, m2, h + 1 / 3) * 255);
  var g = Math.ceil(hue2rgb(m1, m2, h) * 255);
  var b = Math.ceil(hue2rgb(m1, m2, h - 1 / 3) * 255);
  return [r, g, b];
}

var namedColors = {
  aliceblue: [240, 248, 255, 1],
  antiquewhite: [250, 235, 215, 1],
  aqua: [0, 255, 255, 1],
  aquamarine: [127, 255, 212, 1],
  azure: [240, 255, 255, 1],
  beige: [245, 245, 220, 1],
  bisque: [255, 228, 196, 1],
  black: [0, 0, 0, 1],
  blanchedalmond: [255, 235, 205, 1],
  blue: [0, 0, 255, 1],
  blueviolet: [138, 43, 226, 1],
  brown: [165, 42, 42, 1],
  burlywood: [222, 184, 135, 1],
  cadetblue: [95, 158, 160, 1],
  chartreuse: [127, 255, 0, 1],
  chocolate: [210, 105, 30, 1],
  coral: [255, 127, 80, 1],
  cornflowerblue: [100, 149, 237, 1],
  cornsilk: [255, 248, 220, 1],
  crimson: [220, 20, 60, 1],
  cyan: [0, 255, 255, 1],
  darkblue: [0, 0, 139, 1],
  darkcyan: [0, 139, 139, 1],
  darkgoldenrod: [184, 134, 11, 1],
  darkgray: [169, 169, 169, 1],
  darkgreen: [0, 100, 0, 1],
  darkgrey: [169, 169, 169, 1],
  darkkhaki: [189, 183, 107, 1],
  darkmagenta: [139, 0, 139, 1],
  darkolivegreen: [85, 107, 47, 1],
  darkorange: [255, 140, 0, 1],
  darkorchid: [153, 50, 204, 1],
  darkred: [139, 0, 0, 1],
  darksalmon: [233, 150, 122, 1],
  darkseagreen: [143, 188, 143, 1],
  darkslateblue: [72, 61, 139, 1],
  darkslategray: [47, 79, 79, 1],
  darkslategrey: [47, 79, 79, 1],
  darkturquoise: [0, 206, 209, 1],
  darkviolet: [148, 0, 211, 1],
  deeppink: [255, 20, 147, 1],
  deepskyblue: [0, 191, 255, 1],
  dimgray: [105, 105, 105, 1],
  dimgrey: [105, 105, 105, 1],
  dodgerblue: [30, 144, 255, 1],
  firebrick: [178, 34, 34, 1],
  floralwhite: [255, 250, 240, 1],
  forestgreen: [34, 139, 34, 1],
  fuchsia: [255, 0, 255, 1],
  gainsboro: [220, 220, 220, 1],
  ghostwhite: [248, 248, 255, 1],
  gold: [255, 215, 0, 1],
  goldenrod: [218, 165, 32, 1],
  gray: [128, 128, 128, 1],
  green: [0, 128, 0, 1],
  greenyellow: [173, 255, 47, 1],
  grey: [128, 128, 128, 1],
  honeydew: [240, 255, 240, 1],
  hotpink: [255, 105, 180, 1],
  indianred: [205, 92, 92, 1],
  indigo: [75, 0, 130, 1],
  ivory: [255, 255, 240, 1],
  khaki: [240, 230, 140, 1],
  lavender: [230, 230, 250, 1],
  lavenderblush: [255, 240, 245, 1],
  lawngreen: [124, 252, 0, 1],
  lemonchiffon: [255, 250, 205, 1],
  lightblue: [173, 216, 230, 1],
  lightcoral: [240, 128, 128, 1],
  lightcyan: [224, 255, 255, 1],
  lightgoldenrodyellow: [250, 250, 210, 1],
  lightgray: [211, 211, 211, 1],
  lightgreen: [144, 238, 144, 1],
  lightgrey: [211, 211, 211, 1],
  lightpink: [255, 182, 193, 1],
  lightsalmon: [255, 160, 122, 1],
  lightseagreen: [32, 178, 170, 1],
  lightskyblue: [135, 206, 250, 1],
  lightslategray: [119, 136, 153, 1],
  lightslategrey: [119, 136, 153, 1],
  lightsteelblue: [176, 196, 222, 1],
  lightyellow: [255, 255, 224, 1],
  lime: [0, 255, 0, 1],
  limegreen: [50, 205, 50, 1],
  linen: [250, 240, 230, 1],
  magenta: [255, 0, 255, 1],
  maroon: [128, 0, 0, 1],
  mediumaquamarine: [102, 205, 170, 1],
  mediumblue: [0, 0, 205, 1],
  mediumorchid: [186, 85, 211, 1],
  mediumpurple: [147, 112, 219, 1],
  mediumseagreen: [60, 179, 113, 1],
  mediumslateblue: [123, 104, 238, 1],
  mediumspringgreen: [0, 250, 154, 1],
  mediumturquoise: [72, 209, 204, 1],
  mediumvioletred: [199, 21, 133, 1],
  midnightblue: [25, 25, 112, 1],
  mintcream: [245, 255, 250, 1],
  mistyrose: [255, 228, 225, 1],
  moccasin: [255, 228, 181, 1],
  navajowhite: [255, 222, 173, 1],
  navy: [0, 0, 128, 1],
  oldlace: [253, 245, 230, 1],
  olive: [128, 128, 0, 1],
  olivedrab: [107, 142, 35, 1],
  orange: [255, 165, 0, 1],
  orangered: [255, 69, 0, 1],
  orchid: [218, 112, 214, 1],
  palegoldenrod: [238, 232, 170, 1],
  palegreen: [152, 251, 152, 1],
  paleturquoise: [175, 238, 238, 1],
  palevioletred: [219, 112, 147, 1],
  papayawhip: [255, 239, 213, 1],
  peachpuff: [255, 218, 185, 1],
  peru: [205, 133, 63, 1],
  pink: [255, 192, 203, 1],
  plum: [221, 160, 221, 1],
  powderblue: [176, 224, 230, 1],
  purple: [128, 0, 128, 1],
  red: [255, 0, 0, 1],
  rosybrown: [188, 143, 143, 1],
  royalblue: [65, 105, 225, 1],
  saddlebrown: [139, 69, 19, 1],
  salmon: [250, 128, 114, 1],
  sandybrown: [244, 164, 96, 1],
  seagreen: [46, 139, 87, 1],
  seashell: [255, 245, 238, 1],
  sienna: [160, 82, 45, 1],
  silver: [192, 192, 192, 1],
  skyblue: [135, 206, 235, 1],
  slateblue: [106, 90, 205, 1],
  slategray: [112, 128, 144, 1],
  slategrey: [112, 128, 144, 1],
  snow: [255, 250, 250, 1],
  springgreen: [0, 255, 127, 1],
  steelblue: [70, 130, 180, 1],
  tan: [210, 180, 140, 1],
  teal: [0, 128, 128, 1],
  thistle: [216, 191, 216, 1],
  tomato: [255, 99, 71, 1],
  transparent: [0, 0, 0, 0],
  turquoise: [64, 224, 208, 1],
  violet: [238, 130, 238, 1],
  wheat: [245, 222, 179, 1],
  white: [255, 255, 255, 1],
  whitesmoke: [245, 245, 245, 1],
  yellow: [255, 255, 0, 1],
  yellowgreen: [154, 205, 50, 1]
};

var colorType = typeWithKeywords(['currentColor'], {
  zero: function() { return [0, 0, 0, 0]; },
  _premultiply: function(value) {
    var alpha = value[3];
    return [value[0] * alpha, value[1] * alpha, value[2] * alpha];
  },
  add: function(base, delta) {
    var alpha = Math.min(base[3] + delta[3], 1);
    if (alpha === 0) {
      return [0, 0, 0, 0];
    }
    base = this._premultiply(base);
    delta = this._premultiply(delta);
    return [(base[0] + delta[0]) / alpha, (base[1] + delta[1]) / alpha,
            (base[2] + delta[2]) / alpha, alpha];
  },
  interpolate: function(from, to, f) {
    var alpha = clamp(interp(from[3], to[3], f), 0, 1);
    if (alpha === 0) {
      return [0, 0, 0, 0];
    }
    from = this._premultiply(from);
    to = this._premultiply(to);
    return [interp(from[0], to[0], f) / alpha,
            interp(from[1], to[1], f) / alpha,
            interp(from[2], to[2], f) / alpha, alpha];
  },
  toCssValue: function(value) {
    return 'rgba(' + Math.round(value[0]) + ', ' + Math.round(value[1]) +
        ', ' + Math.round(value[2]) + ', ' + value[3] + ')';
  },
  fromCssValue: function(value) {
    // http://dev.w3.org/csswg/css-color/#color
    var out = [];

    var regexResult = colorHashRE.exec(value);
    if (regexResult) {
      if (value.length !== 4 && value.length !== 7) {
        return undefined;
      }

      var out = [];
      regexResult.shift();
      for (var i = 0; i < 3; i++) {
        if (regexResult[i].length === 1) {
          regexResult[i] = regexResult[i] + regexResult[i];
        }
        var v = Math.max(Math.min(parseInt(regexResult[i], 16), 255), 0);
        out[i] = v;
      }
      out.push(1.0);
    }

    var regexResult = colorRE.exec(value);
    if (regexResult) {
      regexResult.shift();
      var type = regexResult.shift().substr(0, 3);
      for (var i = 0; i < 3; i++) {
        var m = 1;
        if (regexResult[i][regexResult[i].length - 1] === '%') {
          regexResult[i] = regexResult[i].substr(0, regexResult[i].length - 1);
          m = 255.0 / 100.0;
        }
        if (type === 'rgb') {
          out[i] = clamp(Math.round(parseInt(regexResult[i], 10) * m), 0, 255);
        } else {
          out[i] = parseInt(regexResult[i], 10);
        }
      }

      // Convert hsl values to rgb value
      if (type === 'hsl') {
        out = hsl2rgb.apply(null, out);
      }

      if (typeof regexResult[3] !== 'undefined') {
        out[3] = Math.max(Math.min(parseFloat(regexResult[3]), 1.0), 0.0);
      } else {
        out.push(1.0);
      }
    }

    if (out.some(isNaN)) {
      return undefined;
    }
    if (out.length > 0) {
      return out;
    }
    return namedColors[value];
  }
});

var convertToDeg = function(num, type) {
  switch (type) {
    case 'grad':
      return num / 400 * 360;
    case 'rad':
      return num / 2 / Math.PI * 360;
    case 'turn':
      return num * 360;
    default:
      return num;
  }
};

var extractValue = function(values, pos, hasUnits) {
  var value = Number(values[pos]);
  if (!hasUnits) {
    return value;
  }
  var type = values[pos + 1];
  if (type === '') { type = 'px'; }
  var result = {};
  result[type] = value;
  return result;
};

var extractValues = function(values, numValues, hasOptionalValue,
    hasUnits) {
  var result = [];
  for (var i = 0; i < numValues; i++) {
    result.push(extractValue(values, 1 + 2 * i, hasUnits));
  }
  if (hasOptionalValue && values[1 + 2 * numValues]) {
    result.push(extractValue(values, 1 + 2 * numValues, hasUnits));
  }
  return result;
};

var SPACES = '\\s*';
var NUMBER = '[+-]?(?:\\d+|\\d*\\.\\d+)';
var RAW_OPEN_BRACKET = '\\(';
var RAW_CLOSE_BRACKET = '\\)';
var RAW_COMMA = ',';
var UNIT = '[a-zA-Z%]*';
var START = '^';

function capture(x) { return '(' + x + ')'; }
function optional(x) { return '(?:' + x + ')?'; }

var OPEN_BRACKET = [SPACES, RAW_OPEN_BRACKET, SPACES].join('');
var CLOSE_BRACKET = [SPACES, RAW_CLOSE_BRACKET, SPACES].join('');
var COMMA = [SPACES, RAW_COMMA, SPACES].join('');
var UNIT_NUMBER = [capture(NUMBER), capture(UNIT)].join('');

function transformRE(name, numParms, hasOptionalParm) {
  var tokenList = [START, SPACES, name, OPEN_BRACKET];
  for (var i = 0; i < numParms - 1; i++) {
    tokenList.push(UNIT_NUMBER);
    tokenList.push(COMMA);
  }
  tokenList.push(UNIT_NUMBER);
  if (hasOptionalParm) {
    tokenList.push(optional([COMMA, UNIT_NUMBER].join('')));
  }
  tokenList.push(CLOSE_BRACKET);
  return new RegExp(tokenList.join(''));
}

function buildMatcher(name, numValues, hasOptionalValue, hasUnits,
    baseValue) {
  var baseName = name;
  if (baseValue) {
    if (name[name.length - 1] === 'X' || name[name.length - 1] === 'Y') {
      baseName = name.substring(0, name.length - 1);
    } else if (name[name.length - 1] === 'Z') {
      baseName = name.substring(0, name.length - 1) + '3d';
    }
  }

  var f = function(x) {
    var r = extractValues(x, numValues, hasOptionalValue, hasUnits);
    if (baseValue !== undefined) {
      if (name[name.length - 1] === 'X') {
        r.push(baseValue);
      } else if (name[name.length - 1] === 'Y') {
        r = [baseValue].concat(r);
      } else if (name[name.length - 1] === 'Z') {
        r = [baseValue, baseValue].concat(r);
      } else if (hasOptionalValue) {
        while (r.length < 2) {
          if (baseValue === 'copy') {
            r.push(r[0]);
          } else {
            r.push(baseValue);
          }
        }
      }
    }
    return r;
  };
  return [transformRE(name, numValues, hasOptionalValue), f, baseName];
}

function buildRotationMatcher(name, numValues, hasOptionalValue,
    baseValue) {
  var m = buildMatcher(name, numValues, hasOptionalValue, true, baseValue);

  var f = function(x) {
    var r = m[1](x);
    return r.map(function(v) {
      var result = 0;
      for (var type in v) {
        result += convertToDeg(v[type], type);
      }
      return result;
    });
  };
  return [m[0], f, m[2]];
}

function build3DRotationMatcher() {
  var m = buildMatcher('rotate3d', 4, false, true);
  var f = function(x) {
    var r = m[1](x);
    var out = [];
    for (var i = 0; i < 3; i++) {
      out.push(r[i].px);
    }
    var angle = 0;
    for (var unit in r[3]) {
      angle += convertToDeg(r[3][unit], unit);
    }
    out.push(angle);
    return out;
  };
  return [m[0], f, m[2]];
}

var transformREs = [
  buildRotationMatcher('rotate', 1, false),
  buildRotationMatcher('rotateX', 1, false),
  buildRotationMatcher('rotateY', 1, false),
  buildRotationMatcher('rotateZ', 1, false),
  build3DRotationMatcher(),
  buildRotationMatcher('skew', 1, true, 0),
  buildRotationMatcher('skewX', 1, false),
  buildRotationMatcher('skewY', 1, false),
  buildMatcher('translateX', 1, false, true, {px: 0}),
  buildMatcher('translateY', 1, false, true, {px: 0}),
  buildMatcher('translateZ', 1, false, true, {px: 0}),
  buildMatcher('translate', 1, true, true, {px: 0}),
  buildMatcher('translate3d', 3, false, true),
  buildMatcher('scale', 1, true, false, 'copy'),
  buildMatcher('scaleX', 1, false, false, 1),
  buildMatcher('scaleY', 1, false, false, 1),
  buildMatcher('scaleZ', 1, false, false, 1),
  buildMatcher('scale3d', 3, false, false),
  buildMatcher('perspective', 1, false, true),
  buildMatcher('matrix', 6, false, false),
  buildMatcher('matrix3d', 16, false, false)
];

var decomposeMatrix = (function() {
  // this is only ever used on the perspective matrix, which has 0, 0, 0, 1 as
  // last column
  function determinant(m) {
    return m[0][0] * m[1][1] * m[2][2] +
           m[1][0] * m[2][1] * m[0][2] +
           m[2][0] * m[0][1] * m[1][2] -
           m[0][2] * m[1][1] * m[2][0] -
           m[1][2] * m[2][1] * m[0][0] -
           m[2][2] * m[0][1] * m[1][0];
  }

  // from Wikipedia:
  //
  // [A B]^-1 = [A^-1 + A^-1B(D - CA^-1B)^-1CA^-1     -A^-1B(D - CA^-1B)^-1]
  // [C D]      [-(D - CA^-1B)^-1CA^-1                (D - CA^-1B)^-1      ]
  //
  // Therefore
  //
  // [A [0]]^-1 = [A^-1       [0]]
  // [C  1 ]      [ -CA^-1     1 ]
  function inverse(m) {
    var iDet = 1 / determinant(m);
    var a = m[0][0], b = m[0][1], c = m[0][2];
    var d = m[1][0], e = m[1][1], f = m[1][2];
    var g = m[2][0], h = m[2][1], k = m[2][2];
    var Ainv = [
      [(e * k - f * h) * iDet, (c * h - b * k) * iDet,
       (b * f - c * e) * iDet, 0],
      [(f * g - d * k) * iDet, (a * k - c * g) * iDet,
       (c * d - a * f) * iDet, 0],
      [(d * h - e * g) * iDet, (g * b - a * h) * iDet,
       (a * e - b * d) * iDet, 0]
    ];
    var lastRow = [];
    for (var i = 0; i < 3; i++) {
      var val = 0;
      for (var j = 0; j < 3; j++) {
        val += m[3][j] * Ainv[j][i];
      }
      lastRow.push(val);
    }
    lastRow.push(1);
    Ainv.push(lastRow);
    return Ainv;
  }

  function transposeMatrix4(m) {
    return [[m[0][0], m[1][0], m[2][0], m[3][0]],
            [m[0][1], m[1][1], m[2][1], m[3][1]],
            [m[0][2], m[1][2], m[2][2], m[3][2]],
            [m[0][3], m[1][3], m[2][3], m[3][3]]];
  }

  function multVecMatrix(v, m) {
    var result = [];
    for (var i = 0; i < 4; i++) {
      var val = 0;
      for (var j = 0; j < 4; j++) {
        val += v[j] * m[j][i];
      }
      result.push(val);
    }
    return result;
  }

  function normalize(v) {
    var len = length(v);
    return [v[0] / len, v[1] / len, v[2] / len];
  }

  function length(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }

  function combine(v1, v2, v1s, v2s) {
    return [v1s * v1[0] + v2s * v2[0], v1s * v1[1] + v2s * v2[1],
            v1s * v1[2] + v2s * v2[2]];
  }

  function cross(v1, v2) {
    return [v1[1] * v2[2] - v1[2] * v2[1],
            v1[2] * v2[0] - v1[0] * v2[2],
            v1[0] * v2[1] - v1[1] * v2[0]];
  }

  // TODO: Implement 2D matrix decomposition.
  // http://dev.w3.org/csswg/css-transforms/#decomposing-a-2d-matrix
  function decomposeMatrix(matrix) {
    var m3d = [
      matrix.slice(0, 4),
      matrix.slice(4, 8),
      matrix.slice(8, 12),
      matrix.slice(12, 16)
    ];

    // skip normalization step as m3d[3][3] should always be 1
    if (m3d[3][3] !== 1) {
      throw 'attempt to decompose non-normalized matrix';
    }

    var perspectiveMatrix = m3d.concat(); // copy m3d
    for (var i = 0; i < 3; i++) {
      perspectiveMatrix[i][3] = 0;
    }

    if (determinant(perspectiveMatrix) === 0) {
      return false;
    }

    var rhs = [];

    var perspective;
    if (m3d[0][3] !== 0 || m3d[1][3] !== 0 || m3d[2][3] !== 0) {
      rhs.push(m3d[0][3]);
      rhs.push(m3d[1][3]);
      rhs.push(m3d[2][3]);
      rhs.push(m3d[3][3]);

      var inversePerspectiveMatrix = inverse(perspectiveMatrix);
      var transposedInversePerspectiveMatrix =
          transposeMatrix4(inversePerspectiveMatrix);
      perspective = multVecMatrix(rhs, transposedInversePerspectiveMatrix);
    } else {
      perspective = [0, 0, 0, 1];
    }

    var translate = m3d[3].slice(0, 3);

    var row = [];
    row.push(m3d[0].slice(0, 3));
    var scale = [];
    scale.push(length(row[0]));
    row[0] = normalize(row[0]);

    var skew = [];
    row.push(m3d[1].slice(0, 3));
    skew.push(dot(row[0], row[1]));
    row[1] = combine(row[1], row[0], 1.0, -skew[0]);

    scale.push(length(row[1]));
    row[1] = normalize(row[1]);
    skew[0] /= scale[1];

    row.push(m3d[2].slice(0, 3));
    skew.push(dot(row[0], row[2]));
    row[2] = combine(row[2], row[0], 1.0, -skew[1]);
    skew.push(dot(row[1], row[2]));
    row[2] = combine(row[2], row[1], 1.0, -skew[2]);

    scale.push(length(row[2]));
    row[2] = normalize(row[2]);
    skew[1] /= scale[2];
    skew[2] /= scale[2];

    var pdum3 = cross(row[1], row[2]);
    if (dot(row[0], pdum3) < 0) {
      for (var i = 0; i < 3; i++) {
        scale[i] *= -1;
        row[i][0] *= -1;
        row[i][1] *= -1;
        row[i][2] *= -1;
      }
    }

    var t = row[0][0] + row[1][1] + row[2][2] + 1;
    var s;
    var quaternion;

    if (t > 1e-4) {
      s = 0.5 / Math.sqrt(t);
      quaternion = [
        (row[2][1] - row[1][2]) * s,
        (row[0][2] - row[2][0]) * s,
        (row[1][0] - row[0][1]) * s,
        0.25 / s
      ];
    } else if (row[0][0] > row[1][1] && row[0][0] > row[2][2]) {
      s = Math.sqrt(1 + row[0][0] - row[1][1] - row[2][2]) * 2.0;
      quaternion = [
        0.25 * s,
        (row[0][1] + row[1][0]) / s,
        (row[0][2] + row[2][0]) / s,
        (row[2][1] - row[1][2]) / s
      ];
    } else if (row[1][1] > row[2][2]) {
      s = Math.sqrt(1.0 + row[1][1] - row[0][0] - row[2][2]) * 2.0;
      quaternion = [
        (row[0][1] + row[1][0]) / s,
        0.25 * s,
        (row[1][2] + row[2][1]) / s,
        (row[0][2] - row[2][0]) / s
      ];
    } else {
      s = Math.sqrt(1.0 + row[2][2] - row[0][0] - row[1][1]) * 2.0;
      quaternion = [
        (row[0][2] + row[2][0]) / s,
        (row[1][2] + row[2][1]) / s,
        0.25 * s,
        (row[1][0] - row[0][1]) / s
      ];
    }

    return {
      translate: translate, scale: scale, skew: skew,
      quaternion: quaternion, perspective: perspective
    };
  }
  return decomposeMatrix;
})();

function dot(v1, v2) {
  var result = 0;
  for (var i = 0; i < v1.length; i++) {
    result += v1[i] * v2[i];
  }
  return result;
}

function multiplyMatrices(a, b) {
  return [
    a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
    a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
    a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
    a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],

    a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
    a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
    a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
    a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],

    a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
    a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
    a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
    a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],

    a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
    a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
    a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
    a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
  ];
}

function convertItemToMatrix(item) {
  switch (item.t) {
    case 'rotateX':
      var angle = item.d * Math.PI / 180;
      return [1, 0, 0, 0,
              0, Math.cos(angle), Math.sin(angle), 0,
              0, -Math.sin(angle), Math.cos(angle), 0,
              0, 0, 0, 1];
    case 'rotateY':
      var angle = item.d * Math.PI / 180;
      return [Math.cos(angle), 0, -Math.sin(angle), 0,
              0, 1, 0, 0,
              Math.sin(angle), 0, Math.cos(angle), 0,
              0, 0, 0, 1];
    case 'rotate':
    case 'rotateZ':
      var angle = item.d * Math.PI / 180;
      return [Math.cos(angle), Math.sin(angle), 0, 0,
              -Math.sin(angle), Math.cos(angle), 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1];
    case 'rotate3d':
      var x = item.d[0];
      var y = item.d[1];
      var z = item.d[2];
      var sqrLength = x * x + y * y + z * z;
      if (sqrLength === 0) {
        x = 1;
        y = 0;
        z = 0;
      } else if (sqrLength !== 1) {
        var length = Math.sqrt(sqrLength);
        x /= length;
        y /= length;
        z /= length;
      }
      var s = Math.sin(item.d[3] * Math.PI / 360);
      var sc = s * Math.cos(item.d[3] * Math.PI / 360);
      var sq = s * s;
      return [
        1 - 2 * (y * y + z * z) * sq,
        2 * (x * y * sq + z * sc),
        2 * (x * z * sq - y * sc),
        0,

        2 * (x * y * sq - z * sc),
        1 - 2 * (x * x + z * z) * sq,
        2 * (y * z * sq + x * sc),
        0,

        2 * (x * z * sq + y * sc),
        2 * (y * z * sq - x * sc),
        1 - 2 * (x * x + y * y) * sq,
        0,

        0, 0, 0, 1
      ];
    case 'scale':
      return [item.d[0], 0, 0, 0,
              0, item.d[1], 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1];
    case 'scale3d':
      return [item.d[0], 0, 0, 0,
              0, item.d[1], 0, 0,
              0, 0, item.d[2], 0,
              0, 0, 0, 1];
    case 'skew':
      return [1, Math.tan(item.d[1] * Math.PI / 180), 0, 0,
              Math.tan(item.d[0] * Math.PI / 180), 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1];
    case 'skewX':
      return [1, 0, 0, 0,
              Math.tan(item.d * Math.PI / 180), 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1];
    case 'skewY':
      return [1, Math.tan(item.d * Math.PI / 180), 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1];
    // TODO: Work out what to do with non-px values.
    case 'translate':
      return [1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              item.d[0].px, item.d[1].px, 0, 1];
    case 'translate3d':
      return [1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              item.d[0].px, item.d[1].px, item.d[2].px, 1];
    case 'perspective':
      return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, -1 / item.d.px,
        0, 0, 0, 1];
    case 'matrix':
      return [item.d[0], item.d[1], 0, 0,
              item.d[2], item.d[3], 0, 0,
              0, 0, 1, 0,
              item.d[4], item.d[5], 0, 1];
    case 'matrix3d':
      return item.d;
    default:
      ASSERT_ENABLED && assert(false, 'Transform item type ' + item.t +
          ' conversion to matrix not yet implemented.');
  }
}

function convertToMatrix(transformList) {
  if (transformList.length === 0) {
    return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];
  }
  return transformList.map(convertItemToMatrix).reduce(multiplyMatrices);
}

var composeMatrix = (function() {
  function multiply(a, b) {
    var result = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        for (var k = 0; k < 4; k++) {
          result[i][j] += b[i][k] * a[k][j];
        }
      }
    }
    return result;
  }

  function is2D(m) {
    return (
        m[0][2] == 0 &&
        m[0][3] == 0 &&
        m[1][2] == 0 &&
        m[1][3] == 0 &&
        m[2][0] == 0 &&
        m[2][1] == 0 &&
        m[2][2] == 1 &&
        m[2][3] == 0 &&
        m[3][2] == 0 &&
        m[3][3] == 1);
  }

  function composeMatrix(translate, scale, skew, quat, perspective) {
    var matrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

    for (var i = 0; i < 4; i++) {
      matrix[i][3] = perspective[i];
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        matrix[3][i] += translate[j] * matrix[j][i];
      }
    }

    var x = quat[0], y = quat[1], z = quat[2], w = quat[3];

    var rotMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

    rotMatrix[0][0] = 1 - 2 * (y * y + z * z);
    rotMatrix[0][1] = 2 * (x * y - z * w);
    rotMatrix[0][2] = 2 * (x * z + y * w);
    rotMatrix[1][0] = 2 * (x * y + z * w);
    rotMatrix[1][1] = 1 - 2 * (x * x + z * z);
    rotMatrix[1][2] = 2 * (y * z - x * w);
    rotMatrix[2][0] = 2 * (x * z - y * w);
    rotMatrix[2][1] = 2 * (y * z + x * w);
    rotMatrix[2][2] = 1 - 2 * (x * x + y * y);

    matrix = multiply(matrix, rotMatrix);

    var temp = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    if (skew[2]) {
      temp[2][1] = skew[2];
      matrix = multiply(matrix, temp);
    }

    if (skew[1]) {
      temp[2][1] = 0;
      temp[2][0] = skew[0];
      matrix = multiply(matrix, temp);
    }

    if (skew[0]) {
      temp[2][0] = 0;
      temp[1][0] = skew[0];
      matrix = multiply(matrix, temp);
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        matrix[i][j] *= scale[i];
      }
    }

    if (is2D(matrix)) {
      return {
        t: 'matrix',
        d: [matrix[0][0], matrix[0][1], matrix[1][0], matrix[1][1],
            matrix[3][0], matrix[3][1]]
      };
    }
    return {
      t: 'matrix3d',
      d: matrix[0].concat(matrix[1], matrix[2], matrix[3])
    };
  }
  return composeMatrix;
})();

function interpolateDecomposedTransformsWithMatrices(fromM, toM, f) {
  var product = dot(fromM.quaternion, toM.quaternion);
  product = clamp(product, -1.0, 1.0);

  var quat = [];
  if (product === 1.0) {
    quat = fromM.quaternion;
  } else {
    var theta = Math.acos(product);
    var w = Math.sin(f * theta) * 1 / Math.sqrt(1 - product * product);

    for (var i = 0; i < 4; i++) {
      quat.push(fromM.quaternion[i] * (Math.cos(f * theta) - product * w) +
                toM.quaternion[i] * w);
    }
  }

  var translate = interp(fromM.translate, toM.translate, f);
  var scale = interp(fromM.scale, toM.scale, f);
  var skew = interp(fromM.skew, toM.skew, f);
  var perspective = interp(fromM.perspective, toM.perspective, f);

  return composeMatrix(translate, scale, skew, quat, perspective);
}

function interpTransformValue(from, to, f) {
  var type = from.t ? from.t : to.t;
  switch (type) {
    case 'matrix':
    case 'matrix3d':
      ASSERT_ENABLED && assert(false,
          'Must use matrix decomposition when interpolating raw matrices');
    // Transforms with unitless parameters.
    case 'rotate':
    case 'rotateX':
    case 'rotateY':
    case 'rotateZ':
    case 'rotate3d':
    case 'scale':
    case 'scaleX':
    case 'scaleY':
    case 'scaleZ':
    case 'scale3d':
    case 'skew':
    case 'skewX':
    case 'skewY':
      return {t: type, d: interp(from.d, to.d, f, type)};
    default:
      // Transforms with lengthType parameters.
      var result = [];
      var maxVal;
      if (from.d && to.d) {
        maxVal = Math.max(from.d.length, to.d.length);
      } else if (from.d) {
        maxVal = from.d.length;
      } else {
        maxVal = to.d.length;
      }
      for (var j = 0; j < maxVal; j++) {
        var fromVal = from.d ? from.d[j] : {};
        var toVal = to.d ? to.d[j] : {};
        result.push(lengthType.interpolate(fromVal, toVal, f));
      }
      return {t: type, d: result};
  }
}

function isMatrix(item) {
  return item.t[0] === 'm';
}

// The CSSWG decided to disallow scientific notation in CSS property strings
// (see http://lists.w3.org/Archives/Public/www-style/2010Feb/0050.html).
// We need this function to hakonitize all numbers before adding them to
// property strings.
// TODO: Apply this function to all property strings
function n(num) {
  return Number(num).toFixed(4);
}

var transformType = {
  add: function(base, delta) { return base.concat(delta); },
  interpolate: function(from, to, f) {
    var out = [];
    for (var i = 0; i < Math.min(from.length, to.length); i++) {
      if (from[i].t !== to[i].t || isMatrix(from[i])) {
        break;
      }
      out.push(interpTransformValue(from[i], to[i], f));
    }

    if (i < Math.min(from.length, to.length) ||
        from.some(isMatrix) || to.some(isMatrix)) {
      if (from.decompositionPair !== to) {
        from.decompositionPair = to;
        from.decomposition = decomposeMatrix(convertToMatrix(from.slice(i)));
      }
      if (to.decompositionPair !== from) {
        to.decompositionPair = from;
        to.decomposition = decomposeMatrix(convertToMatrix(to.slice(i)));
      }
      out.push(interpolateDecomposedTransformsWithMatrices(
          from.decomposition, to.decomposition, f));
      return out;
    }

    for (; i < from.length; i++) {
      out.push(interpTransformValue(from[i], {t: null, d: null}, f));
    }
    for (; i < to.length; i++) {
      out.push(interpTransformValue({t: null, d: null}, to[i], f));
    }
    return out;
  },
  toCssValue: function(value, svgMode) {
    // TODO: fix this :)
    var out = '';
    for (var i = 0; i < value.length; i++) {
      ASSERT_ENABLED && assert(
          value[i].t, 'transform type should be resolved by now');
      switch (value[i].t) {
        case 'rotate':
        case 'rotateX':
        case 'rotateY':
        case 'rotateZ':
        case 'skewX':
        case 'skewY':
          var unit = svgMode ? '' : 'deg';
          out += value[i].t + '(' + value[i].d + unit + ') ';
          break;
        case 'skew':
          var unit = svgMode ? '' : 'deg';
          out += value[i].t + '(' + value[i].d[0] + unit;
          if (value[i].d[1] === 0) {
            out += ') ';
          } else {
            out += ', ' + value[i].d[1] + unit + ') ';
          }
          break;
        case 'rotate3d':
          var unit = svgMode ? '' : 'deg';
          out += value[i].t + '(' + value[i].d[0] + ', ' + value[i].d[1] +
              ', ' + value[i].d[2] + ', ' + value[i].d[3] + unit + ') ';
          break;
        case 'translateX':
        case 'translateY':
        case 'translateZ':
        case 'perspective':
          out += value[i].t + '(' + lengthType.toCssValue(value[i].d[0]) +
              ') ';
          break;
        case 'translate':
          if (svgMode) {
            if (value[i].d[1] === undefined) {
              out += value[i].t + '(' + value[i].d[0].px + ') ';
            } else {
              out += (
                  value[i].t + '(' + value[i].d[0].px + ', ' +
                  value[i].d[1].px + ') ');
            }
            break;
          }
          if (value[i].d[1] === undefined) {
            out += value[i].t + '(' + lengthType.toCssValue(value[i].d[0]) +
                ') ';
          } else {
            out += value[i].t + '(' + lengthType.toCssValue(value[i].d[0]) +
                ', ' + lengthType.toCssValue(value[i].d[1]) + ') ';
          }
          break;
        case 'translate3d':
          var values = value[i].d.map(lengthType.toCssValue);
          out += value[i].t + '(' + values[0] + ', ' + values[1] +
              ', ' + values[2] + ') ';
          break;
        case 'scale':
          if (value[i].d[0] === value[i].d[1]) {
            out += value[i].t + '(' + value[i].d[0] + ') ';
          } else {
            out += value[i].t + '(' + value[i].d[0] + ', ' + value[i].d[1] +
                ') ';
          }
          break;
        case 'scaleX':
        case 'scaleY':
        case 'scaleZ':
          out += value[i].t + '(' + value[i].d[0] + ') ';
          break;
        case 'scale3d':
          out += value[i].t + '(' + value[i].d[0] + ', ' +
              value[i].d[1] + ', ' + value[i].d[2] + ') ';
          break;
        case 'matrix':
        case 'matrix3d':
          out += value[i].t + '(' + value[i].d.map(n).join(', ') + ') ';
          break;
      }
    }
    return out.substring(0, out.length - 1);
  },
  fromCssValue: function(value) {
    // TODO: fix this :)
    if (value === undefined) {
      return undefined;
    }
    var result = [];
    while (value.length > 0) {
      var r;
      for (var i = 0; i < transformREs.length; i++) {
        var reSpec = transformREs[i];
        r = reSpec[0].exec(value);
        if (r) {
          result.push({t: reSpec[2], d: reSpec[1](r)});
          value = value.substring(r[0].length);
          break;
        }
      }
      if (!isDefinedAndNotNull(r)) {
        return result;
      }
    }
    return result;
  }
};

var pathType = {
  // Properties ...
  // - path: The target path element
  // - points: The absolute points to set on the path
  // - cachedCumulativeLengths: The lengths at the end of each segment
  add: function() { throw 'Addition not supported for path attribute' },
  cumulativeLengths: function(value) {
    if (isDefinedAndNotNull(value.cachedCumulativeLengths))
      return value.cachedCumulativeLengths;
    var path = value.path.cloneNode(true);
    var cumulativeLengths = [];
    while (path.pathSegList.numberOfItems > 0) {
      // TODO: It would be good to skip moves here and when generating points.
      cumulativeLengths.unshift(path.getTotalLength());
      path.pathSegList.removeItem(path.pathSegList.numberOfItems - 1);
    }
    value.cachedCumulativeLengths = cumulativeLengths;
    return value.cachedCumulativeLengths;
  },
  appendFractions: function(fractions, cumulativeLengths) {
    ASSERT_ENABLED && assert(cumulativeLengths[0] === 0);
    var totalLength = cumulativeLengths[cumulativeLengths.length - 1];
    for (var i = 1; i < cumulativeLengths.length - 1; ++i)
      fractions.push(cumulativeLengths[i] / totalLength);
  },
  interpolate: function(from, to, f) {
    // FIXME: Handle non-linear path segments.
    // Get the fractions at which we need to sample.
    var sampleFractions = [0, 1];
    pathType.appendFractions(sampleFractions, pathType.cumulativeLengths(from));
    pathType.appendFractions(sampleFractions, pathType.cumulativeLengths(to));
    sampleFractions.sort();
    ASSERT_ENABLED && assert(sampleFractions[0] === 0);
    ASSERT_ENABLED && assert(sampleFractions[sampleFractions.length - 1] === 1);

    // FIXME: Cache the 'from' and 'to' points.
    var fromTotalLength = from.path.getTotalLength();
    var toTotalLength = to.path.getTotalLength();
    var points = [];
    for (var i = 0; i < sampleFractions.length; ++i) {
      var fromPoint = from.path.getPointAtLength(
          fromTotalLength * sampleFractions[i]);
      var toPoint = to.path.getPointAtLength(
          toTotalLength * sampleFractions[i]);
      points.push({
        x: interp(fromPoint.x, toPoint.x, f),
        y: interp(fromPoint.y, toPoint.y, f)
      });
    }
    return {points: points};
  },
  pointToString: function(point) {
    return point.x + ',' + point.y;
  },
  toCssValue: function(value, svgMode) {
    // FIXME: It would be good to use PathSegList API on the target directly,
    // rather than generating this string, but that would require a hack to
    // setValue().
    ASSERT_ENABLED && assert(svgMode,
        'Path type should only be used with SVG \'d\' attribute');
    if (value.path)
      return value.path.getAttribute('d');
    var ret = 'M' + pathType.pointToString(value.points[0]);
    for (var i = 1; i < value.points.length; ++i)
      ret += 'L' + pathType.pointToString(value.points[i]);
    return ret;
  },
  fromCssValue: function(value) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    if (value)
      path.setAttribute('d', value);
    return {path: path};
  }
};

var propertyTypes = {
  backgroundColor: colorType,
  backgroundPosition: positionListType,
  borderBottomColor: colorType,
  borderBottomLeftRadius: percentLengthType,
  borderBottomRightRadius: percentLengthType,
  borderBottomWidth: lengthType,
  borderLeftColor: colorType,
  borderLeftWidth: lengthType,
  borderRightColor: colorType,
  borderRightWidth: lengthType,
  borderSpacing: lengthType,
  borderTopColor: colorType,
  borderTopLeftRadius: percentLengthType,
  borderTopRightRadius: percentLengthType,
  borderTopWidth: lengthType,
  bottom: percentLengthAutoType,
  boxShadow: shadowType,
  clip: typeWithKeywords(['auto'], rectangleType),
  color: colorType,
  cx: lengthType,
  cy: lengthType,
  d: pathType,
  dx: lengthType,
  dy: lengthType,
  fill: colorType,
  floodColor: colorType,

  // TODO: Handle these keywords properly.
  fontSize: typeWithKeywords(['smaller', 'larger'], percentLengthType),
  fontWeight: typeWithKeywords(['lighter', 'bolder'], fontWeightType),

  height: percentLengthAutoType,
  left: percentLengthAutoType,
  letterSpacing: typeWithKeywords(['normal'], lengthType),
  lightingColor: colorType,
  lineHeight: percentLengthType, // TODO: Should support numberType as well.
  marginBottom: lengthAutoType,
  marginLeft: lengthAutoType,
  marginRight: lengthAutoType,
  marginTop: lengthAutoType,
  maxHeight: typeWithKeywords(
      ['none', 'max-content', 'min-content', 'fill-available', 'fit-content'],
      percentLengthType),
  maxWidth: typeWithKeywords(
      ['none', 'max-content', 'min-content', 'fill-available', 'fit-content'],
      percentLengthType),
  minHeight: typeWithKeywords(
      ['max-content', 'min-content', 'fill-available', 'fit-content'],
      percentLengthType),
  minWidth: typeWithKeywords(
      ['max-content', 'min-content', 'fill-available', 'fit-content'],
      percentLengthType),
  opacity: numberType,
  outlineColor: typeWithKeywords(['invert'], colorType),
  outlineOffset: lengthType,
  outlineWidth: lengthType,
  paddingBottom: lengthType,
  paddingLeft: lengthType,
  paddingRight: lengthType,
  paddingTop: lengthType,
  perspective: typeWithKeywords(['none'], lengthType),
  perspectiveOrigin: originType,
  r: lengthType,
  right: percentLengthAutoType,
  stopColor: colorType,
  stroke: colorType,
  textIndent: typeWithKeywords(['each-line', 'hanging'], percentLengthType),
  textShadow: shadowType,
  top: percentLengthAutoType,
  transform: transformType,
  transformOrigin: originType,
  verticalAlign: typeWithKeywords([
    'baseline',
    'sub',
    'super',
    'text-top',
    'text-bottom',
    'middle',
    'top',
    'bottom'
  ], percentLengthType),
  visibility: visibilityType,
  width: typeWithKeywords([
    'border-box',
    'content-box',
    'auto',
    'max-content',
    'min-content',
    'available',
    'fit-content'
  ], percentLengthType),
  wordSpacing: typeWithKeywords(['normal'], percentLengthType),
  x: lengthType,
  y: lengthType,
  zIndex: typeWithKeywords(['auto'], integerType)
};

var svgProperties = {
  'cx': 1,
  'cy': 1,
  'd': 1,
  'dx': 1,
  'dy': 1,
  'fill': 1,
  'floodColor': 1,
  'height': 1,
  'lightingColor': 1,
  'r': 1,
  'stopColor': 1,
  'stroke': 1,
  'width': 1,
  'x': 1,
  'y': 1
};

var borderWidthAliases = {
  initial: '3px',
  thin: '1px',
  medium: '3px',
  thick: '5px'
};

var propertyValueAliases = {
  backgroundColor: { initial: 'transparent' },
  backgroundPosition: { initial: '0% 0%' },
  borderBottomColor: { initial: 'currentColor' },
  borderBottomLeftRadius: { initial: '0px' },
  borderBottomRightRadius: { initial: '0px' },
  borderBottomWidth: borderWidthAliases,
  borderLeftColor: { initial: 'currentColor' },
  borderLeftWidth: borderWidthAliases,
  borderRightColor: { initial: 'currentColor' },
  borderRightWidth: borderWidthAliases,
  // Spec says this should be 0 but in practise it is 2px.
  borderSpacing: { initial: '2px' },
  borderTopColor: { initial: 'currentColor' },
  borderTopLeftRadius: { initial: '0px' },
  borderTopRightRadius: { initial: '0px' },
  borderTopWidth: borderWidthAliases,
  bottom: { initial: 'auto' },
  clip: { initial: 'rect(0px, 0px, 0px, 0px)' },
  color: { initial: 'black' }, // Depends on user agent.
  fontSize: {
    initial: '100%',
    'xx-small': '60%',
    'x-small': '75%',
    'small': '89%',
    'medium': '100%',
    'large': '120%',
    'x-large': '150%',
    'xx-large': '200%'
  },
  fontWeight: {
    initial: '400',
    normal: '400',
    bold: '700'
  },
  height: { initial: 'auto' },
  left: { initial: 'auto' },
  letterSpacing: { initial: 'normal' },
  lineHeight: {
    initial: '120%',
    normal: '120%'
  },
  marginBottom: { initial: '0px' },
  marginLeft: { initial: '0px' },
  marginRight: { initial: '0px' },
  marginTop: { initial: '0px' },
  maxHeight: { initial: 'none' },
  maxWidth: { initial: 'none' },
  minHeight: { initial: '0px' },
  minWidth: { initial: '0px' },
  opacity: { initial: '1.0' },
  outlineColor: { initial: 'invert' },
  outlineOffset: { initial: '0px' },
  outlineWidth: borderWidthAliases,
  paddingBottom: { initial: '0px' },
  paddingLeft: { initial: '0px' },
  paddingRight: { initial: '0px' },
  paddingTop: { initial: '0px' },
  right: { initial: 'auto' },
  textIndent: { initial: '0px' },
  textShadow: {
    initial: '0px 0px 0px transparent',
    none: '0px 0px 0px transparent'
  },
  top: { initial: 'auto' },
  transform: {
    initial: '',
    none: ''
  },
  verticalAlign: { initial: '0px' },
  visibility: { initial: 'visible' },
  width: { initial: 'auto' },
  wordSpacing: { initial: 'normal' },
  zIndex: { initial: 'auto' }
};

var propertyIsSVGAttrib = function(property, target) {
  return target.namespaceURI === 'http://www.w3.org/2000/svg' &&
      property in svgProperties;
};

var getType = function(property) {
  return propertyTypes[property] || nonNumericType;
};

var add = function(property, base, delta) {
  if (delta === rawNeutralValue) {
    return base;
  }
  if (base === 'inherit' || delta === 'inherit') {
    return nonNumericType.add(base, delta);
  }
  return getType(property).add(base, delta);
};


/**
 * Interpolate the given property name (f*100)% of the way from 'from' to 'to'.
 * 'from' and 'to' are both raw values already converted from CSS value
 * strings. Requires the target element to be able to determine whether the
 * given property is an SVG attribute or not, as this impacts the conversion of
 * the interpolated value back into a CSS value string for transform
 * translations.
 *
 * e.g. interpolate('transform', elem, 'rotate(40deg)', 'rotate(50deg)', 0.3);
 *   will return 'rotate(43deg)'.
 */
var interpolate = function(property, from, to, f) {
  ASSERT_ENABLED && assert(
      isDefinedAndNotNull(from) && isDefinedAndNotNull(to),
      'Both to and from values should be specified for interpolation');
  if (from === 'inherit' || to === 'inherit') {
    return nonNumericType.interpolate(from, to, f);
  }
  if (f === 0) {
    return from;
  }
  if (f === 1) {
    return to;
  }
  return getType(property).interpolate(from, to, f);
};


/**
 * Convert the provided interpolable value for the provided property to a CSS
 * value string. Note that SVG transforms do not require units for translate
 * or rotate values while CSS properties require 'px' or 'deg' units.
 */
var toCssValue = function(property, value, svgMode) {
  if (value === 'inherit') {
    return value;
  }
  return getType(property).toCssValue(value, svgMode);
};

var fromCssValue = function(property, value) {
  if (value === cssNeutralValue) {
    return rawNeutralValue;
  }
  if (value === 'inherit') {
    return value;
  }
  if (property in propertyValueAliases &&
      value in propertyValueAliases[property]) {
    value = propertyValueAliases[property][value];
  }
  var result = getType(property).fromCssValue(value);
  // Currently we'll hit this assert if input to the API is bad. To avoid this,
  // we should eliminate invalid values when normalizing the list of keyframes.
  // See the TODO in isSupportedPropertyValue().
  ASSERT_ENABLED && assert(isDefinedAndNotNull(result),
      'Invalid property value "' + value + '" for property "' + property + '"');
  return result;
};

// Sentinel values
var cssNeutralValue = {};
var rawNeutralValue = {};



/** @constructor */
var CompositableValue = function() {
};

CompositableValue.prototype = {
  compositeOnto: abstractMethod,
  // This is purely an optimization.
  dependsOnUnderlyingValue: function() {
    return true;
  }
};



/** @constructor */
var AddReplaceCompositableValue = function(value, composite) {
  this.value = value;
  this.composite = composite;
  ASSERT_ENABLED && assert(
      !(this.value === cssNeutralValue && this.composite === 'replace'),
      'Should never replace-composite the neutral value');
};

AddReplaceCompositableValue.prototype = createObject(
    CompositableValue.prototype, {
      compositeOnto: function(property, underlyingValue) {
        switch (this.composite) {
          case 'replace':
            return this.value;
          case 'add':
            return add(property, underlyingValue, this.value);
          default:
            ASSERT_ENABLED && assert(
                false, 'Invalid composite operation ' + this.composite);
        }
      },
      dependsOnUnderlyingValue: function() {
        return this.composite === 'add';
      }
    });



/** @constructor */
var BlendedCompositableValue = function(startValue, endValue, fraction) {
  this.startValue = startValue;
  this.endValue = endValue;
  this.fraction = fraction;
};

BlendedCompositableValue.prototype = createObject(
    CompositableValue.prototype, {
      compositeOnto: function(property, underlyingValue) {
        return interpolate(property,
            this.startValue.compositeOnto(property, underlyingValue),
            this.endValue.compositeOnto(property, underlyingValue),
            this.fraction);
      },
      dependsOnUnderlyingValue: function() {
        // Travis crashes here randomly in Chrome beta and unstable,
        // this try catch is to help debug the problem.
        try {
          return this.startValue.dependsOnUnderlyingValue() ||
              this.endValue.dependsOnUnderlyingValue();
        }
        catch (error) {
          throw new Error(
              error + '\n JSON.stringify(this) = ' + JSON.stringify(this));
        }
      }
    });

/** @constructor */
var CompositedPropertyMap = function(target) {
  this.properties = {};
  this.baseValues = {};
  this.target = target;
};

CompositedPropertyMap.prototype = {
  addValue: function(property, animValue) {
    if (!(property in this.properties)) {
      this.properties[property] = [];
    }
    if (!(animValue instanceof CompositableValue)) {
      throw new TypeError('expected CompositableValue');
    }
    this.properties[property].push(animValue);
  },
  stackDependsOnUnderlyingValue: function(stack) {
    for (var i = 0; i < stack.length; i++) {
      if (!stack[i].dependsOnUnderlyingValue()) {
        return false;
      }
    }
    return true;
  },
  clear: function() {
    for (var property in this.properties) {
      if (this.stackDependsOnUnderlyingValue(this.properties[property])) {
        clearValue(this.target, property);
      }
    }
  },
  captureBaseValues: function() {
    for (var property in this.properties) {
      var stack = this.properties[property];
      if (stack.length > 0 && this.stackDependsOnUnderlyingValue(stack)) {
        var baseValue = fromCssValue(property, getValue(this.target, property));
        // TODO: Decide what to do with elements not in the DOM.
        ASSERT_ENABLED && assert(
            isDefinedAndNotNull(baseValue) && baseValue !== '',
            'Base value should always be set. ' +
            'Is the target element in the DOM?');
        this.baseValues[property] = baseValue;
      } else {
        this.baseValues[property] = undefined;
      }
    }
  },
  applyAnimatedValues: function() {
    for (var property in this.properties) {
      var valuesToComposite = this.properties[property];
      if (valuesToComposite.length === 0) {
        continue;
      }
      var baseValue = this.baseValues[property];
      var i = valuesToComposite.length - 1;
      while (i > 0 && valuesToComposite[i].dependsOnUnderlyingValue()) {
        i--;
      }
      for (; i < valuesToComposite.length; i++) {
        baseValue = valuesToComposite[i].compositeOnto(property, baseValue);
      }
      ASSERT_ENABLED && assert(
          isDefinedAndNotNull(baseValue) && baseValue !== '',
          'Value should always be set after compositing');
      var isSvgMode = propertyIsSVGAttrib(property, this.target);
      setValue(this.target, property, toCssValue(property, baseValue,
          isSvgMode));
      this.properties[property] = [];
    }
  }
};


var cssStyleDeclarationAttribute = {
  cssText: true,
  length: true,
  parentRule: true,
  'var': true
};

var cssStyleDeclarationMethodModifiesStyle = {
  getPropertyValue: false,
  getPropertyCSSValue: false,
  removeProperty: true,
  getPropertyPriority: false,
  setProperty: true,
  item: false
};

var copyInlineStyle = function(sourceStyle, destinationStyle) {
  for (var i = 0; i < sourceStyle.length; i++) {
    var property = sourceStyle[i];
    destinationStyle[property] = sourceStyle[property];
  }
};

var retickThenGetComputedStyle = function() {
  repeatLastTick();
  ensureOriginalGetComputedStyle();
  return window.getComputedStyle.apply(this, arguments);
};

// This redundant flag is to support Safari which has trouble determining
// function object equality during an animation.
var isGetComputedStylePatched = false;
var originalGetComputedStyle = window.getComputedStyle;

var ensureRetickBeforeGetComputedStyle = function() {
  if (!isGetComputedStylePatched) {
    Object.defineProperty(window, 'getComputedStyle', configureDescriptor({
      value: retickThenGetComputedStyle
    }));
    isGetComputedStylePatched = true;
  }
};

var ensureOriginalGetComputedStyle = function() {
  if (isGetComputedStylePatched) {
    Object.defineProperty(window, 'getComputedStyle', configureDescriptor({
      value: originalGetComputedStyle
    }));
    isGetComputedStylePatched = false;
  }
};

// Changing the inline style of an element under animation may require the
// animation to be recomputed ontop of the new inline style if
// getComputedStyle() is called inbetween setting the style and the next
// animation frame.
// We modify getComputedStyle() to re-evaluate the animations only if it is
// called instead of re-evaluating them here potentially unnecessarily.
var animatedInlineStyleChanged = function() {
  maybeRestartAnimation();
  ensureRetickBeforeGetComputedStyle();
};



/** @constructor */
var AnimatedCSSStyleDeclaration = function(element) {
  ASSERT_ENABLED && assert(
      !(element.style instanceof AnimatedCSSStyleDeclaration),
      'Element must not already have an animated style attached.');

  // Stores the inline style of the element on its behalf while the
  // polyfill uses the element's inline style to simulate web animations.
  // This is needed to fake regular inline style CSSOM access on the element.
  this._surrogateElement = createDummyElement();
  this._style = element.style;
  this._length = 0;
  this._isAnimatedProperty = {};

  // Populate the surrogate element's inline style.
  copyInlineStyle(this._style, this._surrogateElement.style);
  this._updateIndices();
};

AnimatedCSSStyleDeclaration.prototype = {
  get cssText() {
    return this._surrogateElement.style.cssText;
  },
  set cssText(text) {
    var isAffectedProperty = {};
    for (var i = 0; i < this._surrogateElement.style.length; i++) {
      isAffectedProperty[this._surrogateElement.style[i]] = true;
    }
    this._surrogateElement.style.cssText = text;
    this._updateIndices();
    for (var i = 0; i < this._surrogateElement.style.length; i++) {
      isAffectedProperty[this._surrogateElement.style[i]] = true;
    }
    for (var property in isAffectedProperty) {
      if (!this._isAnimatedProperty[property]) {
        this._style.setProperty(property,
            this._surrogateElement.style.getPropertyValue(property));
      }
    }
    animatedInlineStyleChanged();
  },
  get length() {
    return this._surrogateElement.style.length;
  },
  get parentRule() {
    return this._style.parentRule;
  },
  get 'var'() {
    return this._style.var;
  },
  _updateIndices: function() {
    while (this._length < this._surrogateElement.style.length) {
      Object.defineProperty(this, this._length, {
        configurable: true,
        enumerable: false,
        get: (function(index) {
          return function() {
            return this._surrogateElement.style[index];
          };
        })(this._length)
      });
      this._length++;
    }
    while (this._length > this._surrogateElement.style.length) {
      this._length--;
      Object.defineProperty(this, this._length, {
        configurable: true,
        enumerable: false,
        value: undefined
      });
    }
  },
  _clearAnimatedProperty: function(property) {
    this._style[property] = this._surrogateElement.style[property];
    this._isAnimatedProperty[property] = false;
  },
  _setAnimatedProperty: function(property, value) {
    this._style[property] = value;
    this._isAnimatedProperty[property] = true;
  }
};

for (var method in cssStyleDeclarationMethodModifiesStyle) {
  AnimatedCSSStyleDeclaration.prototype[method] =
      (function(method, modifiesStyle) {
    return function() {
      var result = this._surrogateElement.style[method].apply(
          this._surrogateElement.style, arguments);
      if (modifiesStyle) {
        if (!this._isAnimatedProperty[arguments[0]]) {
          this._style[method].apply(this._style, arguments);
        }
        this._updateIndices();
        animatedInlineStyleChanged();
      }
      return result;
    }
  })(method, cssStyleDeclarationMethodModifiesStyle[method]);
}

for (var property in document.documentElement.style) {
  if (cssStyleDeclarationAttribute[property] ||
      property in cssStyleDeclarationMethodModifiesStyle) {
    continue;
  }
  (function(property) {
    Object.defineProperty(AnimatedCSSStyleDeclaration.prototype, property,
        configureDescriptor({
          get: function() {
            return this._surrogateElement.style[property];
          },
          set: function(value) {
            this._surrogateElement.style[property] = value;
            this._updateIndices();
            if (!this._isAnimatedProperty[property]) {
              this._style[property] = value;
            }
            animatedInlineStyleChanged();
          }
        }));
  })(property);
}

// This function is a fallback for when we can't replace an element's style with
// AnimatatedCSSStyleDeclaration and must patch the existing style to behave
// in a similar way.
// Only the methods listed in cssStyleDeclarationMethodModifiesStyle will
// be patched to behave in the same manner as a native implementation,
// getter properties like style.left or style[0] will be tainted by the
// polyfill's animation engine.
var patchInlineStyleForAnimation = function(style) {
  var surrogateElement = document.createElement('div');
  copyInlineStyle(style, surrogateElement.style);
  var isAnimatedProperty = {};
  for (var method in cssStyleDeclarationMethodModifiesStyle) {
    if (!(method in style)) {
      continue;
    }
    Object.defineProperty(style, method, configureDescriptor({
      value: (function(method, originalMethod, modifiesStyle) {
        return function() {
          var result = surrogateElement.style[method].apply(
              surrogateElement.style, arguments);
          if (modifiesStyle) {
            if (!isAnimatedProperty[arguments[0]]) {
              originalMethod.apply(style, arguments);
            }
            animatedInlineStyleChanged();
          }
          return result;
        }
      })(method, style[method], cssStyleDeclarationMethodModifiesStyle[method])
    }));
  }

  style._clearAnimatedProperty = function(property) {
    this[property] = surrogateElement.style[property];
    isAnimatedProperty[property] = false;
  };

  style._setAnimatedProperty = function(property, value) {
    this[property] = value;
    isAnimatedProperty[property] = true;
  };
};



/** @constructor */
var Compositor = function() {
  this.targets = [];
};

Compositor.prototype = {
  setAnimatedValue: function(target, property, animValue) {
    if (target !== null) {
      if (target._animProperties === undefined) {
        target._animProperties = new CompositedPropertyMap(target);
        this.targets.push(target);
      }
      target._animProperties.addValue(property, animValue);
    }
  },
  applyAnimatedValues: function() {
    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i]._animProperties.clear();
    }
    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i]._animProperties.captureBaseValues();
    }
    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i]._animProperties.applyAnimatedValues();
    }
  }
};

var ensureTargetInitialised = function(property, target) {
  if (propertyIsSVGAttrib(property, target)) {
    ensureTargetSVGInitialised(property, target);
  } else {
    ensureTargetCSSInitialised(target);
  }
};

var ensureTargetSVGInitialised = function(property, target) {
  if (!isDefinedAndNotNull(target._actuals)) {
    target._actuals = {};
    target._bases = {};
    target.actuals = {};
    target._getAttribute = target.getAttribute;
    target._setAttribute = target.setAttribute;
    target.getAttribute = function(name) {
      if (isDefinedAndNotNull(target._bases[name])) {
        return target._bases[name];
      }
      return target._getAttribute(name);
    };
    target.setAttribute = function(name, value) {
      if (isDefinedAndNotNull(target._actuals[name])) {
        target._bases[name] = value;
      } else {
        target._setAttribute(name, value);
      }
    };
  }
  if (!isDefinedAndNotNull(target._actuals[property])) {
    var baseVal = target.getAttribute(property);
    target._actuals[property] = 0;
    target._bases[property] = baseVal;

    Object.defineProperty(target.actuals, property, configureDescriptor({
      set: function(value) {
        if (value === null) {
          target._actuals[property] = target._bases[property];
          target._setAttribute(property, target._bases[property]);
        } else {
          target._actuals[property] = value;
          target._setAttribute(property, value);
        }
      },
      get: function() {
        return target._actuals[property];
      }
    }));
  }
};

var ensureTargetCSSInitialised = function(target) {
  if (target.style._webAnimationsStyleInitialised) {
    return;
  }
  try {
    var animatedStyle = new AnimatedCSSStyleDeclaration(target);
    Object.defineProperty(target, 'style', configureDescriptor({
      get: function() { return animatedStyle; }
    }));
  } catch (error) {
    patchInlineStyleForAnimation(target.style);
  }
  target.style._webAnimationsStyleInitialised = true;
};

var setValue = function(target, property, value) {
  ensureTargetInitialised(property, target);
  property = prefixProperty(property);
  if (propertyIsSVGAttrib(property, target)) {
    target.actuals[property] = value;
  } else {
    target.style._setAnimatedProperty(property, value);
  }
};

var clearValue = function(target, property) {
  ensureTargetInitialised(property, target);
  property = prefixProperty(property);
  if (propertyIsSVGAttrib(property, target)) {
    target.actuals[property] = null;
  } else {
    target.style._clearAnimatedProperty(property);
  }
};

var getValue = function(target, property) {
  ensureTargetInitialised(property, target);
  property = prefixProperty(property);
  if (propertyIsSVGAttrib(property, target)) {
    return target.actuals[property];
  } else {
    return getComputedStyle(target)[property];
  }
};

var rafScheduled = false;

var compositor = new Compositor();

var usePerformanceTiming =
    typeof window.performance === 'object' &&
    typeof window.performance.timing === 'object' &&
    typeof window.performance.now === 'function';

// Don't use a local named requestAnimationFrame, to avoid potential problems
// with hoisting.
var nativeRaf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
var raf;
if (nativeRaf) {
  raf = function(callback) {
    nativeRaf(function() {
      callback(clockMillis());
    });
  };
} else {
  raf = function(callback) {
    setTimeout(function() {
      callback(clockMillis());
    }, 1000 / 60);
  };
}

var clockMillis = function() {
  return usePerformanceTiming ? window.performance.now() : Date.now();
};
// Set up the zero times for document time. Document time is relative to the
// document load event.
var documentTimeZeroAsRafTime;
var documentTimeZeroAsClockTime;
var load;
if (usePerformanceTiming) {
  load = function() {
    // RAF time is relative to the navigationStart event.
    documentTimeZeroAsRafTime =
        window.performance.timing.loadEventStart -
        window.performance.timing.navigationStart;
    // performance.now() uses the same origin as RAF time.
    documentTimeZeroAsClockTime = documentTimeZeroAsRafTime;
  };
} else {
  // The best approximation we have for the relevant clock and RAF times is to
  // listen to the load event.
  load = function() {
    raf(function(rafTime) {
      documentTimeZeroAsRafTime = rafTime;
    });
    documentTimeZeroAsClockTime = Date.now();
  };
}
// Start timing when load event fires or if this script is processed when
// document loading is already complete.
if (document.readyState === 'complete') {
  // When performance timing is unavailable and this script is loaded
  // dynamically, document zero time is incorrect.
  // Warn the user in this case.
  if (!usePerformanceTiming) {
    console.warn(
        'Web animations can\'t discover document zero time when ' +
        'asynchronously loaded in the absence of performance timing.');
  }
  load();
} else {
  addEventListener('load', function() {
    load();
    if (usePerformanceTiming) {
      // We use setTimeout() to clear cachedClockTimeMillis at the end of a
      // frame, but this will not run until after other load handlers. We need
      // those handlers to pick up the new value of clockMillis(), so we must
      // clear the cached value.
      cachedClockTimeMillis = undefined;
    }
  });
}

// A cached document time for use during the current callstack.
var cachedClockTimeMillis;
// Calculates one time relative to another, returning null if the zero time is
// undefined.
var relativeTime = function(time, zeroTime) {
  return isDefined(zeroTime) ? time - zeroTime : null;
};

var lastClockTimeMillis;

var cachedClockTime = function() {
  // Cache a document time for the remainder of this callstack.
  if (!isDefined(cachedClockTimeMillis)) {
    cachedClockTimeMillis = clockMillis();
    lastClockTimeMillis = cachedClockTimeMillis;
    setTimeout(function() { cachedClockTimeMillis = undefined; }, 0);
  }
  return cachedClockTimeMillis;
};


// These functions should be called in every stack that could possibly modify
// the effect results that have already been calculated for the current tick.
var modifyCurrentAnimationStateDepth = 0;
var enterModifyCurrentAnimationState = function() {
  modifyCurrentAnimationStateDepth++;
};
var exitModifyCurrentAnimationState = function(updateCallback) {
  modifyCurrentAnimationStateDepth--;
  // updateCallback is set to null when we know we can't possibly affect the
  // current state (eg. a TimedItem which is not attached to a player). We track
  // the depth of recursive calls trigger just one repeat per entry. Only the
  // updateCallback from the outermost call is considered, this allows certain
  // locatations (eg. constructors) to override nested calls that would
  // otherwise set updateCallback unconditionally.
  if (modifyCurrentAnimationStateDepth === 0 && updateCallback) {
    updateCallback();
  }
};

var repeatLastTick = function() {
  if (isDefined(lastTickTime)) {
    ticker(lastTickTime, true);
  }
};

var playerSortFunction = function(a, b) {
  var result = a.startTime - b.startTime;
  return result !== 0 ? result : a._sequenceNumber - b._sequenceNumber;
};

var lastTickTime;
var ticker = function(rafTime, isRepeat) {
  // Don't tick till the page is loaded....
  if (!isDefined(documentTimeZeroAsRafTime)) {
    raf(ticker);
    return;
  }

  if (!isRepeat) {
    if (rafTime < lastClockTimeMillis) {
      rafTime = lastClockTimeMillis;
    }
    lastTickTime = rafTime;
    cachedClockTimeMillis = rafTime;
  }

  // Clear any modifications to getComputedStyle.
  ensureOriginalGetComputedStyle();

  // Get animations for this sample. We order by AnimationPlayer then by DFS
  // order within each AnimationPlayer's tree.
  if (!playersAreSorted) {
    PLAYERS.sort(playerSortFunction);
    playersAreSorted = true;
  }
  var finished = true;
  var paused = true;
  var animations = [];
  var finishedPlayers = [];
  PLAYERS.forEach(function(player) {
    player._update();
    finished = finished && !player._hasFutureAnimation();
    if (!player._hasFutureEffect()) {
      finishedPlayers.push(player);
    }
    paused = paused && player.paused;
    player._getLeafItemsInEffect(animations);
  });

  // Apply animations in order
  for (var i = 0; i < animations.length; i++) {
    if (animations[i] instanceof Animation) {
      animations[i]._sample();
    }
  }

  // Generate events
  PLAYERS.forEach(function(player) {
    player._generateEvents();
  });

  // Remove finished players. Warning: _deregisterFromTimeline modifies
  // the PLAYER list. It should not be called from within a PLAYERS.forEach
  // loop directly.
  finishedPlayers.forEach(function(player) {
    player._deregisterFromTimeline();
    playersAreSorted = false;
  });

  // Composite animated values into element styles
  compositor.applyAnimatedValues();

  if (!isRepeat) {
    if (finished || paused) {
      rafScheduled = false;
    } else {
      raf(ticker);
    }
    cachedClockTimeMillis = undefined;
  }
};

// Multiplication where zero multiplied by any value (including infinity)
// gives zero.
var multiplyZeroGivesZero = function(a, b) {
  return (a === 0 || b === 0) ? 0 : a * b;
};

var maybeRestartAnimation = function() {
  if (rafScheduled) {
    return;
  }
  raf(ticker);
  rafScheduled = true;
};

var DOCUMENT_TIMELINE = new AnimationTimeline(constructorToken);
// attempt to override native implementation
try {
  Object.defineProperty(document, 'timeline', {
    configurable: true,
    get: function() { return DOCUMENT_TIMELINE }
  });
} catch (e) { }
// maintain support for Safari
try {
  document.timeline = DOCUMENT_TIMELINE;
} catch (e) { }

window.Element.prototype.animate = function(effect, timing) {
  var anim = new Animation(this, effect, timing);
  DOCUMENT_TIMELINE.play(anim);
  return anim.player;
};
window.Element.prototype.getCurrentPlayers = function() {
  return PLAYERS.filter((function(player) {
    return player._isCurrent() && player._isTargetingElement(this);
  }).bind(this));
};
window.Element.prototype.getCurrentAnimations = function() {
  var animations = [];
  PLAYERS.forEach((function(player) {
    if (player._isCurrent()) {
      player._getAnimationsTargetingElement(this, animations);
    }
  }).bind(this));
  return animations;
};

window.Animation = Animation;
window.AnimationEffect = AnimationEffect;
window.AnimationGroup = AnimationGroup;
window.AnimationPlayer = AnimationPlayer;
window.AnimationSequence = AnimationSequence;
window.AnimationTimeline = AnimationTimeline;
window.KeyframeEffect = KeyframeEffect;
window.MediaReference = MediaReference;
window.MotionPathEffect = MotionPathEffect;
window.PseudoElementReference = PseudoElementReference;
window.TimedItem = TimedItem;
window.TimedItemList = TimedItemList;
window.Timing = Timing;
window.TimingEvent = TimingEvent;
window.TimingGroup = TimingGroup;

window._WebAnimationsTestingUtilities = {
  _constructorToken: constructorToken,
  _deprecated: deprecated,
  _positionListType: positionListType,
  _hsl2rgb: hsl2rgb,
  _types: propertyTypes,
  _knownPlayers: PLAYERS,
  _pacedTimingFunction: PacedTimingFunction,
  _prefixProperty: prefixProperty,
  _propertyIsSVGAttrib: propertyIsSVGAttrib
};

})();
;

    Polymer('paper-menu-button-transition', {

      baseClass: 'paper-menu-button-transition',
      revealedClass: 'paper-menu-button-revealed',
      openedClass: 'paper-menu-button-opened',
      closedClass: 'paper-menu-button-closed',
      completeEventName: null,

      duration: 500,

      setup: function(node) {
        this.super(arguments);

        var bg = node.querySelector('.paper-menu-button-overlay-bg');
        bg.style.transformOrigin = this.transformOrigin;
        bg.style.webkitTransformOrigin = this.transformOrigin;
      },

      transitionOpened: function(node, opened) {
        this.super(arguments);

        if (opened) {
          if (this.player) {
            this.player.cancel();
          }

          var anims = [];

          var size = node.getBoundingClientRect();

          var ink = node.querySelector('.paper-menu-button-overlay-ink');
          var offset = 40 / Math.max(size.width, size.height);
          anims.push(new Animation(ink, [{
            'opacity': 0.9,
            'transform': 'scale(0)',
          }, {
            'opacity': 0.9,
            'transform': 'scale(1)'
          }], {
            duration: this.duration * offset
          }));

          var bg = node.querySelector('.paper-menu-button-overlay-bg');
          anims.push(new Animation(bg, [{
            'opacity': 0.9,
            'transform': 'scale(' + 40 / size.width + ',' + 40 / size.height + ')',
          }, {
            'opacity': 1,
            'transform': 'scale(0.95, 0.5)'
          }, {
            'opacity': 1,
            'transform': 'scale(1, 1)'
          }], {
            delay: this.duration * offset,
            duration: this.duration * (1 - offset),
            fill: 'forwards'
          }));

          var items = node.querySelector('#menu').items;
          var itemDelay = offset + (1 - offset) / 2;
          var itemDuration = this.duration * (1 - itemDelay) / items.length;
          items.forEach(function(item, i) {
            if (!item.classList.contains('paper-menu-button-overlay-bg') && !item.classList.contains('paper-menu-button-overlay-ink')) {
              anims.push(new Animation(item, [{
                'opacity': 0
              }, {
                'opacity': 1
              }], {
                delay: this.duration * itemDelay + itemDuration * i,
                duration: itemDuration,
                fill: 'both'
              }));
            }
          }.bind(this));

          var group = new AnimationGroup(anims, {
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
          });
          this.player = document.timeline.play(group);
          this.player.onfinish = function() {
            this.fire('core-transitionend', this, node);
          }.bind(this);

        } else {
          this.listenOnce(node, 'transitionend', function() {
            this.fire('core-transitionend', this, node);
          }.bind(this));
        }
      },

    });
  ;

  (function() {

    CoreStyle.g.paperMenuButton = CoreStyle.g.paperMenuButton || {
      'background': '#fff'
    };

  })();
;

    Polymer('paper-menu-button', {

      publish: {

        /**
         * If true, this menu is currently visible.
         *
         * @attribute opened
         * @type boolean
         * @default false
         */
        opened: false,

        /**
         * The horizontal alignment of the menu relative to the button.
         *
         * @attribute halign
         * @type 'left' | 'right'
         * @default 'left'
         */
        halign: 'left',

        /**
         * The vertical alignment of the menu relative to the button.
         *
         * @attribute valign
         * @type 'bottom' | 'top'
         * @default 'top'
         */
        valign: 'top',
      },

      /**
       * The URL of an image for the icon. Should not use `icon` property
       * if you are using this property.
       *
       * @attribute src
       * @type string
       * @default ''
       */
      src: '',

      /**
       * Specifies the icon name or index in the set of icons available in
       * the icon set.  Should not use `src` property if you are using this
       * property.
       *
       * @attribute icon
       * @type string
       * @default ''
       */
      icon: '',

      slow: false,

      tapAction: function() {
        if (this.disabled) {
          return;
        }

        this.super();
        this.toggle();
        if (this.opened) {
          this.$.shadow.z = 0;
        }
      },

      transitionEndAction: function() {
        this.$.shadow.z = 1;
      },

      /**
       * Toggle the opened state of the menu.
       *
       * @method toggle
       */
      toggle: function() {
        this.opened = !this.opened;
      }

    });
  ;
Polymer('midi-volume-menu-button', {
  tapAction: function(event) {
    // Only react to events directly on the button.
    // Other menu events should be passed through.
    if (event.target === this) {
      this.super();
    }
  }
});;
Polymer('midi-volume', {
  volume: 100,
  muted: false,

  computed: {
    effectiveVolume: 'muted ? 0 : volume'
  },

  effectiveVolumeChanged: function() {
    this.fire('volume-change', { volume: this.effectiveVolume });
  },

  toggleMute: function() {
    this.muted = !this.muted;
  },

  unmute: function() {
    this.muted = false;
  },

  toIcon: function(level) {
    if (level === 0) {
      return 'av:volume-off';
    }
    else if (level <= 33) {
      return 'av:volume-mute';
    }
    else if (level <= 66) {
      return 'av:volume-down';
    }
    else {
      return 'av:volume-up';
    }
  }
});;
Polymer('midi-app', {

  file: null,

  fileName: '',
  songTitle: '',

  created: function() {
    var me = this;

    window.addEventListener('keypress', function(e) {
      switch (e.keyCode) {
        case 32:
          me.$.playbar.onPlayPause();
          break;
        default:
          break;
      }
    });
  },

  fileChanged: function(oldFile, newFile) {
    var me = this;
    var playbar = this.$.playbar;

    if (newFile) {
      newFile.file(function(file) {
        var reader = new FileReader();

        reader.onloadend = function(e) {
          var data = this.result;

          playbar.player = MIDI.Player;
          playbar.loadMidi(data);

          me.loadFile(newFile.name, data);
          me.loadInstruments();
        };

        reader.readAsBinaryString(file);
      });
    }
    else {
      playbar.player.stop();
      playbar.player = null;
    }
  },

  loadFile: function(filename, data) {
    this.fileName = filename;
    this.parseMetadata();

    MIDI.loader.message('File loaded.');
  },

  parseMetadata: function() {
    var data = MIDI.Player.data;
    var event;

    for (var i = 0; i < data.length; i++) {
      event = data[i][0].event;

      if (event.type === 'meta' && event.subtype === 'trackName') {
        this.songTitle = event.text;
        return;
      }
    }
  },

  loadInstruments: function() {
    var playbar = this.$.playbar;
    var data = playbar.player.data;
    var results = [];

    for (var i = 0; i < data.length; i++) {
      event = data[i][0].event;

      if (event.subtype === 'programChange') {
        results.push(
          MIDI.GeneralMIDI.byId[event.programNumber].id
        );
      }
    }

    if (results.length === 0) {
      // If no instrument is specified, default to program #0 (grand piano).
      results.push(MIDI.GeneralMIDI.byId[0].id);
    }

    var queue = this.createQueue({
      items: results,

      getNext: function(instrumentId) {
        if (MIDI.Soundfont[instrumentId]) {
          // already loaded, so just skip ahead
          return queue.getNext();
        }

        MIDI.loader.message('Loading instrument: ' + instrumentId);

        var req = new XMLHttpRequest();
        var url = 'bower_components/midi/soundfont/' + instrumentId + '-ogg.json';

        req.overrideMimeType("application/json");
        req.open('GET', url, true);

        req.onload = function() {
          MIDI.Soundfont[instrumentId] = JSON.parse(req.responseText);
          queue.getNext();
        };

        req.send(null);
      },

      onComplete: function() {
        MIDI.WebAudio.connect({
          callback: function() {
            MIDI.loader.message('Player loaded.');
          }
        });
      }
    });
  },

  setVolume: function(event) {
    if (MIDI.setVolume) {
      // Channel number -1 is a special value used to
      // indicate that the volume specified is the
      // master volume to be applied over all channels.
      MIDI.setVolume(-1, 127 * event.detail.volume / 100);
    }
  },

  chooseFile: function() {
    var me = this;

    chrome.fileSystem.chooseEntry(
      {
        accepts: [
          {
            description: 'MIDI files',
            mimeTypes: [
              "application/x-midi",
              "audio/midi"
            ],
            extensions: [
              "mid",
              "midi"
            ],
          }
        ],
        acceptsAllTypes: false
      },
      function(entry, entries) {
        me.file = entry;
      }
    );
  },

  createQueue: function(conf) {
    var self = {};
    self.queue = [];

    for (var key in conf.items) {
      if (conf.items.hasOwnProperty(key)) {
        self.queue.push(conf.items[key]);
      }
    }

    self.getNext = function() {
      if (!self.queue.length) {
        return conf.onComplete();
      }

      conf.getNext(self.queue.shift());
    };

    setTimeout(self.getNext, 1);

    return self;
  },

  closeFile: function() {
    this.file = null;
  }
});;
/* Wrapper for accessing strings through sequential reads */
function Stream(str) {
	var position = 0;
	
	function read(length) {
		var result = str.substr(position, length);
		position += length;
		return result;
	}
	
	/* read a big-endian 32-bit integer */
	function readInt32() {
		var result = (
			(str.charCodeAt(position) << 24)
			+ (str.charCodeAt(position + 1) << 16)
			+ (str.charCodeAt(position + 2) << 8)
			+ str.charCodeAt(position + 3));
		position += 4;
		return result;
	}

	/* read a big-endian 16-bit integer */
	function readInt16() {
		var result = (
			(str.charCodeAt(position) << 8)
			+ str.charCodeAt(position + 1));
		position += 2;
		return result;
	}
	
	/* read an 8-bit integer */
	function readInt8(signed) {
		var result = str.charCodeAt(position);
		if (signed && result > 127) result -= 256;
		position += 1;
		return result;
	}
	
	function eof() {
		return position >= str.length;
	}
	
	/* read a MIDI-style variable-length integer
		(big-endian value in groups of 7 bits,
		with top bit set to signify that another byte follows)
	*/
	function readVarInt() {
		var result = 0;
		while (true) {
			var b = readInt8();
			if (b & 0x80) {
				result += (b & 0x7f);
				result <<= 7;
			} else {
				/* b is the last byte */
				return result + b;
			}
		}
	}
	
	return {
		'eof': eof,
		'read': read,
		'readInt32': readInt32,
		'readInt16': readInt16,
		'readInt8': readInt8,
		'readVarInt': readVarInt
	}
};
/*
class to parse the .mid file format
(depends on stream.js)
*/
function MidiFile(data) {
	function readChunk(stream) {
		var id = stream.read(4);
		var length = stream.readInt32();
		return {
			'id': id,
			'length': length,
			'data': stream.read(length)
		};
	}
	
	var lastEventTypeByte;
	
	function readEvent(stream) {
		var event = {};
		event.deltaTime = stream.readVarInt();
		var eventTypeByte = stream.readInt8();
		if ((eventTypeByte & 0xf0) == 0xf0) {
			/* system / meta event */
			if (eventTypeByte == 0xff) {
				/* meta event */
				event.type = 'meta';
				var subtypeByte = stream.readInt8();
				var length = stream.readVarInt();
				switch(subtypeByte) {
					case 0x00:
						event.subtype = 'sequenceNumber';
						if (length != 2) throw "Expected length for sequenceNumber event is 2, got " + length;
						event.number = stream.readInt16();
						return event;
					case 0x01:
						event.subtype = 'text';
						event.text = stream.read(length);
						return event;
					case 0x02:
						event.subtype = 'copyrightNotice';
						event.text = stream.read(length);
						return event;
					case 0x03:
						event.subtype = 'trackName';
						event.text = stream.read(length);
						return event;
					case 0x04:
						event.subtype = 'instrumentName';
						event.text = stream.read(length);
						return event;
					case 0x05:
						event.subtype = 'lyrics';
						event.text = stream.read(length);
						return event;
					case 0x06:
						event.subtype = 'marker';
						event.text = stream.read(length);
						return event;
					case 0x07:
						event.subtype = 'cuePoint';
						event.text = stream.read(length);
						return event;
					case 0x20:
						event.subtype = 'midiChannelPrefix';
						if (length != 1) throw "Expected length for midiChannelPrefix event is 1, got " + length;
						event.channel = stream.readInt8();
						return event;
					case 0x2f:
						event.subtype = 'endOfTrack';
						if (length != 0) throw "Expected length for endOfTrack event is 0, got " + length;
						return event;
					case 0x51:
						event.subtype = 'setTempo';
						if (length != 3) throw "Expected length for setTempo event is 3, got " + length;
						event.microsecondsPerBeat = (
							(stream.readInt8() << 16)
							+ (stream.readInt8() << 8)
							+ stream.readInt8()
						)
						return event;
					case 0x54:
						event.subtype = 'smpteOffset';
						if (length != 5) throw "Expected length for smpteOffset event is 5, got " + length;
						var hourByte = stream.readInt8();
						event.frameRate = {
							0x00: 24, 0x20: 25, 0x40: 29, 0x60: 30
						}[hourByte & 0x60];
						event.hour = hourByte & 0x1f;
						event.min = stream.readInt8();
						event.sec = stream.readInt8();
						event.frame = stream.readInt8();
						event.subframe = stream.readInt8();
						return event;
					case 0x58:
						event.subtype = 'timeSignature';
						if (length != 4) throw "Expected length for timeSignature event is 4, got " + length;
						event.numerator = stream.readInt8();
						event.denominator = Math.pow(2, stream.readInt8());
						event.metronome = stream.readInt8();
						event.thirtyseconds = stream.readInt8();
						return event;
					case 0x59:
						event.subtype = 'keySignature';
						if (length != 2) throw "Expected length for keySignature event is 2, got " + length;
						event.key = stream.readInt8(true);
						event.scale = stream.readInt8();
						return event;
					case 0x7f:
						event.subtype = 'sequencerSpecific';
						event.data = stream.read(length);
						return event;
					default:
						// console.log("Unrecognised meta event subtype: " + subtypeByte);
						event.subtype = 'unknown'
						event.data = stream.read(length);
						return event;
				}
				event.data = stream.read(length);
				return event;
			} else if (eventTypeByte == 0xf0) {
				event.type = 'sysEx';
				var length = stream.readVarInt();
				event.data = stream.read(length);
				return event;
			} else if (eventTypeByte == 0xf7) {
				event.type = 'dividedSysEx';
				var length = stream.readVarInt();
				event.data = stream.read(length);
				return event;
			} else {
				throw "Unrecognised MIDI event type byte: " + eventTypeByte;
			}
		} else {
			/* channel event */
			var param1;
			if ((eventTypeByte & 0x80) == 0) {
				/* running status - reuse lastEventTypeByte as the event type.
					eventTypeByte is actually the first parameter
				*/
				param1 = eventTypeByte;
				eventTypeByte = lastEventTypeByte;
			} else {
				param1 = stream.readInt8();
				lastEventTypeByte = eventTypeByte;
			}
			var eventType = eventTypeByte >> 4;
			event.channel = eventTypeByte & 0x0f;
			event.type = 'channel';
			switch (eventType) {
				case 0x08:
					event.subtype = 'noteOff';
					event.noteNumber = param1;
					event.velocity = stream.readInt8();
					return event;
				case 0x09:
					event.noteNumber = param1;
					event.velocity = stream.readInt8();
					if (event.velocity == 0) {
						event.subtype = 'noteOff';
					} else {
						event.subtype = 'noteOn';
					}
					return event;
				case 0x0a:
					event.subtype = 'noteAftertouch';
					event.noteNumber = param1;
					event.amount = stream.readInt8();
					return event;
				case 0x0b:
					event.subtype = 'controller';
					event.controllerType = param1;
					event.value = stream.readInt8();
					return event;
				case 0x0c:
					event.subtype = 'programChange';
					event.programNumber = param1;
					return event;
				case 0x0d:
					event.subtype = 'channelAftertouch';
					event.amount = param1;
					return event;
				case 0x0e:
					event.subtype = 'pitchBend';
					event.value = param1 + (stream.readInt8() << 7);
					return event;
				default:
					throw "Unrecognised MIDI event type: " + eventType
					/* 
					console.log("Unrecognised MIDI event type: " + eventType);
					stream.readInt8();
					event.subtype = 'unknown';
					return event;
					*/
			}
		}
	}
	
	stream = Stream(data);
	var headerChunk = readChunk(stream);
	if (headerChunk.id != 'MThd' || headerChunk.length != 6) {
		throw "Bad .mid file - header not found";
	}
	var headerStream = Stream(headerChunk.data);
	var formatType = headerStream.readInt16();
	var trackCount = headerStream.readInt16();
	var timeDivision = headerStream.readInt16();
	
	if (timeDivision & 0x8000) {
		throw "Expressing time division in SMTPE frames is not supported yet"
	} else {
		ticksPerBeat = timeDivision;
	}
	
	var header = {
		'formatType': formatType,
		'trackCount': trackCount,
		'ticksPerBeat': ticksPerBeat
	}
	var tracks = [];
	for (var i = 0; i < header.trackCount; i++) {
		tracks[i] = [];
		var trackChunk = readChunk(stream);
		if (trackChunk.id != 'MTrk') {
			throw "Unexpected chunk - expected MTrk, got "+ trackChunk.id;
		}
		var trackStream = Stream(trackChunk.data);
		while (!trackStream.eof()) {
			var event = readEvent(trackStream);
			tracks[i].push(event);
			//console.log(event);
		}
	}
	
	return {
		'header': header,
		'tracks': tracks
	}
};
var clone = function (o) {
	if (typeof o != 'object') return (o);
	if (o == null) return (o);
	var ret = (typeof o.length == 'number') ? [] : {};
	for (var key in o) ret[key] = clone(o[key]);
	return ret;
};

function Replayer(midiFile, timeWarp, eventProcessor) {
	var trackStates = [];
	var beatsPerMinute = 120;
	var ticksPerBeat = midiFile.header.ticksPerBeat;
	
	for (var i = 0; i < midiFile.tracks.length; i++) {
		trackStates[i] = {
			'nextEventIndex': 0,
			'ticksToNextEvent': (
				midiFile.tracks[i].length ?
					midiFile.tracks[i][0].deltaTime :
					null
			)
		};
	}

	var nextEventInfo;
	var samplesToNextEvent = 0;
	
	function getNextEvent() {
		var ticksToNextEvent = null;
		var nextEventTrack = null;
		var nextEventIndex = null;
		
		for (var i = 0; i < trackStates.length; i++) {
			if (
				trackStates[i].ticksToNextEvent != null
				&& (ticksToNextEvent == null || trackStates[i].ticksToNextEvent < ticksToNextEvent)
			) {
				ticksToNextEvent = trackStates[i].ticksToNextEvent;
				nextEventTrack = i;
				nextEventIndex = trackStates[i].nextEventIndex;
			}
		}
		if (nextEventTrack != null) {
			/* consume event from that track */
			var nextEvent = midiFile.tracks[nextEventTrack][nextEventIndex];
			if (midiFile.tracks[nextEventTrack][nextEventIndex + 1]) {
				trackStates[nextEventTrack].ticksToNextEvent += midiFile.tracks[nextEventTrack][nextEventIndex + 1].deltaTime;
			} else {
				trackStates[nextEventTrack].ticksToNextEvent = null;
			}
			trackStates[nextEventTrack].nextEventIndex += 1;
			/* advance timings on all tracks by ticksToNextEvent */
			for (var i = 0; i < trackStates.length; i++) {
				if (trackStates[i].ticksToNextEvent != null) {
					trackStates[i].ticksToNextEvent -= ticksToNextEvent
				}
			}
			return {
				"ticksToEvent": ticksToNextEvent,
				"event": nextEvent,
				"track": nextEventTrack
			}
		} else {
			return null;
		}
	};
	//
	var midiEvent;
	var temporal = [];
	//
	function processEvents() {
		function processNext() {
			if ( midiEvent.event.type == "meta" && midiEvent.event.subtype == "setTempo" ) {
				// tempo change events can occur anywhere in the middle and affect events that follow
				beatsPerMinute = 60000000 / midiEvent.event.microsecondsPerBeat;
			} 
			if (midiEvent.ticksToEvent > 0) {
				var beatsToGenerate = midiEvent.ticksToEvent / ticksPerBeat;
				var secondsToGenerate = beatsToGenerate / (beatsPerMinute / 60);
			}
			var time = (secondsToGenerate * 1000 * timeWarp) || 0;
			temporal.push([ midiEvent, time]);
			midiEvent = getNextEvent();
		};
		//
		if (midiEvent = getNextEvent()) {
			while(midiEvent) processNext(true);
		}
	};
	processEvents();
	return {
		"getData": function() {
			return clone(temporal);
		}
	};
};
;
// http://ntt.cc/2008/01/19/base64-encoder-decoder-with-javascript.html

// window.atob and window.btoa

(function (window) {

	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	
	window.btoa || (window.btoa = function encode64(input) {
		input = escape(input);
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;
		do {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";
		} while (i < input.length);
		return output;
	});
	
	window.atob || (window.atob = function(input) {
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;
		// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
		var base64test = /[^A-Za-z0-9\+\/\=]/g;
		if (base64test.exec(input)) {
			alert("There were invalid base64 characters in the input text.\n" + "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" + "Expect errors in decoding.");
		}
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		do {
			enc1 = keyStr.indexOf(input.charAt(i++));
			enc2 = keyStr.indexOf(input.charAt(i++));
			enc3 = keyStr.indexOf(input.charAt(i++));
			enc4 = keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";
		} while (i < input.length);
		return unescape(output);
	});

}(this));;
/*
Copyright (c) 2011, Daniel Guerrero
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the Daniel Guerrero nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL DANIEL GUERRERO BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
 
var Base64Binary = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	/* will return a  Uint8Array type */
	decodeArrayBuffer: function(input) {
		var bytes = Math.ceil( (3*input.length) / 4.0);
		var ab = new ArrayBuffer(bytes);
		this.decode(input, ab);

		return ab;
	},

	decode: function(input, arrayBuffer) {
		//get last chars to see if are valid
		var lkey1 = this._keyStr.indexOf(input.charAt(input.length-1));		 
		var lkey2 = this._keyStr.indexOf(input.charAt(input.length-1));		 

		var bytes = Math.ceil( (3*input.length) / 4.0);
		if (lkey1 == 64) bytes--; //padding chars, so skip
		if (lkey2 == 64) bytes--; //padding chars, so skip

		var uarray;
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		var j = 0;

		if (arrayBuffer)
			uarray = new Uint8Array(arrayBuffer);
		else
			uarray = new Uint8Array(bytes);

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		for (i=0; i<bytes; i+=3) {	
			//get the 3 octects in 4 ascii chars
			enc1 = this._keyStr.indexOf(input.charAt(j++));
			enc2 = this._keyStr.indexOf(input.charAt(j++));
			enc3 = this._keyStr.indexOf(input.charAt(j++));
			enc4 = this._keyStr.indexOf(input.charAt(j++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			uarray[i] = chr1;			
			if (enc3 != 64) uarray[i+1] = chr2;
			if (enc4 != 64) uarray[i+2] = chr3;
		}

		return uarray;	
	}
};;
/*
	-------------------------------------
	MIDI.audioDetect : 0.3
	-------------------------------------
	https://github.com/mudcube/MIDI.js
	-------------------------------------
	Probably, Maybe, No... Absolutely!
	-------------------------------------
	Test to see what types of <audio> MIME types are playable by the browser.
	-------------------------------------
*/

if (typeof(MIDI) === "undefined") var MIDI = {};

(function() { "use strict";

var supports = {};	
var pending = 0;
var canPlayThrough = function (src) {
	pending ++;
	var audio = new Audio();
	var mime = src.split(";")[0];
	audio.id = "audio";
	audio.setAttribute("preload", "auto");
	audio.setAttribute("audiobuffer", true);
	audio.addEventListener("error", function() {
		supports[mime] = false;
		pending --;
	}, false);
	audio.addEventListener("canplaythrough", function() {
		supports[mime] = true;
		pending --;
	}, false);
	audio.src = "data:" + src;
	document.body.appendChild(audio);
};

MIDI.audioDetect = function(callback) {
	// check whether <audio> tag is supported
	if (typeof(Audio) === "undefined") return callback({});
	// check whether canPlayType is supported
	var audio = new Audio();
	if (typeof(audio.canPlayType) === "undefined") return callback(supports);
	// see what we can learn from the browser
	var vorbis = audio.canPlayType('audio/ogg; codecs="vorbis"');
	vorbis = (vorbis === "probably" || vorbis === "maybe");
	var mpeg = audio.canPlayType('audio/mpeg');
	mpeg = (mpeg === "probably" || mpeg === "maybe");
	// maybe nothing is supported
	if (!vorbis && !mpeg) {
		callback(supports);
		return;
	}
	// or maybe something is supported
	if (vorbis) canPlayThrough("audio/ogg;base64,T2dnUwACAAAAAAAAAADqnjMlAAAAAOyyzPIBHgF2b3JiaXMAAAAAAUAfAABAHwAAQB8AAEAfAACZAU9nZ1MAAAAAAAAAAAAA6p4zJQEAAAANJGeqCj3//////////5ADdm9yYmlzLQAAAFhpcGguT3JnIGxpYlZvcmJpcyBJIDIwMTAxMTAxIChTY2hhdWZlbnVnZ2V0KQAAAAABBXZvcmJpcw9CQ1YBAAABAAxSFCElGVNKYwiVUlIpBR1jUFtHHWPUOUYhZBBTiEkZpXtPKpVYSsgRUlgpRR1TTFNJlVKWKUUdYxRTSCFT1jFloXMUS4ZJCSVsTa50FkvomWOWMUYdY85aSp1j1jFFHWNSUkmhcxg6ZiVkFDpGxehifDA6laJCKL7H3lLpLYWKW4q91xpT6y2EGEtpwQhhc+211dxKasUYY4wxxsXiUyiC0JBVAAABAABABAFCQ1YBAAoAAMJQDEVRgNCQVQBABgCAABRFcRTHcRxHkiTLAkJDVgEAQAAAAgAAKI7hKJIjSZJkWZZlWZameZaouaov+64u667t6roOhIasBACAAAAYRqF1TCqDEEPKQ4QUY9AzoxBDDEzGHGNONKQMMogzxZAyiFssLqgQBKEhKwKAKAAAwBjEGGIMOeekZFIi55iUTkoDnaPUUcoolRRLjBmlEluJMYLOUeooZZRCjKXFjFKJscRUAABAgAMAQICFUGjIigAgCgCAMAYphZRCjCnmFHOIMeUcgwwxxiBkzinoGJNOSuWck85JiRhjzjEHlXNOSuekctBJyaQTAAAQ4AAAEGAhFBqyIgCIEwAwSJKmWZomipamiaJniqrqiaKqWp5nmp5pqqpnmqpqqqrrmqrqypbnmaZnmqrqmaaqiqbquqaquq6nqrZsuqoum65q267s+rZru77uqapsm6or66bqyrrqyrbuurbtS56nqqKquq5nqq6ruq5uq65r25pqyq6purJtuq4tu7Js664s67pmqq5suqotm64s667s2rYqy7ovuq5uq7Ks+6os+75s67ru2rrwi65r66os674qy74x27bwy7ouHJMnqqqnqq7rmarrqq5r26rr2rqmmq5suq4tm6or26os67Yry7aumaosm64r26bryrIqy77vyrJui67r66Ys67oqy8Lu6roxzLat+6Lr6roqy7qvyrKuu7ru+7JuC7umqrpuyrKvm7Ks+7auC8us27oxuq7vq7It/KosC7+u+8Iy6z5jdF1fV21ZGFbZ9n3d95Vj1nVhWW1b+V1bZ7y+bgy7bvzKrQvLstq2scy6rSyvrxvDLux8W/iVmqratum6um7Ksq/Lui60dd1XRtf1fdW2fV+VZd+3hV9pG8OwjK6r+6os68Jry8ov67qw7MIvLKttK7+r68ow27qw3L6wLL/uC8uq277v6rrStXVluX2fsSu38QsAABhwAAAIMKEMFBqyIgCIEwBAEHIOKQahYgpCCKGkEEIqFWNSMuakZM5JKaWUFEpJrWJMSuaclMwxKaGUlkopqYRSWiqlxBRKaS2l1mJKqcVQSmulpNZKSa2llGJMrcUYMSYlc05K5pyUklJrJZXWMucoZQ5K6iCklEoqraTUYuacpA46Kx2E1EoqMZWUYgupxFZKaq2kFGMrMdXUWo4hpRhLSrGVlFptMdXWWqs1YkxK5pyUzDkqJaXWSiqtZc5J6iC01DkoqaTUYiopxco5SR2ElDLIqJSUWiupxBJSia20FGMpqcXUYq4pxRZDSS2WlFosqcTWYoy1tVRTJ6XFklKMJZUYW6y5ttZqDKXEVkqLsaSUW2sx1xZjjqGkFksrsZWUWmy15dhayzW1VGNKrdYWY40x5ZRrrT2n1mJNMdXaWqy51ZZbzLXnTkprpZQWS0oxttZijTHmHEppraQUWykpxtZara3FXEMpsZXSWiypxNhirLXFVmNqrcYWW62ltVprrb3GVlsurdXcYqw9tZRrrLXmWFNtBQAADDgAAASYUAYKDVkJAEQBAADGMMYYhEYpx5yT0ijlnHNSKucghJBS5hyEEFLKnINQSkuZcxBKSSmUklJqrYVSUmqttQIAAAocAAACbNCUWByg0JCVAEAqAIDBcTRNFFXVdX1fsSxRVFXXlW3jVyxNFFVVdm1b+DVRVFXXtW3bFn5NFFVVdmXZtoWiqrqybduybgvDqKqua9uybeuorqvbuq3bui9UXVmWbVu3dR3XtnXd9nVd+Bmzbeu2buu+8CMMR9/4IeTj+3RCCAAAT3AAACqwYXWEk6KxwEJDVgIAGQAAgDFKGYUYM0gxphhjTDHGmAAAgAEHAIAAE8pAoSErAoAoAADAOeecc84555xzzjnnnHPOOeecc44xxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY0wAwE6EA8BOhIVQaMhKACAcAABACCEpKaWUUkoRU85BSSmllFKqFIOMSkoppZRSpBR1lFJKKaWUIqWgpJJSSimllElJKaWUUkoppYw6SimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaVUSimllFJKKaWUUkoppRQAYPLgAACVYOMMK0lnhaPBhYasBAByAwAAhRiDEEJpraRUUkolVc5BKCWUlEpKKZWUUqqYgxBKKqmlklJKKbXSQSihlFBKKSWUUkooJYQQSgmhlFRCK6mEUkoHoYQSQimhhFRKKSWUzkEoIYUOQkmllNRCSB10VFIpIZVSSiklpZQ6CKGUklJLLZVSWkqpdBJSKamV1FJqqbWSUgmhpFZKSSWl0lpJJbUSSkklpZRSSymFVFJJJYSSUioltZZaSqm11lJIqZWUUkqppdRSSiWlkEpKqZSSUmollZRSaiGVlEpJKaTUSimlpFRCSamlUlpKLbWUSkmptFRSSaWUlEpJKaVSSksppRJKSqmllFpJKYWSUkoplZJSSyW1VEoKJaWUUkmptJRSSymVklIBAEAHDgAAAUZUWoidZlx5BI4oZJiAAgAAQABAgAkgMEBQMApBgDACAQAAAADAAAAfAABHARAR0ZzBAUKCwgJDg8MDAAAAAAAAAAAAAACAT2dnUwAEAAAAAAAAAADqnjMlAgAAADzQPmcBAQA=");
	if (mpeg) canPlayThrough("audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
	// lets find out!
	var time = (new Date()).getTime(); 
	var interval = window.setInterval(function() {
		var now = (new Date()).getTime();
		var maxExecution = now - time > 5000;
		if (!pending || maxExecution) {
			window.clearInterval(interval);
			callback(supports);
		}
	}, 1);
};

})();
/*
	-----------------------------------------------------------
	MIDI.loadPlugin : 0.1.2 : 01/22/2014
	-----------------------------------------------------------
	https://github.com/mudcube/MIDI.js
	-----------------------------------------------------------
	MIDI.loadPlugin({
		targetFormat: "mp3", // optionally can force to use MP3 (for instance on mobile networks)
		instrument: "acoustic_grand_piano", // or 1 (default)
		instruments: [ "acoustic_grand_piano", "acoustic_guitar_nylon" ], // or multiple instruments
		callback: function() { }
	});
*/

if (typeof (MIDI) === "undefined") var MIDI = {};
if (typeof (MIDI.Soundfont) === "undefined") MIDI.Soundfont = {};

(function() { "use strict";

var USE_JAZZMIDI = false; // Turn on to support JazzMIDI Plugin

MIDI.loadPlugin = function(conf) {
	if (typeof(conf) === "function") conf = {
		callback: conf
	};
	/// Get the instrument name.
	var instruments = conf.instruments || conf.instrument || "acoustic_grand_piano";
	if (typeof(instruments) !== "object") instruments = [ instruments ];
	///
	for (var n = 0; n < instruments.length; n ++) {
		var instrument = instruments[n];
		if (typeof(instrument) === "number") {
			instruments[n] = MIDI.GeneralMIDI.byId[instrument];
		}
	};
	///
	MIDI.soundfontUrl = conf.soundfontUrl || MIDI.soundfontUrl || "./soundfont/";
	/// Detect the best type of audio to use.
	MIDI.audioDetect(function(types) {
		var api = "";
		// use the most appropriate plugin if not specified
		if (apis[conf.api]) {
			api = conf.api;
		} else if (apis[window.location.hash.substr(1)]) {
			api = window.location.hash.substr(1);
		} else if (USE_JAZZMIDI && navigator.requestMIDIAccess) {
			api = "webmidi";
		} else if (window.webkitAudioContext || window.AudioContext) { // Chrome
			api = "webaudio";
		} else if (window.Audio) { // Firefox
			api = "audiotag";
		} else { // Internet Explorer
			api = "flash";
		}
		///
		if (!connect[api]) return;
		// use audio/ogg when supported
		if (conf.targetFormat) {
			var filetype = conf.targetFormat;
		} else { // use best quality
			var filetype = types["audio/ogg"] ? "ogg" : "mp3";
		}
		// load the specified plugin
		MIDI.lang = api;
		MIDI.supports = types;
		connect[api](filetype, instruments, conf);
	});
};

///

var connect = {};

connect.webmidi = function(filetype, instruments, conf) {
	if (MIDI.loader) MIDI.loader.message("Web MIDI API...");
	MIDI.WebMIDI.connect(conf);
};

connect.flash = function(filetype, instruments, conf) {
	// fairly quick, but requires loading of individual MP3s (more http requests).
	if (MIDI.loader) MIDI.loader.message("Flash API...");
	DOMLoader.script.add({
		src: conf.soundManagerUrl || "./inc/SoundManager2/script/soundmanager2.js",
		verify: "SoundManager",
		callback: function () {
			MIDI.Flash.connect(instruments, conf);
		}
	});
};

connect.audiotag = function(filetype, instruments, conf) {
	if (MIDI.loader) MIDI.loader.message("HTML5 Audio API...");
	// works ok, kinda like a drunken tuna fish, across the board.
	var queue = createQueue({
		items: instruments,
		getNext: function(instrumentId) {
			DOMLoader.sendRequest({
				url: MIDI.soundfontUrl + instrumentId + "-" + filetype + ".js",
				onprogress: getPercent,
				onload: function (response) {
					addSoundfont(response.responseText);
					if (MIDI.loader) MIDI.loader.update(null, "Downloading", 100);
					queue.getNext();
				}
			});
		},
		onComplete: function() {
			MIDI.AudioTag.connect(conf);
		}
	});
};

connect.webaudio = function(filetype, instruments, conf) {
	if (MIDI.loader) MIDI.loader.message("Web Audio API...");
	// works awesome! safari, chrome and firefox support.
	var queue = createQueue({
		items: instruments,
		getNext: function(instrumentId) {
			DOMLoader.sendRequest({
				url: MIDI.soundfontUrl + instrumentId + "-" + filetype + ".js",
				onprogress: getPercent,
				onload: function(response) {
					addSoundfont(response.responseText);
					if (MIDI.loader) MIDI.loader.update(null, "Downloading...", 100);
					queue.getNext();
				}
			});
		},
		onComplete: function() {
			MIDI.WebAudio.connect(conf);
		}
	});
};

/// Helpers

var apis = {
	"webmidi": true,
	"webaudio": true,
	"audiotag": true,
	"flash": true
};

var addSoundfont = function(text) {
	var script = document.createElement("script");
	script.language = "javascript";
	script.type = "text/javascript";
	script.text = text;
	document.body.appendChild(script);
};

var getPercent = function(event) {
	if (!this.totalSize) {
		if (this.getResponseHeader("Content-Length-Raw")) {
			this.totalSize = parseInt(this.getResponseHeader("Content-Length-Raw"));
		} else {
			this.totalSize = event.total;
		}
	}
	///
	var percent = this.totalSize ? Math.round(event.loaded / this.totalSize * 100) : "";
	if (MIDI.loader) MIDI.loader.update(null, "Downloading...", percent);
};

var createQueue = function(conf) {
	var self = {};
	self.queue = [];
	for (var key in conf.items) {
		if (conf.items.hasOwnProperty(key)) {
			self.queue.push(conf.items[key]);
		}
	}
	self.getNext = function() {
		if (!self.queue.length) return conf.onComplete();
		conf.getNext(self.queue.shift());
	};
	setTimeout(self.getNext, 1);
	return self;
};

})();
/*
	--------------------------------------------
	MIDI.Plugin : 0.3.2 : 2013/01/26
	--------------------------------------------
	https://github.com/mudcube/MIDI.js
	--------------------------------------------
	Inspired by javax.sound.midi (albeit a super simple version):
		http://docs.oracle.com/javase/6/docs/api/javax/sound/midi/package-summary.html
	--------------------------------------------
	Technologies:
		MIDI.WebMIDI
		MIDI.WebAudio
		MIDI.Flash
		MIDI.AudioTag
	--------------------------------------------
	Helpers:
		MIDI.GeneralMIDI
		MIDI.channels
		MIDI.keyToNote
		MIDI.noteToKey
*/

if (typeof (MIDI) === "undefined") var MIDI = {};

(function() { "use strict";

var setPlugin = function(root) {
	MIDI.api = root.api;
	MIDI.setVolume = root.setVolume;
	MIDI.programChange = root.programChange;
	MIDI.noteOn = root.noteOn;
	MIDI.noteOff = root.noteOff;
	MIDI.chordOn = root.chordOn;
	MIDI.chordOff = root.chordOff;
	MIDI.stopAllNotes = root.stopAllNotes;
	MIDI.getInput = root.getInput;
	MIDI.getOutputs = root.getOutputs;
};

/*
	--------------------------------------------
	Web MIDI API - Native Soundbank
	--------------------------------------------
	https://dvcs.w3.org/hg/audio/raw-file/tip/midi/specification.html
	--------------------------------------------
*/

(function () {
	var plugin = null;
	var output = null;
	var channels = [];
	var root = MIDI.WebMIDI = {
		api: "webmidi"
	};
	root.setVolume = function (channel, volume) { // set channel volume
		output.send([0xB0 + channel, 0x07, volume]);
	};

	root.programChange = function (channel, program) { // change channel instrument
		output.send([0xC0 + channel, program]);
	};

	root.noteOn = function (channel, note, velocity, delay) {
		output.send([0x90 + channel, note, velocity], delay * 1000);
	};

	root.noteOff = function (channel, note, delay) {
		output.send([0x80 + channel, note, 0], delay * 1000);
	};

	root.chordOn = function (channel, chord, velocity, delay) {
		for (var n = 0; n < chord.length; n ++) {
			var note = chord[n];
			output.send([0x90 + channel, note, velocity], delay * 1000);
		}
	};

	root.chordOff = function (channel, chord, delay) {
		for (var n = 0; n < chord.length; n ++) {
			var note = chord[n];
			output.send([0x80 + channel, note, 0], delay * 1000);
		}
	};

	root.stopAllNotes = function () {
		for (var channel = 0; channel < 16; channel ++) {
			output.send([0xB0 + channel, 0x7B, 0]);
		}
	};

	root.getInput = function () {
		return plugin.getInputs();
	};

	root.getOutputs = function () {
		return plugin.getOutputs();
	};

	root.connect = function (conf) {
		setPlugin(root);
        navigator.requestMIDIAccess().then(function (access) {
			plugin = access;
			output = plugin.outputs()[0];
			if (conf.callback) conf.callback();
		}, function (err) { // well at least we tried!
			if (window.AudioContext || window.webkitAudioContext) { // Chrome
				conf.api = "webaudio";
			} else if (window.Audio) { // Firefox
				conf.api = "audiotag";
			} else { // Internet Explorer
				conf.api = "flash";
			}
			MIDI.loadPlugin(conf);
		});
	};
})();

/*
	--------------------------------------------
	Web Audio API - OGG or MPEG Soundbank
	--------------------------------------------
	https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html
	--------------------------------------------
*/

if (window.AudioContext || window.webkitAudioContext) (function () {

	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var root = MIDI.WebAudio = {
		api: "webaudio"
	};
	var ctx;
	var master;
	var sources = {};
	var masterVolume = 127;
	var loadedInstruments = {};
	var audioBuffers = {};
	var audioLoader = function (instrument, urlList, index, bufferList, callback) {
	  if (loadedInstruments[instrument]) {
	    // already loaded, so just skip ahead
	    return callback(instrument);
	  }

		var synth = MIDI.GeneralMIDI.byName[instrument];
		var instrumentId = synth.number;
		var url = urlList[index];
		if (!MIDI.Soundfont[instrument][url]) { // missing soundfont
			return callback(instrument);
		}
		var base64 = MIDI.Soundfont[instrument][url].split(",")[1];
		var buffer = Base64Binary.decodeArrayBuffer(base64);
		ctx.decodeAudioData(buffer, function (buffer) {
			var msg = url;
			while (msg.length < 3) msg += "&nbsp;";
			if (typeof (MIDI.loader) !== "undefined") {
				MIDI.loader.update(null, "Loading '" + synth.instrument + "'", index / 87 * 100 >> 0);
			}
			buffer.id = url;
			bufferList[index] = buffer;
			//
			if (bufferList.length === urlList.length) {
				while (bufferList.length) {
					buffer = bufferList.pop();
					if (!buffer) continue;
					var nodeId = MIDI.keyToNote[buffer.id];
					audioBuffers[instrumentId + "" + nodeId] = buffer;
				}
				loadedInstruments[instrument] = true;
				callback(instrument);
			}
		});
	};

	root.setVolume = function (channel, volume) {
	  if (channel === -1) {
	    master.gain.value = volume / 127;
	  }
	  else {
		  masterVolume = volume;
	  }
	};

	root.programChange = function (channel, program) {
		MIDI.channels[channel].instrument = program;
	};

	root.noteOn = function (channel, note, velocity, delay) {
		/// check whether the note exists
		if (!MIDI.channels[channel]) return;
		var instrument = MIDI.channels[channel].instrument;
		if (!audioBuffers[instrument + "" + note]) return;
		/// convert relative delay to absolute delay
		if (delay < ctx.currentTime) delay += ctx.currentTime;
		/// crate audio buffer
		var source = ctx.createBufferSource();
		sources[channel + "" + note] = source;
		source.buffer = audioBuffers[instrument + "" + note];
		source.connect(master);
		///
		if (ctx.createGain) { // firefox
			source.gainNode = ctx.createGain();
		} else { // chrome
			source.gainNode = ctx.createGainNode();
		}
		var value = (velocity / 127) * (masterVolume / 127) * 2 - 1;
		source.gainNode.connect(master);
		source.gainNode.gain.value = Math.max(-1, value);
		source.connect(source.gainNode);
		if (source.noteOn) { // old api
			source.noteOn(delay || 0);
		} else { // new api
			source.start(delay || 0);
		}
		return source;
	};

	root.noteOff = function (channel, note, delay) {
		delay = delay || 0;
		if (delay < ctx.currentTime) delay += ctx.currentTime;
		var source = sources[channel + "" + note];
		if (!source) return;
		if (source.gainNode) {
			// @Miranet: "the values of 0.2 and 0.3 could ofcourse be used as
			// a 'release' parameter for ADSR like time settings."
			// add { "metadata": { release: 0.3 } } to soundfont files
			var gain = source.gainNode.gain;
			gain.linearRampToValueAtTime(gain.value, delay);
			gain.linearRampToValueAtTime(-1, delay + 0.2);
		}
		if (source.noteOff) { // old api
			source.noteOff(delay + 0.3);
		} else {
			source.stop(delay + 0.3);
		}
		///
		delete sources[channel + "" + note];
	};

	root.chordOn = function (channel, chord, velocity, delay) {
		var ret = {}, note;
		for (var n = 0, length = chord.length; n < length; n++) {
			ret[note = chord[n]] = root.noteOn(channel, note, velocity, delay);
		}
		return ret;
	};

	root.chordOff = function (channel, chord, delay) {
		var ret = {}, note;
		for (var n = 0, length = chord.length; n < length; n++) {
			ret[note = chord[n]] = root.noteOff(channel, note, delay);
		}
		return ret;
	};

    root.stopAllNotes = function () {
        for (var source in sources) {
            var delay = 0;
            if (delay < ctx.currentTime) delay += ctx.currentTime;
            // @Miranet: "the values of 0.2 and 0.3 could ofcourse be used as
            // a 'release' parameter for ADSR like time settings."
            // add { "metadata": { release: 0.3 } } to soundfont files
            sources[source].gain.linearRampToValueAtTime(1, delay);
            sources[source].gain.linearRampToValueAtTime(0, delay + 0.2);
            sources[source].noteOff(delay + 0.3);
            delete sources[source];
        }
    };

	root.connect = function (conf) {
		setPlugin(root);
		//
		MIDI.Player.ctx = ctx = new AudioContext();
		master = ctx.createGain();
    master.connect(ctx.destination);
		master.gain.value = 1;
		///
		var urlList = [];
		var keyToNote = MIDI.keyToNote;
		for (var key in keyToNote) urlList.push(key);
		var bufferList = [];
		var pending = {};
		var oncomplete = function(instrument) {
			delete pending[instrument];
			for (var key in pending) break;
			if (!key) conf.callback();
		};
		for (var instrument in MIDI.Soundfont) {
			pending[instrument] = true;
			for (var i = 0; i < urlList.length; i++) {
				audioLoader(instrument, urlList, i, bufferList, oncomplete);
			}
		}
	};
})();

/*
	--------------------------------------------
	AudioTag <audio> - OGG or MPEG Soundbank
	--------------------------------------------
	http://dev.w3.org/html5/spec/Overview.html#the-audio-element
	--------------------------------------------
*/

if (window.Audio) (function () {

	var root = MIDI.AudioTag = {
		api: "audiotag"
	};
	var note2id = {};
	var volume = 127; // floating point
	var channel_nid = -1; // current channel
	var channels = []; // the audio channels
	var channelInstrumentNoteIds = []; // instrumentId + noteId that is currently playing in each 'channel', for routing noteOff/chordOff calls
	var notes = {}; // the piano keys
	for (var nid = 0; nid < 12; nid++) {
		channels[nid] = new Audio();
	}

	var playChannel = function (channel, note) {
		if (!MIDI.channels[channel]) return;
		var instrument = MIDI.channels[channel].instrument;
		var instrumentId = MIDI.GeneralMIDI.byId[instrument].id;
		var note = notes[note];
		if (!note) return;
		var instrumentNoteId = instrumentId + "" + note.id;
		var nid = (channel_nid + 1) % channels.length;
		var audio = channels[nid];
		channelInstrumentNoteIds[ nid ] = instrumentNoteId;
		audio.src = MIDI.Soundfont[instrumentId][note.id];
		audio.volume = volume / 127;
		audio.play();
		channel_nid = nid;
	};

	var stopChannel = function (channel, note) {
		if (!MIDI.channels[channel]) return;
		var instrument = MIDI.channels[channel].instrument;
		var instrumentId = MIDI.GeneralMIDI.byId[instrument].id;
		var note = notes[note];
		if (!note) return;
		var instrumentNoteId = instrumentId + "" + note.id;

		for(var i=0;i<channels.length;i++){
			var nid = (i + channel_nid + 1) % channels.length;
			var cId = channelInstrumentNoteIds[nid];

			if(cId && cId == instrumentNoteId){
				channels[nid].pause();
				channelInstrumentNoteIds[nid] = null;
				return;
			}
		}
	};

	root.programChange = function (channel, program) {
		MIDI.channels[channel].instrument = program;
	};

	root.setVolume = function (channel, n) {
		volume = n; //- should be channel specific volume
	};

	root.noteOn = function (channel, note, velocity, delay) {
		var id = note2id[note];
		if (!notes[id]) return;
		if (delay) {
			return window.setTimeout(function () {
				playChannel(channel, id);
			}, delay * 1000);
		} else {
			playChannel(channel, id);
		}
	};

	root.noteOff = function (channel, note, delay) {
		var id = note2id[note];
		if (!notes[id]) return;
		if (delay) {
			return setTimeout(function() {
				stopChannel(channel, id);
			}, delay * 1000)
		} else {
			stopChannel(channel, id);
		}
	};

	root.chordOn = function (channel, chord, velocity, delay) {
		for (var idx = 0; idx < chord.length; idx ++) {
			var n = chord[idx];
			var id = note2id[n];
			if (!notes[id]) continue;
			if (delay) {
				return window.setTimeout(function () {
					playChannel(channel, id);
				}, delay * 1000);
			} else {
				playChannel(channel, id);
			}
		}
	};

	root.chordOff = function (channel, chord, delay) {
		for (var idx = 0; idx < chord.length; idx ++) {
			var n = chord[idx];
			var id = note2id[n];
			if (!notes[id]) continue;
			if (delay) {
				return window.setTimeout(function () {
					stopChannel(channel, id);
				}, delay * 1000);
			} else {
				stopChannel(channel, id);
			}
		}
	};

	root.stopAllNotes = function () {
		for (var nid = 0, length = channels.length; nid < length; nid++) {
			channels[nid].pause();
		}
	};

	root.connect = function (conf) {
		for (var key in MIDI.keyToNote) {
			note2id[MIDI.keyToNote[key]] = key;
			notes[key] = {
				id: key
			};
		}
		setPlugin(root);
		///
		if (conf.callback) conf.callback();
	};
})();

/*
	--------------------------------------------
	Flash - MP3 Soundbank
	--------------------------------------------
	http://www.schillmania.com/projects/soundmanager2/
	--------------------------------------------
*/

(function () {

	var root = MIDI.Flash = {
		api: "flash"
	};
	var noteReverse = {};
	var notes = {};

	root.programChange = function (channel, program) {
		MIDI.channels[channel].instrument = program;
	};

	root.setVolume = function (channel, note) {

	};

	root.noteOn = function (channel, note, velocity, delay) {
		if (!MIDI.channels[channel]) return;
		var instrument = MIDI.channels[channel].instrument;
		var id = MIDI.GeneralMIDI.byId[instrument].number;
		note = id + "" + noteReverse[note];
		if (!notes[note]) return;
		if (delay) {
			return window.setTimeout(function() {
				notes[note].play({ volume: velocity * 2 });
			}, delay * 1000);
		} else {
			notes[note].play({ volume: velocity * 2 });
		}
	};

	root.noteOff = function (channel, note, delay) {

	};

	root.chordOn = function (channel, chord, velocity, delay) {
		if (!MIDI.channels[channel]) return;
		var instrument = MIDI.channels[channel].instrument;
		var id = MIDI.GeneralMIDI.byId[instrument].number;
		for (var key in chord) {
			var n = chord[key];
			var note = id + "" + noteReverse[n];
			if (notes[note]) {
				notes[note].play({ volume: velocity * 2 });
			}
		}
	};

	root.chordOff = function (channel, chord, delay) {

	};

	root.stopAllNotes = function () {

	};

	root.connect = function (instruments, conf) {
		soundManager.flashVersion = 9;
		soundManager.useHTML5Audio = true;
		soundManager.url = conf.soundManagerSwfUrl || '../inc/SoundManager2/swf/';
		soundManager.useHighPerformance = true;
		soundManager.wmode = 'transparent';
		soundManager.flashPollingInterval = 1;
		soundManager.debugMode = false;
		soundManager.onload = function () {
			var createBuffer = function(instrument, id, onload) {
				var synth = MIDI.GeneralMIDI.byName[instrument];
				var instrumentId = synth.number;
				notes[instrumentId+""+id] = soundManager.createSound({
					id: id,
					url: MIDI.soundfontUrl + instrument + "-mp3/" + id + ".mp3",
					multiShot: true,
					autoLoad: true,
					onload: onload
				});
			};
			var loaded = [];
			var samplesPerInstrument = 88;
			var samplesToLoad = instruments.length * samplesPerInstrument;

			for (var i = 0; i < instruments.length; i++) {
				var instrument = instruments[i];
				var onload = function () {
					loaded.push(this.sID);
					if (typeof (MIDI.loader) === "undefined") return;
					MIDI.loader.update(null, "Processing: " + this.sID);
				};
				for (var j = 0; j < samplesPerInstrument; j++) {
					var id = noteReverse[j + 21];
					createBuffer(instrument, id, onload);
				}
			}
			///
			setPlugin(root);
			//
			var interval = window.setInterval(function () {
				if (loaded.length < samplesToLoad) return;
				window.clearInterval(interval);
				if (conf.callback) conf.callback();
			}, 25);
		};
		soundManager.onerror = function () {

		};
		for (var key in MIDI.keyToNote) {
			noteReverse[MIDI.keyToNote[key]] = key;
		}
	};
})();

/*
	helper functions
*/

// instrument-tracker
MIDI.GeneralMIDI = (function (arr) {
	var clean = function(v) {
		return v.replace(/[^a-z0-9 ]/gi, "").replace(/[ ]/g, "_").toLowerCase();
	};
	var ret = {
		byName: {},
		byId: {},
		byCategory: {}
	};
	for (var key in arr) {
		var list = arr[key];
		for (var n = 0, length = list.length; n < length; n++) {
			var instrument = list[n];
			if (!instrument) continue;
			var num = parseInt(instrument.substr(0, instrument.indexOf(" ")), 10);
			instrument = instrument.replace(num + " ", "");
			ret.byId[--num] =
			ret.byName[clean(instrument)] =
			ret.byCategory[clean(key)] = {
				id: clean(instrument),
				instrument: instrument,
				number: num,
				category: key
			};
		}
	}
	return ret;
})({
	'Piano': ['1 Acoustic Grand Piano', '2 Bright Acoustic Piano', '3 Electric Grand Piano', '4 Honky-tonk Piano', '5 Electric Piano 1', '6 Electric Piano 2', '7 Harpsichord', '8 Clavinet'],
	'Chromatic Percussion': ['9 Celesta', '10 Glockenspiel', '11 Music Box', '12 Vibraphone', '13 Marimba', '14 Xylophone', '15 Tubular Bells', '16 Dulcimer'],
	'Organ': ['17 Drawbar Organ', '18 Percussive Organ', '19 Rock Organ', '20 Church Organ', '21 Reed Organ', '22 Accordion', '23 Harmonica', '24 Tango Accordion'],
	'Guitar': ['25 Acoustic Guitar (nylon)', '26 Acoustic Guitar (steel)', '27 Electric Guitar (jazz)', '28 Electric Guitar (clean)', '29 Electric Guitar (muted)', '30 Overdriven Guitar', '31 Distortion Guitar', '32 Guitar Harmonics'],
	'Bass': ['33 Acoustic Bass', '34 Electric Bass (finger)', '35 Electric Bass (pick)', '36 Fretless Bass', '37 Slap Bass 1', '38 Slap Bass 2', '39 Synth Bass 1', '40 Synth Bass 2'],
	'Strings': ['41 Violin', '42 Viola', '43 Cello', '44 Contrabass', '45 Tremolo Strings', '46 Pizzicato Strings', '47 Orchestral Harp', '48 Timpani'],
	'Ensemble': ['49 String Ensemble 1', '50 String Ensemble 2', '51 Synth Strings 1', '52 Synth Strings 2', '53 Choir Aahs', '54 Voice Oohs', '55 Synth Choir', '56 Orchestra Hit'],
	'Brass': ['57 Trumpet', '58 Trombone', '59 Tuba', '60 Muted Trumpet', '61 French Horn', '62 Brass Section', '63 Synth Brass 1', '64 Synth Brass 2'],
	'Reed': ['65 Soprano Sax', '66 Alto Sax', '67 Tenor Sax', '68 Baritone Sax', '69 Oboe', '70 English Horn', '71 Bassoon', '72 Clarinet'],
	'Pipe': ['73 Piccolo', '74 Flute', '75 Recorder', '76 Pan Flute', '77 Blown Bottle', '78 Shakuhachi', '79 Whistle', '80 Ocarina'],
	'Synth Lead': ['81 Lead 1 (square)', '82 Lead 2 (sawtooth)', '83 Lead 3 (calliope)', '84 Lead 4 (chiff)', '85 Lead 5 (charang)', '86 Lead 6 (voice)', '87 Lead 7 (fifths)', '88 Lead 8 (bass + lead)'],
	'Synth Pad': ['89 Pad 1 (new age)', '90 Pad 2 (warm)', '91 Pad 3 (polysynth)', '92 Pad 4 (choir)', '93 Pad 5 (bowed)', '94 Pad 6 (metallic)', '95 Pad 7 (halo)', '96 Pad 8 (sweep)'],
	'Synth Effects': ['97 FX 1 (rain)', '98 FX 2 (soundtrack)', '99 FX 3 (crystal)', '100 FX 4 (atmosphere)', '101 FX 5 (brightness)', '102 FX 6 (goblins)', '103 FX 7 (echoes)', '104 FX 8 (sci-fi)'],
	'Ethnic': ['105 Sitar', '106 Banjo', '107 Shamisen', '108 Koto', '109 Kalimba', '110 Bagpipe', '111 Fiddle', '112 Shanai'],
	'Percussive': ['113 Tinkle Bell', '114 Agogo', '115 Steel Drums', '116 Woodblock', '117 Taiko Drum', '118 Melodic Tom', '119 Synth Drum'],
	'Sound effects': ['120 Reverse Cymbal', '121 Guitar Fret Noise', '122 Breath Noise', '123 Seashore', '124 Bird Tweet', '125 Telephone Ring', '126 Helicopter', '127 Applause', '128 Gunshot']
});

// channel-tracker
MIDI.channels = (function () { // 0 - 15 channels
	var channels = {};
	for (var n = 0; n < 16; n++) {
		channels[n] = { // default values
			instrument: 0,
			// Acoustic Grand Piano
			mute: false,
			mono: false,
			omni: false,
			solo: false
		};
	}
	return channels;
})();

//
MIDI.pianoKeyOffset = 21;

// note conversions
MIDI.keyToNote = {}; // C8  == 108
MIDI.noteToKey = {}; // 108 ==  C8
(function () {
	var A0 = 0x15; // first note
	var C8 = 0x6C; // last note
	var number2key = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
	for (var n = A0; n <= C8; n++) {
		var octave = (n - 12) / 12 >> 0;
		var name = number2key[n % 12] + octave;
		MIDI.keyToNote[name] = n;
		MIDI.noteToKey[n] = name;
	}
})();

})();
/*
	-------------------------------------
	MIDI.Player : 0.3
	-------------------------------------
	https://github.com/mudcube/MIDI.js
	-------------------------------------
	#jasmid
	-------------------------------------
*/

if (typeof (MIDI) === "undefined") var MIDI = {};
if (typeof (MIDI.Player) === "undefined") MIDI.Player = {};

(function() { "use strict";

var root = MIDI.Player;
root.callback = undefined; // your custom callback goes here!
root.currentTime = 0;
root.endTime = 0;
root.restart = 0;
root.playing = false;
root.timeWarp = 1;

//
root.start =
root.resume = function () {
	if (root.currentTime < -1) root.currentTime = -1;
	startAudio(root.currentTime);
};

root.pause = function () {
	var tmp = root.restart;
	stopAudio();
	root.restart = tmp;
};

root.stop = function () {
	stopAudio();
	root.restart = 0;
	root.currentTime = 0;
};

root.addListener = function(callback) {
	onMidiEvent = callback;
};

root.removeListener = function() {
	onMidiEvent = undefined;
};

root.clearAnimation = function() {
	if (root.interval)  {
		window.clearInterval(root.interval);
	}
};

root.setAnimation = function(config) {
	var callback = (typeof(config) === "function") ? config : config.callback;
	var interval = config.interval || 30;
	var currentTime = 0;
	var tOurTime = 0;
	var tTheirTime = 0;
	//
	root.clearAnimation();
	root.interval = window.setInterval(function () {
		if (root.endTime === 0) return;
		if (root.playing) {
			currentTime = (tTheirTime === root.currentTime) ? tOurTime - (new Date).getTime() : 0;
			if (root.currentTime === 0) {
				currentTime = 0;
			} else {
				currentTime = root.currentTime - currentTime;
			}
			if (tTheirTime !== root.currentTime) {
				tOurTime = (new Date).getTime();
				tTheirTime = root.currentTime;
			}
		} else { // paused
			currentTime = root.currentTime;
		}
		var endTime = root.endTime;
		var percent = currentTime / endTime;
		var total = currentTime / 1000;
		var minutes = total / 60;
		var seconds = total - (minutes * 60);
		var t1 = minutes * 60 + seconds;
		var t2 = (endTime / 1000);
		if (t2 - t1 < -1) return;
		callback({
			now: t1,
			end: t2,
			events: noteRegistrar
		});
	}, interval);
};

// helpers

root.loadMidiFile = function() { // reads midi into javascript array of events
	root.replayer = new Replayer(MidiFile(root.currentData), root.timeWarp);
	root.data = root.replayer.getData();
	root.endTime = getLength();
};

root.loadFile = function (file, callback) {
	root.stop();
	if (file.indexOf("base64,") !== -1) {
		var data = window.atob(file.split(",")[1]);
		root.currentData = data;
		root.loadMidiFile();
		if (callback) callback(data);
		return;
	}
	///
	var fetch = new XMLHttpRequest();
	fetch.open('GET', file);
	fetch.overrideMimeType("text/plain; charset=x-user-defined");
	fetch.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			var t = this.responseText || "";
			var ff = [];
			var mx = t.length;
			var scc = String.fromCharCode;
			for (var z = 0; z < mx; z++) {
				ff[z] = scc(t.charCodeAt(z) & 255);
			}
			var data = ff.join("");
			root.currentData = data;
			root.loadMidiFile();
			if (callback) callback(data);
		}
	};
	fetch.send();
};

// Playing the audio

var eventQueue = []; // hold events to be triggered
var queuedTime; //
var startTime = 0; // to measure time elapse
var noteRegistrar = {}; // get event for requested note
var onMidiEvent = undefined; // listener callback
var scheduleTracking = function (channel, note, currentTime, offset, message, velocity) {
	var interval = window.setTimeout(function () {
		var data = {
			channel: channel,
			note: note,
			now: currentTime,
			end: root.endTime,
			message: message,
			velocity: velocity
		};
		//
		if (message === 128) {
			delete noteRegistrar[note];
		} else {
			noteRegistrar[note] = data;
		}
		if (onMidiEvent) {
			onMidiEvent(data);
		}
		root.currentTime = currentTime;
		if (root.currentTime === queuedTime && queuedTime < root.endTime) { // grab next sequence
			startAudio(queuedTime, true);
		}
	}, currentTime - offset);
	return interval;
};

var getContext = function() {
	if (MIDI.lang === 'WebAudioAPI') {
		return MIDI.Player.ctx;
	} else if (!root.ctx) {
		root.ctx = { currentTime: 0 };
	}
	return root.ctx;
};

var getLength = function() {
	var data =  root.data;
	var length = data.length;
	var totalTime = 0.5;
	for (var n = 0; n < length; n++) {
		totalTime += data[n][1];
	}
	return totalTime;
};

var startAudio = function (currentTime, fromCache) {
	if (!root.replayer) return;
	if (!fromCache) {
		if (typeof (currentTime) === "undefined") currentTime = root.restart;
		if (root.playing) stopAudio();
		root.playing = true;
		root.data = root.replayer.getData();
		root.endTime = getLength();
	}
	var note;
	var offset = 0;
	var messages = 0;
	var data = root.data;
	var ctx = getContext();
	var length = data.length;
	//
	queuedTime = 0.5;
	startTime = ctx.currentTime;
	//
	for (var n = 0; n < length && messages < 100; n++) {
		queuedTime += data[n][1];
		if (queuedTime < currentTime) {
			offset = queuedTime;
			continue;
		}
		currentTime = queuedTime - offset;
		var event = data[n][0].event;
		if (event.type !== "channel") continue;
		var channel = event.channel;
		switch (event.subtype) {
			case 'noteOn':
				if (MIDI.channels[channel].mute) break;
				note = event.noteNumber - (root.MIDIOffset || 0);
				eventQueue.push({
					event: event,
					source: MIDI.noteOn(channel, event.noteNumber, event.velocity, currentTime / 1000 + ctx.currentTime),
					interval: scheduleTracking(channel, note, queuedTime, offset, 144, event.velocity)
				});
				messages ++;
				break;
			case 'noteOff':
				if (MIDI.channels[channel].mute) break;
				note = event.noteNumber - (root.MIDIOffset || 0);
				eventQueue.push({
					event: event,
					source: MIDI.noteOff(channel, event.noteNumber, currentTime / 1000 + ctx.currentTime),
					interval: scheduleTracking(channel, note, queuedTime, offset, 128)
				});
				break;
			case 'programChange':
			  MIDI.programChange(channel, event.programNumber);
			  break;
			default:
				break;
		}
	}
};

var stopAudio = function () {
	var ctx = getContext();
	root.playing = false;
	root.restart += (ctx.currentTime - startTime) * 1000;
	// stop the audio, and intervals
	while (eventQueue.length) {
		var o = eventQueue.pop();
		window.clearInterval(o.interval);
		if (!o.source) continue; // is not webaudio
		if (typeof(o.source) === "number") {
			window.clearTimeout(o.source);
		} else { // webaudio
			o.source.disconnect(0);
		}
	}
	// run callback to cancel any notes still playing
	for (var key in noteRegistrar) {
		var o = noteRegistrar[key]
		if (noteRegistrar[key].message === 144 && onMidiEvent) {
			onMidiEvent({
				channel: o.channel,
				note: o.note,
				now: o.now,
				end: o.end,
				message: 128,
				velocity: o.velocity
			});
		}
	}
	// reset noteRegistrar
	noteRegistrar = {};
};

})();
/*

	DOMLoader.XMLHttp
	--------------------------
	DOMLoader.sendRequest({
		url: "./dir/something.extension",
		data: "test!",
		onerror: function(event) {
			console.log(event);
		},
		onload: function(response) {
			console.log(response.responseText);
		}, 
		onprogress: function (event) {
			var percent = event.loaded / event.total * 100 >> 0;
			loader.message("loading: " + percent + "%");
		}
	});
	
*/

if (typeof(DOMLoader) === "undefined") var DOMLoader = {};

// Add XMLHttpRequest when not available

if (typeof (XMLHttpRequest) === "undefined") {
	var XMLHttpRequest;
	(function () { // find equivalent for IE
		var factories = [
		function () {
			return new ActiveXObject("Msxml2.XMLHTTP")
		}, function () {
			return new ActiveXObject("Msxml3.XMLHTTP")
		}, function () {
			return new ActiveXObject("Microsoft.XMLHTTP")
		}];
		for (var i = 0; i < factories.length; i++) {
			try {
				factories[i]();
			} catch (e) {
				continue;
			}
			break;
		}
		XMLHttpRequest = factories[i];
	})();
}

if (typeof ((new XMLHttpRequest()).responseText) === "undefined") {
	// http://stackoverflow.com/questions/1919972/how-do-i-access-xhr-responsebody-for-binary-data-from-javascript-in-ie
    var IEBinaryToArray_ByteStr_Script =
    "<!-- IEBinaryToArray_ByteStr -->\r\n"+
    "<script type='text/vbscript'>\r\n"+
    "Function IEBinaryToArray_ByteStr(Binary)\r\n"+
    "   IEBinaryToArray_ByteStr = CStr(Binary)\r\n"+
    "End Function\r\n"+
    "Function IEBinaryToArray_ByteStr_Last(Binary)\r\n"+
    "   Dim lastIndex\r\n"+
    "   lastIndex = LenB(Binary)\r\n"+
    "   if lastIndex mod 2 Then\r\n"+
    "       IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n"+
    "   Else\r\n"+
    "       IEBinaryToArray_ByteStr_Last = "+'""'+"\r\n"+
    "   End If\r\n"+
    "End Function\r\n"+
    "<\/script>\r\n";

	// inject VBScript
	document.write(IEBinaryToArray_ByteStr_Script);

	DOMLoader.sendRequest = function(conf) {
		// helper to convert from responseBody to a "responseText" like thing
		function getResponseText(binary) {
			var byteMapping = {};
			for (var i = 0; i < 256; i++) {
				for (var j = 0; j < 256; j++) {
					byteMapping[String.fromCharCode(i + j * 256)] = String.fromCharCode(i) + String.fromCharCode(j);
				}
			}
			// call into VBScript utility fns
			var rawBytes = IEBinaryToArray_ByteStr(binary);
			var lastChr = IEBinaryToArray_ByteStr_Last(binary);
			return rawBytes.replace(/[\s\S]/g, function (match) {
				return byteMapping[match];
			}) + lastChr;
		};
		//
		var req = XMLHttpRequest();
		req.open("GET", conf.url, true);
		if (conf.responseType) req.responseType = conf.responseType;
		if (conf.onerror) req.onerror = conf.onerror;
		if (conf.onprogress) req.onprogress = conf.onprogress;
		req.onreadystatechange = function (event) {
			if (req.readyState === 4) {
				if (req.status === 200) {
					req.responseText = getResponseText(req.responseBody);
				} else {
					req = false;
				}
				if (conf.onload) conf.onload(req);
			}
		};
		req.setRequestHeader("Accept-Charset", "x-user-defined");
		req.send(null);
		return req;
	}
} else {
	DOMLoader.sendRequest = function(conf) {
		var req = new XMLHttpRequest();
		req.open(conf.data ? "POST" : "GET", conf.url, true);
		if (req.overrideMimeType) req.overrideMimeType("text/plain; charset=x-user-defined");
		if (conf.data) req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		if (conf.responseType) req.responseType = conf.responseType;
		if (conf.onerror) req.onerror = conf.onerror;
		if (conf.onprogress) req.onprogress = conf.onprogress;
		req.onreadystatechange = function (event) {
			if (req.readyState === 4) {
				if (req.status !== 200 && req.status != 304) {
					if (conf.onerror) conf.onerror(event, false);
					return;
				}
				if (conf.onload) {
					conf.onload(req);
				}
			}
		};
		req.send(conf.data);
		return req;
	};
};
(function() {
  var POLYMER_READY = false;
  var initialFile = window.FILE;

  var loadFile = function(file) {
    document.getElementById('app').file = file;
  };

  window.addEventListener('polymer-ready', function(e) {
    POLYMER_READY = true;

    var toast = document.getElementById('toast');

    MIDI.loader = {
      message: function(message) {
        toast.text = message;
        toast.show();
      },

      update: function(id, message, percent) {
        this.message(message + ': ' + percent + '%');
      },

      stop: function() {

      }
    };

    loadFile(initialFile);
  });

  window.setFile = function(file) {
    if (POLYMER_READY) {
      loadFile(file);
    }
    else {
      initialFile = file;
    }
  };
})();