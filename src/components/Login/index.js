import React from 'react';
import FBLogin from '../FBLogin'
import UserStore from '../../data/container/usercontainer'

export default class Login extends React.Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <p>Welcome to the Facebook SDK for React Native!</p>
                <FBLogin />
            </div>
        );
    }
}
