// basic server
var express = require('express');

// Middleware
var parser = require('body-parser');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', process.env.PORT || 3000);

// Logging and parsing
app.use(parser.json());

// Serve the client files
app.use(express.static(__dirname + '/Client'));

app.listen(app.get('port'));
