var express = require("express");
var  morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User       = require("./models/user");
var ejs         = require("ejs");
var engine    = require("ejs-mate");

var app = express();


mongoose.connect("mongodb://localhost/ecommerce");

app.use(express.static(__dirname + "/public"));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', engine);
app.set('view engine', 'ejs');


var mainRoute  = require("./routes/main");
var userRoute  = require("./routes/user")



app.use(mainRoute);
app.use(userRoute);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server has started');
});