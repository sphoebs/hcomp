import UserActionTypes from './UserActionTypes';
import UserDispatcher from './UserDispatcher';

const Actions = {
    logInUserFB(user) {
        UserDispatcher.dispatch({
            type: UserActionTypes.LOG_IN,
            user: user
        });
    },
};

export default Actions;
