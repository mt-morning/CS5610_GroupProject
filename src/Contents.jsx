import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from './routes.js';

export default class Contents extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
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
