var stage2 = {
	setup: function() {
		console.log('Setting up stage 1');
		stage2.setLogin();
		//stage2.setMap();
	},
	setLogin: function() {
		app.login('stage2', function() {
			stage2.setMap();
		});
	},
	setMap: function() {
		console.log('autcode is: '+app.session.authCode);

		var popupText = {
			'title': 'Partners',
			'body':  'Als startup is het verstandig om contact te zoeken met andere startups. Kies er 1 van de kaart, en link ermee!'
		};

		map.setup('full', false, true, popupText);
	},
	postStartups: function() {
		console.log('Choices = '+map.selectedStartups);
		interact.user.postStartupChoices(app.session.authCode, 'startups', map.selectedStartups, 2);

		app.getTemplate('popup', function(template){
			var context = {
				video: true,
				id: 'startupVideo',
				videoSrc: 'stage2/stage2.mp4',
				button: {
					text:   'Ga door naar de volgende koffer',
					//action: 'window.location.reload()'
					action: 'stages.listStages()'
				}
			};
			app.el.template.children().fadeOut('fast', function() {
				app.el.template.html(template(context));
				video.setup('startupVideo');
			});

		});
	}
};