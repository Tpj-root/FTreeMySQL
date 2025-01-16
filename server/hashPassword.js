const bcrypt = require('bcrypt');

async function hashPassword(password) {
  try {
    const saltRounds = 10; // Number of rounds for salting the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(`Hashed Password for ${password}:`, hashedPassword);
    return hashedPassword;
  } catch (err) {
    console.error('Error hashing password:', err);
  }
}

// Example usage
hashPassword('admin');
hashPassword('user1');
hashPassword('user2');
