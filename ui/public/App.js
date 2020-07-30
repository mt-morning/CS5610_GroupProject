"use strict";

var _graphQLFetch = _interopRequireDefault(require("./graphQLFetch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
// import { browserHistory } from 'react-router';
// import HomePage from './HomePage';
// eslint-disable-next-line react/prefer-stateless-function
var ProductFilter = /*#__PURE__*/function (_React$Component) {
  _inherits(ProductFilter, _React$Component);

  var _super = _createSuper(ProductFilter);

  function ProductFilter() {
    _classCallCheck(this, ProductFilter);

    return _super.apply(this, arguments);
  }

  _createClass(ProductFilter, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the product filter.");
    }
  }]);

  return ProductFilter;
}(React.Component); // eslint-disable-next-line react/prefer-stateless-function


var InventoryRead = /*#__PURE__*/function (_React$Component2) {
  _inherits(InventoryRead, _React$Component2);

  var _super2 = _createSuper(InventoryRead);

  function InventoryRead() {
    _classCallCheck(this, InventoryRead);

    return _super2.apply(this, arguments);
  }

  _createClass(InventoryRead, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the inventory read");
    }
  }]);

  return InventoryRead;
}(React.Component);
/**
 * Represent a product listing in the table: "one row".
 * @param {*} props
 */


function InventoryRow(_ref) {
  var product = _ref.product;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, product.id), /*#__PURE__*/React.createElement("td", null, product.description), /*#__PURE__*/React.createElement("td", null, product.createdDate ? product.createdDate.toDateString() : ' '), /*#__PURE__*/React.createElement("td", null, product.expirationDate ? product.expirationDate.toDateString() : ' '), /*#__PURE__*/React.createElement("td", null, product.quantity));
}
/**
 * Return all the products in a table.
 */


function InventoryTable(_ref2) {
  var inventory = _ref2.inventory;
  var inventoryRows = inventory.map(function (product) {
    return /*#__PURE__*/React.createElement(InventoryRow, {
      key: product.id,
      product: product
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Description"), /*#__PURE__*/React.createElement("th", null, "Created"), /*#__PURE__*/React.createElement("th", null, "Expiration Date"), /*#__PURE__*/React.createElement("th", null, "Quantity"))), /*#__PURE__*/React.createElement("tbody", null, inventoryRows));
}
/**
 * Represent form for adding a product.
 */


var ProductAdd = /*#__PURE__*/function (_React$Component3) {
  _inherits(ProductAdd, _React$Component3);

  var _super3 = _createSuper(ProductAdd);

  function ProductAdd() {
    var _this;

    _classCallCheck(this, ProductAdd);

    _this = _super3.call(this);
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ProductAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.productAdd;
      var product = {
        description: form.description.value,
        quantity: form.quantity.value,
        createdDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10)
      };
      var addProduct = this.props.addProduct;
      addProduct(product); // clear form of entered values

      form.description.value = '';
      form.quantity.value = '';
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "productAdd",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "description",
        placeholder: "Product Name"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "quantity",
        placeholder: "Quantity"
      }), /*#__PURE__*/React.createElement("button", {
        type: "submit"
      }, "Add"));
    }
  }]);

  return ProductAdd;
}(React.Component);

ProductAdd.propTypes = {
  addProduct: PropTypes.func.isRequired
};
/**
 * Represent overall inventory list in webpage.
 */

var InventoryList = /*#__PURE__*/function (_React$Component4) {
  _inherits(InventoryList, _React$Component4);

  var _super4 = _createSuper(InventoryList);

  function InventoryList() {
    var _this2;

    _classCallCheck(this, InventoryList);

    _this2 = _super4.call(this);
    _this2.state = {
      inventory: []
    };
    _this2.addProduct = _this2.addProduct.bind(_assertThisInitialized(_this2));
    return _this2;
  } // Pg 64


  _createClass(InventoryList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    } // Pg 64

  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // eslint-disable-next-line no-console
                console.log('Loading data....'); // Pg 105

                query = " query {\n            productList {\n                id description createdDate\n                expirationDate quantity\n            }\n        }";
                _context.next = 4;
                return (0, _graphQLFetch.default)(query);

              case 4:
                data = _context.sent;

                if (data) {
                  // eslint-disable-next-line no-console
                  console.log('Data retrieved from server.');
                  this.setState({
                    inventory: data.productList
                  });
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
    /* addIssue() issueAdd() */

  }, {
    key: "addProduct",
    value: function () {
      var _addProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(product) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                product.quantity = 1; // TODO convert string to int and remove this line

                query = "mutation productAdd($product: ProductInputs!) {\n          productAdd(product: $product) {\n            id\n          }\n        }"; // eslint-disable-next-line no-console

                console.log('add issue query:', query);
                _context2.next = 5;
                return (0, _graphQLFetch.default)(query, {
                  product: product
                });

              case 5:
                data = _context2.sent;

                if (data) {
                  this.loadData();
                }

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addProduct(_x) {
        return _addProduct.apply(this, arguments);
      }

      return addProduct;
    }()
  }, {
    key: "render",
    value: function render() {
      var inventory = this.state.inventory;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "InventoryTracker"), /*#__PURE__*/React.createElement(InventoryRead, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(InventoryTable, {
        inventory: inventory
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductAdd, {
        addProduct: this.addProduct
      }));
    }
  }]);

  return InventoryList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(InventoryList, null);
ReactDOM.render(element, document.getElementById('content'));