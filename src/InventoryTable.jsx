import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Table,
} from 'react-bootstrap';

/**
 * Represent a product listing in the table: "one row".
 */
const InventoryRow = withRouter(({
  product, location: { search }, deleteProduct, index,
}) => {
  const selectLocation = { pathname: `/products/${product.id}`, search };
  const editTooltip = (
    <Tooltip id="close-tooltip" placement="top">Edit Inventory</Tooltip>
  );
  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Inventory</Tooltip>
  );

  function onDelete(e) {
    e.preventDefault();
    deleteProduct(index);
  }

  const tableRow = (
    <tr>
      <td>{product.id}</td>
      <td>{product.description}</td>
      <td>{product.createdDate ? product.createdDate.toDateString() : ' '}</td>
      <td>{product.expirationDate ? product.expirationDate.toDateString() : ' '}</td>
      <td>{product.quantity}</td>
      <td>
        <LinkContainer to={`/edit/${product.id}`}>
          <OverlayTrigger delayShow={1000} overlay={editTooltip}>
            <Button bsSize="xsmall">
              <Glyphicon glyph="edit" />
            </Button>
          </OverlayTrigger>
        </LinkContainer>
        {' '}
        <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          <Button bsSize="xsmall" onClick={onDelete}>
            <Glyphicon glyph="trash" />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
  return (
    <LinkContainer to={selectLocation}>
      {tableRow}
    </LinkContainer>
  );
});


/**
 * Return all the products in a table.
 */
export default function InventoryTable({ inventory, deleteProduct }) {
  const inventoryRows = inventory.map((product, index) => (
    <InventoryRow
      key={product.id}
      product={product}
      deleteProduct={deleteProduct}
      index={index}
    />
  ));
  return (
    <Table bordered condensed hover responsive>
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
    </Table>
  );
}
