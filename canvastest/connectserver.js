var connect = require('connect');

// Setup basic connect server
var server = connect.createServer(
	connect.logger(),
	connect.static(__dirname + '/html')
).listen(3000);