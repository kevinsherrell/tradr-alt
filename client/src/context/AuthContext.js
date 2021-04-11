import React, {useState, createContext} from 'react'
import axios from "axios";

axios.defaults.withCredentials = true;

export const AuthContext = createContext();
export const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState({});
    const [authenticated, setAuthenticated] = useState(false);
    const [authError, setAuthError] = useState(null);

    const userSignup = (signupData, closeMenu) => {
        axios.post("http://localhost:3070/auth/signup", signupData)
            .then(response => {
                setCurrentUser(response.data.currentUser)
                setAuthenticated(true);
                closeMenu();
            })
            .catch(err => {
                setAuthError(err.response.data)
            })

    }
    const userLogin = (loginData, closeMenu) => {
        axios.post("http://localhost:3070/auth/login", loginData)
            .then(response => {
                setCurrentUser(response.data.currentUser)
                setAuthenticated(true)
                closeMenu();
            })
            .catch(err => {
                setAuthError(err.response.data)
            })
    }
    const userLogout = () => {
        axios.delete("http://localhost:3070/auth/logout")
            .then(response => {
                setCurrentUser({})
                setAuthenticated(false)
            })
    }
    const retrieveSession = () => {
        axios.post("http://localhost:3070/auth/reconnect")
            .then(response => {
                setCurrentUser(response.data && response.data)
                setAuthenticated(response.data && true);
            })
            .catch(err => {
                setAuthError(err.response.data)
            })
    }

    return (
        <AuthContext.Provider value={{
            currentUser: currentUser,
            setCurrentUser: setCurrentUser,
            authenticated: authenticated,
            setLoggedIn: setAuthenticated,
            authError: authError,
            setAuthError: setAuthError,
            retrieveSession: retrieveSession,
            userLogout: userLogout,
            userLogin: userLogin,
            userSignup: userSignup
        }}

        >

            {props.children}

        </AuthContext.Provider>
    );
}
