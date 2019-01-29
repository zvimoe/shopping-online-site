var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs')
var UserCtrl = require('./inc/UserController')
var ItemCtrl = require('./inc/ItemController')
var CartCtrl = require('./inc/CartController')
var OrderCtrl = require('./inc/OrderController')
var Ctrl = require('./inc/Controller')
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const path = require('path');


var app = express();
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/node_modules', express.static(path.join(__dirname.replace('\server-side', ''), 'node_modules')))
app.use('/', express.static('public'))
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
    fs.readFile('public/index.html', 'utf8', function (err, data) {
        if (err) return res.status('500').send(err)
        if (data) return res.send(data)
        
        
    });
});
// get the session from the servs it to the Angular app 
app.get('/getsession',function(req,res){

   var data={session:req.session.user};
   console.log(data)
   OrderCtrl.read(null).then(
        (res1)=>{
            data.orderCount =  res1.length
        }
    ).then(
        ItemCtrl.read(null).then((res2)=>{
             data.itemsCount = res2.length
             res.send(data)
        })
    )
    
})
app.get('/logout',function(req,res){
    req.session.user=[];
    fs.readFile('public/index.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        if (data) return res.send(data)
        
    });
})
app.post('/login', function (req, res) {

    UserCtrl.login(req.body, (err, rows) => {
        console.log(req.body)
        if (err) return res.status('500').send(err)
        if (rows && rows.length > 0){
            rows[0].new = 0 ;
            req.session.user = rows[0];
            return res.send(rows[0]);
        } 
        if (rows && rows.length < 1) return res.status('404').send("one or more of the details are incorrect")

    }); // get the body data of post
})
app.get('/start_shopping',function(req,res){

    if(req.session.user){
        Ctrl.getInitialdata(req.session.user).then((res2)=>{
            return CartCtrl.initialize(res2)
        }).then((data)=>{
            
             return res.send(data)
        }).catch((err)=>{
            return res.send('error'+err)
        })
        }
    else return res.status("502").send("Please Login in order to start shopping")
       
})
app.get('/find-user/:id',function(req,res){
    let prm = req.params
    Ctrl.Find(prm.id,'id','users').then((finding)=>{
        if (finding.length==0)return res.status(404).send('not found')
        return res.send('found')
    })
})
app.get('/find-item/:id',function(req,res){
    let prm = req.params
    Ctrl.Find(prm.name,'name','items',(finding)=>{
        if (finding==[])return res.status(404).send('not found')
        return res.send('found')
    }).catch((err)=>{
        return res.send(err)
    })
})
// returns a user by id 
app.get('/user/:id', function (req, res) {

    if (!Number(req.params.id)) return res.status('502').send('"id" must be a number')
    UserCtrl.read(req.params.id).then((rows) => {
    
            if (rows.length > 0) return res.send(rows)
        
       else return res.status('404').send('user not found')
    }).catch((err)=>{
        return res.status('502').send('server error')
    })

})
app.get('/category/items/:id',function(req,res){
    Ctrl.Find(req.params.id,'category_id','items').then(
        (res1)=>{
            res.send(res1)
        }
    ).catch((err)=>{
           res.status('500').send(err)
    })
})
// returns all users
app.get('/users', function (req, res) {
    UserCtrl.read(null).then((rows) => {
        return res.send(rows)
    }).catch((err)=>{
        if (err) return res.status('502').send(err);
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
                    rows1[0].new = 1 
                    req.session.user = rows1[0];
                    if (rows1) return res.send(JSON.stringify(req.session.user))
                   // return res.send("an error acurred please registar again")
                }
            })
        }
    })
})
app.put('/user/:id', function (req, res) {
    if (!Number(req.params.id)) return res.status('502').send('"id" must be a number')
    UserCtrl.update(req.params.id, req.body).then((rows) => {
        if (rows) if (rows.length > 0) return res.send(rows);
        return res.status('404').send('user not found')
        
    }).catch((err)=>{})
    return res.status('404').send('user not found')
})
app.delete('/user/:id', function (req, res) {
    if (req.session.userid != "1") return res.status('400').send('you need to be an admin for this action')
    if (!Number(req.params.id)) return res.status('500').send('"id" must be a number')
    UserCtrl.remove(req.params.id).then((result) => {
        if (result.affectedRows < 1) return res.status('404').send('user not found')
        return res.send(result)
    }).catch((err)=>{
       return res.status('502').send(err)
    })
})
app.get('/cart_items', function (req, res) {
    CartCtrl.read(req.session.user.cart_id).then((rows)=>{
        res.send(rows)
    }
    ).catch((err)=>{
        res.send(err)
    })
});
app.post('/gjg', function (req, res) {

    UserCtrl.items.get(function (err, td) {
        err ? console.log('error' + err) : res.end(JSON.stringify(td));
    })

});
app.post('/cart_items',function(req,res){
      let suser =req.session.user;
      params = req.body;
      params.cart_id = suser.cart_id;
      console.log(params)
     CartCtrl.add(params).then((res1)=>{
         
           if(res1)if(res1.affectedRows>0){
              return res.send('item added')
           }
      }).catch((err)=>{
          console.log(err)
        return res.status('500').send(err)
      })

})
app.post('/order',function(req,res){
    var user = req.session.user
       OrderCtrl.create(req.body).then((res)=>{
           user.orders_id = res.insertId 
           user.orders_active = 1
       })
       .then(
           CartCtrl.updateCart(req.body.cart_id,{active:0})
        .then(
            CartCtrl.createCart(req.body.user_id)
        .then((res)=>{
               user.cart_id = res.insertId
                 
            }).then(()=>{
                req.session.user=user
                res.send(user)
            })
        )
    )
       .catch((err)=>{res.status('500').send(err)})
})
app.get('/orders', function (req, res) {
    dal.dal('select * from suppliers', function (td) {
        res.end(JSON.stringify(td));
    })

});

// Start the server
var server = app.listen(8081, function () {
    console.log('connected')
})
