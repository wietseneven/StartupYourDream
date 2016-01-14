var stage3 = {
	el: {},
	setup: function() {
		console.log('Setting up stage 3');
		stage3.setLogin();
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
		stage3.setTitlePos(el);
	},
	setTitlePos: function(el) {
		var windowWidth = $(window).width();
		var elWidth     = el.outerWidth();
		var offset      = (windowWidth/2) - (elWidth/2);
		offset          = 0.6 * windowWidth;

		el.animate({
			top: '225px',
			left: offset+'px'
		},500, 'swing', function() {
			stage3.getMap();
		});


	},
	removePopup: function() {
		$('.popup').fadeOut('fast');
	},
	getMap: function() {
		var popupText = {
			video: true,
			id: 'stage3Video',
			videoSrc: 'stage3/stage3.mp4',
			button: {
				text:   'Ga door naar de volgende koffer',
				//action: 'window.location.reload()'
				action: 'stages.listStages()'
			}
		};

		map.setup('append', true, false, popupText);
		video.setup('stage3Video');
	}
};