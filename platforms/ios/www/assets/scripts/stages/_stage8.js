var stage8 = {
	setup: function() {
		console.log('Setting up stage 7');
		stage8.setLogin();
	},
	setLogin: function() {
		app.login('stage8', function() {
			stage8.setWelcomeScreen();
		});
	},
	setWelcomeScreen: function() {
		app.getTemplate('popup', function(template){
			var context = {
				video: true,
				id: 'stage8Video',
				videoSrc: 'stage8/stage8.mp4',
				button: {
					text:   'Wat nu? Ga door naar de volgende koffer',
					//action: 'window.location.reload()'
					action: 'stages.listStages()'
				}
			};
			app.el.template.html(template(context));
			video.setup('stage8Video');
		});
	}
};