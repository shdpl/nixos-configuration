/*
 Apache License, Version 2.0.
*/
var MOVE_COOLDOWN_PERIOD_MS=400,X_KEYCODE=88,nodeCountEl=document.getElementById("node-count"),elementGroup={},elementGroupNames=["query","parent","similar","minimal","results"],nodeCountText=document.createTextNode("0");nodeCountEl.appendChild(nodeCountText);
var lastMoveTimeInMs=0,evaluateQuery=function(){var a={type:"evaluate"};_.each(elementGroup,function(b){var c;"textarea"==b.type?c=b.value&&""!==b.value.trim()?b.value:void 0:"checkbox"==b.type&&(c=b.checked);a[b.id]=c});chrome.runtime.sendMessage(a)},handleRequest=function(a,b,c){"update"===a.type?(null!==a.query&&(elementGroup.query.value=a.query),null!==a.results&&(elementGroup.results.value=a.results[0],nodeCountText.nodeValue=a.results[1])):"analytics"===a.type?_gaq.push(a.data):"setParent"===
a.type&&(elementGroup.parent.value=a.parent,elementGroup.query.value="",evaluateQuery())},handleMouseMove=function(a){a.shiftKey&&(a=(new Date).getTime(),a-lastMoveTimeInMs<MOVE_COOLDOWN_PERIOD_MS||(lastMoveTimeInMs=a,chrome.runtime.sendMessage({type:"moveBar"})))},handleKeyDown=function(a){var b=a.ctrlKey||a.metaKey,c=a.shiftKey;a.keyCode===X_KEYCODE&&b&&c&&chrome.runtime.sendMessage({type:"hideBar"})};document.getElementById("move-button").addEventListener("click",function(){chrome.runtime.sendMessage({type:"moveBar"})});
document.getElementById("get-parent").addEventListener("click",function(){chrome.runtime.sendMessage({type:"getParent"})});document.addEventListener("keydown",handleKeyDown);chrome.runtime.onMessage.addListener(handleRequest);for(var i=0;i<elementGroupNames.length;i++){var elem=document.getElementById(elementGroupNames[i]);"textarea"==elem.type?elem.addEventListener("keyup",evaluateQuery):"checkbox"==elem.type&&elem.addEventListener("click",evaluateQuery);elementGroup[elementGroupNames[i]]=elem}
var _gaq=_gaq||[];_gaq.push(["_setAccount",utilityFn.analyticsID]);_gaq.push(["_trackPageview"]);(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src="https://ssl.google-analytics.com/ga.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})();