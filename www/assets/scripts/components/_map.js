var map = {
	el: {},
	setup: function() {
		app.getTemplate('map', function(template) {
			app.el.template.append(template);

			map.setSelectors();
			map.setSizes();
		});
	},
	setSelectors: function() {
		map.el.map = $('#map');
	},
	setSizes: function() {
		var screenWidth = $(window).width();
		var screenHeight = $(window).height();
		map.el.map.width(screenWidth).height(screenHeight).attr({'width': screenWidth * 2, 'height': screenHeight * 2});
	}
};