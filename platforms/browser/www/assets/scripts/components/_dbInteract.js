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
		postStatupChoices: function(authCode, startups, stage, callback) {
			$.post("https://app.wathebikaande.eu/api/request.php", {
					type	: 'startups',
					authCode: authCode,
					startups: startups,
					stage   : 2
				},
				function(data, status) {
					console.log(data);
					if (callback) callback();
					return data;
				}
			);
		},
		getStartupChoices: function(authCode) {

		}
	}
};