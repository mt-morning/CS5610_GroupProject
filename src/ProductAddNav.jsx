import React from 'react';
import { Link } from 'react-router-dom';
import graphQLFetch from './graphQLFetch.js';
import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';
import store from './store.js';


// UNUSED RIGHT NOW 
// dev
class ProductAddNav extends React.Component {
  constructor() {
    super();
    this.state = {
      invalidFields: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
  }

  componentDidMount() {
    const { product } = this.state;
    if (product == null) this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }

  onValidityChange(event, valid) {
    const { name } = event.target;
    this.setState((prevState) => {
      const invalidFields = { ...prevState.invalidFields, [name]: !valid };
      if (valid) delete invalidFields[name];
      return { invalidFields };
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { product, invalidFields } = this.state;

    if (Object.keys(invalidFields).length !== 0) return;
    const query = `mutation productUpdate(
      $id: Int!
      $changes: ProductUpdateInputs!
    ) {
      productUpdate(
        id: $id
        changes: $changes
      ) {
        id description createdDate expirationDate 
        quantity category information 
      }
    }`;
  }
}