import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import Homepage from './components/Homepage/Homepage.js';
import Navbar from './components/Navbar/Navbar.js';
import NotFound from './components/NotFound/NotFound.js';

import '../node_modules/semantic-ui-css/semantic.min.css';
import store from './store/store'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Homepage} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
