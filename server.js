var express = require('express');
var server = express();
var PORT = process.env.PORT || 3000;

server.listen(PORT,function(err){
  if(err) throw err;
  console.log("Server is running on port "+PORT);
})

