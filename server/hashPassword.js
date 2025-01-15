const bcrypt = require('bcrypt');

async function hashPassword(password) {
  try {
    const saltRounds = 10; // Number of rounds for salting the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
    return hashedPassword;
  } catch (err) {
    console.error('Error hashing password:', err);
  }
}

// Example usage
const password = 'admin';
hashPassword(password);

