import React from 'react';
import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

import Filters from './Filters.jsx';
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
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  // Pg 64
  componentDidMount() {
    this.loadData();
  }

  // pg 245
  componentDidUpdate(prevProps) {
    console.log("InventoryList - Component did update.");
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
    const queryVariables = {};
    if (params.get('quantity')) queryVariables.quantity = parseInt(params.get('quantity'), 10);
    if (params.get('category')) queryVariables.category = params.getAll('category');

    console.log("params.getAll('category'):", params.getAll('category'));
    console.log("params.get('quantity'):", params.get('quantity'));
    console.log("queryVariables:", queryVariables);


    // eslint-disable-next-line no-console
    console.log('Loading data....');

    // Pg 105
    const query = `query productList($quantity: Int, $category: [Category]) {
      productList(quantity: $quantity, category: $category) {
        id description createdDate
        expirationDate quantity category
      }
    }`;


    const data = await graphQLFetch(query, queryVariables);
    if (data) {
      // eslint-disable-next-line no-console
      this.setState({ inventory: data.productList });
    }
  }

  // need to revise async delete
  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { inventory } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = inventory[index];
    const data = await graphQLFetch(query, { id: parseInt(id, 10) });
    if (data && data.productDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.inventory];
        if (pathname === `/products/${id}`) {
          history.push({ pathname: '/products', search });
        }
        newList.splice(index, 1);
        return { inventory: newList };
      });
    } else {
      this.loadData();
    }
  }

  render() {
    const { inventory } = this.state;
    const { match } = this.props;
    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Filter</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <Filters />
          </Panel.Body>
        </Panel>
        <hr />
        <InventoryTable inventory={inventory} deleteProduct={this.deleteProduct} />
        <hr />
        <Route path={`${match.path}/:id`} component={ProductInformation} />
      </React.Fragment>
    );
  }
}
