import { sessionService } from 'redux-react-session'
const jwtDecode = require('jwt-decode')

export const login = (token) => {
    return () => {
        return sessionService.saveSession({ token })
        .then(() => {
            let decoded = jwtDecode(token);
            let data = {
                'token': token,
                'id': decoded.sub,
                'name': decoded.name
            };
            sessionService.saveUser(data)
            .then(() => {
                console.log("Logged in");
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    };
};

export const logout = () => {
    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
    };
};
