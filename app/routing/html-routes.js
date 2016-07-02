 //Dependencies
var path = require('path');

// HTML Routes
// =============================================================
module.exports = function(app){


	// Basic route that sends the user first to the AJAX Page
	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/app/public/home.html'));
	})


	app.get('/survey', function(req, res){	
		res.sendFile(path.join(__dirname + '/app/public/survey.html'));
	})


	app.get('/all', function(req, res){	
		res.sendFile(path.join(__dirname + '/app/public/all.html'));
	})
};