import {ReduceStore} from 'flux/utils';
import UserActionTypes from './UserActionTypes';
import UserDispatcher from './UserDispatcher';
var Api = require('../../api/api');


class UserStore extends ReduceStore {
    constructor() {
        super(UserDispatcher);
    }

    reduce(state, action) {
        switch (action.type) {
            case UserActionTypes.LOG_IN:
            Api
                .post('localhost:5000/userLogin', new User({
                    name: action.name,
                    id: action.id
                }))
                .then({
                    console.log("Then called");
                });
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
