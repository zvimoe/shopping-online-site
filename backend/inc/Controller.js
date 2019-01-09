var con = require('../database.js');

function Create(data,table,callback){
    var query = buildInsertQuery(data,table)
    console.log(query);
    callDB(query,(err,rows)=>{
        if (err){
            callback(err)
        }
        callback(null, rows)
    })
}
function Read(){

}
function Update(){

}
function Delete(){

}
function buildInsertQuery(data,table) {
    var qstring = "INSERT INTO "+table+" ("
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
function callDB(query,callback) {
    con.executeQuery(query, (err, rows) => {
        if (err) {
            console.log(err)
            callback("database error")
        }
       callback(rows);
    })
}

module.exports.Create = Create;
module.exports.Read = Read;
module.exports.Update = Update;
module.exports.Delete = Delete;