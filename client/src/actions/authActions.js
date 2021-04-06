import {LOGIN_ERROR, LOGIN_USER, LOGOUT_USER,LOGOUT_ERROR, SIGNUP_ERROR, SIGNUP_USER, RETRIEVE_SESSION, RETRIEVE_SESSION_ERROR} from "./types";
import axios from "axios";

axios.defaults.withCredentials = true;

export const userSignup = (signupData, closeMenu) => dispatch => {
    axios.post("http://localhost:3070/auth/signup", signupData)
        .then(response => {
            console.log(response);
            dispatch({
                type: SIGNUP_USER,
                payload: response.data
            })
            // if there are no errors the menu closes
            closeMenu();
        })
        .catch(error => dispatch({
            type: SIGNUP_ERROR,
            payload: error.response.data
        })).then(error => console.log(error))
}

export const userLogin = (loginData, closeMenu) => dispatch => {
    axios.post("http://localhost:3070/auth/login", loginData)
        .then(response => {
                dispatch({
                    type: LOGIN_USER,
                    payload: response.data
                })
                // if there are no errors the menu closes
                closeMenu();
            }
        )
        .catch(error => dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data
        }))
}

export const userLogout = () => dispatch => {
    axios.delete("http://localhost:3070/auth/logout")
        .then(response=>{
            dispatch({
                type:LOGIN_USER,
                payload: response.data
            })
        }).catch(error=>dispatch({
        type: LOGOUT_ERROR,
        payload: error.response.data
    }))
}

export const retrieveSession = ()=> dispatch=>{
    axios.post('http://localhost:3070/auth/reconnect')
        .then(response=>{
            dispatch({
                type: RETRIEVE_SESSION,
                payload: response.data
            })
        })
        .catch(error=>dispatch({
            type: RETRIEVE_SESSION_ERROR,
            payload: error.response.data
        }))
}