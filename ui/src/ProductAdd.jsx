import React from 'react';
import PropTypes from 'prop-types';

// Note for Tran: as a separate component as a different page view, need to get addProduct from
// table?
// We show a link to ProductAdd on NavBar in Page.jsx, and make sure that link gets routed
// correctly through <Route path=...> in Contents.jsx
// Line 27 addProduct comes from props, which is from Line 89 in InventoryList

/**
 * Represent form for adding a product.
 */
export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const product = {
      description: form.description.value,
      quantity: form.quantity.value,
      createdDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
    };

    const { addProduct } = this.props;
    addProduct(product);

    // clear form of entered values
    form.description.value = '';
    form.quantity.value = '';
  }

  render() {
    return (
      <form name="productAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="description" placeholder="Product Name" />
        <input type="text" name="quantity" placeholder="Quantity" />
        <button type="submit">Add</button>
      </form>
    );
  }
}

ProductAdd.propTypes = {
  addProduct: PropTypes.func.isRequired,
};
