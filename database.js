const mysql = require('mysql');

var executeQuery =function(query,callback){
const con = mysql.createConnection(
    // connection details
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'online_store'
    }
);

// 3.cconnect
con.connect(function (err) {
    if (err) {
        console.log('Error connecting to DB:' + err);
        return;
    }
    console.log('Connected');
});

// 4. crud : insert
// use backtick `` for free text
con.query(query, function (err, rows) {
    var arr=[]
    if (err) {
        callback(err)
    }
   
   callback(null,rows);
});
con.end();
};
module.exports.executeQuery=executeQuery;