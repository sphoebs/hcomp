import UserActionTypes from './UserActionTypes';
import UserDispatcher from './UserDispatcher';

const Actions = {
    logInUserFB() {
        UserDispatcher.dispatch({
            type: UserActionTypes.LOG_IN,
            user
        });
    },
};

export default Actions;
