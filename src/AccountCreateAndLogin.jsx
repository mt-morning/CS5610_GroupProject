import React from 'react';
import { Grid,Tabs,Tab } from 'react-bootstrap';
import AccountCreate from './AccountCreate.jsx';
import Login from './Login.jsx';
import {withRouter} from "react-router-dom";


class AccountCreateAndLogin extends React.Component {

    constructor(props){
        super(props);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
        console.log("Constructor of AccountCreateAndLogin.");
        console.log("\tthis.props is :", this.props);
        console.log("\tthis.props.location is :", this.props.location);
        console.log("\tthis.props.location.state is :", this.props.location.state);

        this.state = {
            user: {
                username: this.props.location.state.user.username,
                role: this.props.location.state.user.role,
            },
            loggedIn: this.props.location.state.loggedIn,
        }



    }



    componentDidUpdate(){
        console.log("AccountCreateAndLogin did update. New state:", this.state);
    }

    handleSuccessfulLogin(username){
        console.log("AccountCreateAndLogin - HandleSuccessfulLogin - ", username);

        const { user } = this.state;
        const { loggedIn } = this.state;
        this.setState({
            user: {
                username: username,
                role: 'user',
            },
            loggedIn: true,
        });

    }


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
