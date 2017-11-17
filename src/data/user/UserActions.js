import UserActionTypes from './UserActionTypes';
import UserDispatcher from './UserDispatcher';

const Actions = {
    logInUser(username, id) {
        console.log("loggingIn");
        UserDispatcher.dispatch({
            type: UserActionTypes.LOG_IN,
            username,
            id
        });
    },
};

export default Actions;
