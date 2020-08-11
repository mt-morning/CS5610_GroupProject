import React from "react";
import ProductFilter from "./QuantityFilter.jsx";
import CategoryFilter from "./CategoryFilter.jsx";


export default class Filters extends React.Component {

    render() {
        return (
            <div>
                <ProductFilter/>
                <CategoryFilter/>
            </div>

        );
    }
}
