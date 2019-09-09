// Require packages and set the port
var express = require('express');
var port = 3002;
var bodyParser = require('body-parser');
var routes = require('./routes/routes');
var app = express();

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

routes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});