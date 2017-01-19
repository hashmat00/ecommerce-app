var express = require("express");
var  morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var secret  = require("./config/secret");
var User       = require("./models/user");
var ejs         = require("ejs");
var engine    = require("ejs-mate");

var flash     = require("connect-flash");
var cookieParser  = require("cookie-parser");



var app = express();


mongoose.connect(secret.database);

app.use(express.static(__dirname + "/public"));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(flash());
app.use(cookieParser());

app.use(require("express-session")({
    secret: secret.secretKey,
    resave: true,
    saveUninitialized: true
}));



//restrict user to login
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error    = req.flash('error');
    res.locals.success  = req.flash('success');
    next();
});



var mainRoute  = require("./routes/main");
var userRoute  = require("./routes/user")



app.use(mainRoute);
app.use(userRoute);



app.listen(secret.port, process.env.IP, function(){
    console.log('server has started');
});