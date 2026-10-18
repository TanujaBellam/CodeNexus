
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const users = [
  { name: 'Aarav Sharma', email: 'aarav@example.com' },
  { name: 'Diya Reddy', email: 'diya@example.com' },
  { name: 'Rohan Gupta', email: 'rohan@example.com' },
  { name: 'Sneha Iyer', email: 'sneha@example.com' },
  { name: 'Karan Mehta', email: 'karan@example.com' }
];

const password = 'Pass@1234';

async function seedUsers() {
  try {
    const uri =
      process.env.MONGODB_URI ||
      'mongodb://127.0.0.1:27017/codearena';

    await mongoose.connect(uri);

    console.log('MongoDB connected successfully');

    const passwordHash = await bcrypt.hash(password, 10);

    for (const user of users) {
      await User.updateOne(
        { email: user.email },
        {
          $set: {
            name: user.name,
            password_hash: passwordHash
          },
          $setOnInsert: {
            email: user.email
          }
        },
        { upsert: true }
      );

      console.log(`User ready: ${user.email}`);
    }

    console.log('All 5 users are ready!');
  } catch (error) {
    console.error('Error creating users:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedUsers();
