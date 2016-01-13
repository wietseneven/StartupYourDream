var stage3 = {
	setup: function() {
		console.log('Setting up stage 3');
		stage3.setLogin();
	},
	setLogin: function(){
		console.log('setting up login in stage 3');
		app.login('stage3', function() {
			stage3.chooseBussinessCategory();
		});
	},
	chooseBussinessCategory: function() {
		app.getTemplate('button', function(template) {
			var choices = {
				title: 'Kies je bedrijfscategorie',
				buttons: {
					1: {
						text: '3d printing'
					},
					2: {
						text: 'Muziek/streaming'
					},
					3: {
						text: 'Sociale netwerken'
					},
					4: {
						text: 'Domotica'
					},
					5: {
						text: 'Eurovisie songfestival'
					}
				}
			};
			app.el.template.html(template(choices));
		});
	}
};