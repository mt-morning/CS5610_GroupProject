import React from 'react';
import {
  Modal, NavItem, Glyphicon, Tooltip, OverlayTrigger,
  Form, FormGroup, FormControl, ControlLabel,
  Button, ButtonToolbar,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import graphQLFetch from './graphQLFetch.js';

class ProductAddNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.hideModal();

    const form = document.forms.productAdd;
    const quantity = parseInt(form.quantity.value, 10);
    // quantity can have negative value rn

    const expirationDate = (form.expirationDate.value)
      ? new Date(`${form.expirationDate.value} ${form.expirationTime.value}`)
      : new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10);
    const product = {
      description: form.description.value,
      // eslint-disable-next-line no-restricted-globals
      quantity: isNaN(quantity) ? 0 : quantity,
      createdDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
      category: form.category.value,
      information: form.information.value,
      expirationDate,
    };

    const query = `mutation productAdd($product: ProductInputs!) {
      productAdd(product: $product) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { product });

    // TODO: find a way to rerender without relying on routing back to home pg
    if (data) {
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const { showing } = this.state;
    const currentTime = new Date().getTime() + (1000 * 60 * 60 * 12);
    const defaultExpiration = new Date(currentTime).toTimeString().substr(0, 8);

    return (
      <React.Fragment>
        <NavItem onClick={this.showModal}>
          <OverlayTrigger
            placement="left"
            delayShow={1000}
            overlay={<Tooltip id="/products">Add Product</Tooltip>}
          >
            <Glyphicon glyph="plus" />
          </OverlayTrigger>
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="productAdd">
              <FormGroup>
                <ControlLabel>Product name: </ControlLabel>
                <FormControl name="description" type="text" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Quantity: </ControlLabel>
                <FormControl name="quantity" type="number" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Expiration date: </ControlLabel>
                <FormControl
                  name="expirationDate"
                  type="date"
                  value={new Date().toISOString().substr(0, 10)}
                />
                <FormControl
                  name="expirationTime"
                  type="time"
                  value={defaultExpiration}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Category: </ControlLabel>
                <FormControl name="category" componentClass="select" placeholder="select">
                  <option value="Muffin">Muffin</option>
                  <option value="Cupcake">Cupcake</option>
                  <option value="Cake">Cake</option>
                  <option value="Cookie">Cookie</option>
                  <option value="Pastry">Pastry</option>
                  <option value="Other">Other</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Information</ControlLabel>
                <FormControl name="information" componentClass="textarea" placeholder="Product information" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                type="button"
                bsStyle="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(ProductAddNav);
