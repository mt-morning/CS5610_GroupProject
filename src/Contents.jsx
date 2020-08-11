import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from './routes.js';

export default class Contents extends React.Component {

    constructor(props) {
        super(props);
        this.state = { authenticated: false };
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
