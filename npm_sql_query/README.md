


https://github.com/ApelSYN/node-mysql-query.git

mkdir my-project
cd my-project

npm install



gedit config/default.js







module.exports = {
    database: {
        master: {
            host: "localhost",
            user: "root",
            password: "123",
            port: "3306",
            database: "family_tree",
            connectionLimit: 3
        },
        slave: {
            host: "localhost",
            user: "root",
            password: "123",
            port: "3306",
            database: "family_tree",
            connectionLimit: 3
        }
    }
};




node index.js





sudo service mysql start


node index.js "show databases"

node index.js "show tables"

node index.js "SHOW TABLES FROM family_tree"

node index.js "select * from people family_tree"



[
  RowDataPacket { Tables_in_family_tree: 'family_members' },
  RowDataPacket { Tables_in_family_tree: 'relationships' }
]
sab@debian:~/Desktop/mysql_test_1/node-mysql-query$ node index.js "SHOW TABLES FROM family_tree"
[
  RowDataPacket { Tables_in_family_tree: 'family_members' },
  RowDataPacket { Tables_in_family_tree: 'relationships' }
]
sab@debian:~/Desktop/mysql_test_1/node-mysql-query$ 
sab@debian:~/Desktop/mysql_test_1/node-mysql-query$ node index.js "Select * FROM family_members family_tree"







var query = require('./lib/mysql-query');

// Retrieve the query from the command-line arguments
var qs = process.argv[2]; // Get the second argument (after 'node index.js')

if (!qs) {
    console.error("Error: Please provide a query as a command-line argument.");
    console.error("Usage: node index.js '<SQL_QUERY>'");
    process.exit(1);
}

query(qs, function (err, rows, fields) {
    if (err) {
        console.error("Query Error:", err.message);
        process.exit(1);
    }
    if (rows.length) {
        console.log(rows);
        process.exit(0);
    } else {
        console.error("No results found for the query.");
        process.exit(1);
    }
});




