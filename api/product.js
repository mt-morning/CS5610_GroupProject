const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

async function get(_, { id }) {
  const db = getDb();
  const issue = await db.collection('inventory').findOne({ id });
  return issue;
}

async function list(_, { quantity , category }) {
  const db = getDb();
  const filter = {};
  // if quantity filter is not the default "all products", then add it as a query parameter
  // 0 is undefined
  if (quantity !== undefined) filter.quantity = quantity;
  if (category !== undefined) filter.category = { $in: category };
  const inventory = await db.collection('inventory').find(filter).toArray();
  return inventory;
}

function validate(product) {
  const errors = [];
  if (product.quantity === undefined) product.quantity = 0;
  if (product.expirationDate === undefined) product.expirationDate = new Date();
  if (product.description.length < 3) {
    errors.push('Field "description" must be at least 3 characters long.');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function add(_, { product }) {
  const db = getDb();
  validate(product);

  const newProduct = Object.assign({}, product);
  newProduct.createdDate = new Date();
  newProduct.updatedDate = new Date();
  newProduct.id = await getNextSequence('inventory');
  const result = await db.collection('inventory').insertOne(newProduct);
  const savedProduct = await db.collection('inventory')
    .findOne({ _id: result.insertedId });
  return savedProduct;
}

async function update(_, { id, changes }) {
  const db = getDb();
  if (changes.description || changes.quantity || changes.category) {
    const productUpdate = await db.collection('inventory').findOne({ id });
    Object.assign(productUpdate, changes);
    validate(productUpdate);
  }
  await db.collection('inventory').updateOne({ id }, { $set: changes });
  const savedProduct = await db.collection('inventory').findOne({ id });
  return savedProduct;
}

async function remove(_, { id }) {
  const db = getDb();
  const productDelete = await db.collection('inventory').findOne({ id });
  if (!productDelete) return false;
  productDelete.deleted = new Date();
  let result = await db.collection('deleted_inventories').insertOne(productDelete);
  if (result.insertedId) {
    result = await db.collection('inventory').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}

module.exports = {
  list, add, get, update, delete: remove,
};
