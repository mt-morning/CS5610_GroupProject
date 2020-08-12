import React from 'react';
import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import graphQLFetch from './graphQLFetch.js';
import OrderTable from './OrderTable.jsx'

/**
 * Represent overall components making up orders display.
 */
export default class OrderList extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    }
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    // // pull search from LinkContainer
    // const { location: { search } } = this.props;
    // const params = new URLSearchParams(search);
    // const 

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
      console.log(this.state.orders);
    } else {
      console.log('Query returned no data/error');
    }
  }

  render() {
    const { orders } = this.state;

    return (
      <React.Fragment>
        {/* <Panel>
          <Panel.Heading>
            
          </Panel.Heading>
        </Panel> */}
        <OrderTable orders={orders} />
      </React.Fragment>
    )
  }
}