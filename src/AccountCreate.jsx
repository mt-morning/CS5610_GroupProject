/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import { FormGroup, ControlLabel,
    FormControl, Col, ButtonToolbar, ToggleButton, ToggleButtonGroup}  from 'react-bootstrap';
import PropTypes from "prop-types";
import graphQLFetch from "./graphQLFetch";



export default class AccountCreate extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    async handleSubmit(e) {
        e.preventDefault();
        console.log("submitted");
        const form = document.forms.accountCreate;


        const user = {
            username: form.username.value,
            password: form.password.value,
            role: form.options.value,
        };

        console.log(user);
        console.log('adding user....');
        const query = `mutation createUser($user: UserInputs!) {
          userAdd(user: $user) {
            username password role
          }
        }`;

        // eslint-disable-next-line no-console
        console.log('add user query:', query);

        const data = await graphQLFetch(query, { user });
        if (data) {
            this.setState({ accountCreated: true });
        }
        form.username.value = "";
        form.password.value = "";
    }



  render() {
    return (
          <form onSubmit={this.handleSubmit} name="accountCreate">
              <FormGroup controlId="formBasicText">
                  <Col sm={3}>
                  <ControlLabel>Account Information</ControlLabel>
                  <FormControl type="text" name="username" placeholder="username"/>
                  <FormControl type="password" name="password" placeholder="password" />
                      <ButtonToolbar>
                          <ToggleButtonGroup justified type="radio" name="options" defaultValue={'User'}>
                              <ToggleButton name="admin" value={'Admin'}>Admin</ToggleButton>
                              <ToggleButton value={'User'}>Non-Admin</ToggleButton>
                          </ToggleButtonGroup>
                      </ButtonToolbar>
                      <button bsType="submit">Create</button>
                  </Col>
              </FormGroup>
          </form>
    );
  }
}

AccountCreate.propTypes = {
    addUser: PropTypes.func.isRequired,
};
