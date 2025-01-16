const bcrypt = require('bcrypt');

// Sample stored hashes (you would typically fetch these from your database)
const users = [
  { username: 'user1', passwordHash: '$2b$10$N2lHUPXAt7AI/ax2hWzCJeNVp9Sd/0m.iMOaHRgxxEaGgZOQOHgk.' },
  { username: 'user2', passwordHash: '$2b$10$uxIYAUkspTsYC0kFQOLrPudPd0dDuIFntwkHIJW9SAOUCpzpUbT1S' },
  { username: 'admin', passwordHash: '$2b$10$U2hMlj1MPXmNa5e9r6l8IucPKKTKr1shRvTMh2BLnoosHdYE1Utye' },
];

// Function to verify password
async function verifyPassword(inputUsername, inputPassword) {
  try {
    // Find the user by username
    const user = users.find(user => user.username === inputUsername);
    
    if (!user) {
      console.log('User not found');
      return;
    }

    // Compare input password with the stored hash
    const match = await bcrypt.compare(inputPassword, user.passwordHash);
    
    if (match) {
      console.log(`${inputUsername} - Password is correct`);
    } else {
      console.log(`${inputUsername} - Incorrect password`);
    }
  } catch (err) {
    console.error('Error verifying password:', err);
  }
}

// Example usage: testing different usernames and passwords
verifyPassword('user1', 'user1'); // Test user1 with correct password
verifyPassword('user2', 'user2'); // Test user2 with correct password
verifyPassword('admin', 'admin'); // Test admin with correct password
verifyPassword('user1', 'user'); // Test user1 with wrong password
verifyPassword('user2', 'user'); // Test user2 with wrong password
verifyPassword('admin', 'admi'); // Test admin with wrong password
