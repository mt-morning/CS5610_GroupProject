const { UserInputError } = require('apollo-server-express');
const { ObjectId } = require('mongodb');
const { getDb, getNextSequence } = require('./db.js');

const dbName = 'orders';
const deletedDbName = 'deleted_orders';

async function get(_, { _id, customerName }) {
  const db = getDb();
  const searchParam = {};
  if (_id !== undefined) searchParam._id = new ObjectId(_id);
  if (customerName !== undefined) searchParam.customerName = customerName;
  const order = await db.collection(dbName).findOne(searchParam);
  return order;
}

async function list(_, { status, paid }) {
  const db = getDb();
  const filter = {};

  // add filters if they are specified
  if (status !== undefined) filter.status = status;
  if (paid !== undefined) filter.paid = paid;

  const orders = await db.collection(dbName).find(filter).toArray();
  return orders;
}

async function remove(_, { _id }) {
  const db = getDb();

  const filter = { _id: new ObjectId(_id) };

  // retrieve order using _id from db
  const orderDelete = await db.collection(dbName).findOne(filter);
  // return false if order is unable to be found
  console.log('order to be deleted not found');
  if (!orderDelete) return false;
  // otherwise mark time deleted and move to deleted_orders collection
  orderDelete.deleted = new Date();
  let result = await db.collection(deletedDbName).insertOne(orderDelete);
  console.log('unable to move to deleted_orders');
  if (result.insertedId) {
    console.log('add to deleted_orders successfully');
    result = await db.collection(dbName).removeOne(filter);
    console.log('removed order successfully');
    console.log(result);
    return result.deletedCount === 1;
  }
  // if unable to move to deleted_orders collection, return false
  return false;
}

module.exports = {
  get, list, delete: remove,
};
