import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import '../node_modules/semantic-ui-css/semantic.min.css';
import Homepage from './components/Homepage/Homepage.js';
import Navbar from './components/Navbar/Navbar.js';
import NotFound from './components/NotFound/NotFound.js';


ReactDOM.render(
    <BrowserRouter>
        <div>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Homepage} />
                <Route path='*' component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
