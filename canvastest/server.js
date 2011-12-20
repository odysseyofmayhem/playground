var http 	= require('http'),
	connect = require('connect'),
	io	 	= require('socket.io');

// Setup basic server
var server = connect.createServer(
	connect.logger(),
	connect.static(__dirname + '/html')
);

// Attach socketio to the connect server
var socketio = io.listen(server);

socketio.sockets.on('connection', function(socket) {
	socket.on('drawClick', function(data){
		socket.broadcast.emit('draw', {
			x: data.x,
			y: data.y,
			type: data.type
		});
	});
});
// Start listening for connections
server.listen(3001);

