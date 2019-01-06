var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs')
var Ctrl = require('./inc/Controller')
const path = require('path');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/node_modules', express.static(path.join(__dirname.replace('\server-side', ''), 'node_modules')))
app.use('/client', express.static(path.join(__dirname.replace('\server-side', ''), 'client')))

// Express - to serve the client
// body parser - To handle the data of post

// Listen to '/' in GET Verb methods - serve the main Angular index.html file
app.get('/', function (req, res) {
   // console.log(path.join(__dirname.replace('\server-side', ''), 'node_modules'));
    fs.readFile('client/index.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        fs.readFile('client/items/item.view.html', 'utf8', function (err, temp) {
            
             res.end(data)
        })
    });
});

// Listen to '/' in GET Verb methods - serve the main Angular index.html file
app.get('/items', function (req, res) {

    Ctrl.items.get(function (err, td) {
        err ? console.log('error' + err) : res.end(JSON.stringify(td));
    })

});

// Listen to '/item' in GET Verb methods
app.get('/suppliers', function (req, res) {
    dal.dal('select * from suppliers', function (td) {
        res.end(JSON.stringify(td));
    })

});

// Listen to '/item' in POST Verb methods
app.post('/login', function (req, res) {
    
   Ctrl.login(req.body,(err,rows)=>{
       if(rows){

       res.send(JSON.stringify(rows));
    }
       
       else
       res.send(null)
       
   }); // get the body data of post
    
})
app.post('/register', function (req, res) {
    Ctrl.register(req.body,(err,rows)=>{
        if(rows){
        res.send(JSON.stringify(rows));
     }
        else
        res.send(null)
        
    }); // get the body data of post
     
 })

// Start the server
var server = app.listen(8081, function () {
    console.log('connected')
})