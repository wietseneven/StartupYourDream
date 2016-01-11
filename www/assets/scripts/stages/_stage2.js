var stage2 = {
	setup: function() {
		console.log('Setting up stage 1');
		//stage2.setLogin();
		stage2.setMap();
	},
	setLogin: function() {
		app.el.template.children().fadeOut('fast', function() {
			keypad.setup({
				fadeIn: true,
				stage: stage2
			}, function() {
				keypad.quit();
				setTimeout(function() {
					stage2.setMap();
				}, 500);
			});
		});
	},
	setMap: function() {
		map.setup();
	}
};