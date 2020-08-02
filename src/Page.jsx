import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Navbar, Nav, NavItem, NavDropdown,
    MenuItem, Glyphicon, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './Contents.jsx';

function NavBar() {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>Issue Tracker</Navbar.Brand>
            </Navbar.Header>

            <Nav>
                <LinkContainer exact to="/"><NavItem>Home</NavItem></LinkContainer>
  
                <LinkContainer to="/signin"><NavItem>Sign in</NavItem></LinkContainer>
  
                <LinkContainer to="/products"><NavItem>Inventory Overview </NavItem></LinkContainer>

                <LinkContainer to="/report"><NavItem>Report</NavItem></LinkContainer>

                <LinkContainer to="/remove"><NavItem>Remove Product</NavItem></LinkContainer>

            </Nav>

                <Nav pullRight>
                    <NavItem>
                        <OverlayTrigger
                            placement="left"
                            delayShow={1000}
                            overlay={<Tooltip id="/products">Add Product</Tooltip>}
                                >
                                <Glyphicon glyph="plus" />
                                </OverlayTrigger>
                            </NavItem>
            </Nav>
        </Navbar>
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
