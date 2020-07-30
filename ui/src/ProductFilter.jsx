/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import { withRouter } from 'react-router-dom';

class ProductFilter extends React.Component {
  constructor() {
    super();
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }

  onChangeStatus(e) {
    const quantity = e.target.value;
    const { history } = this.props;
    history.push({
      pathname: '/products',
      search: quantity ? `?quantity=${quantity}` : '',
    });
  }

  // TODO: replace select with React component for slider or selector
  // TODO: replace hard coded values; incorporate lte or gte...?
  render() {
    return (
      <div>
        Filter by quantity:
        {' '}
        <select onChange={this.onChangeStatus}>
          <option value="">(All Products)</option>
          <option value="1">Low Stock (1)</option>
          <option value="0">Out of Stock (0)</option>
        </select>
      </div>
    );
  }
}

export default withRouter(ProductFilter);
