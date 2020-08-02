import React from 'react';
import { NavLink } from 'react-router-dom';

import Contents from './Contents.jsx';

function NavBar() {
  return (
    <nav>
      <NavLink exact to="/">Home</NavLink>
      {' | '}
      <NavLink to="/signin">Sign in</NavLink>
      {' | '}
      <NavLink to="/products">Inventory Overview</NavLink>
      {' | '}
      <NavLink to="/report">Report</NavLink>
      {' | '}
      <NavLink to="/add">Add Product</NavLink>
      {' | '}
      <NavLink to="/remove">Remove Product</NavLink>
    </nav>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Contents />
    </div>
  );
}
