/*
 * == HOW TO RUN ==
 *
 * Run using the mongo shell locally:
 *   mongo inventory scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/inventory scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/inventory scripts/init.mongo.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.inventory.remove({});
db.deleted_inventories.remove({});

const inventoryDB = [
  {
    id: 1,
    description: 'Strawberry cupcake with sprinkles',
    category: 'Cupcake',
    createdDate: new Date('2020-08-09'),
    updatedDate: new Date('2020-08-09'),
    expirationDate: new Date('2020-10-20'),
    quantity: 300,
    information: 'Vanilla sprinkles',
  },
  {
    id: 2,
    description: 'French BAGUETTE',
    category: 'Other',
    createdDate: new Date('2020-08-09'),
    updatedDate: new Date('2020-08-09'),
    expirationDate: new Date('2020-10-20'),
    quantity: 8,
    information: '',
  },
  {
    id: 3,
    description: 'HK Egg Tarts',
    category: 'Other',
    createdDate: new Date('2020-08-09'),
    updatedDate: new Date('2020-08-09'),
    expirationDate: new Date('2020-10-20'),
    quantity: 0,
    information: '2/$2 sale',
  },
];


db.inventory.insertMany(inventoryDB);

const countProducts = db.inventory.count();

print('Inserted', countProducts, 'products');


db.counters.remove({ _id: 'inventory' });
db.deleted_inventories.remove({});
db.counters.insert({ _id: 'inventory', current: countProducts });

db.inventory.createIndex({ id: 1 }, { unique: true });
db.inventory.createIndex({ quantity: 1 });
db.inventory.createIndex({ description: 1 }, { unique: true });
db.deleted_inventories.createIndex({ id: 1 }, { unique: true });


db.users.createIndex({ username: 1 }, { unique: true });
