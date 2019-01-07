var con = require('../database.js');


function get(data,callback){
    var password = md5(data.password);
    console.log(password);
    var query = "SELECT first_name,last_name,email,role,carts.id as cart_id,orders.id as orders_id FROM users LEFT join carts ON users.id = carts.user_id LEFT JOIN orders ON users.id = orders.user_id WHERE password='"+password+"' AND user_name ="+data.name
    console.log(query);
    con.executeQuery(query,(err,rows)=>{
         if(err) callback(err)
         callback(null,rows)
         
    })
}
function register(data,callback){
    
   var query = buildInsertQuery(data)
    console.log(query);
    con.executeQuery(query,(err,rows)=>{
        if(err) callback(err)
        callback(null,rows)    
   })
}
function update(data,callback){
   var query = "UPDATE `users` SET `id`=[value-1],`first_name`=[value-2],`last_name`=[value-3],`email`=[value-4],`user_name`=[value-5],`role`=[value-6],`password`=[value-7],`city`=[value-8],`street`=[value-9] WHERE id"=id
     //query bulid here 
     con.executeQuery(query,(err,rows)=>{
        if(err) callback(err)
        callback(null,rows)    
   })
}
function remove(data,callback){
     //code here
}
function buildInsertQuery(data,methud,table){
    var qstring = "INSERT INTO users ("
    var values = ")VALUES("
   for (const key in data) {  
       if (key=='password'){
        var element = md5(data[key])
       }
       else{
        var element = data[key];
       }   
       qstring+=key+','
       values+="'"+element+"',"
   }
   var val = values.replace(/.$/,")")
   var query = qstring.replace(/.$/,val)
     return query;  
}

module.exports.login = login;
module.exports.register = register;
module.exports.update = update;
module.exports.remove = remove;


