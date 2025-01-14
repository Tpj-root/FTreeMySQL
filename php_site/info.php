<?php
$servername = "127.0.0.1"; // Change to your server (or 127.0.0.1 for localhost)
$username = "root";        // Replace with your MySQL username
$password = "123";         // Replace with your MySQL password
$dbname = "my_database";   // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL Query
$query = "SELECT * FROM users";

// Execute the query
$result = $conn->query($query);

if ($result->num_rows > 0) {
    // Start HTML table
    echo "<h2>Users Table</h2>";
    echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
            </tr>";
    
    // Fetch and display data
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . htmlspecialchars($row["id"]) . "</td>
                <td>" . htmlspecialchars($row["name"]) . "</td>
                <td>" . htmlspecialchars($row["email"]) . "</td>
                <td>" . htmlspecialchars($row["created_at"]) . "</td>
              </tr>";
    }
    echo "</table>";
} else {
    echo "0 results found.";
}

// Close connection
$conn->close();
?>

