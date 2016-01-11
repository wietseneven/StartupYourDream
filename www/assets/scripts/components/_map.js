var map = {
	el: {},
	setup: function() {
		map.loadTemplate();
	},
	loadTemplate: function() {
		app.getTemplate('map', function(template){

			app.el.template.html(template);
			map.createMapJSON();

			map.el.text = $("#text");
			map.el.map = $('#map');
		});
	},
	stateNames: [],
	createMapJSON: function() {
		var stateURLs = [];
		var stateModes = [];
		var stateColors = [];
		var stateOverColors = [];
		var stateClickedColors = [];
		var stateText = [];

		var offColor;
		var strokeColor;
		var mapWidth;
		var mapHeight;
		var useSideText;
		var textAreaWidth;
		var textAreaPadding;

		var mouseX = 0;
		var mouseY = 0;
		var current = null;

		// Detect if the browser is IE.
		var IE = false;

		$.getJSON('assets/data/mapData.json', function(data) {

				var json = data;

				offColor = '#' + json.mapSettings.offColor;
				strokeColor = '#' + json.mapSettings.strokeColor;
				mapWidth = json.mapSettings.mapWidth;
				mapHeight = json.mapSettings.mapHeight;
				useSideText = json.mapSettings.useSideText;
				textAreaWidth = json.mapSettings.textAreaWidth;
				textAreaPadding = json.mapSettings.textAreaPadding;


				if (useSideText == 'true') {
					map.el.text.css({
						'width': (parseFloat(textAreaWidth) - parseFloat(textAreaPadding * 2)) + 'px',
						'height': (parseFloat(mapHeight) - parseFloat(textAreaPadding * 2)) + 'px',
						'display': 'inline',
						'float': 'right',
						'padding': textAreaPadding + 'px'
					});

					map.el.text.html(json.defaultSideText);
				}

				var j = 0;
				//Parse xml
				$.each(json.stateData, function (i) {
					var $node = this;
					if($node.stateMode == "ON") {
						j++;
					}

					stateText.push($node.startups);
					map.stateNames.push($node.stateName);
					stateURLs.push($node.url);
					stateModes.push($node.stateMode);
					stateColors.push('#' + $node.stateColor);
					stateOverColors.push('#B20');
					stateClickedColors.push('#b20');

				});

				createMap();
				map.animateMap();
		});


		function createMap() {

			//start map
			var r = new ScaleRaphael('map', 646, 654),
				attributes = {
					fill: '#d9d9d9',
					cursor: 'pointer',
					stroke: strokeColor,
					'stroke-width': 1,
					'stroke-linejoin': 'round'
				},
				arr = [];

			for (var state in paths) {

				//Create obj
				var obj = r.path(paths[state].path);
				obj.attr(attributes);
				arr[obj.id] = state;

				if (stateModes[obj.id] == 'OFF') {
					obj.attr({
						fill: offColor,
						cursor: 'default'
					});
				} else {

					obj.attr({
						fill: stateColors[obj.id],
						d: '300'
					});
					obj.mouseout(function (e) {
						if (this != current) {
							this.animate({
								fill: stateColors[this.id]
							}, 500);
						}
					});
					obj.click(function (e) {

						//Reset scrollbar
						var t = map.el.text[0];
						t.scrollLeft = 0;
						t.scrollTop = 0;

						//Animate previous state out
						if (current) {
							current.css({
								fill: stateColors[current.id]
							});
						}

						//Animate next
						this.animate({
							fill: stateClickedColors[this.id]
						}, 100);

						var curID = this.id;
						if (useSideText == 'true') {
							app.getTemplate('mapText', function(template){
								var content = {
									title:    map.stateNames[curID],
									startups: stateText[curID]
								};
								console.dir(content);
								map.el.text.html(template(content));
							});

						} else {
							window.location = stateURLs[this.id];
							//window.open(stateURLs[this.id], '_blank');
						}
					});

				}

			}

			resizeMap(r);
		}

		function resizeMap(paper) {

			paper.changeSize(mapWidth, mapHeight, true, false);

			if (useSideText == 'true') {
				$(".mapWrapper").css({
					'width': (parseFloat(mapWidth, 10) + parseFloat(textAreaWidth, 10)) + 'px',
					'height': mapHeight + 'px'
				});
			} else {
				$(".mapWrapper").css({
					'width': mapWidth + 'px',
					'height': mapHeight + 'px'
				});
			}

		};

	},
	animateMap: function() {
		var countriePaths = map.el.map.find('path');
		var countries = {};
		var i = 0;
		var j = 0;
		countriePaths.each(function() {
			$this = $(this);
			countries[map.stateNames[i]] = {
				top:  $this.offset().top,
				left: $this.offset().left
			};
			$this.attr('id', map.stateNames[i].replace(/\s+/g, ''));

			i++;
		});

		animate();
		function animate() {
			setTimeout(function(){
				$('#'+map.stateNames[j].replace(/\s+/g, '')).attr('data-grown', 'true');

				j++;
				if (j < 38){
					animate();
				}
			}, 100);
		}
	}
};