var express = require('express');
var app = express();
var path = require('path');

app.configure(function() {
  app.use(express.logger('dev'));  //logs all requests to the console
  console.log(__dirname);  // __dirname is a string of complete path
  app.use(express.static(path.join(__dirname, 'public')));  //middleware checks incoming requests to see if the request matches a file in public folder
  // app.use(express.static(__dirname + '/public'));  // simple alternative to above path.join
});

app.get('/pastMiddleware', function(req, res) { 
  console.log("hello world pastMiddleware!");
  res.send("Hello world pastMiddleware!");
});

var port = process.env.PORT || 3000;  //maybe process.env.PORT is useful for deployment?

var server = app.listen(port, function() {
  console.log('Listening on port: ', server.address().port);
})
