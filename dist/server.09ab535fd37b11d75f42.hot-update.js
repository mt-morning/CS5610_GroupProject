exports.id = "server";
exports.modules = {

/***/ "./src/InventoryList.jsx":
/*!*******************************!*\
  !*** ./src/InventoryList.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InventoryList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url-search-params */ "url-search-params");
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url_search_params__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ProductFilter_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProductFilter.jsx */ "./src/ProductFilter.jsx");
/* harmony import */ var _InventoryTable_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InventoryTable.jsx */ "./src/InventoryTable.jsx");
/* harmony import */ var _ProductAdd_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ProductAdd.jsx */ "./src/ProductAdd.jsx");
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _ProductInformation_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ProductInformation.jsx */ "./src/ProductInformation.jsx");









/**
 * Represent overall inventory list in webpage.
 */

class InventoryList extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor() {
    super();
    this.state = {
      inventory: []
    };
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  } // Pg 64


  componentDidMount() {
    this.loadData();
  } // pg 245


  componentDidUpdate(prevProps) {
    const {
      location: {
        search: prevSearch
      }
    } = prevProps;
    const {
      location: {
        search
      }
    } = this.props;

    if (prevSearch !== search) {
      this.loadData();
    }
  } // Pg 64


  async loadData() {
    const {
      location: {
        search
      }
    } = this.props;
    const params = new url_search_params__WEBPACK_IMPORTED_MODULE_1___default.a(search);
    const vars = {};
    if (params.get('quantity')) vars.quantity = parseInt(params.get('quantity'), 10); // eslint-disable-next-line no-console

    console.log('Loading data....'); // Pg 105

    const query = `query productList($quantity: Int) {
      productList(quantity: $quantity) {
        id description createdDate
        expirationDate quantity
      }
    }`;
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_7__["default"])(query, vars);

    if (data) {
      // eslint-disable-next-line no-console
      console.log('Data retrieved from server.');
      this.setState({
        inventory: data.productList
      });
    }
  }
  /* addIssue() issueAdd() */


  async addProduct(product) {
    product.quantity = 1; // TODO convert string to int and remove this line

    const query = `mutation productAdd($product: ProductInputs!) {
          productAdd(product: $product) {
            id
          }
        }`; // eslint-disable-next-line no-console

    console.log('add issue query:', query);
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_7__["default"])(query, {
      product
    });

    if (data) {
      this.loadData();
    }
  } // need to revise async delete


  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const {
      inventory
    } = this.state;
    const {
      location: {
        pathname,
        search
      },
      history
    } = this.props;
    const {
      id
    } = inventory[index];
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_7__["default"])(query, {
      id
    });

    if (data && data.productDelete) {
      this.setState(prevState => {
        const newList = [...prevState.inventory];

        if (pathname === `/inventory/${id}`) {
          history.push({
            pathname: '/inventory',
            search
          });
        }

        newList.splice(index, 1);
        return {
          issues: newList
        };
      });
    } else {
      this.loadData();
    }
  }

  render() {
    const {
      inventory
    } = this.state;
    const {
      match
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Panel"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Panel"].Heading, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Panel"].Title, {
      toggle: true
    }, "Filter")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Panel"].Body, {
      collapsible: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ProductFilter_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InventoryTable_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
      inventory: inventory,
      deleteProduct: this.deleteProduct
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ProductAdd_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
      addProduct: this.addProduct
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: `${match.path}/:id`,
      component: _ProductInformation_jsx__WEBPACK_IMPORTED_MODULE_8__["default"]
    }));
  }

}

/***/ })

};
//# sourceMappingURL=server.09ab535fd37b11d75f42.hot-update.js.map