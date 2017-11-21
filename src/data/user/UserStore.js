import Immutable from 'immutable';
import User from './User';
import {ReduceStore} from 'flux/utils';
import UserActionTypes from './UserActionTypes';
import UserDispatcher from './UserDispatcher';
import Api from '../../api/api';


class UserStore extends ReduceStore {
    constructor() {
        super(UserDispatcher);
        console.log("constructor called");
    }

    getInitialState(){
        console.log("InitialState called");
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        console.log("Reduce");
        switch (action.type) {
            case UserActionTypes.LOG_IN:
            Api
                .post('https://hsoc.herokuapp.com/userLogin', new User({
                    name: action.name,
                    id: action.id
                }))
                .then(()=>{console.log("Then called")}
                );
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
