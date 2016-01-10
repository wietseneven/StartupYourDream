!function(){"use strict";/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */
function e(t,o){function a(e,t){return function(){return e.apply(t,arguments)}}var i;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=t,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!e.notNeeded(t)){for(var r=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],s=this,c=0,l=r.length;l>c;c++)s[r[c]]=a(s[r[c]],s);n&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,o){var a=Node.prototype.removeEventListener;"click"===e?a.call(t,e,n.hijacked||n,o):a.call(t,e,n,o)},t.addEventListener=function(e,n,o){var a=Node.prototype.addEventListener;"click"===e?a.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),o):a.call(t,e,n,o)}),"function"==typeof t.onclick&&(i=t.onclick,t.addEventListener("click",function(e){i(e)},!1),t.onclick=null)}}var t=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!t,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,a=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),i=o&&/OS [6-7]_\d/.test(navigator.userAgent),r=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(o&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,o;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),o=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){return n&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(e){var t;o&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,n,i;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],o){if(i=window.getSelection(),i.rangeCount&&!i.isCollapsed)return!0;if(!a){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1},e.prototype.onTouchMove=function(e){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},e.prototype.findControl=function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,r,s,c,l,u=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,r=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,i&&(l=e.changedTouches[0],u=document.elementFromPoint(l.pageX-window.pageXOffset,l.pageY-window.pageYOffset)||u,u.fastClickScrollParent=this.targetElement.fastClickScrollParent),s=u.tagName.toLowerCase(),"label"===s){if(t=this.findControl(u)){if(this.focus(u),n)return!1;u=t}}else if(this.needsFocus(u))return e.timeStamp-r>100||o&&window.top!==window&&"input"===s?(this.targetElement=null,!1):(this.focus(u),this.sendClick(u,e),o&&"select"===s||(this.targetElement=null,e.preventDefault()),!1);return o&&!a&&(c=u.fastClickScrollParent,c&&c.fastClickLastScrollTop!==c.scrollTop)?!0:(this.needsClick(u)||(e.preventDefault(),this.sendClick(u,e)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;n&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,o,a,i;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(r&&(a=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),a[1]>=10&&a[2]>=3&&(t=document.querySelector("meta[name=viewport]")))){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===e.style.msTouchAction||"manipulation"===e.style.touchAction?!0:(i=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],i>=27&&(t=document.querySelector("meta[name=viewport]"),t&&(-1!==t.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===e.style.touchAction||"manipulation"===e.style.touchAction?!0:!1)},e.attach=function(t,n){return new e(t,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.FastClick=e):window.FastClick=e}();var interact={user:{check:function(e){console.log(e),$.post("https://app.wathebikaande.eu/api/request.php",{type:"user",authCode:e},function(e,t){return alert(e+"\n"+t),e})}}},keypad={el:{},keys:{key:"",typed:0},commingFrom:"",callback:"",setup:function(e,t){console.log("initiated keypad"),keypad.commingFrom=function(){"stage"+e.stage.setup()},keypad.callback=t,keypad.renderKeypad(e)},renderKeypad:function(e){app.getTemplate("keypad",function(t){console.log("rendering keypad template");var n={};if(e.fadeIn&&(n.hidden=!0),app.el.template.html(t(n)),keypad.assignSelectors(),keypad.watchKeys(),e.fadeIn){var o=0;keypad.el.keys.addClass("hidden"),keypad.el.keys.each(function(){var e=$(this);setTimeout(function(){e.removeClass("hidden")},10*o),o++}),keypad.el.keypad.fadeIn("fast")}})},assignSelectors:function(){keypad.el.keypad=$(".keypad"),keypad.el.keys=$(".keypad .key"),keypad.el.resultBox=$(".keypad .result")},watchKeys:function(){console.log("watching keypad keys"),keypad.el.keys.click(function(){var e=$(this),t=e.data("num");console.log("pressed key "+t),keypad.handleKeyPress(t),3===keypad.keys.typed&&(console.log("3 characters entered, check if user can continue"),keypad.handleSubmit())})},handleKeyPress:function(e){console.log("handling key "+e),keypad.ifUndo(e)?keypad.undoNumber():keypad.ifCancel(e)?keypad.el.keypad.fadeOut("fast",function(){keypad.commingFrom()}):keypad.newNumber(e)},ifUndo:function(e){return"undo"===e},ifCancel:function(e){return"cancel"===e},undoNumber:function(){console.log("Undoing last keypress"),keypad.keys.typed>0&&(keypad.keys.typed--,keypad.keys.key=keypad.keys.key.substring(0,keypad.keys.key.length-1),keypad.el.resultBox.children().last().remove())},newNumber:function(e){keypad.keys.typed<3&&(console.log("Adding new number"),keypad.el.resultBox.append("<span>"+e+"</span>"),keypad.keys.key+=e,keypad.keys.typed++)},hideKeys:function(){var e=0;keypad.el.keys.each(function(){var t=$(this);setTimeout(function(){t.addClass("hidden")},10*e),e++})},handleSubmit:function(){keypad.hideKeys(),keypad.el.resultBox.addClass("loading");var e=interact.user.check(keypad.keys.key);keypad.callback&&keypad.callback(e)},quit:function(){keypad.el.keypad.fadeOut("fast")}},video={el:{},setup:function(e){video.el.video=document.getElementById(e),video.click(),video.el.playBtn=$("#play"),video.el.pauseBtn=$("#pause"),video.el.replayBtn=$("#replay"),video.el.cta=$(".belowPopup")},click:function(){var e=null!==document.ontouchstart?"click":"touchstart",t=video.el.video;t.addEventListener(e,function(){video.el.replayBtn.fadeOut(),video.el.cta.fadeOut(),1==t.paused?(console.log("videoIsPaused"),video.el.pauseBtn.fadeOut(),video.el.playBtn.fadeIn().delay(300).fadeOut(),t.play()):(console.log("videoIsPlaying"),video.el.pauseBtn.fadeIn(),t.pause())}),t.addEventListener("ended",function(){video.el.replayBtn.fadeIn(),video.el.cta.fadeIn()},!1)}},map={el:{},setup:function(){app.getTemplate("map",function(e){app.el.template.append(e),map.setSelectors(),map.setSizes()})},setSelectors:function(){map.el.map=$("#map")},setSizes:function(){var e=$(window).width(),t=$(window).height();map.el.map.width(e).height(t).attr({width:2*e,height:2*t})}},stages={setup:function(){stages.selectStage()},selectStage:function(){var e=app.getParameters().stage;switch(e=Number(e)){case 1:console.log("It's in stage 1"),stage1.setup();break;case 2:console.log("It's in stage 2"),stage2.setup();break;default:console.log("This stage is not defined"),app.error('Deze stage bestaat nog niet <br><a href="?stage=1">Stage 1</a><br><a href="three.html">Three.html</a>')}}},stage1={setup:function(){console.log("Setting up stage 1"),stage1.setWelcomeScreen()},setWelcomeScreen:function(){app.getTemplate("popup",function(e){console.log("rendering keypad template");var t={title:"Startup your dream",body:"Welkom bij The European Startup Factory!",button:{text:"START JE STARTUP",action:"stage1.setLogin()"},overlay:!1};app.el.template.html(e(t))})},setLogin:function(){app.el.template.children().fadeOut("fast",function(){keypad.setup({fadeIn:!0,stage:stage1},function(){keypad.quit(),setTimeout(function(){stage1.setIntroduction()},500)})})},setIntroduction:function(e){app.getTemplate("popup",function(e){var t={video:!0,id:"welcomeVideo",videoSrc:"stage1/rabit.mp4",button:{text:"Ga door naar de volgende koffer",action:"window.location.reload()"}};app.el.template.hide(),app.el.template.html(e(t)),app.el.template.fadeIn(),video.setup("welcomeVideo")})}},stage2={setup:function(){console.log("Setting up stage 1"),stage2.setLogin()},setLogin:function(){app.el.template.children().fadeOut("fast",function(){keypad.setup({fadeIn:!0,stage:stage2},function(){keypad.quit(),setTimeout(function(){stage2.setMap()},500)})})},setMap:function(){map.setup()}},app={el:{template:$("#template")},templateRoot:"views/templates/",setup:function(){app.disableScroll(),app.enableFastClick(),stages.setup()},disableScroll:function(){document.ontouchmove=function(e){e.preventDefault()}},enableFastClick:function(){FastClick.attach(document.body)},getTemplate:function(e,t){var n,o;$.ajax({url:app.templateRoot+e+".html",success:function(e){n=e,o=Handlebars.compile(n),t&&t(o)},error:function(e){var t="Template kan niet geladen worden: ";t+=e.statusText,app.error(t)}})},error:function(e){app.getTemplate("popup",function(t){var n={title:"Er ging iets mis",body:e,button:{action:"window.location.reload()",text:"Probeer opnieuw"},overlay:!0};app.el.template.append(t(n))})},getParameters:function(){var e=window.location.search.substr(1);return null!=e&&""!=e?app.transformToAssocArray(e):{}},transformToAssocArray:function(e){for(var t={},n=e.split("&"),o=0;o<n.length;o++){var a=n[o].split("=");t[a[0]]=a[1]}return t},params:function(){return app.getParameters()}};app.setup();
//# sourceMappingURL=./app-min.js.map