function onDeviceReady(){pictureSource=navigator.camera.PictureSourceType,destinationType=navigator.camera.DestinationType}function onPhotoDataSuccess(e){var t=document.getElementById("smallImage");t.style.display="block",t.src="data:image/jpeg;base64,"+e}function onPhotoURISuccess(e){var t=document.getElementById("largeImage");t.style.display="block",t.src=e}function capturePhoto(){navigator.camera.getPicture(onPhotoDataSuccess,onFail,{quality:50,destinationType:destinationType.DATA_URL})}function capturePhotoEdit(){navigator.camera.getPicture(onPhotoDataSuccess,onFail,{quality:20,allowEdit:!0,destinationType:destinationType.DATA_URL})}function getPhoto(e){navigator.camera.getPicture(onPhotoURISuccess,onFail,{quality:50,destinationType:destinationType.FILE_URI,sourceType:e})}function onFail(e){alert("Failed because: "+e)}var interact={user:{check:function(e,t){console.log(e),$.post("https://app.wathebikaande.eu/api/request.php",{type:"user",authCode:e},function(e,a){return t(),e})}}},keypad={el:{},keys:{key:"",typed:0},commingFrom:"",callback:"",setup:function(e,t){console.log("initiated keypad"),keypad.commingFrom=function(){"stage"+e.stage.setup()},keypad.callback=t,keypad.renderKeypad(e)},renderKeypad:function(e){app.getTemplate("keypad",function(t){console.log("rendering keypad template");var a={};if(e.fadeIn&&(a.hidden=!0),app.el.template.html(t(a)),keypad.assignSelectors(),keypad.watchKeys(),e.fadeIn){var n=0;keypad.el.keys.addClass("hidden"),keypad.el.keys.each(function(){var e=$(this);setTimeout(function(){e.removeClass("hidden")},10*n),n++}),keypad.el.keypad.fadeIn("fast")}})},assignSelectors:function(){keypad.el.keypad=$(".keypad"),keypad.el.keys=$(".keypad .key"),keypad.el.resultBox=$(".keypad .result")},watchKeys:function(){console.log("watching keypad keys"),keypad.el.keys.click(function(){var e=$(this),t=e.data("num");console.log("pressed key "+t),keypad.handleKeyPress(t),3===keypad.keys.typed&&(console.log("3 characters entered, check if user can continue"),keypad.handleSubmit())})},handleKeyPress:function(e){console.log("handling key "+e),keypad.ifUndo(e)?keypad.undoNumber():keypad.ifCancel(e)?keypad.el.keypad.fadeOut("fast",function(){keypad.commingFrom()}):keypad.newNumber(e)},ifUndo:function(e){return"undo"===e},ifCancel:function(e){return"cancel"===e},undoNumber:function(){console.log("Undoing last keypress"),keypad.keys.typed>0&&(keypad.keys.typed--,keypad.keys.key=keypad.keys.key.substring(0,keypad.keys.key.length-1),keypad.el.resultBox.children().last().remove())},newNumber:function(e){keypad.keys.typed<3&&(console.log("Adding new number"),keypad.el.resultBox.append("<span>"+e+"</span>"),keypad.keys.key+=e,keypad.keys.typed++)},hideKeys:function(){var e=0;keypad.el.keys.each(function(){var t=$(this);setTimeout(function(){t.addClass("hidden")},10*e),e++})},handleSubmit:function(){keypad.hideKeys(),keypad.el.resultBox.addClass("loading");var e=interact.user.check(keypad.keys.key,function(){keypad.callback&&keypad.callback(e)})},quit:function(){keypad.el.keypad.fadeOut("fast")}},video={el:{},setup:function(e){video.el.video=document.getElementById(e),video.click(),video.el.playBtn=$("#play"),video.el.pauseBtn=$("#pause"),video.el.replayBtn=$("#replay"),video.el.cta=$(".belowPopup")},click:function(){var e=null!==document.ontouchstart?"click":"touchstart",t=video.el.video;t.addEventListener(e,function(){video.el.replayBtn.fadeOut(),video.el.cta.fadeOut(),1==t.paused?(console.log("videoIsPaused"),video.el.pauseBtn.fadeOut(),video.el.playBtn.fadeIn().delay(300).fadeOut(),t.play()):(console.log("videoIsPlaying"),video.el.pauseBtn.fadeIn(),t.pause())}),t.addEventListener("ended",function(){video.el.replayBtn.fadeIn(),video.el.cta.fadeIn()},!1)}},map={el:{},setup:function(){map.loadTemplate()},loadTemplate:function(){app.getTemplate("map",function(e){app.el.template.html(e),map.createMapJSON(),map.el.text=$("#text"),map.el.map=$("#map")})},stateNames:[],createMapJSON:function(){function e(){var e=new ScaleRaphael("map",646,654),s={fill:"#d9d9d9",cursor:"pointer",stroke:c,"stroke-width":1,"stroke-linejoin":"round"},u=[];for(var r in paths){var g=e.path(paths[r].path);g.attr(s),u[g.id]=r,"OFF"==n[g.id]?g.attr({fill:l,cursor:"default"}):(g.attr({fill:o[g.id],d:"300"}),g.mouseout(function(e){this!=k&&this.animate({fill:o[this.id]},500)}),g.click(function(e){var t=map.el.text[0];t.scrollLeft=0,t.scrollTop=0,k&&k.css({fill:o[k.id]}),this.animate({fill:i[this.id]},100);var n=this.id;"true"==d?app.getTemplate("mapText",function(e){var t={title:map.stateNames[n],startups:p[n]};console.dir(t),map.el.text.html(e(t))}):window.location=a[this.id]}))}t(e)}function t(e){e.changeSize(u,r,!0,!1),"true"==d?$(".mapWrapper").css({width:parseFloat(u,10)+parseFloat(g,10)+"px",height:r+"px"}):$(".mapWrapper").css({width:u+"px",height:r+"px"})}var a=[],n=[],o=[],s=[],i=[],p=[],l,c,u,r,d,g,m,f=0,y=0,k=null,h=!1;$.getJSON("assets/data/mapData.json",function(t){var f=t;l="#"+f.mapSettings.offColor,c="#"+f.mapSettings.strokeColor,u=f.mapSettings.mapWidth,r=f.mapSettings.mapHeight,d=f.mapSettings.useSideText,g=f.mapSettings.textAreaWidth,m=f.mapSettings.textAreaPadding,"true"==d&&(map.el.text.css({width:parseFloat(g)-parseFloat(2*m)+"px",height:parseFloat(r)-parseFloat(2*m)+"px",display:"inline","float":"right",padding:m+"px"}),map.el.text.html(f.defaultSideText));var y=0;$.each(f.stateData,function(e){var t=this;"ON"==t.stateMode&&y++,p.push(t.startups),map.stateNames.push(t.stateName),a.push(t.url),n.push(t.stateMode),o.push("#"+t.stateColor),s.push("#B20"),i.push("#b20")}),e(),map.animateMap()})},animateMap:function(){function e(){setTimeout(function(){$("#"+map.stateNames[o].replace(/\s+/g,"")).attr("data-grown","true"),o++,38>o&&e()},100)}var t=map.el.map.find("path"),a={},n=0,o=0;t.each(function(){$this=$(this),a[map.stateNames[n]]={top:$this.offset().top,left:$this.offset().left},$this.attr("id",map.stateNames[n].replace(/\s+/g,"")),n++}),e()}},stages={setup:function(){stages.selectStage()},selectStage:function(){var e=app.getParameters().stage;switch(e=Number(e)){case 1:console.log("It's in stage 1"),stage1.setup();break;case 2:console.log("It's in stage 2"),stage2.setup();break;case 3:console.log("It's in stage 3"),stage3.setup();break;case 4:console.log("It's in stage 4"),stage4.setup();break;case 5:console.log("It's in stage 5"),stage5.setup();break;default:console.log("This stage is not defined"),stages.listStages()}},listStages:function(){app.getTemplate("button",function(e){var t={title:"Kies je stage",body:"Bierrr",buttons:{1:{text:"Stage 1",action:"?stage=1"},2:{text:"Stage 2",action:"?stage=2"},3:{text:"Stage 3",action:"?stage=3"},4:{text:"Stage 4",action:"?stage=4"},5:{text:"Stage 5",action:"?stage=5"},6:{text:"Stage 6",action:"?stage=6"},7:{text:"Stage 7",action:"?stage=7"},8:{text:"Stage 8",action:"?stage=8"}}};app.el.template.html(e(t))})}},stage1={setup:function(){console.log("Setting up stage 1"),stage1.setWelcomeScreen()},setWelcomeScreen:function(){app.getTemplate("popup",function(e){console.log("rendering keypad template");var t={title:"Startup your dream",body:"Welkom bij The European Startup Factory!",button:{text:"START JE STARTUP",action:"stage1.setLogin()"},overlay:!1};app.el.template.html(e(t))})},setLogin:function(){app.login("stage1",function(){stage1.setIntroduction()})},setIntroduction:function(e){app.getTemplate("popup",function(e){var t={video:!0,id:"welcomeVideo",videoSrc:"stage1/rabit.mp4",button:{text:"Ga door naar de volgende koffer",action:"stages.listStages()"}};app.el.template.hide(),app.el.template.html(e(t)),app.el.template.fadeIn(),video.setup("welcomeVideo")})}},stage2={setup:function(){console.log("Setting up stage 1"),stage2.setMap()},setLogin:function(){app.login("stage2",function(){stage2.setMap()})},setMap:function(){map.setup()}},stage3={setup:function(){console.log("Setting up stage 3"),stage3.setLogin()},setLogin:function(){app.login("stage3",function(){stage3.chooseBussinessCategory()})},chooseBussinessCategory:function(){app.getTemplate("button",function(e){var t={title:"Kies je bedrijfscategorie",buttons:{1:{text:"3d printing"},2:{text:"Muziek/streaming"},3:{text:"Sociale netwerken"},4:{text:"Domotica"},5:{text:"Eurovisie songfestival"}}};app.el.template.html(e(t))})}},stage4={setup:function(){console.log("Setting up stage 4"),stage4.setLogin()},setLogin:function(){app.login("stage4",function(){stage4.setWelcomeScreen()})},setWelcomeScreen:function(){app.getTemplate("popup",function(e){var t={video:!0,id:"welcomeVideo",videoSrc:"stage1/rabit.mp4",button:{text:"Wat nu? Ga door naar de volgende koffer",action:"stages.listStages()"}};app.el.template.html(e(t))})}},stage5={setup:function(){stage5.createCamera()},createCamera:function(){app.getTemplate("camera",function(e){app.el.template.html(e),stage5.setCamera()})},setLogin:function(){app.login("stage5",function(){})},setCamera:function(){}},pictureSource,destinationType;document.addEventListener("deviceready",onDeviceReady,!1);var app={el:{template:$("#template")},templateRoot:"views/templates/",setup:function(){app.disableScroll(),app.enableFastClick(),stages.setup()},disableScroll:function(){document.ontouchmove=function(e){e.preventDefault()}},enableFastClick:function(){FastClick.attach(document.body)},getTemplate:function(e,t){var a,n;$.ajax({url:app.templateRoot+e+".html",success:function(e){a=e,n=Handlebars.compile(a),t&&t(n)},error:function(e){var t="Template kan niet geladen worden: ";t+=e.statusText,app.error(t)}})},error:function(e){app.getTemplate("popup",function(t){var a={title:"Er ging iets mis",body:e,button:{action:"window.location.reload()",text:"Probeer opnieuw"},overlay:!0};app.el.template.append(t(a))})},getParameters:function(){var e=window.location.search.substr(1);return null!=e&&""!=e?app.transformToAssocArray(e):{}},transformToAssocArray:function(e){for(var t={},a=e.split("&"),n=0;n<a.length;n++){var o=a[n].split("=");t[o[0]]=o[1]}return t},params:function(){return app.getParameters()},login:function(e,t){app.el.template.children().fadeOut("fast",function(){keypad.setup({fadeIn:!0,stage:e},function(){keypad.quit(),setTimeout(function(){app.el.template.hide(),t(),app.el.template.fadeIn()},500)})})}};app.setup();
//# sourceMappingURL=./app-min.js.map