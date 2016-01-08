/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
var keypad = {
	el: {},
	keys: {
		key: '',
		typed: 0
	},
	setup: function() {
		console.log('initiated keypad');
		keypad.renderKeypad();
	},
	renderKeypad: function() {
		app.getTemplate('/views/templates/keypad.html', function(template) {
			console.log('rendering keypad template');
			app.el.template.html(template);

			keypad.assignSelectors();
			keypad.watchKeys();
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
		} else {
			keypad.newNumber(key);
		}
	},
	ifUndo: function(key) {
		return key === 'undo';
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
	handleSubmit: function() {
		interact.user.check(keypad.keys.key);
	}
};
keypad.setup();