import React from 'react';
import { Grid,Row } from 'react-bootstrap';
import AccountCreate from './AccountCreate.jsx';
import Login from './Login.jsx';
import graphQLFetch from "./graphQLFetch";


export default function LandingPage() {
  return (
    <div>
      <Grid>
          <Row>
              <h1>Create an Account</h1>
              <AccountCreate />
          </Row>
          <hr className="my-3"/>
          <Row>
              <h1>Login with Existing Account</h1>
                <Login style={{alignSelf: 'flex-end'}}/>
          </Row>
      </Grid>
    </div>
  );
}
