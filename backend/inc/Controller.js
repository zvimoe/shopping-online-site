var con = require('../database.js');
var md5 = require('md5');

function login(data,callback){
    var password = md5(data.password);
    console.log(password);
    var query = "SELECT first_name,last_name,email,role,carts.id as cart_id,orders.id as orders_id FROM users LEFT join carts ON users.id = carts.user_id LEFT JOIN orders ON users.id = orders.user_id WHERE password='"+password+"' AND user_name ="+data.name
    console.log(query);
    con.executeQuery(query,(err,rows)=>{
         if(err) callback(err)
         callback(null,rows)
         
    })
}
function register(data){
   // data.password = md5(data.password);
    var qstring = "INSERT INTO users ("
    var values = ")VALUES("
   for (const key in data) {  
           const element = data[key];
           qstring+=key+','
           values+=element+','
   }
   var val = values.replace(/.$/,")")
   var query = qstring.replace(/.$/,val)
    console.log(query);
    con.executeQuery(query,(err,rows)=>{
        if(err) callback(err)
        callback(null,rows)
        
   })
}


module.exports.login = login;
module.exports.register = register;

