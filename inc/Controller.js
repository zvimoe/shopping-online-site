var con = require('../database.js');
var md5 = require('md5');
var moment = require('moment');


// a controller with all the core functions of the app to reuse where neccesory 
// and return the function to ohter classes to use 

function Create(table) {

    return function (data) {
        return new Promise(
       function(resolve, reject){
        var query = buildInsertQuery(data, table)
        console.log(query);
        con.executeQuery(query, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
    }
}
function Read(table) {

    return function (id) {

        return new Promise(
            function(resolve, reject){
                let read = "";
                if (id) read = " WHERE id = " + id;
                if (!id) read = "";
                var query = "SELECT * FROM " + table + read
                console.log(query)
                con.executeQuery(query, (err, rows) => {
                    console.log(rows.length)
                    if (err) reject(err)
                    if (rows) resolve(rows)
                })
            })
        }
}
function Update(table) {
    return function (id, data) {
        return new Promise(
            function(resolve, reject){

        //update query build

        let query = "UPDATE " + table + " SET ";
        for (const key in data) {
            query += key + " = '" + data[key] + "',"
        }
        let query2 = "WHERE id = '" + id + "'"
        query = query.replace(/.$/, query2)
        console.log(query)
        con.executeQuery(query, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
    }

}
function Delete(table) {
    
    return function (id) {
        return new Promise(
            function(resolve, reject){
        var query = "DELETE FROM " + table + " WHERE id = " + id
        con.executeQuery(query, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(null, rows)
        })
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

function Find(value, column, table) {
    return new Promise(function (resolve,reject){
   let where = "" 
    if (typeof(value)!='string'&&typeof(value)!='number'){
       for (let i = 0; i < value.length; i++) {
        if(i==0)  where +=  " WHERE " + column[i] + " = '" + value[i] + "'"
        else     where +=  " AND " + column[i] + " = '" + value[i] + "'"     
       }
    }
    else where =  " WHERE " + column + " = '" + value + "'"
    let query = "SELECT * FROM " + table +where 
    console.log(query)
    
    con.executeQuery(query, (err, rows) => {
        if (err) {
            console.log(err)
            reject(err)
        }
        else if (rows.length >= 0) {
            resolve(rows)
        }
        else {
            reject('404')
        }
    })
  }) 
}

function getInitialdata(obj){
//find error
    return new Promise(
        function(resolve,reject){
            var columns = { user: obj }
            //sould call itemscontroller
            Find('1', 'id', 'items').then((res1) => {
                columns.items = res1
                // should call to catagories controller
               return Read('categories')(null)
            }).then((res2) => {
                columns.categories = res2
                
                if (obj.cart_id) return Find(obj.cart_id, 'cart_id', 'cart_items')
                else {
                    // could call to cartController.create(cart_id)
                    let cartData = {
                        user_id:obj.id,
                        date:moment().format("YYYY-MM-DD"),
                        active:1
                    }
                    console.log(cartData)

                    return Create('carts')(cartData)
                }
                
            }).then(function(res){
                console.log(res)
                if(res.insertId){
                    columns.cart_items=null
                    columns.user.cart_id = res.insertId
                }
                else{
                    columns.cart_items=res
                }
                
                console.log(columns)
                resolve(columns)
            }).catch(
                (err)=>{
                    console.log(err)
                    reject(err)
                })
        }
    )
}
    



    module.exports.Create = Create;
    module.exports.Read = Read;
    module.exports.Update = Update;
    module.exports.Delete = Delete;
    module.exports.Find = Find;
    module.exports.getInitialdata = getInitialdata;