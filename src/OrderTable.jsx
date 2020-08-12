import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { Table } from "reactable";

/**
 * Implement inventory data with Reactable.
 */

var Sample = Table;

const ordersRow = (order, index) => {
  return (
    { ID: order._id, 
      Customer: order.customerName,
      Status: order.status, 
      // Quantity: product.quantity,
      // "Created Date": (product.createdDate ? product.createdDate.toDateString() : ' ')
    }
  )
}


export default function OrderTable({ orders }) {

  const ordersRows = orders.map((order, index) => (
    ordersRow(order, index)
  ));
  return (
    <Sample 
      className="table"
      data={ordersRows}
      itemsPerPage={4}
      pageButtonLimit={5}
      noDataText="No matching records found."
      filterable={['Customer', 'ID', 'Status']}
    />
  )
};