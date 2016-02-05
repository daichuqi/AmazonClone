var express = require('express');
var server = express();
var PORT = process.env.PORT || 3000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var db = 'mongodb://root:abc123@ds051635.mongolab.com:51635/amazondb';

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

mongoose.connect(db,function(err){
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
server.use(cookieParser());
server.use(session({
  resave:true,
  saveUninitialized:true,
  secret:"Arash@$@"
}));
server.use(flash());

server.engine('ejs',engine);
server.set('view engine','ejs');

server.use(mainRoutes);
server.use(userRoutes);



server.listen(PORT,function(err){
  if(err) throw err;
  console.log("Server is running on port "+PORT);
})

