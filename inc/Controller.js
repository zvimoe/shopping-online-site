var con = require('../database.js');
var md5 = require('md5');


// a controller to handle crud functions 
// and return the function to ohter classes to use 

function Create(table) {

    return function (data, callback) {
        var query = buildInsertQuery(data, table)
        console.log(query);
        con.executeQuery(query, (err, rows) => {
            if (err) {
                callback(err)
            }
            callback(null, rows)
        })
    }
}
function Read(table) {

    return function (id, callback) {
        let read = "";
        if (id) read = " WHERE id = " + id;
        if (!id) read = "";
        var query = "SELECT * FROM " + table + read
        con.executeQuery(query, (err, rows) => {
            if (err)  callback(err)
            if (rows) callback(null,rows)
        })
    }

}
function Update(table) {
    return function (id,params, callback) {

        //update query build

        let query = "UPDATE " + table + " SET ";
        for (const key in data) {
                query+= key+" = '"+data[key]+"',"    
            }
        let query2= "WHERE id = '"+id+"'"
        query  = query.replace(/.$/, query2)
        console.log(query)
        con.executeQuery(query, (err, rows) => {
            if (err) {
                callback(err)
            }
            callback(null, rows)
        })
    }
}
function Delete(table) {
    return function(id,callback){
        var query = "DELETE FROM " + table + " WHERE id = " + id
        con.executeQuery(query, (err, rows) => {
            if (err) {
                callback(err)
            }
            callback(null, rows)
        })
    }
    
}
function buildInsertQuery(data, table) {
    var qstring = "INSERT INTO " + table + " ("
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
function Find (value, column, table,callback) {
    let query = "SELECT * FROM " + table + " WHERE " + column + " = '" + value + "'"
    console.log(query);
    con.executeQuery(query, (err, rows) => {
        if (err) {
            console.log(err)
            callback(err)
        }
        else if (rows.length > 0) {
            callback(rows)
        }
        else {
            callback('404')
        }
    })
}
function getInitialdata(obj,callback){
    let columns = {user:obj}
       
       Find(obj.cart_id,'cart_id','cart_items',(res)=>{
        columns.cart_items = res
       
       Find('1','id','items',(res)=>{
        columns.items = res
       
       Read('categories')(null,(err,res)=>{
              if (err) columns.items = null
              else columns.categories = res
              callback(null,columns)
       })
      
    })
    
})

       
       

       

    
        
}



module.exports.Create = Create;
module.exports.Read = Read;
module.exports.Update = Update;
module.exports.Delete = Delete;
module.exports.Find = Find;
module.exports.getInitialdata = getInitialdata;