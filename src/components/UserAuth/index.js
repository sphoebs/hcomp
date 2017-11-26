import React, { PropTypes, Component } from 'react';
import UserActions from '../../data/user/UserActions';

export default class UserAuth extends Component {
    constructor(){
        super();
        console.log(this.props.match.params.token);
        this.props.history.push('/')
        //UserActions.logInUser(this.props.match.params, response.userID);
    }
}
