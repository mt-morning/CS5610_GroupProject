import React from 'react';
import { Link } from 'react-router-dom';
import graphQLFetch from './graphQLFetch.js';
export default class ProductEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            issue: {},
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    componentDidUpdate(prevProps) {
        const { match: { params: { id: prevId } } } = prevProps;
        const { match: { params: { id } } } = this.props;
        if (id !== prevId) {
            this.loadData();
        }
    }
    onChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            product: { ...prevState.product, [name]: value },
        }));
    }
    handleSubmit(e) {
        e.preventDefault();
        const { product } = this.state;
        console.log(product); // eslint-disable-line no-console
    }
    async loadData() {
        const query = `query product($id: Int!) {
      product(id: $id) {
        id description createdDate expirationDate
        quantity category information
      }
    }`;
        const { match: { params: { id } } } = this.props;
        const data = await graphQLFetch(query, { id });
        if (data) {
            const { product } = data;
            product.expirationDate = product.expirationDate ? product.due.toDateString() : '';
            product.description = product.description != null ? product.description : '';
            product.quantity = product.quantity != null ? product.quantity : '';
            this.setState({ product });
        } else {
            this.setState({ product: {} });
        }
    }
    render() {
        const { product: { id } } = this.state;
        const { match: { params: { id: propsId } } } = this.props;
        if (id == null) {
            if (propsId != null) {
                return <h3>{`Product with ID ${propsId} not found.`}</h3>;
            }
            return null;
        }
        const { product: { description, quantity } } = this.state;
        const { product: { description, category, information } } = this.state;
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
                                <input
                                    name="quantity"
                                    value={quantity}
                                    onChange={this.onChange}
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