/*
 * == HOW TO RUN ==
 *
 * Run using the mongo shell locally:
 * --> you should run the scripts in this order to guarantee that you
 *      populate the orders with products that exist
 *   mongo inventory users scripts/init.mongo.js
 *   mongo inventory users scripts/initorders.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/inventory scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/inventory scripts/init.mongo.js
 */


/* global db print */
/* eslint no-restricted-globals: "off" */

db.orders.remove({});
db.deleted_orders.remove({});

const products = [
  db.inventory.findOne({ id: 2 }),
];

products[0].quantity = 3;

const productsTwo = [
  db.inventory.findOne({ id: 1 }),
  db.inventory.findOne({ id: 3 }),
];

const ordersDB = [
  {
    customerName: 'Lin',
    due: new Date('2020-08-20'),
    created: new Date('2020-08-09'),
    products,
    paid: false,
    notes: '',
    status: 'confirmed',
    contact: 'email@fakeemail.com',
  },
  {
    customerName: 'Sue',
    due: new Date('2020-08-30'),
    created: new Date('2020-08-23'),
    products: productsTwo,
    paid: true,
    notes: 'Nut free',
    status: 'unfilled',
    contact: 'email@notreal.com',
  },
];

db.orders.insertMany(ordersDB);

const countOrders = db.orders.count();
print('Inserted', countOrders, 'orders');

db.counters.remove({ _id: 'orders' });
db.counters.insert({ _id: 'orders', current: countOrders });

db.orders.createIndex({ customerName: 1 });
db.orders.createIndex({ paid: 1 });

db.deleted_orders.createIndex({ id: 1 }, { unique: true });
