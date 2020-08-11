/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import {
  ButtonToolbar,
    Button,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
import graphQLFetch from "./graphQLFetch";


function handleSuccessfulLogin(username){
  handleSuccessfulLogin(username);
}

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    //this.state  = {loggedIn: '', user: {username: '', role: ''} };
    console.log("LOGIN. Constructor.");
    console.log("\tthis.props: ", this.props);
    console.log("\tthis.state: ", this.state);


    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);

  }

  componentDidMount(){
    this.setState({loggedIn: this.props.loggedIn, user: this.props.user });
  }


  async handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.loginForm;

    let username = form.username.value;
    let password = form.password.value;


    const query = `query ($username: String!, $password:String!) {
        user (username: $username, password: $password) {
          _id
        }
    }`;
    // TODO - get role from database

    const data = await graphQLFetch(query, { username, password });

    if (data.user !== null ) {
      console.log("Account exists!, username is: ", username);
      this.onSuccess(username);
    }
    else {
      alert("Sorry, that account could not be authenticated. Please try again.");
    }

    form.username.value = "";
    form.password.value = "";
  }


  onSuccess(username) {
    //TODO get role as an argument
    console.log("LOGIN. onSuccess fired.");

    this.setState({
      loggedIn: true,
      user: {
        username: username,
        role: 'user',
      }
    });

    this.props.handleSuccessfulLogin(username);

  }


  render() {

    // const {loggedIn} = this.state;


    // if (loggedIn) {
    //   return (
    //       <div>
    //         You have successfully logged in, {user.username}.
    //       </div>
    //   )
    // }

    return (
        <form onSubmit={this.handleSubmit} name="loginForm">
          <FormGroup>
            <Col sm={3}>
              <FormControl type="text" name="username" placeholder="username"/>
              <FormControl type="password" name="password" placeholder="password" />
              <Button type="submit">Log-In</Button>
            </Col>
          </FormGroup>
        </form>
    );
  }
}
