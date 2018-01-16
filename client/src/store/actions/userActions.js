import axios from 'axios'

/*
* action types
*/

export const FETCH_USER = 'FETCH_USER'

/*
* other constants
*/


/*
* action creators
*/

export function fetch_user(id) {
    return { type: FETCH_USER, payload: axios.get("LINK"+id)};
}
