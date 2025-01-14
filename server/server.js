const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Import the cors module

const app = express();

// Enable CORS for all origins
app.use(cors());

// API key for authentication
const API_KEY = 'iamsab';

// Middleware to check API key
app.use((req, res, next) => {
  const userKey = req.query.key;
  if (userKey !== API_KEY) {
    return res.status(403).json({ error: 'Forbidden: Invalid API key' });
  }
  next();
});

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',        // Replace with your MySQL host
  user: 'root',             // Replace with your MySQL username
  password: '123',          // Replace with your MySQL password
  database: 'family_tree',  // Replace with your database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Define the API endpoint for relationships
app.get('/api/relationships', (req, res) => {
  const query = 'SELECT * FROM relationships'; // Your query for relationships table
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Query error:', err.stack);
      return res.status(500).send('Error fetching data');
    }
    res.json(results); // Send the query results as JSON
  });
});

// Define the new API endpoint for family_members
app.get('/api/people', (req, res) => {
  const query = 'SELECT * FROM people'; // Your query for family_members table
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Query error:', err.stack);
      return res.status(500).send('Error fetching family members');
    }
    res.json(results); // Send the query results as JSON
  });
});


// Define the new API endpoint for family_members
// Define the new API endpoint for family members
app.get('/api/sab', (req, res) => {
  const query = `
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', CAST(p.id AS CHAR),
        'rels', JSON_OBJECT(
          'mother', IFNULL((SELECT r.related_person_id FROM relationships r WHERE r.person_id = p.id AND r.relation_type = 'mother' LIMIT 1), ''),
          'father', IFNULL((SELECT r.related_person_id FROM relationships r WHERE r.person_id = p.id AND r.relation_type = 'father' LIMIT 1), ''),
          'children', IFNULL((SELECT JSON_ARRAYAGG(CAST(r.related_person_id AS CHAR)) FROM relationships r WHERE r.person_id = p.id AND r.relation_type = 'children'), JSON_ARRAY()),
          'spouses', IFNULL((SELECT JSON_ARRAYAGG(CAST(r.related_person_id AS CHAR)) FROM relationships r WHERE r.person_id = p.id AND r.relation_type = 'spouses'), JSON_ARRAY())
        ),
        'data', JSON_OBJECT(
          'first name', IFNULL(p.first_name, ''),
          'last name', IFNULL(p.last_name, ''),
          'birthday', IFNULL(p.birthday, ''),
          'avatar', IFNULL(p.avatar, ''),
          'gender', IFNULL(p.gender, '')
        )
      )
    ) AS result
    FROM people p;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Query error:', err.stack);
      return res.status(500).send('Error fetching family members');
    }

    const jsonResponse = results[0]?.result ? JSON.parse(results[0].result) : [];
    res.json(jsonResponse);
  });
});


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

