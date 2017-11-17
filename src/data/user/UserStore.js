import {ReduceStore} from 'flux/utils';
import UserActionTypes from './UserActionTypes';
import UserDispatcher from './UserDispatcher';

class UserStore extends ReduceStore {
    constructor() {
        super(UserDispatcher);
    }

    reduce(state, action) {
        switch (action.type) {
            case UserActionTypes.LOG_IN:
            return state.set(new User({
                name: action.name,
                id: action.id
            }));

            default:
            return state;
        }
    }
}

export default new UserStore();
