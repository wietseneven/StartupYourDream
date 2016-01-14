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
		map.setup();
	},
	postStartups: function() {
		console.log('Choices = '+map.selectedStartups);
		interact.user.postStatupChoices(app.session.authCode, map.selectedStartups);
	}
};