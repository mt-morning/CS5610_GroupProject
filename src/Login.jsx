/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import {
  ButtonToolbar,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
import graphQLFetch from "./graphQLFetch";


export default class Login extends React.Component {



  constructor(props) {
    super(props);
    this.state =  {
      showing: false,
      user: { signedIn: false, username: ''},
      username:'',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
    console.log("Constructor LOGIN props:", props);

  }

  onStateChange(){
    console.log("LOGIN - State has been changed.");
  }

  componentDidUpdate(){
    console.log("LOGIN - Component did update.");
    console.log("LOGIN props:", this.props);
    console.log("***LOGIN state.username:", this.state.user.username);

  }

  signIn(username) {
    super.setState({user: {signedIn: true, username: username } });
    this.setState({user: {signedIn: true, username: username } });
    console.log("From Login: Signed In.");
  }

  signOut() {
    this.setState({user: {signedIn: false, username: ' ' } });
    console.log("From Login: Signed Out.");
  }

  async handleSubmit(e) {
    const {showError} = this.props;
    e.preventDefault();
    const form = document.forms.loginForm;


    let username = form.username.value;
    let password = form.password.value;


    const query = `query ($username: String!, $password:String!) {
        user (username: $username, password: $password) {
          _id
        }
    }`;

    const data = await graphQLFetch(query, { username, password });

    if (data.user !== null ) {
      //this.props.username = username;
      //this.props.loggedIn = true;
      this.signIn(username);
    }
    else {
      alert("doesn't exist");
    }
    form.username.value = "";
    form.password.value = "";
  }


  onSuccess(username) {
    this.state = { authenticated: true };
  }


  render() {

    const { user } = this.state;
    if (user.signedIn) {
      return (
          <div>Successful login.</div>
      )
    }

    return (
        <form onSubmit={this.handleSubmit} name="loginForm">
          <FormGroup>
            <Col sm={3}>
              <FormControl type="text" name="username" placeholder="username"/>
              <FormControl type="password" name="password" placeholder="password" />
              <button bsType="submit">Log-In</button>
            </Col>
          </FormGroup>
        </form>
    );
  }
}
