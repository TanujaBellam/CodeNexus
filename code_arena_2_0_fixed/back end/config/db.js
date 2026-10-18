const mongoose = require('mongoose');
const { seedIfEmpty } = require('../utils/seedQuestions');

const DEFAULT_URI = 'mongodb://127.0.0.1:27017/codearena';
let memoryServer = null;

async function connectTo(uri) {
  const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  await seedIfEmpty();
}

// Optional fallback: in-memory MongoDB (run `npm i mongodb-memory-server` once).
// Data is lost when the server stops - fine for local demos.
async function connectInMemory() {
  let MongoMemoryServer;
  try {
    ({ MongoMemoryServer } = require('mongodb-memory-server'));
  } catch (_) {
    return false;
  }
  console.log('Starting in-memory MongoDB (first run downloads a binary, please wait)...');
  memoryServer = await MongoMemoryServer.create();
  await connectTo(memoryServer.getUri('codearena'));
  console.log('Using IN-MEMORY database: users/submissions reset on every restart.');
  return true;
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || DEFAULT_URI;
  try {
    await connectTo(uri);
    return;
  } catch (error) {
    console.error(`\nDatabase connection error: ${error.message}`);
    console.error(`Could not reach MongoDB at ${uri}`);
    console.error('  -> Install & start MongoDB Community (or use a MongoDB Atlas URI in .env)');
  }

  try {
    if (await connectInMemory()) return;
    console.error('  -> OR run `npm i mongodb-memory-server` in "back end" for a zero-install database.');
  } catch (error) {
    console.error(`In-memory database failed: ${error.message}`);
  }

  // Keep the API alive (it answers 503 with a clear message) and retry.
  console.error('Retrying MongoDB connection in 5 seconds...\n');
  setTimeout(connectDB, 5000);
};

module.exports = connectDB;
