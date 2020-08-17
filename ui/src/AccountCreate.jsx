/* eslint-disable react/no-unused-prop-types */
/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import {
  FormGroup, ControlLabel, Button,
  FormControl, Col, ButtonToolbar, ToggleButton, ToggleButtonGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import graphQLFetch from './graphQLFetch.js';

export default class AccountCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountCreated: false,
      attempted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.accountCreate;

    const user = {
      username: form.username.value,
      password: form.password.value,
      role: form.options.value,
    };


    const query = `mutation createUser($user: UserInputs!) {
          userAdd(user: $user) {
            username password role
          }
        }`;


    const data = await graphQLFetch(query, { user });
    if (data) {
      // eslint-disable-next-line no-console
      console.log('Success!');
      this.setState({ accountCreated: true });
    }
    form.username.value = '';
    form.password.value = '';

    // TODO adda  toast with 'success' or failure
  }


  render() {
    const { accountCreated, attempted } = this.state;
    if (accountCreated === true) {
      return (
        <div>
          Congratulations! Your account has been created.
        </div>
      );
    }

    if (attempted === true) {
      return (
        <div>
          Try to choose something more unique.
        </div>
      );
    }

    return (
      <form onSubmit={this.handleSubmit} name="accountCreate">
        <FormGroup>
          <Col sm={3}>
            <ControlLabel>Account Information</ControlLabel>
            <FormControl type="text" name="username" placeholder="username" />
            <FormControl type="password" name="password" placeholder="password" />
            <ButtonToolbar>
              <ToggleButtonGroup justified type="radio" name="options" defaultValue="User">
                <ToggleButton name="admin" value="Admin">Admin</ToggleButton>
                <ToggleButton value="User">Non-Admin</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
            <Button type="submit">Create</Button>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

AccountCreate.propTypes = {
  // eslint-disable-next-line react/require-default-props
  addUser: PropTypes.func,
};
