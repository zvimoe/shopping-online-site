var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs')
var UserCtrl = require('./inc/UserController')
var ItemCtrl = require('./inc/ItemController')
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const path = require('path');


var app = express();
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/node_modules', express.static(path.join(__dirname.replace('\server-side', ''), 'node_modules')))
app.use('/client', express.static(path.join(__dirname.replace('\server-side', ''), 'client')))
app.use(session({
    name: 'server-session-cookie-id',
    secret: 'my express secret',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
  }));
  app.use(function printSession(req, res, next) {
    console.log('req.session', req.session);
    return next();
  });
  app.get('/', function initViewsCount(req, res, next) {
    if (typeof req.session.usrID === 'number') {
    }
    return next();
  });
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
app.post('/login', function (req, res) {

    UserCtrl.login(req.body, (err, rows) => {
        if (err) return res.status('500').send(err)
        if (rows && rows.length > 0){
            req.session.user = rows;
            return res.send(JSON.stringify(rows));
        } 
        res.send("user doese'nt exsist")

    }); // get the body data of post
})
// returns a user by id 
app.get('/user/:id', function (req, res) {

    if (!Number(req.params.id)) return res.status('502').send('"id" must be a number')
    UserCtrl.read(req.params.id, (err, rows) => {
        console.log(err)
        console.log(rows)
        console.log('done')
        if (err) return res.status('502').send('server error')
        if (rows) {
            if (rows.length > 0) return res.send(rows)
        }
        return res.status('404').send('user not found')
    })

})

// returns all users
app.get('/users', function (req, res) {
    UserCtrl.read(null, (err, rows) => {
        if (err) return res.status('502').send(err);
        return res.send(rows);
        
    })
});
app.post('/user', function (req, res) {
    UserCtrl.register(req.body, (err, rows) => {
        if (err) return res.status('502').send(err);
        console.log(err)
        if (rows) if (rows.affectedRows > 0) {
            UserCtrl.login(req.body, (err, rows1) => {
                if (err) return res.status('502').send(err);
                if (rows1) if (rows1.length > 0) {
                    if (rows1) return res.send(JSON.stringify(rows1))
                    return res.send("an error acurred please registar again")
                }
            })
        }
    })
})
app.put('/user/:id', function (req, res) {
    if (!Number(req.params.id)) return res.status('502').send('"id" must be a number')
    UserCtrl.update(req.params.id, req.body, (err, rows) => {
        if (err) return res.status('502').send(err);
        if (rows) if (rows.length > 0) return res.send(rows);
        return res.status('404').send('user not found')
    })

    return res.status('404').send('user not found')
})
app.delete('/user/:id', function (req, res) {
    if (req.session.userid != "1") return res.status('400').send('you need to be an admin for this action')
    if (!Number(req.params.id)) return res.status('500').send('"id" must be a number')
    UserCtrl.remove(req.params.id, (err, result) => {
        if (err) return res.status('502').send(err)
        if (result.affectedRows < 1) return res.status('404').send('user not found')
        return res.send(result)
    })
})
app.get('/items', function (req, res) {
    ItemCtrl.read(null, (err, rows) => {
        if (err) return res.status('400').send('server error');

        return res.send(rows);

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

// Start the server
var server = app.listen(8081, function () {
    console.log('connected')
})
