import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from './routes.js';

// <Route component={NotFound} />
export default class Contents extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            showing: false,
            user: { signedIn: false, username: ''},
            username:'',
        };
    }


    componentDidUpdate(){
        console.log("CONTENTS ComponentDidUpdate.");
    }




    render() {
        return (
            <Switch>
                <Redirect exact from="/" to="/products" />
                {routes.map(attrs => <Route {...attrs} key={attrs.path} />)}
            </Switch>
        );
    }


}
