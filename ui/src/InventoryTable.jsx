import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

/**
 * Represent a product listing in the table: "one row".
 */
const InventoryRow = withRouter(({ product, location: { search } }) => {
  const selectLocation = { pathname: `/products/${product.id}`, search };
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.description}</td>
      <td>{product.createdDate ? product.createdDate.toDateString() : ' '}</td>
      <td>{product.expirationDate ? product.expirationDate.toDateString() : ' ' }</td>
      <td>{product.quantity}</td>
      <td>
        <Link to={`/edit/${product.id}`}>Edit</Link>
        {' | '}
        <NavLink to={selectLocation}>Select</NavLink>
      </td>
    </tr>
  );
});

/**
 * Return all the products in a table.
 */
export default function InventoryTable({ inventory }) {
  const inventoryRows = inventory.map(product => (
    <InventoryRow key={product.id} product={product} />
  ));
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Created</th>
          <th>Expiration Date</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {inventoryRows}
      </tbody>
    </table>
  );
}
