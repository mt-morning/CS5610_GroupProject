import React from "react";
import URLSearchParams from "url-search-params";
import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withRouter} from "react-router-dom";


class CategoryFilter extends React.Component {

    constructor({ location: { search } }) {
        super();
        const params = new URLSearchParams(search);
        this.state = {
            category: params.getAll('category') || '',
        };

        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.showOriginalFilter = this.showOriginalFilter.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { location: { search: prevSearch } } = prevProps;
        const { location: { search } } = this.props;
        if (prevSearch !== search) {
            //this.showOriginalFilter();
        }
    }

    showOriginalFilter() {
        console.log("ShowOriginalFilter from QualityFilter fired.");
        const { location: { search } } = this.props;
        const params = new URLSearchParams(search);
        this.setState({
            category: params.get('category') || '',
        });
        console.log("\tCurrent State Category: ", this.state.category);
    }

    onChangeStatus(e) {
        console.log("\tPrevious status:", this.state.category);
        console.log("\tOn Status Change - new category", e);

        // If there are no categories selected, then initialize a new array.
        let newCategories;
        if (this.state.categories === undefined) {
            newCategories = [e];
        }

        // If there is already a category, add this one into the array.
        else {
            newCategories = this.state.categories.push(e);
        }

        // Update the state of the array (add the category).
        this.setState({
            category: newCategories
        });
        console.log("\tNew Categories:", newCategories);

        const { history } = this.props;
        const { category } = this.state;

        // Update the query param.
        history.push({
            pathname: '/products',
            search: `?category=${e}`,
        });

        // search: category ? `?category=${e}` : '',

        console.log('\t\tQUERY STRING PARAMS:', location.search);

    }


    render() {

        const { category } = this.state;

        return (
            <div>
                Filter by category:
                <ToggleButtonGroup size="large"
                                   type="checkbox"
                                   onChange={this.onChangeStatus}>
                    <ToggleButton value="Cake">
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
