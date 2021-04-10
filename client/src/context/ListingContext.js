import React, {useState, createContext} from 'react'
import axios from "axios";
import {
    DELETE_LISTING, DELETE_LISTING_ERROR,
    FETCH_ALL_LISTINGS_BY_CATEGORY,
    FETCH_ALL_LISTINGS_BY_CATEGORY_ERROR, FETCH_ALL_LISTINGS_BY_ID, FETCH_ALL_LISTINGS_BY_ID_ERROR,
    FETCH_LISTING_BY_ID
} from "../actions/types";

export const ListingContext = createContext();
export const ListingProvider = (props) => {

    const [contextState, setContextState] = useState({
        // selectedlistings: [],
        // listingsByPoster: [],
        // currentListing: {},
        // listingsByCurrentUser: [],
        // listingError: {}
    })
    const fetchAllListings = () => {
        axios.get("http://localhost:3070/listing/")
            .then(response => {
                console.log(response.data)

                setContextState((contextState) => ({
                    ...contextState,
                    selectedListings: response.data
                }))
            })
            .catch(err => {
                console.log(err)
                setContextState((contextState) => ({
                    ...contextState,
                    listingError: err.response.data
                }))
            })
    }

    const fetchAllListingsByCategory = (category) => {

        axios.get(`http://localhost:8080/api/listing?category=${category}`)

            .then(response => {
                setContextState({
                    ...contextState,
                    selectedlistings: response.data
                })
            })
            .catch(err => {
                setContextState((contextState) => ({
                    ...contextState,
                    listingError: err.response.data
                }))
            })
    }

    const fetchListingById = (id) => {

        axios.get(`http://localhost:3070/listing/${id}`)

            .then(response => {
                setContextState((contextState) => ({
                    ...contextState,
                    currentListing: response.data
                }))
                console.log(contextState)
            })
            .catch(err => [
                setContextState((contextState => ({
                    ...contextState,
                    listingError: err.response.data
                })))
            ])


    }
    const postListing = (listingData) => {
        axios.post("http://localhost:3070/listing/post", listingData)
            .then(response => {
                setContextState((contextState) => ({
                    ...contextState,
                    allListings: [...contextState.allListings, response.data]
                }))
            })
    }

    const deleteListing = (id, history) => {

        axios.delete(`http://localhost:3070/listing/${id}`)

            .then(response => {
                setContextState({
                    ...contextState
                })
            })

            .then(() => history.push("/"))

            .catch(err => {
                setContextState((contextState) => ({
                    ...contextState,
                    listingError: err.response.data
                }))
            })

    }

    const fetchAllListingsById = (user) => {
        console.log("FETCHING ALL LISTINGS BY THE LISTER OF THIS POST")
        axios.get(`http://localhost:3070/listing/all/${user}`)
            .then(response => {
                console.log(response.data)
                setContextState((contextState) = ({
                    ...contextState,
                    listingsByCurrent: response.data
                }))
            })
            .catch(err => {
                setContextState((contextState) => ({
                    ...contextState,
                    listingError: err
                }))
            })


    }
    return (
        <ListingContext.Provider value={{
            ...contextState,
            setContextState: setContextState,
            fetchAllListings: fetchAllListings,
            postListing: postListing,
            fetchAllListingsByCategory: fetchAllListingsByCategory,
            fetchAllListingsById: fetchAllListingsById,
            fetchListingById: fetchListingById,
            deleteListing: deleteListing
        }}

        >

            {props.children}

        </ListingContext.Provider>
    );
}
