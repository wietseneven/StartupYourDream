var stage5 = {
	setup: function() {
		console.log('Setting up stage 5');
		stage5.setLogin();
	},
	setLogin: function() {
		app.login('stage5', function() {
			stage5.setWelcomeScreen();
		});
	},
	setWelcomeScreen: function() {
		app.getTemplate('popup', function(template){
			var context = {
				video: true,
				id: 'neelieVideo',
				videoSrc: 'stage5/stage5.mp4',
				button: {
					text:   'Hoe gaat het ondertussen met jouw '+app.session.request.category+' startup? Ga door naar de volgende koffer',
					//action: 'window.location.reload()'
					action: 'stage5.setLogin()'
				}
			};
			app.el.template.html(template(context));
			video.setup('neelieVideo');
		});
	}
};