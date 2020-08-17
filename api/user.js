const { getDb, getNextSequence } = require('./db.js');


async function add(_, { user }) {
  console.log("In user.js, the user is: ", user);
  const db = getDb();
  user.id = await getNextSequence('users');
  const result = await db.collection('users').insertOne(user);
  const savedUser = await db.collection('users').findOne({ _id: result.insertedId });
  return savedUser;
}

async function get(_, { username, password }) {
  const db = getDb();
  const foundUser = await db.collection('users')
    .findOne({ username: username, password: password });
  return foundUser;
}

module.exports = { add, get };
