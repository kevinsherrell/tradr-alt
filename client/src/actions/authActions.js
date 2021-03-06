import {LOGIN_ERROR, LOGIN_USER, LOGOUT_USER, SIGNUP_ERROR, SIGNUP_USER} from "./types";
import axios from "axios";

export const userSignup = (signupData, closeMenu) => dispatch => {
    axios.post("http://localhost:8080/api/user", signupData)
        .then(response => {
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
    axios.post("http://localhost:8080/api/user/login", loginData)
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
    return {
        type: LOGOUT_USER
    }
}