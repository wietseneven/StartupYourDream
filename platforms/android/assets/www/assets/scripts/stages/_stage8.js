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
			video.setup('stage8Video', function() {
				stage8.finalText();
			});
		});
	},
	finalText: function() {
		app.getTemplate('popup', function(template) {
			var context = {
				title: 'Gefeliciteerd!',
				body: 'Met je succesvolle '+app.session.request.category+' startup in '+app.session.request.country+', Europa!',
				button: {
					text: 'Bedankt voor je reis!',
					action: 'stage8.setup()'
				}
			};
			app.el.template.html(template(context));

			setTimeout(function(){
				stage8.setup();
			}, 12000);
		});
	}
};