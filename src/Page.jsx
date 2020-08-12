import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar, Nav, NavItem, MenuItem, Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './Contents.jsx';
import ProductAddNav from './ProductAddNav.jsx'

function NavBar() {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>Inventory Tracker</Navbar.Brand>
      </Navbar.Header>

      <Nav>
        <LinkContainer exact to="/"><NavItem>Home</NavItem></LinkContainer>

        <LinkContainer to="/about"><MenuItem>About</MenuItem></LinkContainer>

        <LinkContainer to="/sign-in"><NavItem>Sign in</NavItem></LinkContainer>

        <LinkContainer to="/products"><NavItem>Inventory Overview </NavItem></LinkContainer>

        <LinkContainer to='/orders'><NavItem>View Orders</NavItem></LinkContainer>

      </Nav>

      <Nav pullRight>
        <ProductAddNav />
      </Nav>
    </Navbar>
  );
}

export default class Page extends React.Component {

  render() {
    return (
      <div>
        <NavBar authenticated={this.props.authenticated} />
        <Grid fluid>
          <Contents />
        </Grid>
      </div>
    );
  }
}
