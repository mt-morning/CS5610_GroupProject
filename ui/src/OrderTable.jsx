/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactable';

/**
 * Implement inventory data with Reactable.
 */

const ordersRow = (order) => {
  // const selectLocation = { pathname: `/orders/${order._id}`, search };
  const dueDate = order.due;
  const due = dueDate
    ? `${dueDate.toDateString()} ${dueDate.toTimeString().substr(0, 8)}`
    : ' ';

  return (
    {
      ID: order._id,
      Customer: order.customerName,
      Status: order.status,
      Paid: order.paid,
      Due: due,
      Details: <Link to={`/orders/${order._id}`}>Details</Link>,
      // Quantity: product.quantity,
      // "Created Date": (product.createdDate ? product.createdDate.toDateString() : ' ')
    }
  );
};


export default function OrderTable({ orders }) {
  const ordersRows = orders.map((order, index) => (
    ordersRow(order, index)
  ));
  return (
    <Table
      className="table"
      data={ordersRows}
      itemsPerPage={4}
      pageButtonLimit={5}
      noDataText="No matching records found."
      filterable={['Customer', 'ID', 'Status']}
    />
  );
}
