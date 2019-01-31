var con = require('../database.js');
var Ctrl = require('./Controller.js')
var md5 = require('md5');
const Joi = require('joi');
const schema = {
    id:Joi.number().integer().required(),
    first_name: Joi.string().min(2).max(30).required(),
    last_name: Joi.string().min(2).max(30).required(),
    user_name: Joi.string().min(3).max(30).required(),
    street: Joi.string().min(3).max(30).required(),
    city: Joi.string().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required()
}
const table = 'users'

function login(data, callback) {
    console.log('hello')
    var password = md5(data.password);
    console.log(password);
    var query = `SELECT 
    users.id as id,
    first_name,
    last_name,
    email,
    role,
    carts.id as cart_id,
    carts.active as carts_active,
    orders.shipping_date,
    orders.id as orders_id,
    users.street,
    users.city
    FROM users 
    LEFT join carts ON users.id = carts.user_id 
    LEFT JOIN orders ON carts.id = orders.cart_id 
    WHERE password='` + password + "' AND user_name ='" + data.user_name + "' ORDER BY `carts`.`id` DESC LIMIT 1"
    console.log(query);
    con.executeQuery(query,(err,rows)=>{
        console.log(rows)
        if (err) callback(err,null)
        else callback(null, rows)
    })
}
function register(data, callback){
   
    Joi.validate(data, schema,(error, value) =>{     
        console.log(error)
            if (error) callback(error,null)
           else  Ctrl.Create(table)(data).then((rows)=>
           {
               callback(null,rows)}
            ).catch((err)=>{
                callback(err)
            })
      
    });
}
var read = Ctrl.Read(table);

var update = Ctrl.Update(table);
    
var remove = Ctrl.Delete(table);


module.exports.login = login;
module.exports.register = register;
module.exports.read = read;
module.exports.update = update;
module.exports.remove = remove;

