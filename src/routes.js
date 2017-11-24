import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './components/App';
import Login from './components/Login';
import About from './components/About';
import NotFound from './components/NotFound';

const Routes = (props) => (
    <BrowserRouter {...props}>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                //<Route path="/auth/login/facebook" component={Login} />
                <Route path="/about" component={About} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default Routes;
