/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
var keypad = {
	el: {},
	keys: {
		key: '',
		typed: 0
	},
	commingFrom: '',
	callback: '',
	setup: function(args, callback) {
		console.log('initiated keypad');
		keypad.commingFrom = function() { 'stage'+args.stage.setup()};
		keypad.callback = callback;
		keypad.renderKeypad(args);
	},
	renderKeypad: function(args) {
		app.getTemplate('keypad', function(template) {
			console.log('rendering keypad template');

			var context = {};
			if (args.fadeIn){
				context.hidden = true
			}
			app.el.template.html(template(context));

			keypad.assignSelectors();
			keypad.watchKeys();

			if (args.fadeIn){
				var i = 0;
				keypad.el.keys.addClass('hidden');
				keypad.el.keys.each(function() {
					var key = $(this);
					setTimeout(function() {
						key.removeClass('hidden');
					}, i * 10);
					i++;
				});
				keypad.el.keypad.fadeIn('fast');
			}
		});
	},
	assignSelectors: function() {
		keypad.el.keypad = $('.keypad');
		keypad.el.keys   = $('.keypad .key');
		keypad.el.resultBox = $('.keypad .result');
	},
	watchKeys: function() {
		console.log('watching keypad keys');
		keypad.el.keys.click(function() {
			var key = $(this);
			var keyNum = key.data('num');
			console.log('pressed key ' + keyNum);
			keypad.handleKeyPress(keyNum);

			if (keypad.keys.typed === 3){
				console.log('3 characters entered, check if user can continue');
				keypad.handleSubmit();
			}
		});
	},
	handleKeyPress: function(key) {
		console.log('handling key '+key);
		if(keypad.ifUndo(key)){
			keypad.undoNumber();
		} else if (keypad.ifCancel(key)) {
			keypad.el.keypad.fadeOut('fast', function(){
				keypad.commingFrom();
			});
		} else {
			keypad.newNumber(key);
		}
	},
	ifUndo: function(key) {
		return key === 'undo';
	},
	ifCancel: function(key) {
		return key === 'cancel';
	},
	undoNumber: function() {
		console.log('Undoing last keypress');
		if (keypad.keys.typed > 0) {
			keypad.keys.typed--;
			keypad.keys.key = keypad.keys.key.substring(0, keypad.keys.key.length - 1);
			keypad.el.resultBox.children().last().remove();
		}
	},
	newNumber: function(key) {
		if (keypad.keys.typed < 3){

			console.log('Adding new number');
			keypad.el.resultBox.append('<span>' + key + '</span>');
			keypad.keys.key += key;
			keypad.keys.typed++;

		}
	},
	hideKeys: function() {
		var i = 0;
		keypad.el.keys.each(function() {
			var key = $(this);
			setTimeout(function() {
				key.addClass('hidden');
			}, i * 10);
			i++;
		});
	},
	handleSubmit: function() {
		keypad.hideKeys();
		keypad.el.resultBox.addClass('loading');
		var data = interact.user.check(keypad.keys.key, function() {
			app.session.authCode = keypad.keys.key;
			if (keypad.callback) keypad.callback(data);
		});

	},
	quit: function() {
		keypad.el.keypad.fadeOut('fast');
	}
};
//keypad.setup();