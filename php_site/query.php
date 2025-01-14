<?php
$servername = "127.0.0.1"; // Your server (localhost or IP address)
$username = "root";        // Replace with your MySQL username
$password = "123";         // Replace with your MySQL password
$dbname = "family_tree";   // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get query from form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $query = $_POST['query'];

    // Use prepared statement to prevent SQL injection (optional: use for SELECT queries too)
    if ($stmt = $conn->prepare($query)) {
        $stmt->execute();

        // Check if it is a SELECT query and handle results
        if (strpos(strtoupper($query), 'SELECT') === 0) {
            $result = $stmt->get_result();
            echo "<h2>Query Results:</h2>";
            echo "<table border='1'>";
            // Display column headers
            echo "<tr>";
            while ($field = $result->fetch_field()) {
                echo "<th>" . htmlspecialchars($field->name) . "</th>";
            }
            echo "</tr>";

            // Display rows
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                foreach ($row as $value) {
                    echo "<td>" . htmlspecialchars($value) . "</td>";
                }
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "Query executed successfully!";
        }

        // Close the statement
        $stmt->close();
    } else {
        echo "Error preparing the query: " . $conn->error;
    }
}

// Close connection
$conn->close();
?>
