/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
var interact = {
	user: {
		check: function(authCode) {
			console.log(authCode);
			$.post("https://app.wathebikaande.eu/api/request.php", {
					type	: 'user',
					authCode: authCode
				},
				function(data, status) {
					alert(data + '\n' + status);
					return data;
				}
			);
		}
	}
};