import Login from '../../components/Login'
import {Container} from 'flux/utils';
import UserStore from '../user/UserStore';

function getStores() {
  return [
    UserStore,
  ];
}

function getState() {
  return {
    todos: UserStore.getState(),
  };
}

export default UserStore;
