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
	stateText: [],
	stateModes: [],
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


				app.getTemplate('popup', function (template) {
					var content = {
						title: 'Europa',
						body: 'Kies een land aan de rechterzijde'
					};
					console.dir(content);
					map.el.text.html(template(content));
				});

				var j = 0;
				//Parse xml
				$.each(json.stateData, function (i) {
					var $node = this;
					if($node.stateMode == "ON") {
						j++;
					}

					map.stateText.push($node.startups);
					map.stateNames.push($node.stateName);
					stateURLs.push($node.url);
					map.stateModes.push($node.stateMode);
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

				if (map.stateModes[obj.id] == 'OFF') {
					obj.attr({
						fill: '#ccc',
						cursor: 'default'
					});
				} else {

					obj.attr({
						fill: stateColors[obj.id],
						d: '300'
					});

				}

			}

			resizeMap(r);
		}

		function resizeMap(paper) {
			var mapWidth = $(window).width() * 0.65;
			var mapHeight = $(window).height() * 0.9;
			paper.changeSize(mapWidth, mapHeight, true, false);

		}

	},
	animateMap: function() {
		var countriePaths = map.el.map.find('path');
		var countries = {};
		var i = 0;
		var j = 0;
		countriePaths.each(function() {
			var $this = $(this);
			countries[map.stateNames[i]] = {
				top:  $this.offset().top,
				left: $this.offset().left
			};
			$this.attr('id', map.stateNames[i].replace(/\s+/g, ''));
			$this.attr('data-active', 'false');

			i++;
		});

		countriePaths.click(function() {
			var $this = $(this);
			var curID = $this.index() - 2;

			if(map.stateModes[curID] === "ON") {
				countriePaths.each(function () {
					$(this).attr('data-active', 'false');
				});


				$this.attr('data-active', 'true');

				app.getTemplate('popup', function (template) {
					var content = {
						title: map.stateNames[curID],
						startups: map.stateText[curID]
					};
					console.dir(content);
					map.el.text.html(template(content));
					var i = 0;

					$('.startup').each(function() {
						var $this = $(this);
						var thisDimensions = {
							x:      $this.offset().left,
							y:	    $this.offset().top,
							width:  $this.outerWidth(),
							height: $this.outerHeight()
						};

						if (i == 1){
							thisDimensions.x += thisDimensions.width;
						}

						$this.css({
							top:  thisDimensions.y,
							left: thisDimensions.x,
							width: thisDimensions.width,
							height: thisDimensions.height,
							position: 'absolute'
						});

						$this.click(function() {
							if (!$(this).hasClass("open")) {
								map.openModal($this.attr('id'));
							}
						});

						i++;
					});
				});
			}
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
	},
	openModal: function(elID) {
		var $this = $('#'+elID);

		var origDimensions = {
			left:   $this.offset().left,
			top:    $this.offset().top,
			width:  $this.outerWidth(),
			height: $this.outerHeight()
		};

		$this.addClass('open').animate({
			'top'       : '0',
			'left'      : '15%',
			'width'     : '70%',
			'height'    : '100%'
		}, 500);

		var closeBtn = $('<button class="close">Sluiten</button>')
			.click(function(event) {
				event.stopPropagation();
				map.closeModal(elID, origDimensions);
			});

		$this.append(closeBtn);


		//setTimeout(function() {
		//	map.closeModal(elID, origDimensions);
		//},10000);
	},
	closeModal: function(elID, origDimensions) {
		var $this = $('#'+elID);
		$this.removeClass('open');
		$this.find('.close').fadeOut('fast');
		$this.animate(origDimensions, 500);
	}
};