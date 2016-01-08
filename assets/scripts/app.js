/*globals FastClick */
var app = {
	el: {
		template: $('#template')
	},
	setup: function(){
		app.disableScroll();
		app.enableFastClick();
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
			url: path,
			success: function(data) {
				source    = data;
				template  = Handlebars.compile(source);

				//execute the callback if passed
				if (callback) callback(template);
			}
		});
	}
};
app.setup();