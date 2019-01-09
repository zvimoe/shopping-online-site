var con = require('../database.js');
var Ctrl = ('../inc/Controller.js')
var md5 = require('md5');

function login(data, callback) {
    var password = md5(data.password);
    console.log(password);
    var query = `SELECT 
    first_name,
    last_name,
    email,
    role,
    carts.id as cart_id,
    orders.id as orders_id
    FROM users 
    LEFT join carts ON users.id = carts.user_id 
    LEFT JOIN orders ON users.id = orders.user_id 
    WHERE password='` + password + "' AND user_name ='" + data.user_name + "'";
    console.log(query);
    var rows = callDB(query,(rows)=>{
        callback(null, rows)
    })
    
}
function register(data, callback){
//use Joi here    
uniValidate(data.user_name, 'user_name', 'users',(res)=>{
        console.log(res);
        if (res == true) {
    
            // var query = buildInsertQuery(data)
            // console.log(query);
            // var rows = callDB(query,(rows)=>{
            //     console.log(rows);
            //     callback(null, rows)
            // })
            
            Ctrl.Create(data,'users',(err,rows)=>{
                   if(err){
                       callback(err,null)
                   }
                   if(rows){
                       callback(null,rows)
                   }
            })
            
        }
        else if (res == false) {
            callback("the user " + data.user_name + " already exsists")
        }
        else {
            callback(res)
        }
    })
}
function update(data, callback) {
    var query = "UPDATE `users` SET `id`=[value-1],`first_name`=[value-2],`last_name`=[value-3],`email`=[value-4],`user_name`=[value-5],`role`=[value-6],`password`=[value-7],`city`=[value-8],`street`=[value-9] WHERE id=" + id
    //query bulid here 
    var rows = callDB(query)
    callback(null, rows)
}
function remove(id, callback) {
    var query = "DELETE FROM users WHERE id = " + id
    callDB(query,(rows)=>{
          callback(null, rows)
     })
}
function buildInsertQuery(data, methud, table) {
    var qstring = "INSERT INTO users ("
    var values = ")VALUES("
    for (const key in data) {
        if (key == 'password') {
            var element = md5(data[key])
        }
        else {
            var element = data[key];
        }
        qstring += key + ','
        values += "'" + element + "',"
    }
    var val = values.replace(/.$/, ")")
    var query = qstring.replace(/.$/, val)
    return query;
}
function uniValidate(value, column, table,callback) {
    let query = "SELECT * FROM " + table + " WHERE " + column + " = '" + value + "'"
    console.log(query);
    con.executeQuery(query, (err, rows) => {
        if (err) {
            console.log(err)
            callback(err)
        }
        else if (rows.length > 0) {
            callback(false)
        }
        else {
            callback(true)
        }
    })
}
function callDB(query,callback) {
    con.executeQuery(query, (err, rows) => {
        if (err) {
            console.log(err)
            callback("database error")
        }
       callback(rows);
    })
}


module.exports.login = login;
module.exports.register = register;
module.exports.update = update;
module.exports.remove = remove;


