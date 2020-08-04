import React from 'react';
import { Grid } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import AccountCreate from './AccountCreate.jsx';
import Login from './Login.jsx';


export default function LandingPage() {
  return (
    <div>
      <Grid fluid>
          <div>
              <h1>Create an Account</h1>
              <AccountCreate />
          </div>
          <div>
              <h1>Login with Existing Account</h1>
            <Login />
          </div>
      </Grid>
    </div>
  );
}
