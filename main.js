var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

// configure app to use bodyParser()
// get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3001;    //set port

// resources css
app.use('/static', express.static(path.join(__dirname, 'resources')))

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});


// start server
app.listen(port);
console.log('Magic happens on port ' + port);
