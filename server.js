var express = require('express')
var app = express();


var program_name = process.argv[0];
var script_path = process.argv[1];
var port_string = process.argv[2];

// Code to print information from command line
console.log("program_name=" + program_name);
console.log("script_path=" + script_path);
console.log("port_string=" + port_string);


// Setup a basic hello endpoing
app.get('/hello', function(req, res) {
	res.type('text/plain');
	res.send('I am a beautiful butterfly');
});


var port_value = "4444";

// Basic provisions to run more than one server if we want to
// Test if the port is undefined and the length is greater than zero
if (typeof port_string !== 'undefined' && port_string.length > 0) {
	port_value = port_string;
}



app.listen(Number(port_value));
console.log("Server running");