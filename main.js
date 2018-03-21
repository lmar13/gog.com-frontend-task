var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
const fs = require('fs');

const urlData = path.join(__dirname+'/resources/json/data.json')
const urlCart = path.join(__dirname+'/resources/json/cart.json');
// configure app to use bodyParser()
// get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 

// resources 
app.use('/static', express.static(path.join(__dirname, 'resources')))

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

// rest function for Data
app.get('/getAllFromData', function(req, res) {  
    let rawdata = fs.readFileSync(urlData, function(err) {
    if(err) throw err;
        console.log('Read allData success');
    });
    let jsonObj = JSON.parse(rawdata);
    res.setHeader('Content-Type', 'application/json');
    res.send(rawdata);
});

app.post('/getOneFromData', function(req, res) {
    var id = req.body.itemId;
    let rawdata = fs.readFileSync(urlData, function(err) {
    if(err) throw err;
        console.log('Read allData success');
    });
    let jsonObj = JSON.parse(rawdata);
    
    var itemData = jsonObj[id-1];
    itemData = JSON.stringify(itemData, null, 2);
//  console.log(itemData);
    res.setHeader('Content-Type', 'application/json');
    res.send(itemData);
});

app.post('/addToData', function(req, res) {
    let rawdata = fs.readFileSync(urlData, function(err) {
    if(err) throw err;
        console.log('Read allData success');
    });
    let jsonObj = JSON.parse(rawdata);
    
    var number = jsonObj.length % 5;
    var id = jsonObj.length + 1; 
    newItem = jsonObj[number];
    newItem.id = id;
    
    jsonObj.push(newItem);
    
    jsonObj = JSON.stringify(jsonObj, null, 2);
  
    fs.writeFile(urlData, jsonObj, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    
    
    
});

app.post('/deleteFromData', function(req, res) {
   let rawdata = fs.readFileSync(urlData, function(err) {
    if(err) throw err;
        console.log('Read allData success');
    });
    let jsonObj = JSON.parse(rawdata);
    console.log(jsonObj);
    if(jsonObj.length > 5 ){
        jsonObj.slice(-1,1);
        console.log(jsonObj.slice(-1,1));
        
    }
    console.log(jsonObj);
    
    jsonObj = JSON.stringify(jsonObj, null, 2);
    
//    fs.writeFile(urlData, jsonObj, function (err) {
//        if (err) throw err;
//        console.log('Saved!');
//    });
});


// rest function for Cart
app.get('/getAllFromCart', function(req, res) {
  var rawDataCart = fs.readFileSync(urlCart, function(err, data) {
    if (err) throw err;
    console.log('Read data successful');
  });
  
  res.setHeader('Content-Type', 'application/json');
  res.send(rawDataCart);
});

app.post('/addItemToCart', function(req, res) {
  var id = req.body.itemId;
    let rawdata = fs.readFileSync(urlData, function(err) {
    if(err) throw err;
        console.log('Read allData success');
    });
    let jsonObj = JSON.parse(rawdata);
    
    var itemData = jsonObj[id-1];
  
  var rawDataCart = fs.readFileSync(urlCart, function(err) {
    if (err) throw err;
    console.log('Read success!');
  });
  
  var jsonObjCart = JSON.parse(rawDataCart);

  if(JSON.stringify(jsonObjCart[0]) === '{}'){
    jsonObjCart.splice(0,1);
  }
  
  jsonObjCart.push(itemData);
  jsonObjCart = JSON.stringify(jsonObjCart, null, 2);
  
  fs.writeFile(urlCart, jsonObjCart, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  
  res.setHeader('Content-Type', 'application/json');
  res.send('success');
});

app.post('/deleteAllFromCart', function(req, res){
  fs.writeFile(urlCart, '[{}]', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});

app.post('/deleteOneFromCart', function(req, res) {
  var id = req.body.itemId;
  console.log('id', id);
  var rawDataCart = fs.readFileSync(urlCart, function(err) {
    if (err) throw err;
    console.log('Read success!');
  });
  
  var jsonObjCart = JSON.parse(rawDataCart);
  
  //if(JSON.stringify(jsonObjCart[0]) !== '{}'){
    //jsonObjCart.splice(id-1,1);
      for(var i in jsonObjCart){
          if(jsonObjCart[i].id == id){
                jsonObjCart.splice(i,1);
          }
      }
    jsonObjCart = JSON.stringify(jsonObjCart, null, 2);
    
    fs.writeFile(urlCart, jsonObjCart, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  //}
  //else {
    //jsonObjCart = JSON.stringify(jsonObjCart, null, 2);
  //}
  
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

