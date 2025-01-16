const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const port = 3000;

// Enable CORS for all domains
app.use(cors());

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',        // Replace with your MySQL host
  user: 'root',             // Replace with your MySQL username
  password: '123',          // Replace with your MySQL password
  database: 'family_tree',  // Replace with your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

app.use(bodyParser.json()); // To parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // To parse form data

// POST route for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database for the user
  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error fetching user from database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {
      const user = results[0];
      // Compare the hashed password stored in the database with the user-provided password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        if (isMatch) {
          res.send('Login successful');
        } else {
          res.status(401).send('Invalid username or password');
        }
      });
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

