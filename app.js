var express = require("express");
var  morgan = require("morgan");

var app = express();


app.use(morgan('dev'));



app.get('/', function(req, res){
    res.json('homepage');
});


app.get('/catname', function(req, res){
    res.json('added morgan');
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server has started');
});