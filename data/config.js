var mysql = require('mysql');

// Set database connection credentials
var config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'demo_db',
    queueLimit :0,
    connectionLimit : 0,
   // multipleStatements : true
};

// Create a MySQL pool
//var pool = mysql.createPool(config);
var pool = mysql.createConnection(config);

pool.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
  })

//pool.getConnection.bind(pool)
//console.log('connection created ',pool)


// Export the pool
module.exports = pool;

