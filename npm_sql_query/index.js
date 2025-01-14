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

