import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import '../node_modules/semantic-ui-css/semantic.min.css';
import Homepage from './components/Homepage/Homepage.js';
import NotFound from './components/NotFound/NotFound.js';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='*' component={NotFound} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
