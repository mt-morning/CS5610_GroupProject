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
  product, location: { search }, deleteProduct, updateProduct, index,
}) => {
  const selectLocation = { pathname: `/products/${product.id}`, search };
  const editTooltip = (
    <Tooltip id="close-tooltip" placement="top">Edit Inventory</Tooltip>
  );
  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Inventory</Tooltip>
  );
  const smUpdateTooltip = (
    <Tooltip id="small-update-tooltip" placement="top">+1</Tooltip>
  );
  const lgUpdateTooltip = (
    <Tooltip id="large-update-tooltip" placement="top">+5</Tooltip>
  );
  const minUpdateTooltip = (
    <Tooltip id="minus-update-tooltip" placement="top">-1</Tooltip>
  );

  const smallUpdateAmt = 1;
  const largeUpdateAmt = 5;
  const decrUpdateAmt = -1;

  function onDelete(e) {
    e.preventDefault();
    deleteProduct(index);
  }

  function quickUpdate(e, incrAmt) {
    e.preventDefault();
    updateProduct(index, incrAmt);
  }

  const { updatedDate, expirationDate } = product;
  const formattedUpdatedDate = updatedDate
    ? `${updatedDate.toDateString()} ${updatedDate.toTimeString().substr(0, 8)}`
    : ' ';
  const formattedExpiration = expirationDate
    ? `${expirationDate.toDateString()} ${expirationDate.toTimeString().substr(0, 8)}`
    : ' ';

  const tableRow = (
    <tr>
      <td>{product.id}</td>
      <td>{product.description}</td>
      <td>{product.category}</td>
      <td>{formattedUpdatedDate}</td>
      <td>{formattedExpiration}</td>
      <td>{product.quantity}</td>
      <td>
        <OverlayTrigger delayShow={1000} overlay={smUpdateTooltip}>
          <Button bsSize="xsmall" onClick={e => quickUpdate(e, smallUpdateAmt)}>
            <Glyphicon glyph="plus" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger delayShow={1000} overlay={lgUpdateTooltip}>
          <Button bsSize="xsmall" onClick={e => quickUpdate(e, largeUpdateAmt)}>
            <Glyphicon glyph="plus-sign" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger delayShow={1000} overlay={minUpdateTooltip}>
          <Button bsSize="xsmall" onClick={e => quickUpdate(e, decrUpdateAmt)}>
            <Glyphicon glyph="minus" />
          </Button>
        </OverlayTrigger>
        {' '}
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
export default function InventoryTable({ inventory, deleteProduct, updateProduct }) {
  const inventoryRows = inventory.map((product, index) => (
    <InventoryRow
      key={product.id}
      product={product}
      deleteProduct={deleteProduct}
      updateProduct={updateProduct}
      index={index}
    />
  ));

  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Category</th>
          <th>Last Updated</th>
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
