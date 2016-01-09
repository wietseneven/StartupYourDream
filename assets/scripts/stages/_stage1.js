var stage1 = {
	setup: function() {
		console.log('Setting up stage 1');
		stage1.setWelcomeScreen();
	},
	setWelcomeScreen: function() {
		app.getTemplate('popup', function(template) {
			console.log('rendering keypad template');
			var context = {
				title: 'Startup your dream',
				body: 'Welkom bij The European Startup Factory!',
				button: {
					text: 'START JE STARTUP',
					action: 'stage1.setLogin()'
				},
				overlay: false
			};
			app.el.template.html(template(context));
		});
	},
	setLogin: function() {
		app.el.template.children().fadeOut('fast', function() {
			keypad.setup({
				fadeIn: true,
				stage: stage1
			}, function() {
				keypad.quit();
				stage1.setIntroduction();
			});
		});
	},
	setIntroduction: function(data) {
		app.getTemplate('popup', function(template) {
			var context = {
				video: true
			};
			app.el.template.html(template(context));
		});
	}
};