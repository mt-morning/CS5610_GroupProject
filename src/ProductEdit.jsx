import React from 'react';
import { Link } from 'react-router-dom';
import graphQLFetch from './graphQLFetch.js';
import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';
import store from './store.js';

export default class ProductEdit extends React.Component {
  static async fetchData(match, showError) {
    const query = `query product($id: Int!) {
      product(id: $id) {
        id description createdDate expirationDate
        quantity category information updatedDate
      }
    }`;
    const { params: { id } } = match;
    const result = await graphQLFetch(query, { id: parseInt(id, 10) }, showError);
    return result;
  }
  constructor() {
    super();
    const product = store.initialData ? store.initialData.product : null;
    delete store.initialData;
    this.state = {
      product,
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
        quantity category information updatedDate
      }
    }`;
    const { id, created, ...changes } = product;
    changes["updatedDate"] = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10);
    const data = await graphQLFetch(query, { changes, id: parseInt(id, 10) });
    if (data) {
      this.setState({ product: data.productUpdate });
      alert('Updated product successfully'); // eslint-disable-line no-alert
    }
  }

  async loadData() {
    const { match } = this.props;
    const data = await ProductEdit.fetchData(match, null, this.showError);
    this.setState({ product: data ? data.product : {}, invalidFields: {} });
  }

  render() {
    const { product } = this.state;
    if (product === null) return null;
    const { product: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (id === null) {
      if (propsId != null) {
        return <h3>{`Product with ID ${propsId} not found at all.`}</h3>;
      }
      return null;
    }

    const { invalidFields } = this.state;
    let validationMessage;

    if (Object.keys(invalidFields).length !== 0) {
      validationMessage = (
        <div className="error">
          Please correct invalid fields before submitting.
        </div>
      );
    }

    const { product: { description, quantity } } = this.state;
    const { product: { category, information } } = this.state;
    const { product: { createdDate, expirationDate } } = this.state;
    const { product: {updatedDate} } = this.state;
    const formattedUpdatedDate = updatedDate 
    ? (`${updatedDate.getMonth() + 1}/${updatedDate.getDate()}/${updatedDate.getFullYear()}`
      + ` ${updatedDate.toLocaleTimeString('en-US')}`)
    : ' ';

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
              <td>
                <DateInput
                  name="createdDate"
                  value={createdDate}
                  onChange={this.onChange}
                  onValidityChange={this.onValidityChange}
                  key={id}
                />
              </td>
            </tr>
            <tr>
              <td>Updated:</td>
              <td>
                 {formattedUpdatedDate}
              </td>
            </tr>
            <tr>
              <td>Expiration:</td>
              <td>
                <DateInput
                  name="expirationDate"
                  value={expirationDate}
                  onChange={this.onChange}
                  onValidityChange={this.onValidityChange}
                  key={id}
                />
              </td>
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
        {validationMessage}
        <Link to={`/edit/${id - 1}`}>Prev</Link>
        {' | '}
        <Link to={`/edit/${id + 1}`}>Next</Link>
      </form>
    );
  }
}
