import React from 'react';
import { Grid,Tabs,Tab } from 'react-bootstrap';
import AccountCreate from './AccountCreate.jsx';
import Login from './Login.jsx';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";


class AccountCreateAndLogin extends React.Component {

    constructor(props){
        super(props);
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
        console.log("Constructor of AccountCreateAndLogin.");

        if (this.props.location.state === undefined) {
            this.state = {
                user: {
                    username: '',
                    role: '',
                },
                loggedIn: false,
            }
        }
        else {
            this.state = {
                user: {
                    username: this.props.location.state.user.username,
                    role: this.props.location.state.user.role,
                },
                loggedIn: this.props.location.state.loggedIn,
            }
        }
    }


    handleSuccessfulLogin(username){

        this.setState({
            user: {
                username: username,
                role: 'user',
            },
            loggedIn: true,
        });
    }


    render() {

        const { loggedIn, user } = this.state;

        console.log("AccountCreateAndLoggedIn - Logged in? ", loggedIn);
        if (loggedIn === true) {

            return (
                <Redirect to={{pathname: '/products',
                                  state: { user: user,
                                      loggedIn: true} }} />);
        }

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
                            <Login user={this.state.user}
                                   loggedIn={this.state.loggedIn}
                                   handleSuccessfulLogin={this.handleSuccessfulLogin}
                                   style={{alignSelf: 'flex-end'}}/>
                        </Tab>
                    </Tabs>
                </Grid>
            </div>
        );
    }

}

export default withRouter(AccountCreateAndLogin);
