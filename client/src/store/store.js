import { applyMiddleware, combineReducers, createStore } from 'redux'
import { sessionService, sessionReducer } from 'redux-react-session'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import userState from './reducers/userReducer'

const middleWare = applyMiddleware(createLogger(), thunk, promise());

const reducers = combineReducers({
    user: userState,
    session: sessionReducer
})

const store = createStore(reducers, middleWare);

sessionService.initSessionService(store)
.then(() => console.log("Session initialized"));

export default store
