import React from 'react';
import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

import ProductFilter from './ProductFilter.jsx';
import InventoryTable from './InventoryTable.jsx';
import graphQLFetch from './graphQLFetch.js';
import ProductInformation from './ProductInformation.jsx';
import InventoryTableComp from './InventoryTableComp.jsx'


/**
 * Represent overall inventory list in webpage.
 */
export default class InventoryList extends React.Component {
  constructor() {
    super();
    this.state = { inventory: [], inventoryL: [] };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
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
        id description createdDate updatedDate
        expirationDate quantity category
      }
    }`;

    const data = await graphQLFetch(query, vars);
    if (data) {
      // eslint-disable-next-line no-console
      console.log('Data retrieved from server.');
      this.setState({ inventory: data.productList, inventoryL: data.productList });
    }
  }

  // need to revise async delete
  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { inventory } = this.state;
    // console.log(inventory);
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

  async updateProduct(index, incrAmt) {
    const query = `mutation productUpdate(
      $id: Int!
      $changes: ProductUpdateInputs!
    ) {
      productUpdate(
        id: $id
        changes: $changes
      ) {
        id description createdDate expirationDate 
        quantity category information updatedDate
      }
    }`;

    const { inventory } = this.state;   // populated by child component InventoryTable
    
    const { location: { pathname, search }, history } = this.props;
    const { id } = inventory[index];
    const { quantity: oldQuantity } = inventory[index];
    const data = await graphQLFetch(query, {
      id: parseInt(id, 10), 
      changes: {
        "quantity": incrAmt + oldQuantity,
        "updatedDate": new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10)
    } });

    if (data && data.productUpdate) {
      this.setState((prevState) => {
        const newList = [...prevState.inventory];
        newList.splice(index, 1, data.productUpdate);
        return { inventory: newList };
      });
    } else {
      this.loadData();
    }
  }

  render() {
    const { inventory, inventoryL } = this.state;
    const { match } = this.props;
    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Filter</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <ProductFilter />
          </Panel.Body>
        </Panel>
        <hr />
        <InventoryTable inventory={inventory} deleteProduct={this.deleteProduct} updateProduct={this.updateProduct} />
        <hr />
        <Route path={`${match.path}/:id`} component={ProductInformation} />
        {/* <hr />
        <InventoryTableComp
          inventoryL={inventoryL}
          updateProduct={this.updateProduct1}
        /> */}
      </React.Fragment>
    );
  }
}
