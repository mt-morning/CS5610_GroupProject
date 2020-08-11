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
        this.handleSuccessfulLoginGlobal = this.handleSuccessfulLoginGlobal.bind(this);

    }

    componentDidUpdate() {
        console.log("PAGE did update.");
        const { loggedIn }  = this.props;
        console.log("\t Logged In? ", loggedIn);

    }

    handleSuccessfulLoginGlobal(username){
        console.log("PAGE - handleSuccessfulLoginGlobal - ", username);

        const { user } = this.state;
        const { loggedIn } = this.state;
        this.setState({
            user: {
                username: username,
                role: 'user',
            },
            loggedIn: true,
        });
    }

    render() {

        const { loggedIn }  = this.props;


        console.log("Rendering Page.");
        console.log("\t Logged In? ", loggedIn);


        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>Inventory Tracker</Navbar.Brand>
                </Navbar.Header>

                <Nav>
                    <LinkContainer exact to="/"><NavItem>Home</NavItem></LinkContainer>
                    <LinkContainer to="/about"><MenuItem>About</MenuItem></LinkContainer>

                    <LinkContainer to={{
                        pathname: '/sign-in',
                        state: {
                            user: this.props.user,
                            loggedIn: this.props.loggedIn,
                            handleSuccessfulLoginGlobal: this.handleSuccessfulLoginGlobal } }}>
                        <NavItem>Sign in</NavItem>
                    </LinkContainer>

                    <LinkContainer to="/products">
                        <NavItem>Inventory Overview </NavItem>
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
    return (
      <div>
        <NavBar user={this.state.user} loggedIn={this.state.loggedIn} />
        <Grid fluid>
          <Contents loggedIn={this.state.loggedIn}
                    user={this.state.user} />
        </Grid>
      </div>
    );
  }
}
