var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	express = require('express'),
	app = express();

mongoose.connect('mongodb://localhost/devoodo');

mongoose.connection.on('error', function(err) {
	console.error("mongoose connection error:", err);
	process.exit(1);
});

var Dev = mongoose.model('Dev', new Schema({
	email: {type: String, unqiue: true},
	homepage: {type: String, unique: true},
	github: String,
	twitter: String,
	stackoverflow: String,
	googleplus: String,
	youtube: String,
	gravatar: String,
	img: String
}, {collection: 'devs'}));

// Home page
app.get('/', function(req, res) {
	res.sendfile('./client/index.html');
});

// Static files
app.get(/^(.+)$/, function(req, res){ 
  console.log('static file request : ' + req.params);
  res.sendfile( __dirname + req.params[0]); 
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
 	console.log("express server listening on " + port);
});
