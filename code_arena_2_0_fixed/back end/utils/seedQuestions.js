const Question = require('../models/Question');
const questions = require('../data/questions');

// Insert the starter questions only when the collection is empty.
async function seedIfEmpty() {
  const count = await Question.countDocuments();
  if (count > 0) {
    console.log(`Questions already present (${count}) - skipping seed`);
    return;
  }
  await Question.insertMany(questions);
  console.log(`Auto-seeded ${questions.length} questions (easy / medium / hard)`);
}

// Wipe and re-insert (used by `npm run seed`).
async function reseed() {
  try {
    await Question.collection.drop();
  } catch (e) {
    await Question.deleteMany({});
  }
  await Question.insertMany(questions);
  console.log(`Seeded ${questions.length} questions successfully`);
}

module.exports = { seedIfEmpty, reseed };
