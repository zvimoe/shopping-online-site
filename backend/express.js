var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs')
var UserCtrl = require('./inc/UserController')
var ItemCtrl = require('./inc/ItemController')
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
// returns a user by id 
app.get('/user/:id', function (req, res) {

    UserCtrl.read(req.params.id,(err,rows)=>{
        if(err){
            res.status('400').send('server error')
        }
        else if(rows){
            if(rows.length>0){
                res.send(rows)
            }
            else{
                res.status('402').send('no users match this id')
                }
            }
    })
});
// returns all users
app.get('/users',function(req,res){
    UserCtrl.read(null,(err,rows)=>{
        if(err){
            res.status('400').send('server error');
        }
        else{
            res.send(rows);
        }
    })
});
app.get('/items',function(req,res){
    UserCtrl.read(null,(err,rows)=>{
        if(err){
            res.status('400').send('server error');
        }
        else{
            res.send(rows);
        }
    })
});
app.post('/items', function (req, res) {

    UserCtrl.items.get(function (err, td) {
        err ? console.log('error' + err) : res.end(JSON.stringify(td));
    })

});
app.get('/orders', function (req, res) {
    dal.dal('select * from suppliers', function (td) {
        res.end(JSON.stringify(td));
    })

});
// Listen to '/item' in POST Verb methods
app.post('/login', function (req, res) {

    UserCtrl.login(req.body, (err, rows) => {
        if (rows.length > 0) {
            if (rows) {

                res.send(JSON.stringify(rows));
            }
        }

        else
            res.send("user doese'nt exsist")

    }); // get the body data of post

})
app.post('/register', function (req, res) {
    UserCtrl.register(req.body, (err, rows) => {
        console.log(err)

        if (rows) {
            if (rows.affectedRows > 0) {
                UserCtrl.login(req.body, (err, rows1) => {
                    if (rows1.length > 0) {
                        if (rows1) {

                            res.send(JSON.stringify(rows1));
                        }
                    }

                    else
                        res.send("an error acurred please registar again")

                });
            }
        }
        else {
            if (err) {
                res.send(err)
            }
            else {
                res.send("an error accurred please try again later")
            }
        }

    }); // get the body data of post

})
app.put('/user/:id',function(req,res){
    UserCtrl.update(req.body,(err,rows)=>{
        if(err){
            res.status('400').send(err);
        }
        else{
            res.send(rows);
        }
    })
})
app.delete('/user/:id',function(req, res){
   
    UserCtrl.remove(req.params.id, (err, result) => {
        if (err) {
            res.status('404').send('user not found')
        }
        if(result){
            res.send(result)
        }

    })
})
// Start the server
var server = app.listen(8081, function () {
    console.log('connected')
})
