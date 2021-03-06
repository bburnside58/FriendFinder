// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// require('./app/routing/api-routes.js')(app); 
// require('./app/routing/html-routes.js')(app);

//sets up external routes
//this line is to access my favicon and css, and generally anything within the public folder..
app.use(express.static(path.join(__dirname, 'app', 'public')));

// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on %d', PORT);
})


//Friends storage array
var friendsList = [

	{
		routeName: "judefortune",
		name: "Jude Fortune",
		photo: "https://www.facebook.com/jude.b.fortune",
		scores: [4, 2, 1, 5, 2, 3, 2, 2, 4, 5]		
	
	},

	{
		routeName: "brianburnside",
		name: "Brian Burnside",
		photo: "https://twitter.com/bburnside58",
		scores: [3, 1, 4, 2, 3, 3, 4, 2, 3, 4]
	}
];





// Routes
// =============================================================

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

// Search for matching friend - provides JSON
app.get('/api/:friendsList?', function(req, res){

	var chosen = req.params.friendsList;

	if(chosen){
		console.log(chosen);

		for (var i=0; i <friendsList.length; i++){

			if (chosen == friendsList[i].routeName){
				res.json(friendsList[i]);
				return;
			}
		}

		res.json(false);
	}

	else{
		res.json(friendsList);
	}
})

















// Create New Friends - takes in JSON input
app.post('/api/new', function(req, res){

	var newfriend = req.body;
	newfriend.routeName = newfriend.name.replace(/\s+/g, '').toLowerCase()

	console.log(newfriend);

	friendsList.push(newfriend);

	res.json(newfriend);
})
