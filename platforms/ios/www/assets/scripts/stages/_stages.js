var stages = {
	setup: function() {
		// Setting up the stage
		stages.selectStage();
	},
	selectStage: function() {
		var stage = app.getParameters().stage;
		stage = Number(stage);
		app.el.template.attr('data-id', 'stage-'+stage);
		switch(stage) {
			case 1:
				console.log("It's in stage 1");
				stage1.setup();
				break;
			case 2:
				console.log("It's in stage 2");
				stage2.setup();
				break;
			case 3:
				console.log("It's in stage 3");
				stage3.setup();
				break;
			case 4:
				console.log("It's in stage 4");
				stage4.setup();
				break;
			case 5:
				console.log("It's in stage 5");
				stage5.setup();
				break;
			case 6:
				console.log("It's in stage 6");
				stage6.setup();
				break;
			case 7:
				console.log("It's in stage 7");
				stage7.setup();
				break;
			case 8:
				console.log("It's in stage 8");
				stage8.setup();
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
				title: 'Kies je stage',
				body: 'Bierrr',
				buttons: {
					1: {
						text: 'Stage 1',
						href: '?stage=1'
					},
					2: {
						text: 'Stage 2',
						href: '?stage=2'
					},
					3: {
						text: 'Stage 3',
						href: '?stage=3'
					},
					4: {
						text: 'Stage 4',
						href: '?stage=4'
					},
					5: {
						text: 'Stage 5',
						href: '?stage=5'
					},
					6: {
						text: 'Stage 6',
						href: '?stage=6'
					},
					7: {
						text: 'Stage 7',
						href: '?stage=7'
					},
					8: {
						text: 'Stage 8',
						href: '?stage=8'
					}
				}
			};
			app.el.template.html(template(context));
		});
	}
};