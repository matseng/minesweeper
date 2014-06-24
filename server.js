var express = require('express');
var app = express();
var path    = require('path');

app.configure(function() {
  app.use(express.logger('dev'));
  // app.use(express.static(__dirname + '/public'));
  console.log(__dirname);
  app.use(express.static(path.join(__dirname, 'public')));

});

app.get('/pastMiddleware', function(req, res) { 
  console.log("hello world pastMiddleware!");
  res.send("Hello world pastMiddleware!");
});

// app.get('*', function(req, res) {
//   // res.send("Hello world");
//   console.log("hello world!!");
//   //res.sendfile('./public/index.html');
// });





var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Listening on port: ', server.address().port);
})
