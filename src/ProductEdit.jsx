import React from 'react';
import { Link } from 'react-router-dom';
import graphQLFetch from './graphQLFetch.js';
import NumInput from './NumInput.jsx';
import store from './store.js';

export default class ProductEdit extends React.Component {
    static async fetchData(match, showError) {
        const query = `query product($id: Int!) {
      product(id: $id) {
        id description createdDate expirationDate
        quantity category information
      }
    }`;
        const { params: { id } } = match;
        const result = await graphQLFetch(query, { id }, showError);
        return result;
    }
  constructor() {
      super();
      const product = store.initialData ? store.initialData.product : null;
      delete store.initialData;
    this.state = {
        product, invalidFields: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        description createdDate expirationDate 
        quantity category information 
      }
    }`;
    const { id, created, ...changes } = product;
    const data = await graphQLFetch(query, { changes, id });
    if (data) {
      this.setState({ product: data.productUpdate });
      alert('Updated product successfully'); // eslint-disable-line no-alert
    }
  }

  async loadData() {
      const { match } = this.props;
      const data = await ProductEdit.fetchData(match, null, this.showError);
    if (data) {
      const { product } = data;
      product.description = product.description != null ? product.description : '';
      product.createdDate = product.createdDate ? product.toDateString() : '';
      product.expirationDate = product.expirationDate ? product.due.toDateString() : '';
      product.category = product.category != null ? product.category : '';
      product.information = product.information != null ? product.information : '';
      this.setState({ product });
    } else {
      this.setState({ product: {} });
    }
  }

    render() {
        const { product } = this.state;
        if (product == null) return null;
    const { product: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`Product with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }

    const { product: { description, quantity } } = this.state;
    const { product: { category, information } } = this.state;
    const { product: { createdDate, expirationDate } } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{`Editing product: ${id}`}</h3>
        <table>
          <tbody>
            <tr>
              <td>Description:</td>
              <td>
                <textarea
                  rows={8}
                  cols={50}
                  name="description"
                  value={description}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Created:</td>
              <td>{createdDate.toDateString()}</td>
            </tr>
            <tr>
              <td>Expiration:</td>
              <td>{expirationDate.toDateString()}</td>
            </tr>
 
            <tr>
              <td>Quantity:</td>
              <td>
                <NumInput
                  name="quantity"
                  value={quantity}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr>

            <tr>
              <td>Category:</td>
              <td>
                <select name="category" value={category} onChange={this.onChange}>
                  <option value="Muffin">Muffin</option>
                  <option value="Cupcake">Cupcake</option>
                  <option value="Cake">Cake</option>
                  <option value="Cookie">Cookie</option>
                  <option value="Pastry">Pastry</option>
                  <option value="Other">Other</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>Information:</td>
              <td>
                <textarea
                  rows={8}
                  cols={50}
                  name="information"
                  value={information}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td />
              <td><button type="submit">Submit</button></td>
            </tr>
          </tbody>
        </table>
        <Link to={`/edit/${id - 1}`}>Prev</Link>
        {' | '}
        <Link to={`/edit/${id + 1}`}>Next</Link>
      </form>
    );
  }
}
