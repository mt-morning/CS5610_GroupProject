import React from "react";
import URLSearchParams from "url-search-params";
import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withRouter} from "react-router-dom";

class CategoryFilter extends React.Component {

    constructor({ location: { search } }) {
        console.log("Category filter - constructed.");
        super();
        const params = new URLSearchParams(search);
        this.state = {
            quantity: params.get('quantity') || '',
            activeCategories: params.getAll('category') || '',
            changed: false,
        };

        // this.onChangeQuantityStatus = this.onChangeQuantityStatus.bind(this);
        // this.applyFilter = this.applyFilter.bind(this);
        // this.showOriginalFilter = this.showOriginalFilter.bind(this);
    }


    handleChange(e) {
        console.log("Category - change handled. Event: ", e);
        this.setState({ category: e[1], changed: true });
        console.log("This.state: ", this.state);
        //http://localhost:8000/products?categories=hi&categories=bye
        // Goal is: category=e is pushed onto url
        const { location: { search: prevSearch } } = prevProps;
        const { location: { search } } = this.props;
        const { category } = this.state;
        const { history } = this.props;
        history.push({
            pathname: '/products',
            search: category ? `?category=${category}` : '',
        });

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

export default withRouter(CategoryFilter);
