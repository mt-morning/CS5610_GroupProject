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
    }

    componentDidUpdate() {
        console.log("NAVBAR did update.");
        const { loggedIn }  = this.props;
        console.log("\t Logged In? ", loggedIn);

    }

    render() {

        const { loggedIn }  = this.props;

        console.log("NAVBAR rendering..");
        console.log("\t Logged In? ", loggedIn);


        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>Inventory Tracker</Navbar.Brand>
                </Navbar.Header>

                <Nav>
                    {/*<LinkContainer exact from='/' to={{*/}
                    {/*    pathname: '/products',*/}
                    {/*    state: {*/}
                    {/*        user: {username: '', role: ''},*/}
                    {/*        loggedIn: false } }}><NavItem>Home</NavItem>*/}
                    {/*</LinkContainer>*/}

                    <LinkContainer to="/about">
                        <MenuItem>About</MenuItem>
                    </LinkContainer>

                    <LinkContainer to={{
                        pathname: '/sign-in',
                        state: {
                            user: this.props.user,
                            loggedIn: this.props.loggedIn } }}>
                        <NavItem>Sign in</NavItem>
                    </LinkContainer>

                    <LinkContainer to={{
                        pathname: '/products',
                        state: {
                            user: {username: 'TestingFromNavBar', role: 'User'},
                            loggedIn: false } }}>
                        <NavItem>Inventory Overview</NavItem>
                    </LinkContainer>

                </Nav>

                <Nav pullRight>
                    <ProductAddNav />
                </Nav>
            </Navbar>
        );
    }

}

export default class Page extends React.Component {


    constructor(props){
        super(props);
        this.state  = {
            loggedIn: 'false',
            user: {
                username: '',
                role: '',
            }
        }
    }

  render() {
        console.log("PAGE rendering.");
        return (
          <div>
            <NavBar />
            <Grid fluid>
              <Contents loggedIn={this.state.loggedIn}
                        user={this.state.user} />
            </Grid>
          </div>
        );
  }
}
