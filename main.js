var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
const fs = require('fs');

// configure app to use bodyParser()
// get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let rawdata = fs.readFileSync(path.join(__dirname+'/resources/json/data.json'), function(err) {
  if(err) throw err;
  console.log('Read allData success');
});
let jsonObj = JSON.parse(rawdata); 

// resources 
app.use('/static', express.static(path.join(__dirname, 'resources')))

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

// get all data from json file
app.get('/getAllFromData', function(req, res) {  
   res.setHeader('Content-Type', 'application/json');
   res.send(rawdata);
});

app.get('/getOneFromData', function(req, res) {
  var id = req.body.itemId;
  var itemData = [];
  itemData.push(jsonObj[id-1]);
  itemData = JSON.stringify(itemData, null, 2);
  console.log(itemData);
  res.setHeader('Content-Type', 'application/json');
  res.send(itemData);
});

app.get('/getAllFromCart', function(req, res) {
  var rawDataCart = fs.readFileSync(path.join(__dirname+'/resources/json/cart.json'), function(err) {
    if (err) throw err;
    console.log('Read success!');
  });
  
  res.setHeader('Content-Type', 'application/json');
  res.send(rawDataCart);
});

app.post('/addItemToCart', function(req, res) {
  var id = req.body.itemId;
  var itemData = jsonObj[id-1];
  
  var rawDataCart = fs.readFileSync(path.join(__dirname+'/resources/json/cart.json'), function(err) {
    if (err) throw err;
    console.log('Read success!');
  });
  
  var jsonObjCart = JSON.parse(rawDataCart);

  if(JSON.stringify(jsonObjCart[0]) === '{}'){
    jsonObjCart.splice(0,1);
  }
  
  jsonObjCart.push(itemData);
  jsonObjCart = JSON.stringify(jsonObjCart, null, 2);
  
  fs.writeFile(path.join(__dirname+'/resources/json/cart.json'), jsonObjCart, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonObjCart);
});

app.post('/deleteAllFromCart', function(req, res){
  fs.writeFile(path.join(__dirname+'/resources/json/cart.json'), '[{}]', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});

app.post('/deleteOneFromCart', function(req, res) {
  var id = req.body.itemId;
  
  var rawDataCart = fs.readFileSync(path.join(__dirname+'/resources/json/cart.json'), function(err) {
    if (err) throw err;
    console.log('Read success!');
  });
  
  var jsonObjCart = JSON.parse(rawDataCart);
  
  if(JSON.stringify(jsonObjCart[0]) !== '{}'){
    jsonObjCart.splice(id-1,1);
    jsonObjCart = JSON.stringify(jsonObjCart, null, 2);
    
    fs.writeFile(path.join(__dirname+'/resources/json/cart.json'), jsonObjCart, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }
  else {
    jsonObjCart = JSON.stringify(jsonObjCart, null, 2);
  }
  
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonObjCart);
});

// start server
var server = app.listen(3000, '0.0.0.0', () => {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Server is running on http://%s:%s', host, port);
}).on('error', (err) => {
  app.listen(3001);
});

