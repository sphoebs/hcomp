import React from 'react';
import FBLogin from '../FBLogin'
import UserStore from '../../data/container/usercontainer'
import UserActions from '../../data/user/UserActions'

export default class Login extends React.Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <p>Login page</p>
                <div>
                    <a onClick="UserActions.logInUserFB()">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z"
                        />
                        </svg>
                        <span>Log in with Facebook</span>
                    </a>
                </div>
            </div>
        );
    }
}
