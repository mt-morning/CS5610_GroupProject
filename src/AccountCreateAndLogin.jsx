import React from 'react';
import { Grid,Tabs,Tab } from 'react-bootstrap';
import AccountCreate from './AccountCreate.jsx';
import Login from './Login.jsx';


export default class AccountCreateAndLogin extends React.Component {

    render() {
        return (
            <div>
                <Grid>
                    <Tabs defaultActiveKey={"Login"} id="home">
                        <Tab eventKey={"Create"} title="Create Account">
                            <h1>Create an Account</h1>
                            <AccountCreate />
                        </Tab>
                        <Tab eventKey={"Login"} title="Log-In">
                            <h1>Login with Existing Account</h1>
                            <Login style={{alignSelf: 'flex-end'}}/>
                        </Tab>
                    </Tabs>
                </Grid>
            </div>
        );
    }

}



