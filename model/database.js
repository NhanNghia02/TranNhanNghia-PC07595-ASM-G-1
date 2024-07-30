var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'node'
});

db.connect(function(err){
    if(err) throw err;
    console.log('Kết nối database thành công !!!');
});

module.exports = db;