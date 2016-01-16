var stage7 = {
	setup: function() {
		console.log('Setting up stage 7');
		stage7.setLogin();
	},
	setLogin: function() {
		app.login('stage7', function() {
			stage7.setWelcomeScreen();
		});
	},
	setWelcomeScreen: function() {
		app.getTemplate('popup', function(template){
			var context = {
				video: true,
				id: 'stage7Video',
				videoSrc: 'stage7/stage7.mp4',
				button: {
					text:   'Gelukkig! Ga door naar de volgende koffer',
					action: 'window.location.reload()'
					//action: 'stages.listStages()'
				}
			};
			app.el.template.html(template(context));
			video.setup('stage7Video');
		});
	}
};