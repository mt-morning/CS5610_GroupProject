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


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    const data = await graphQLFetch(query, { username, password });

    if (data.user !== null ) {
      alert("account exists!");
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
