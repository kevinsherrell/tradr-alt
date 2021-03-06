import {combineReducers} from 'redux';
import listingReducer from './listingReducer';
import authReducer from "./authReducer";

export default combineReducers({
    auth: authReducer,
    listingData: listingReducer
});