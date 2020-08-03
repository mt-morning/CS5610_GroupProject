import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import InventoryList from './InventoryList.jsx';
import ProductReport from './ProductReport.jsx';
import ProductEdit from './ProductEdit.jsx';
import About from './About.jsx';
import ProductAdd from './ProductAdd.jsx';
import ProductRemove from './ProductRemove.jsx';
import SignInNavItem from './SignInNavItem.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/products" />
      <Route path="/products" component={InventoryList} />
      <Route path="/edit/:id" component={ProductEdit} />
      <Route path="/report" component={ProductReport} />
      <Route path="/about" component={About} />
      <Route path="/add" component={ProductAdd} />
      <Route path="/remove" component={ProductRemove} />
      <Route path="/signin" component={SignInNavItem} />
      <Route component={NotFound} />
    </Switch>
  );
}
