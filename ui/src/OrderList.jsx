import React from 'react';
import { Route } from 'react-router-dom';
import graphQLFetch from './graphQLFetch.js';
import OrderTable from './OrderTable.jsx';
import OrderDetail from './OrderDetail.jsx';

/**
 * Represent overall components making up orders display.
 */
export default class OrderList extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  async loadData() {
    const query = `query orderList($status: Status) {
      orderList(status: $status) {
        _id customerName due created 
        products {
          description id quantity
          information
        }
        paid
        notes status contact
      }
    }`;

    // go to API and ask graphql query
    const data = await graphQLFetch(query);

    if (data) {
      this.setState({ orders: data.orderList });
    } else {
      // eslint-disable-next-line no-console
      console.log('Query returned no data/error');
    }
  }

  render() {
    const { orders } = this.state;
    const { match } = this.props;
    return (
      <React.Fragment>
        <OrderTable orders={orders} />
        <hr />
        <Route path={`${match.path}/:_id`} component={OrderDetail} />
      </React.Fragment>
    );
  }
}
