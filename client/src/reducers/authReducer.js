import {
    LOGIN_USER,
    SIGNUP_USER, LOGIN_ERROR, SIGNUP_ERROR, LOGOUT_USER
} from "../actions/types";

const initialState = {
    authenticated: false,
    authenticatedUser: {},
    authError: {}
}

export default function (state = initialState, action) {
    console.log(action)

    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                authenticated: true,
                authenticatedUser: action.payload
            }
        case LOGIN_ERROR:
            return {
                ...state,
                authenticated: false,
                authError: action.payload
            }
        case LOGOUT_USER:
            console.log("LOGOUT_USER")
            return {
                ...state,
                authenticated: false,
                authenticatedUser: undefined
            }
        case SIGNUP_USER:
            return {
                ...state,
                authenticated: true,
                authError: action.payload
            }
        case SIGNUP_ERROR:
            return {
                ...state,
                authenticated: false,
                authError: action.payload
            }
        default:
            return state;
    }
}