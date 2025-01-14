import mysql.connector
import json

# Connect to the MySQL database
connection = mysql.connector.connect(
    host="localhost",  # Replace with your database host (e.g., 'localhost')
    user="root",  # Replace with your database username
    password="123",  # Replace with your database password
    database="family_tree"  # Replace with your database name
)

# Create a cursor object
cursor = connection.cursor()

# Your query to fetch the data in JSON format
query = """
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
"""



# Execute the query
cursor.execute(query)

# Fetch the result
result = cursor.fetchone()

# Assuming the result is in a tuple with the JSON in the first position
json_data = result[0]

# Print the JSON result
print(json_data)

# Optionally, you can save the result to a file
with open('family_tree_data.json', 'w') as f:
    json.dump(json.loads(json_data), f, indent=4)

# Close the cursor and connection
cursor.close()
connection.close()

