var map = {
	el: {},
	clickable: false,
	startups: false,
	setup: function(location, clickable, startups) {
		map.loadTemplate(location, clickable);
		if(clickable){
			map.clickable = true;
		}

		if(startups){
			map.startups = true;
		}
	},
	loadTemplate: function(location, clickable) {
		app.getTemplate('map', function(template){
			if (location == 'full') {
				app.el.template.html(template);
			} else {
				app.el.template.append(template);
			}
			map.createMapJSON();

			map.el.text = $("#text");
			map.el.map = $('#map');
			setTimeout(function() {
				map.el.map.animate({
					'opacity': 1
				}, 200);
			}, 500);
		});
	},
	stateNames: [],
	stateText: [],
	stateModes: [],
	countryPaths: [],
	createMapJSON: function() {
		var stateColors = [];

		$.getJSON('assets/data/mapData.json', function(json) {

				app.getTemplate('popup', function (template) {
					var content = {
						title: 'Europa',
						body: 'Kies een land aan de linkerzijde',
						button: {
							text: 'Ga door naar de volgende koffer',
							action: 'window.location.reload()'
						}
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
					map.stateModes.push($node.stateMode);
					stateColors.push('#' + $node.stateColor);
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
					stroke: '#24221f',
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
		map.countriePaths = map.el.map.find('path');
		var countries = {};
		var i = 0;
		var j = 0;
		map.countriePaths.each(function() {
			var $this = $(this);
			countries[map.stateNames[i]] = {
				top:  $this.offset().top,
				left: $this.offset().left
			};
			$this.attr('id', map.stateNames[i].replace(/\s+/g, ''));
			$this.attr('data-active', 'false');

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

		if (map.startups) {
			setTimeout(function () {
				map.getStartups();
			}, 100);
		}

		if (map.clickable) {
			map.countryClick();
		}
	},
	countryClick: function() {
		map.countriePaths.click(function() {
			var $this = $(this);
			var curID = $this.index() - 2;

			if(map.stateModes[curID] === "ON") {
				map.countriePaths.each(function () {
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
	},
	openModal: function(elID) {
		var $this = $('#'+elID);

		var origDimensions = {
			left:   $this.offset().left,
			top:    $this.offset().top,
			width:  $this.outerWidth(),
			height: $this.outerHeight()
		};
		$this.addClass('open');
		var closeBtn = $('<button class="close">Sluiten</button>')
			.click(function(event) {
				event.stopPropagation();
				map.closeModal(elID, origDimensions);
			});



		setTimeout(function() {
			$this.find('h4, .linken').fadeIn('fast');
			$this.find('.content').fadeIn('fast');
			$this.append(closeBtn);
		}, 1000);

	},
	closeModal: function(elID, origDimensions) {
		var $this = $('#'+elID);
		$this.removeClass('open');
		$this.find('h4, .linken, .content, .close').fadeOut('fast');
		//$this.animate(origDimensions, 500);
	},
	getStartups: function() {
		$.getJSON('assets/data/startups.json', map.locateStartups);
	},
	locateStartups: function(data) {
		$.each(data, function() {
			var country = this.country;
			var countryPath = $('#'+country);
			var countryDimensions = {
				x: countryPath.offset().left,
				y: countryPath.offset().top,
				width: countryPath[0].getBBox().width,
				height: countryPath[0].getBBox().height
			};

			map.createMarker(countryDimensions, this);
			console.log(countryDimensions);
		});
	},
	createMarker: function(location, startup){
		app.getTemplate('startupMarker', function(template){
			var context = {
				top:     location.y + (location.height / 2) - 20,
				left:    location.x + (location.width / 2) - 24,
				name:    startup.name,
				logo:    startup.logo,
				id:      startup.id,
				content: startup.content,
				category: startup.category
			};

			app.el.template.append(template(context));

			$('#marker-'+startup.id).click(function() {
				map.openModal('marker-'+startup.id);
			});

			$('#marker-'+startup.id+' .linken').click(function(){
				$this = $(this);
				if($this.hasClass('selected')) {
					map.removeMarker($this);
				} else {
					map.selectMarker($this);
				}
			});
		});
	},
	selectMarker: function($this){
		$this.addClass('selected');
		var thisID = $this.attr('data-id');
		console.log('Adding '+thisID+'-marker to string');
		if (map.selectedStartups == '') {
			map.selectedStartups = thisID;

		} else if (map.selectedStartups.indexOf(thisID) <= -1) {
			map.selectedStartups += ','+thisID;
		}
		stage2.postStartups();
	},
	removeMarker: function($this) {
		var thisID = $this.attr('data-id');
		console.log('Removing '+thisID+'-marker from string');

		var str = map.selectedStartups;
		str = str.replace(','+thisID, '');
		str = str.replace(thisID, '');
		map.selectedStartups = str;
		$this.removeClass('selected');
		stage2.postStartups();
	},
	selectedStartups: ''
};