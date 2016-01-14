var stage4 = {
	setup: function() {
		console.log('Setting up stage 4');
		stage4.setLogin();
	},
	setLogin: function() {
		app.login('stage4', function() {
			stage4.setWelcomeScreen();
		});
	},
	setWelcomeScreen: function() {
		app.getTemplate('popup', function(template){
			var context = {
				video: true,
				id: 'stage4Video',
				videoSrc: 'stage4/stage4.mp4',
				button: {
					text:   'Wat nu? Ga door naar de volgende koffer',
					//action: 'window.location.reload()'
					action: 'stages.listStages()'
				}
			};
			app.el.template.html(template(context));
			video.setup('stage4Video');
		});
	}
};