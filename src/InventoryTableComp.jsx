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

const inventoryRow = (product, index) => {
  return (
    { ID: product.id, 
      Name: product.description,
      Category: product.category, 
      Quantity: product.quantity,
      "Created Date": (product.createdDate ? product.createdDate.toDateString() : ' ')
    }
  )
}


export default function InventoryTableComp({ inventoryL, updateProduct }) {

  const inventoryRows = inventoryL.map((product, index) => (
    inventoryRow(product, index)
  ));
  return (
    <Sample 
      className="table"
      data={inventoryRows}
      itemsPerPage={4}
      pageButtonLimit={5}
      noDataText="No matching records found."
      filterable={['Category', 'Name', 'ID']}
    />
  )
};