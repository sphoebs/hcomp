import UserActionTypes from './UserActionTypes';
import UserDispatcher from './UserDispatcher';

const Actions = {
    logInUserFB() {
        UserDispatcher.dispatch({
            type: UserActionTypes.LOG_IN
        });
    },
};

export default Actions;
