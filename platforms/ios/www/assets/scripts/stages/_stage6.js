var stage6 = {
	setup: function() {
		console.log('Setting up stage 6');
		stage6.setLogin();
	},
	setLogin: function() {
		app.login('stage6', function() {
			stage6.setWelcomeScreen();
		});
	},
	setWelcomeScreen: function() {
		app.getTemplate('popup', function(template){
			var context = {
				video: true,
				id: 'stage6Video',
				videoSrc: 'stage6/stage6.mp4',
				button: {
					text:   'Het gaat niet goed! Wat nu? Ga door naar de volgende koffer',
					action: 'window.location.reload()'
					//action: 'stages.listStages()'
				}
			};
			app.el.template.html(template(context));
			video.setup('stage6Video');
		});
	}
};