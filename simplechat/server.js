var net = require('net'),
    carrier = require('carrier'),
	connections = [];

var server = net.createServer(function(conn) {
	var username;
	connections.push(conn);
	
	conn.write('Welcome to the Odyssey Of Mayhem chatroom!\n\n');
	conn.write('Please type your name:');

	conn.on('close', function(){
		var pos = connections.indexOf(conn);
		if(pos >= 0) connections.splice(pos, 1);
	});
	
	carrier.carry(conn, function(line) {
    	if(!username){
			username = line;
			conn.write('Hello '+username+'! There are '+(connections.length-1)+' other people on the server\n');
			return;
		}
		
		if(line == 'quit'){
			conn.end();
			return;
		}
		
		var feedback = username + ': ' + line + '\n';
		connections.forEach(function(one_connection){
			one_connection.write(feedback);
		});
	});
}).listen(3000);
console.log('Simple chat server up on port 3000.');