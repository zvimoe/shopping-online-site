var con = require('../database.js');
var Ctrl = require('./Controller.js')
var md5 = require('md5');
const table = 'users'

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
    con.executeQuery(query,(err,rows)=>{
        if (err){
            callback(err)
        }
        callback(null, rows)
    })
}
function register(data, callback){
//use Joi here    
uniValidate(data.user_name, 'user_name', table,(res)=>{
        console.log(res);
        if (res == true) {
            
            Ctrl.Create(data,table,(err,rows)=>{
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
var read = Ctrl.Read(table)

var update = Ctrl.Update(table);
    
function remove(id,table,callback) {
    var query = "DELETE FROM "+table+" WHERE id = " + id
    con.executeQuery(query,(err,rows)=>{
        if (err){
            callback(err)
        }
        callback(null, rows)
    })
}
// function buildInsertQuery(data, methud, table) {
//     var qstring = "INSERT INTO users ("
//     var values = ")VALUES("
//     for (const key in data) {
//         if (key == 'password') {
//             var element = md5(data[key])
//         }
//         else {
//             var element = data[key];
//         }
//         qstring += key + ','
//         values += "'" + element + "',"
//     }
//     var val = values.replace(/.$/, ")")
//     var query = qstring.replace(/.$/, val)
//     return query;
// }
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
module.exports.login = login;
module.exports.register = register;
module.exports.read = read;
module.exports.update = update;
module.exports.remove = remove;

