const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const GraphQLDate = require('./graphql_date.js');
const about = require('./about.js');
const product = require('./product.js');
const user = require('./user.js');
const order = require('./order.js');

const resolvers = {
  Query: {
    about: about.getMessage,
    productList: product.list,
    product: product.get,
    user: user.get,
    order: order.get,
    orderList: order.list,
  },

  Mutation: {
    setAboutMessage: about.setAboutMessage,
    productAdd: product.add,
    userAdd: user.add,
    productDelete: product.delete,
    productUpdate: product.update,
    orderDelete: order.delete,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
  playground: true,
  introspection: true,
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };
