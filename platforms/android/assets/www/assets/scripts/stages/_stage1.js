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
		app.login('stage1', function(){
			stage1.setIntroduction();
		});
	},
	setIntroduction: function(data) {
		app.getTemplate('popup', function(template) {
			var context = {
				video: true,
				id: 'welcomeVideo',
				videoSrc: 'stage1/stage1.mp4',
				button: {
					text:   'Ga door naar de volgende koffer',
					action: 'stage1.setup()'
					//action: 'stages.listStages()'
				}
			};
			app.el.template.hide();
			app.el.template.html(template(context));
			app.el.template.fadeIn();
			video.setup('welcomeVideo');
		});

	}
};