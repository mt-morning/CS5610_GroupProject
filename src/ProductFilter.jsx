/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import { withRouter } from 'react-router-dom';
import URLSearchParams from 'url-search-params';
import { ToggleButton, ToggleButtonGroup, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './fontawesome';


class CategoryFilter extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      activeCategories: ["Muffin", "Cupcake"]
    };
  }

  handleChange(e) {
    console.log("Category - change handled. Event: ", e);
    this.setState({ value: this.state.activeCategories.push(e[1]) });
    console.log("This.state: ", this.state);
    //http://localhost:8000/products?categories=hi&categories=bye
    // Goal is: category=e is pushed onto url
  }


  render() {
    return (
        <div>
          Filter by category:
          <ToggleButtonGroup size="large"
          type="checkbox"
          value="this.state.value"
          onChange={this.handleChange}>
            <ToggleButton value="Muffin">
              <FontAwesomeIcon icon={['fas', 'birthday-cake']} />
              {' '}
              Cakes & Muffins
            </ToggleButton>
            <ToggleButton value="Cookie">
              <FontAwesomeIcon icon={['fas', 'cookie-bite']} />
              {' '}
              Cookies
            </ToggleButton>
            <ToggleButton value="Pastry">
              <FontAwesomeIcon icon={['fas', 'stroopwafel']} />
              {' '}
              Pastries
            </ToggleButton>
            <ToggleButton value="Other">
              <FontAwesomeIcon icon={['fas', 'bread-slice']} />
              {' '}
              Savory
            </ToggleButton>
          </ToggleButtonGroup>

        </div>
    )
  }



}

class ProductFilter extends React.Component {
  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      quantity: params.get('quantity') || '',
      category: params.get('category') || '',
      changed: false,
    };

    this.onChangeQuantityStatus = this.onChangeQuantityStatus.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.showOriginalFilter();
    }
  }

  onChangeQuantityStatus(e) {
    this.setState({ quantity: e.target.value, changed: true });
  }

  showOriginalFilter() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      quantity: params.get('quantity') || '',
      changed: false,
    });
  }

  applyFilter() {
    const { quantity } = this.state;
    const { history } = this.props;
    history.push({
      pathname: '/products',
      search: quantity ? `?quantity=${quantity}` : '',
    });
  }




  // TODO: replace select with React component for slider or selector
  // TODO: replace hard coded values; incorporate lte or gte...?
  render() {
    const { quantity, changed } = this.state;
    return (
        <div>
          <div>
            Filter by quantity:
            {' '}
            <select value={quantity} onChange={this.onChangeQuantityStatus}>
              <option value="">(All Products)</option>
              <option value="1">Low Stock (1)</option>
              <option value="0">Out of Stock (0)</option>
            </select>
            {' '}
            <Button bsStyle="primary" type="button" onClick={this.applyFilter}>
              Apply
            </Button>
            {' '}
            <Button type="button" onClick={this.showOriginalFilter} disabled={!changed}>
              Reset
            </Button>

          </div>
          <CategoryFilter/>
        </div>

    );
  }
}

export default withRouter(ProductFilter);
