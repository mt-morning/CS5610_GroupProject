/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import URLSearchParams from 'url-search-params';
import './fontawesome.js';

class QuantityFilter extends React.Component {
  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      quantity: params.get('quantity') || '',
      changed: false,
    };

    this.onChangeQuantityStatus = this.onChangeQuantityStatus.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.showOriginalFilter();
    }
  }

  onChangeQuantityStatus(e) {
    this.setState({ quantity: e.target.value, changed: true });
  }

  showOriginalFilter() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      quantity: params.get('quantity') || '',
      changed: false,
    });
  }

  applyFilter() {
    const { quantity } = this.state;
    const { history } = this.props;
    history.push({
      pathname: '/products',
      search: quantity ? `?quantity=${quantity}` : '',
    });
  }

  render() {
    const { quantity, changed } = this.state;
    return (
      <div>
        Filter by quantity:
        {' '}
        <select value={quantity} onChange={this.onChangeQuantityStatus}>
          <option value="">(All Products)</option>
          <option value="1">Low Stock (1)</option>
          <option value="0">Out of Stock (0)</option>
        </select>
        {' '}
        <Button bsStyle="primary" type="button" onClick={this.applyFilter}>
          Apply
        </Button>
        {' '}
        <Button type="button" onClick={this.showOriginalFilter} disabled={!changed}>
          Reset
        </Button>
      </div>
    );
  }
}

export default withRouter(QuantityFilter);
