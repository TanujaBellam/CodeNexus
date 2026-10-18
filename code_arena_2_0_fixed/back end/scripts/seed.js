const mongoose = require('mongoose');
require('dotenv').config();
const { reseed } = require('../utils/seedQuestions');

const seedDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codearena',
      { serverSelectionTimeoutMS: 5000 }
    );
    console.log(`Seed MongoDB Connected: ${conn.connection.host}`);
    await reseed();
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    console.error('Is MongoDB running? Start it, then run `npm run seed` again.');
    process.exit(1);
  }
};

seedDB();
