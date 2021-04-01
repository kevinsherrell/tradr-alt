import {
    FETCH_ALL_LISTINGS,
    FETCH_ALL_LISTINGS_BY_CATEGORY,
    FETCH_ALL_LISTINGS_BY_CATEGORY_ERROR,
    FETCH_LISTING_BY_ID,
    FETCH_ALL_LISTINGS_BY_ID,
    FETCH_ALL_LISTINGS_BY_ID_ERROR,
    CREATE_LISTING,
    FETCH_USER_BY_ID,
    DELETE_LISTING,
    DELETE_LISTING_ERROR,
} from "./types";
import axios from "axios";

export const fetchAllListings = () => dispatch => {
    axios.get("http://localhost:3070/listing/")
        .then(response => {
            dispatch({
                type: FETCH_ALL_LISTINGS,
                payload: response.data
            })
        })

        .catch(err => {
            console.log(err)
        })
}
// fetches all listings by a certain user
export const fetchAllListingsById = (user)=> dispatch =>{
    axios.get(`http://localhost:3070/listing/all/${user}`)
        .then(response=>{
            dispatch({
                type: FETCH_ALL_LISTINGS_BY_ID,
                payload: response.data
            })
        })
        .catch(error=>dispatch({
            type: FETCH_ALL_LISTINGS_BY_ID_ERROR,
            payload: error.response.data
        }))
}

export const fetchAllListingsByCategory = (category)=> dispatch => {
    axios.get(`http://localhost:8080/api/listing?category=${category}`)
        .then(response=>dispatch({
            type: FETCH_ALL_LISTINGS_BY_CATEGORY,
            payload: response.data
        }))
        .catch(err => dispatch({
            type: FETCH_ALL_LISTINGS_BY_CATEGORY_ERROR,
            payload: err.response.data
        }))
}
export const postListing = (listingData) => dispatch => {


    axios.post("http://localhost:3070/listing", listingData)
        .then(response => dispatch({
            type: CREATE_LISTING,
            payload: response.data
        })).catch(err => {
        console.log(listingData)
        console.log(err)
    })
}
export const fetchListingById = (id) => dispatch => {
    axios.get(`http://localhost:3070/listing/${id}`)
        .then(response => dispatch(
            {
                type: FETCH_LISTING_BY_ID,
                payload: response.data
            })
        )
        .catch(err=>console.log(err))
        // .then(response => {
        //     axios.get(`http://localhost:3070/user/${response.payload.user} `)
        //         .then(user => dispatch({
        //             type: FETCH_USER_BY_ID,
        //             payload: user.data
        //         })).then(response => {
        //     })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // })

}
export const deleteListing = (id,history) => dispatch => {
    axios.delete(`http://localhost:3070/listing/${id}`)
        .then(response => dispatch({
            type: DELETE_LISTING,
            payload: response.data
        }))
        .then(()=>history.push("/"))

        .catch(err => dispatch({
            type: DELETE_LISTING_ERROR,
            payload: err.response.data
        }))

}