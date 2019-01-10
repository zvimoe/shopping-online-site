var con = require('../database.js');

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
        if (id) {
            read = " WHERE id = " + id;
        }
        else {
            read = "";
        }
        var query = "SELECT * FROM " + table + read
        con.executeQuery(query, (err, rows) => {
            if (err) {
                callback(err)
            }
            callback(null, rows)
        })
    }

}
function Update(table) {
    return function (data, callback) {

        //update query build

        let query = "UPDATE " + table + " SET ";
        let id = data.id;
        delete data['id'];
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


module.exports.Create = Create;
module.exports.Read = Read;
module.exports.Update = Update;
module.exports.Delete = Delete;