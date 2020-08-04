/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import { FormGroup, ControlLabel,
    FormControl, Radio, Button, Col}  from 'react-bootstrap';

export default class AccountCreate extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("submitted");
        const form = document.forms.accountCreate;
        const account = {
            username: form.username.value,
            password: form.password.value,
        };
        console.log(account);
        //form.username.value = ""; form.password.value = "";
    }

  render() {

    return (
          <form onSubmit={this.handleSubmit} name="accountCreate">
              <FormGroup controlId="formBasicText">
                  <Col sm={3}>
                  <ControlLabel>Account Information</ControlLabel>
                  <FormControl  type="text" name="username" placeholder="username"/>
                  <FormControl type="password" name="password" placeholder="password" />
                  <Radio unchecked readOnly>
                      Admin Account
                  </Radio>
                      <button bsType="submit">Create</button>
                  </Col>
              </FormGroup>
          </form>
    );
  }
}
