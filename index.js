
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');



//Message object
function message(data,destinationID,sourceID) {
	this.data = data,
	this.destinationID = destinationID,
	this.sourceID=sourceID/*
	this.fullName = function() {
		return this.firstName + " " + this.lastName;
	}*/
}




app.listen(8080,"localhost");

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {


socket.on("message",function(data){
var msg = new message(data,null,null);
socket.emit(JSON.stringify(msg));


});

  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});