import React from 'react';
import {Redirect} from 'react-router-dom';
import UserActions from '../../data/user/UserActions';

export default class UserAuth extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.match.params.token);
        //UserActions.logInUser(this.props.match.params, response.userID);
    }

    render(){
        return (<Redirect to={{
            pathname: '/',
            state: this.state
        }} />);
    }
}
