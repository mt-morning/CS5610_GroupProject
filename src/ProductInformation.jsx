import React from 'react';

import graphQLFetch from './graphQLFetch.js';

export default class ProductInformation extends React.Component {
  constructor() {
    super();
    this.state = { product: {} };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (prevId !== id) {
      this.loadData();
    }
  }

  async loadData() {
    const { match: { params: { id } } } = this.props;
    const query = `query product($id: Int!) {
      product (id: $id) {
        id information
      }
    }`;

    const data = await graphQLFetch(query, { id: parseInt(id, 10) });
    if (data) {
      this.setState({ product: data.product });
    } else {
      this.setState({ product: {} });
    }
  }

  render() {
    const { product: { information } } = this.state;
    return (
      <div>
        <h3>Information</h3>
        <pre>{information}</pre>
      </div>
    );
  }
}
