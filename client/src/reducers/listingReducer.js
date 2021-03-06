import {
    FETCH_ALL_LISTINGS,
    FETCH_LISTING_BY_ID,
    CREATE_LISTING,
    FETCH_USER_BY_ID,
    DELETE_LISTING,
    DELETE_LISTING_ERROR,
    FETCH_ALL_LISTINGS_BY_CATEGORY, FETCH_ALL_LISTINGS_BY_CATEGORY_ERROR
} from "../actions/types";

const initialState={
    listings: [],
    listingPage: {},
    listingPageUser: {},
    listingError: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_ALL_LISTINGS:
            console.log("FETCH_ALL_LISTINGS")
            console.log(action)
            return {
                ...state,
                listings: action.payload
            }
        case FETCH_ALL_LISTINGS_BY_CATEGORY:
            console.log("FETCH_ALL_LISTINGS_BY_CATEGORY")
            console.log(action)
            return {
                ...state,
                listings: action.payload
            }
        case FETCH_ALL_LISTINGS_BY_CATEGORY_ERROR:
            console.log("FETCH_ALL_LISTINGS_BY_CATEGORY_ERROR")
            console.log(action)
            return {
                ...state,
                listingError: action.payload
            }
        case FETCH_LISTING_BY_ID:
            console.log('FETCH_LISTING_BY_ID')
            console.log(action)
            return {
                ...state,
                listingPage: action.payload
            }
        case FETCH_USER_BY_ID:
            console.log("FETCH_USER_BY_ID")
            console.log(action)
            return{
                ...state,
                listingPageUser: action.payload
            }
        case CREATE_LISTING:
            console.log("CREATE LISTING")
            return{
                ...state,
                listings: [action.payload, ...state.listings]
            }
        case DELETE_LISTING:
            console.log("DELETE_LISTING")
            return{
                ...state
            }
        case DELETE_LISTING_ERROR:
            console.log("DELETE_LISTING_ERROR")
            return{
                ...state,
                listingError: action.payload,
                successMessage: "listing Deleted"
            }
        default:
            return state;
    }
}