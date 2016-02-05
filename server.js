var express = require('express');
var server = express();
var PORT = process.env.PORT || 3000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

mongoose.connect('mongodb://root:abc123@ds051635.mongolab.com:51635/amazondb',function(err){
  if(err){
    console.log(err)
  }else{
    console.log("connected to the DB!")
  }
});

server.use(express.static(__dirname+'/public'));
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));
server.engine('ejs',engine);
server.set('view engine','ejs');

server.use(mainRoutes);
server.use(userRoutes);



server.listen(PORT,function(err){
  if(err) throw err;
  console.log("Server is running on port "+PORT);
})

