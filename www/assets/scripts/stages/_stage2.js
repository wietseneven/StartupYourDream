var stage2 = {
	setup: function() {
		console.log('Setting up stage 1');
		stage1.setLogin();
	},
	setLogin: function() {
		app.el.template.children().fadeOut('fast', function() {
			keypad.setup({
				fadeIn: true,
				stage: stage1
			}, function() {
				keypad.quit();
				setTimeout(function() {
					stage1.setMap();
				}, 500);
			});
		});
	},
	setMap: function() {
		map.setup();
	}
};