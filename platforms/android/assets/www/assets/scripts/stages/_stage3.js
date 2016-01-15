var stage3 = {
	el: {},
	setup: function() {
		console.log('Setting up stage 3');
		stage3.setLogin();
	//	stage3.getMap();
	},
	setLogin: function(){
		console.log('setting up login in stage 3');
		app.login('stage3', function() {
			stage3.getUserCompanies();
		});
	},
	getUserCompanies: function() {
		interact.user.postStartupChoices(app.session.authCode, '', '', 3, function(data){
			stage3.chooseBussinessCategory();
		});
	},
	chooseBussinessCategory: function() {
		app.getTemplate('button', function(template) {
			var choices = {
				title: 'Kies je bedrijfscategorie',
				id: 'stage3catBtns',
				buttons: [
					{
						text: '3d printing'
					},
					{
						text: 'Muziek/streaming'
					},
					{
						text: 'Sociale netwerken'
					},
					{
						text: 'Domotica'
					},
					{
						text: 'Eurovisie songfestival'
					},
					{
						text: 'Journalistiek'
					}
				]
			};
			app.el.template.html(template(choices));
			stage3.el.btngroup = $('#stage3catBtns');
			stage3.el.catBtns  = stage3.el.btngroup.children();
			stage3.watchButtons();
		});
	},
	watchButtons: function() {

		stage3.el.catBtns.click(function() {
			//stage3.setPosition(stage3.el.catBtns);
			var $this = $(this);
			var thisCategory = $this.text();
			stage3.setBtnGroupHeight();
			stage3.el.catBtns.unbind( "click" );
			stage3.el.catBtns.not($this).animate({
				'opacity': 0
			},300);

			setTimeout(function() {
				stage3.setPosition($this);
				stage3.removePopup();
			},600);
			interact.user.postStartupChoices(app.session.authCode, 'category', thisCategory , 3, function(data){

			});
		});
	},
	setBtnGroupHeight: function() {
		var groupHeight = stage3.el.btngroup.height();
		stage3.el.btngroup.height(228);
	},
	setPosition: function(el) {
		el.css({
			position: 'absolute',
			top     : el.offset().top + 'px',
			left    : el.offset().left + 'px',
		}).addClass('positionSet');
		stage3.setTitlePos(el, false);
	},
	setTitlePos: function(el, right) {
		var windowWidth = $(window).width();
		var elWidth     = el.outerWidth();
		var offset      = (windowWidth/2) - (elWidth/2);
		if(right) {
			offset = 0.6 * windowWidth;
		}

		el.animate({
			top: '225px',
			left: offset+'px'
		},500, 'swing', function() {
			if (!right) {
				stage3.getMap();

			} else {
				var data = JSON.parse(app.session.request);
				console.log(data[0].country);
				var startup = data[0].startups;
				$.getJSON('assets/data/startups.json', function(data){
					var startups = getObjects(data, 'id', startup);
					console.log(startups[0].country);
					var startupCountry = startups[0].country;
					$('<br><small>Jouw coach '+ startup +' bevindt zich in ' +startupCountry+'</small>').appendTo($('.positionSet'));
				});
			}
		});


	},
	removePopup: function() {
		$('.popup').fadeOut('fast');
	},
	getMap: function() {
		var popupText = {
			video: true,
			id: 'stage3Video',
			videoSrc: 'stage3/stage3.mp4'
		};

		map.setup('append', true, false, popupText);

		setTimeout(function(){
			//map.el.map.hide();
			//map.el.map.fadeIn('fast');
			video.setup('stage3Video', function() {
				map.el.map.fadeIn('fast');
				stage3.setTitlePos($('.btn.positionSet'), true);
				map.el.text.removeClass('starting');
			});
		}, 1200);

	},
	selectedCountry: function(countryname){
		interact.user.postStartupChoices(app.session.authCode, 'country', countryname, 3);
		app.el.template.children().fadeOut('fast', function() {
			app.getTemplate('popup', function(template) {
				var context = {
					title: 'Goede keuze!',
					button: {
						text: 'Ga door naar de volgende koffer',
						action: 'window.location.reload()'
					}
				};
				app.el.template.html(template(context));
			});
		});
	}
};

function getObjects(obj, key, val) {
	var objects = [];
	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) continue;
		if (typeof obj[i] == 'object') {
			objects = objects.concat(getObjects(obj[i], key, val));
		} else if (i == key && obj[key] == val) {
			objects.push(obj);
		}
	}
	return objects;
}