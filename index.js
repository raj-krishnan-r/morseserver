
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var mysql = require('mysql');

console.log("\n To connect : http://0.0.0.0:8080");
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    port     : '3306',
    user     : 'root',
    password : 'dbase001',
    database : 'notes'
   });

//Message object
function message(data,destinationID,sourceID) {

var dated = new Date();
var hour = dated.getHours();
var min = dated.getMinutes();

var formattedTime = hour+":"+min;
	this.data = data,
	this.destinationID = destinationID,
	this.serverTimed = new Date(),
	this.ftime = formattedTime,
	this.sourceID=sourceID

}
app.listen(8080,"0.0.0.0");

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

//Activities to do on socket connection

console.log("Client connected and allocated id :"+socket.id);


socket.on("message",function(data){
var decoded = JSON.parse(data);
var msg = new message(decoded.data,null,decoded.sourceID);
   connection.connect( function(err){
  if (err){ 
      //throw err;
      socket.broadcast.emit("message",err);

  }
  else {
      socket.broadcast.emit("message",JSON.stringify(msg));

  }
   });


});

});