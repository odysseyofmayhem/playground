var connect	= require('connect'),
	io		= require('socket.io');
	
// Setup basic server
var server = connect.createServer(
	connect.logger(),
	connect.static(__dirname + '/static')
);

var socketio = io.listen(server);

socketio.sockets.on('connection', function(socket){
	var username;
	
	console.log('Got connection...');
	
	socket.send('Welcome to this socketio server!');
	socket.send('Please input your username: ');
			socket.broadcast.emit('news', 'news at 10');
			
	socket.on('message', function(message){
		console.log('Got message: '+message);
		if(!username){
			username = message;
			socket.send('Welcome, '+username+'!');
			return;
		}
		socket.send('erm?');
		socket.broadcast.emit('message', username + ' sent: ' + message);
		socket.broadcast.emit('news', 'news at 10');
	});
	
});

server.listen(3000);
console.log('Started up...');