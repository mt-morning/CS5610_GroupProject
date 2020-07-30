import React from 'react';
import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';

import ProductFilter from './ProductFilter.jsx';
import InventoryTable from './InventoryTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js';
import ProductInformation from './ProductInformation.jsx';

/**
 * Represent overall inventory list in webpage.
 */
export default class InventoryList extends React.Component {
  constructor() {
    super();
    this.state = { inventory: [] };
    this.addProduct = this.addProduct.bind(this);
  }

  // Pg 64
  componentDidMount() {
    this.loadData();
  }

  // pg 245
  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  // Pg 64
  async loadData() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('quantity')) vars.quantity = parseInt(params.get('quantity'), 10);

    // eslint-disable-next-line no-console
    console.log('Loading data....');

    // Pg 105
    const query = `query productList($quantity: Int) {
      productList(quantity: $quantity) {
        id description createdDate
        expirationDate quantity
      }
    }`;

    const data = await graphQLFetch(query, vars);
    if (data) {
      // eslint-disable-next-line no-console
      console.log('Data retrieved from server.');
      this.setState({ inventory: data.productList });
    }
  }

  /* addIssue() issueAdd() */
  async addProduct(product) {
    product.quantity = 1; // TODO convert string to int and remove this line
    const query = `mutation productAdd($product: ProductInputs!) {
          productAdd(product: $product) {
            id
          }
        }`;

    // eslint-disable-next-line no-console
    console.log('add issue query:', query);

    const data = await graphQLFetch(query, { product });
    if (data) {
      this.loadData();
    }
  }

  render() {
    const { inventory } = this.state;
    const { match } = this.props;
    return (
      <React.Fragment>
        <h1>InventoryTracker</h1>
        <ProductFilter />
        <hr />
        <InventoryTable inventory={inventory} />
        <hr />
        <ProductAdd addProduct={this.addProduct} />
        <hr />
        <Route path={`${match.path}/:id`} component={ProductInformation} />
      </React.Fragment>
    );
  }
}
