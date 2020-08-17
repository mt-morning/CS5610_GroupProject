import React from 'react';
import { Table } from 'reactable';
import { Panel } from 'react-bootstrap';
import graphQLFetch from './graphQLFetch.js';

export default class OrderDetail extends React.Component {
  constructor() {
    super();
    this.state = { order: {} };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { _id: prevId } } } = prevProps;
    const { match: { params: { _id } } } = this.props;
    if (prevId !== _id) {
      this.loadData();
    }
  }

  async loadData() {
    const { match: { params: { _id } } } = this.props;
    const query = `query order($_id : ID) {
      order(_id: $_id) {
        _id created notes contact
        products {
          description quantity information
        } 
      }
    }`;

    const data = await graphQLFetch(query, { _id });
    if (data) {
      this.setState({ order: data.order });
    } else {
      this.setState({ order: {} });
    }
  }

  render() {
    const { order: { created, notes, contact } } = this.state;
    const { order: { products } } = this.state;

    const createdDate = created
      ? `${created.toDateString()} ${created.toTimeString().substr(0, 8)}`
      : ' ';

    // render component with order details if we have received
    // an _id in the URL
    if (created !== undefined) {
      const productRows = product => (
        {
          Name: product.description,
          Quantity: product.quantity,
        }
      );

      const orderedProducts = products.map(product => (
        productRows(product)
      ));

      return (
        <div>
          <Panel bsStyle="info">
            <Panel.Heading>
              <Panel.Title>Contact Information and Order Details</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              Created:
              {' '}
              {createdDate}
              <br />
              Contact:
              {' '}
              {contact}
              <br />
              Note:
              {' '}
              {notes}
            </Panel.Body>
          </Panel>
          <Table
            className="table"
            data={orderedProducts}
            itemsPerPage={6}
            pageButtonLimit={5}
            noDataText="No matching records found."
            filterable={['Name', 'Quantity']}
          />
        </div>
      );
    }

    // else: return no product details
    return (
      <div />
    );
  }
}
