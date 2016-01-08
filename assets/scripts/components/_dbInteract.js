/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
var interact = {
	user: {
		check: function(authCode) {
			console.log(authCode);
			$.post("/api/request.php", {
					type	: 'user',
					authCode: authCode
				},
				function(data, status) {
					alert("Data: " + data + "\nStatus: " + status);
				}
			);
		}
	}
};