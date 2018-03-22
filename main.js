var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
const fs = require('fs');

const urlData = path.join(__dirname + '/resources/json/data.json')
const urlCart = path.join(__dirname + '/resources/json/cart.json');
// configure app to use bodyParser()
// get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



// resources 
app.use('/static', express.static(path.join(__dirname, 'resources')))


// url to index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});

// rest function for Data
// get all data
app.get('/getAllFromData', function (req, res) {
    let rawdata = fs.readFileSync(urlData, function (err) {
        if (err) throw err;
        console.log('Read allData success');
    });
    let jsonObj = JSON.parse(rawdata);
    res.setHeader('Content-Type', 'application/json');
    res.send(rawdata);
});

// get one from data, param itemId
app.post('/getOneFromData', function (req, res) {
    var id = req.body.itemId;
    let rawdata = fs.readFileSync(urlData, function (err) {
        if (err) throw err;
        console.log('Read allData success');
    });
    let jsonObj = JSON.parse(rawdata);

    var itemData = jsonObj[id - 1];
    itemData = JSON.stringify(itemData, null, 2);
    //  console.log(itemData);
    res.setHeader('Content-Type', 'application/json');
    res.send(itemData);
});

// add sample element to data
app.post('/addToData', function (req, res) {
    let rawdata = fs.readFileSync(urlData, function (err) {
        if (err) throw err;
        console.log('Read allData success');
    });
    let jsonObj = JSON.parse(rawdata);

    var id = jsonObj.length + 1;
    var newItem = {
        "id": id,
        "title": "Sample Game Title",
        "image": "static/img/sample.png",
        "priceBtn": 9.99,
        "discount": false
    };

    jsonObj.push(newItem);
    var length = jsonObj.length;

    jsonObj = JSON.stringify(jsonObj, null, 2);

    fs.writeFile(urlData, jsonObj, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    res.send("Element added successfully. Number of elements: " + length);
});

// delete sample element from data 
app.post('/deleteFromData', function (req, res) {
    let rawdata = fs.readFileSync(urlData, function (err) {
        if (err) throw err;
        console.log('Read allData success');
    });
    let jsonObj = JSON.parse(rawdata);

    if (jsonObj.length > 5) {
        jsonObj.splice(-1, 1);
        var length = jsonObj.length;
        jsonObj = JSON.stringify(jsonObj, null, 2);

        fs.writeFile(urlData, jsonObj, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        res.send("Element deleted successfully. Number of elements: " + length);
    } else {
        res.send("Can't be less then 5 elements");
    }
});


// rest function for Cart
// get all items in cart
app.get('/getAllFromCart', function (req, res) {
    var rawDataCart = fs.readFileSync(urlCart, function (err, data) {
        if (err) throw err;
        console.log('Read data successful');
    });

    res.setHeader('Content-Type', 'application/json');
    res.send(rawDataCart);
});

// add one element to cart, param itemId
app.post('/addItemToCart', function (req, res) {
    var id = req.body.itemId;
    let rawdata = fs.readFileSync(urlData, function (err) {
        if (err) throw err;
        console.log('Read allData success');
    });
    let jsonObj = JSON.parse(rawdata);

    var itemData = jsonObj[id - 1];

    var rawDataCart = fs.readFileSync(urlCart, function (err) {
        if (err) throw err;
        console.log('Read success!');
    });

    var jsonObjCart = JSON.parse(rawDataCart);

    if (JSON.stringify(jsonObjCart[0]) === '{}') {
        jsonObjCart.splice(0, 1);
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

// delete all elements in cart
app.post('/deleteAllFromCart', function (req, res) {
    fs.writeFile(urlCart, '[{}]', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
});

// delete one element in cart, param itemId
app.post('/deleteOneFromCart', function (req, res) {
    var id = req.body.itemId;
    console.log('id', id);
    var rawDataCart = fs.readFileSync(urlCart, function (err) {
        if (err) throw err;
        console.log('Read success!');
    });

    var jsonObjCart = JSON.parse(rawDataCart);

    //if(JSON.stringify(jsonObjCart[0]) !== '{}'){
    //jsonObjCart.splice(id-1,1);
    for (var i in jsonObjCart) {
        if (jsonObjCart[i].id == id) {
            jsonObjCart.splice(i, 1);
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
    app.listen(3001, '0.0.0.0', () => {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Server is running on http://%s:%s', host, port);
    });
});
