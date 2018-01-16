
function userState(state = {
    user: null,
    fetching: false,
    fetched: false,
    error: null
}, action) {

    switch (action.type) {

        case "RESET_USER":
        return {...state, fetched:false};

        case "FETCH_USER_PENDING":
        return {...state, fetching:true, fetched: false};

        case "FETCH_USER_FULFILLED":
        return {...state, fetching:false, fetched:true, user: action.payload.data};

        default:
        return state
    }
}


export default userState
