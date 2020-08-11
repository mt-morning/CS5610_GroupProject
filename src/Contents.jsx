import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from './routes.js';

export default class Contents extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Redirect exact from="/"
                          to={{
                                pathname: '/products',
                                state: {
                                    user: "test",
                                    loggedIn: this.props.loggedIn}
                          }} />
                {routes.map(attrs => <Route {...attrs} key={attrs.path} />)}
            </Switch>
        );
    }


}
