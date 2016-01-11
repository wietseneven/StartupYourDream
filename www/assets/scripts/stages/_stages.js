var stages = {
	setup: function() {
		// Setting up the stage
		stages.selectStage();
	},
	selectStage: function() {
		var stage = app.getParameters().stage;
		stage = Number(stage);
		switch(stage) {
			case 1:
				console.log("It's in stage 1");
				stage1.setup();
				break;
			case 2:
				console.log("It's in stage 2");
				stage2.setup();
				break;
			default:
				console.log('This stage is not defined');
				stages.listStages();
				//app.error('Deze stage bestaat nog niet <br><a href="?stage=1">Stage 1</a><br><a href="?stage=2">Stage 2</a><br><a href="three.html">Three.html</a>');
		}
	},
	listStages: function() {
		app.getTemplate('button', function(template) {
			var context = {
				title: 'Er ging iets mis',
				body: 'asdf',
				buttons: {
					1: {
						text: 'Stage 1',
						action: '?stage=1'
					},
					2: {
						text: 'Stage 2',
						action: '?stage=2'
					},
					3: {
						text: 'Stage 3',
						action: '?stage=3'
					},
					4: {
						text: 'Stage 4',
						action: '?stage=4'
					},
					5: {
						text: 'Stage 5',
						action: '?stage=5'
					},
					6: {
						text: 'Stage 6',
						action: '?stage=6'
					},
					7: {
						text: 'Stage 7',
						action: '?stage=7'
					},
					8: {
						text: 'Stage 8',
						action: '?stage=8'
					}
				},
				overlay: true
			};
			app.el.template.html(template(context));
		});
	}
};