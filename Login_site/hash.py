import bcrypt

def hash_password(plain_text_password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(plain_text_password.encode('utf-8'), salt).decode('utf-8')

# Example usage:
print(hash_password('pass123'))  # Replace 'pass123' with your desired password
print(hash_password('hello123'))
print(hash_password('admin2024'))

