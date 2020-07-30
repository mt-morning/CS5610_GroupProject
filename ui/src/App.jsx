import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom'; 
import Page from './Page.jsx';

// import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
// import { browserHistory } from 'react-router';
// import HomePage from './HomePage';

const element = (
  <Router>
    <Page />
  </Router>
);

ReactDOM.render(element, document.getElementById('content'));

if (module.hot) {
  module.hot.accept();
}
