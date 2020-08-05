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

export default class Login extends React.Component {
  render() {
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
