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
				app.error('Deze stage bestaat nog niet <br><a href="?stage=1">Stage 1</a><br><a href="three.html">Three.html</a>');
		}
	}
};