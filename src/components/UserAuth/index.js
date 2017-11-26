import React from 'react';
import UserActions from '../../data/user/UserActions';

export default class UserAuth extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.match.params.token);
        this.props.history.push('/')
        //UserActions.logInUser(this.props.match.params, response.userID);
    }
}
