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
			var $this = $(this);
			var thisCategory = $this.text();
			stage3.setPosition($this);

			interact.user.postStartupChoices(app.session.authCode, 'category', thisCategory , 3, function(data){
				alert('updated');
			});
		});
	},
	setPosition: function(el) {
		el.css({
			position: 'absolute',
			top     : el.offset().top + 'px',
			left    : el.offset().left + 'px'
		});
	}
};