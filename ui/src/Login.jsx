/* eslint-disable react/no-unused-state */
/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import {
  Col,
  FormControl,
  FormGroup,
  Button,
} from 'react-bootstrap';
import graphQLFetch from './graphQLFetch.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      attempted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.loginForm;

    const username = form.username.value;
    const password = form.password.value;

    const query = `query ($username: String!, $password:String!) {
        user (username: $username, password: $password) {
          _id
        }
    }`;

    const data = await graphQLFetch(query, { username, password });

    if (data.user !== null) {
      this.setState({
        loggedIn: true,
      });
    } else {
      this.setState({
        attempted: true,
      });
    }
    form.username.value = '';
    form.password.value = '';
  }

  render() {
    const { loggedIn } = this.state;
    if (loggedIn === true) {
      return (
        <div>
          Congratulations! You have logged in successfully.
        </div>
      );
    }

    return (
      <form onSubmit={this.handleSubmit} name="loginForm">
        <FormGroup>
          <Col sm={3}>
            <FormControl type="text" name="username" placeholder="username" />
            <FormControl type="password" name="password" placeholder="password" />
            <Button type="submit">Log-In</Button>
          </Col>
        </FormGroup>
      </form>
    );
  }
}
