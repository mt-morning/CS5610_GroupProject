/*
 * == HOW TO RUN ==
 *
 * Run using the mongo shell locally:
 *   cd API/GroupProject_Croissant_API/
 *   mongo users scripts/initusers.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/inventory scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/inventory scripts/init.mongo.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.users.remove({});

const usersDB = [
  {
    username: 'Alice',
    password: '1234',
    role: 'Admin',
  },
];

db.users.insertMany(usersDB);

const countUsers = db.users.count();

print('Inserted', countUsers, 'users');

db.users.createIndex({ username: 1 }, { unique: true });

db.counters.remove({ _id: 'users' });
db.counters.insert({ _id: 'users', current: countUsers });
