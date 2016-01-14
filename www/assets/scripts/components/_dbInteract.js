/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
var interact = {
	user: {
		check: function(authCode, callback) {
			console.log(authCode);
			$.post("https://app.wathebikaande.eu/api/request.php", {
					type	: 'user',
					authCode: authCode
				},
				function(data, status) {
				//	alert(data + '\n' + status);
					callback();
					return data;
				}
			);
		},
		postStartupChoices: function(authCode, updateType, startups, stage, callback) {
			$.post("https://app.wathebikaande.eu/api/request.php", {
					type	: 'startups',
					authCode: authCode,
					toUpdate: updateType,
					startups: startups,
					stage   : 2
				},
				function(data, status) {
					console.log(data);
					app.session = data;
					if (callback) callback(data);
					return data;
				}
			);
		},
		getStartupChoices: function(authCode) {

		}
	}
};