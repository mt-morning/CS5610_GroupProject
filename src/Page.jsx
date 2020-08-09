import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar, Nav, NavItem, MenuItem, Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './Contents.jsx';
import ProductAddNav from './ProductAddNav.jsx'

class NavBar extends React.Component {

    constructor(props){
        super(props);
        this.state =  {
            showing: false,
            user: { signedIn: false, username: ''},
            username:'',
        };
        console.log("NAVBAR State: ", this.state);

    }

    render() {

        //const currentUsername = this.state.user.username;
        const currentUsername = "Testing.";



        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>Inventory Tracker</Navbar.Brand>
                </Navbar.Header>

                <Nav>
                    <LinkContainer exact to="/">
                        <NavItem username={this.state.user.username}>Home</NavItem>
                    </LinkContainer>

                    <LinkContainer to="/">
                        <NavItem>{currentUsername}</NavItem>
                    </LinkContainer>


                    <LinkContainer to="/about"><MenuItem>About</MenuItem></LinkContainer>

                    <LinkContainer to="/sign-in"><NavItem>Sign in</NavItem></LinkContainer>

                    <LinkContainer to="/products"><NavItem>Inventory Overview </NavItem></LinkContainer>

                </Nav>

                <Nav pullRight>
                    <ProductAddNav/>
                </Nav>
            </Navbar>
        );
    }
}

export default class Page extends React.Component {

    constructor(props){
        super(props);
        this.state =  {
            showing: false,
            user: { signedIn: false, username: ''},
            username:'',
        };
        console.log("PAGE props:", props);
    }


    componentDidUpdate() {
        console.log("PAGE componentDidUpdate.");
        console.log("PAGE state.user.username: ", this.state.user.username);

    }



  render() {
    return (
      <div>
        <NavBar username={this.state.user.username} />
        <Grid fluid>
          <Contents username={this.state.user.username} />
        </Grid>
      </div>
    );
  }
}
