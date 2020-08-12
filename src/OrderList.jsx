import React from 'react';
import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';
import graphQLFetch from './graphQLFetch.js';
import OrderTable from './OrderTable.jsx';
import OrderDetail from './OrderDetail.jsx';
import { Panel } from 'react-bootstrap';

/**
 * Represent overall components making up orders display.
 */
export default class OrderList extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      displayDetails: false,
    }
    this.showDetails = this.showDetails.bind(this);
  }

  showDetails() {
    this.setState({
      displayDetails: !this.state.displayDetails
    })
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
      console.log(this.state.orders);
    } else {
      console.log('Query returned no data/error');
    }
  }

  render() {
    const { orders } = this.state;
    const { match } = this.props;
    return (
      <React.Fragment>
        {/* <Panel>
          <Panel.Heading>
            
          </Panel.Heading>
        </Panel> */}
        <OrderTable orders={orders} />
        <hr />
        <Route path={`${match.path}/:_id`} component={OrderDetail} />
      </React.Fragment>
    )
  }
}