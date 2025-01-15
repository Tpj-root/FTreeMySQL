import bcrypt

def verify_password(plain_text_password, hashed_password):
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_password.encode('utf-8'))

# Example usage:
hashed_password = "$2b$12$Jk7h8pWovRjKQ3D.tOepzuxEsNpWpDZZ1U4nBqNLME5i9KWr3c3Wq"  # Stored in DB
print(verify_password("pass123", hashed_password))  # True
print(verify_password("wrongpass", hashed_password))  # False

