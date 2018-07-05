var app = require('express')();
var http = require('http').Server(app);


var port  = process.env.OPENSHIFT_NODEJS_PORT || process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || 8080;
var ip =  process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || 'localhost';
app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(8080,"0.0.0.0",null, function(){
  console.log('listening on *: '+port);
});
    