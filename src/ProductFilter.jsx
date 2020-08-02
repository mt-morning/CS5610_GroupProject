/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import { withRouter } from 'react-router-dom';
import URLSearchParams from 'url-search-params';

class ProductFilter extends React.Component {
  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      status: params.get('status') || '',
      changed: false,
    };

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.showOriginalFilter();
    }
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value, changed: true });
  }

  showOriginalFilter() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      status: params.get('status') || '',
      changed: false,
    });
  }

  applyFilter() {
    const { status } = this.state;
    const { history } = this.props;
    history.push({
      pathname: '/issues',
      search: status ? `?status=${status}` : '',
    });
  }

  // TODO: replace select with React component for slider or selector
  // TODO: replace hard coded values; incorporate lte or gte...?
  render() {
    const { status } = this.state;
    return (
      <div>
        Filter by quantity:
        {' '}
        <select value={status} onChange={this.onChangeStatus}>
          <option value="">(All Products)</option>
          <option value="1">Low Stock (1)</option>
          <option value="0">Out of Stock (0)</option>
        </select>
        {' '}
        <button bsStyle="primary" type="button" onClick={this.applyFilter}>
          Apply
        </button>
        {' '}
        <button
          type="button"
          onClick={this.showOriginalFilter}
          disabled={!status.changed}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default withRouter(ProductFilter);
