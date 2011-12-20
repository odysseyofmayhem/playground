/*************************************************
*
*
*
*************************************************/

// create a object to hold our stuff
var canvasRepeater = {};

// canvasRepeater class
canvasRepeater.init = function(socketServer, port){
	// Create a canvas
	canvasRepeater.canvas = document.createElement('canvas');
    canvasRepeater.canvas.height = 400;
    canvasRepeater.canvas.width = 800;
	
	// Whack it into the DOM
	document.getElementsByTagName('article')[0].appendChild(canvasRepeater.canvas);
	
	// Get the context and setup some basic variables
	canvasRepeater.ctx = canvasRepeater.canvas.getContext("2d");
	canvasRepeater.ctx.fillStyle = "solid";
	canvasRepeater.ctx.strokeStyle = "#ECD018";
	canvasRepeater.ctx.lineWidth = 5;
	canvasRepeater.ctx.lineCap = "round";
	
	// Open up SocketIO
	canvasRepeater.socket = io.connect('http://'+socketServer+':'+port);
	
	canvasRepeater.socket.on('draw', function(data) {
		return canvasRepeater.draw(data.x, data.y, data.type);
	});

	canvasRepeater.draw = function(x, y, type) {
		if (type === "dragstart") {
			canvasRepeater.ctx.beginPath();
			return canvasRepeater.ctx.moveTo(x, y);
		} else if (type === "drag") {
			canvasRepeater.ctx.lineTo(x, y);
			return canvasRepeater.ctx.stroke();
		} else {
			return canvasRepeater.ctx.closePath();
		}
	};
};

// Draw events
$('canvas').live('drag dragstart dragend', function(e) {
	console.log(e);
	var offset, type, x, y;
	type = e.handleObj.type;
	
	offset = $(this).offset();
	e.offsetX = e.layerX - offset.left;
	e.offsetY = e.layerY - offset.top;
	x = e.offsetX;
	y = e.offsetY;
	
	canvasRepeater.draw(x, y, type);
	canvasRepeater.socket.emit('drawClick', {
		x: x,
		y: y,
		type: type
	});
});

// Invoke JQuery
$(document).ready(function(){
	canvasRepeater.init('localhost',3001);
});