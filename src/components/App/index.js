
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import logo from './logo.svg';
import './style.css';

class App extends Component {

    constructor(props){
        super(props);
        if(this.props.match.params.token){
            console.log(this.props.match.params.token);
        }
    }

    render() {
        return (
            <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            </div>
        );
    }
}

export default App;
