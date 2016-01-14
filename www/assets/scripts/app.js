/*globals FastClick */
var app = {
	el: {
		template: $('#template')
	},
	session: {},
	templateRoot: 'views/templates/',
	setup: function(){
		app.disableScroll();
		app.enableFastClick();

		// Start the stages
		stages.setup();
	},
	disableScroll: function() {
		document.ontouchmove = function(e) {e.preventDefault()};
	},
	enableFastClick: function() {
		FastClick.attach(document.body);
	},
	getTemplate: function(path, callback){
		var source;
		var template;

		$.ajax({
			url: app.templateRoot + path + '.html',
			success: function(data) {
				source    = data;
				template  = Handlebars.compile(source);

				//execute the callback if passed
				if (callback) callback(template);
			},
			error: function(data){
				var errorText = 'Template kan niet geladen worden: ';
				errorText += data.statusText;
				app.error(errorText);
			}
		});
	},
	error: function(errorText) {
		app.getTemplate('popup', function(template) {
			var context = {
				title: 'Er ging iets mis',
				body: errorText,
				button: {
					action: 'window.location.reload()',
					text: 'Probeer opnieuw'
				},
				overlay: true
			};
			app.el.template.append(template(context));
		});
	},
	getParameters: function() {
		var prmstr = window.location.search.substr(1);
		return prmstr != null && prmstr != "" ? app.transformToAssocArray(prmstr) : {};
	},

	transformToAssocArray: function( prmstr ) {
		var params = {};
		var prmarr = prmstr.split("&");
		for ( var i = 0; i < prmarr.length; i++) {
			var tmparr = prmarr[i].split("=");
			params[tmparr[0]] = tmparr[1];
		}
		return params;
	},

	params: function() {
		return app.getParameters()
	},

	login: function(curStage, callback) {
	//	app.el.template.children().fadeOut('fast', function() {

			keypad.setup({
				fadeIn: true,
				stage: curStage
			}, function() {
				keypad.quit();
				setTimeout(function() {
					app.el.template.hide();
					callback();
					app.el.template.fadeIn();
				}, 500);
			});
	//	});
	}
};
app.setup();
//
//function scan() {
//	cordova.plugins.barcodeScanner.scan(
//		function (result) {
//			alert("We got a barcode\n" +
//				"Result: " + result.text + "\n" +
//				"Format: " + result.format + "\n" +
//				"Cancelled: " + result.cancelled);
//		},
//		function (error) {
//			alert("Scanning failed: " + error);
//		},
//		{
//			"preferFrontCamera": true,
//			"showFlipCameraButton": true
//		}
//	);
//}