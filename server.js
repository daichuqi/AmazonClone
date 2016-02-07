var express = require('express');
var server = express();
var secret = require('./config/secret')
var PORT = process.env.PORT || secret.PORT;
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');


var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');


mongoose.connect(secret.database,function(err){
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
  secret:secret.secretKey,
  store:new MongoStore({url:secret.database,autoReconnect:true})
}));
server.use(flash());

server.use(passport.initialize());
server.use(passport.session());
server.use(function(req,res,next){
  res.locals.user = req.user;
  next();
});
server.engine('ejs',engine);
server.set('view engine','ejs');

server.use(mainRoutes);
server.use(userRoutes);



server.listen(PORT,function(err){
  if(err) throw err;
  console.log("Server is running on port "+ PORT);
})

