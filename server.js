var express = require('express');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// register JSON body parser for POST, UPDATE, DELETES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// Database connection information
var db;
var mongodbURL;


var program_name = process.argv[0]; 
var script_path = process.argv[1]; 
var port_string = process.argv[2]; 
var env_value = process.argv[3];


// Code to print information from command line
console.log("program_name=" + program_name);
console.log("script_path=" + script_path);
console.log("port_string=" + port_string);


var port_value = "4444";

// Basic provisions to run more than one server if we want to
// Test if the port is undefined and the length is greater than zero
if (typeof port_string !== "undefined" && port_string.length > 0) {
	port_value = port_string;
}


if (env_value === "undefined") {
  console.log("env_value is not set");
  return -1;
}
else {
  switch(env_value) {
    case "DEV":
		// mongodbURL = "mongodb://locahost:27017/Noddy";
		mongodbURL = "mongodb://test:password@ds155737.mlab.com:55737/noddy";
		console.log("environment = " + mongodbURL);
      	break;

    default:
      console.log("env_value is not valid: " + env_value);
      return -1;
  }
}



app.set('public', path.join(__dirname, 'public'));

console.log("Directory name: " + __dirname);
console.log("Filename: " + __filename);
console.log(app.get('public'));

app.use(express.static(app.get('public')));


// Handle 404 issues
//app.use(function(req, res, nest) {
//	res.status(404);
//	res.sendFile(path.join(__dirname, './public', '404.html'));
//})


// Handle stack trace errors
//app.use(function(err, req, res, next) {
//	console.error(err.stack);
//	res.status(500);
//	res.sendFile(path.join(__dirname, './public', '500.html'));
//});


MongoClient.connect(mongodbURL, function(err, dbConnection){
  assert.equal(null, err);
  console.log("connected successfully to mongodb server: " + mongodbURL);
  db = dbConnection;
	//console.log(dbConnection);
	app.set("dbConnection", dbConnection);

// create mongodb index if it does not already exist
var userCollection = dbConnection.collection("user");
    userCollection.createIndex({"loc": "2d"});

require('./routes/things')(app);
require('./routes/users')(app);

app.listen(Number(port_value));
console.log("Node server running on port " + port_value);

});