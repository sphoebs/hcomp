import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './components/App';
import Login from './components/Login';
//import UserAuth from './components/UserAuth';
import NotFound from './components/NotFound';

const Routes = (props) => (
    <BrowserRouter {...props}>
        <div>
            <Switch>
                <Route exact path="/:token" component={App} />
                <Route path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default Routes;
