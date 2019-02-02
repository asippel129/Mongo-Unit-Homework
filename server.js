//dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//set up port
var PORT = process.env.PORT || 3000;

//instantiate Express app
var app = express();

//Express router
var router = express.Router();

//designate public folder as static directory
app.use(express.static(__dirname + "/public"));

//connect Handlebars to Express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//in order ot use bodyParser in our app
app.use(bodyParser.urlencoded({
    extended: false
}));

//have every request go thru our router middleware
app.use(router);

//if deployed, use the deployed db. Otherwise use the local mongoHeadlines db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to our db
mongoose.connect(MONGODB_URI, function(error) {
    //log any errors connecting w mongoose
    if (error) {
        console.log(error);
    }
    //otherwise, log a successful message
    else {
        console.log("mongoose connection successful");
    }
});

//listen on the port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});