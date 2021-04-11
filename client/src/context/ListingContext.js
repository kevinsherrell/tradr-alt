import React, {useState, createContext} from 'react'
import axios from "axios";


export const ListingContext = createContext();

export const ListingProvider = (props) => {

    const [allListings, setAllListings] = useState([])
    const [selectedListings, setSelectedListings] = useState([])
    const [currentListing, setCurrentListing] = useState({})
    const [listingsByCurrent, setListingsByCurrent] = useState([])
    const [listingError, setListingError] = useState({})

    const fetchAllListings = () => {
        axios.get("http://localhost:3070/listing/")
            .then(response => {
                console.log(response.data)
                setAllListings(response.data)
            })
            .catch(err => {
                console.log(err)
                setListingError(err.response)
            })
    }

    const fetchAllListingsByCategory = (category) => {

        axios.get(`http://localhost:3070/listing?category=${category}`)

            .then(response => {
                setSelectedListings(response.data)
            })
            .catch(err => {
                setListingError(err.response)
            })
    }

    const fetchListingById = (id) => {

        axios.get(`http://localhost:3070/listing/${id}`)

            .then(response => {
                setCurrentListing(response.data)
            })
            .catch(err => [
                setListingError(err.response)
            ])


    }
    const postListing = (listingData) => {
        axios.post("http://localhost:3070/listing/post", listingData)
            .then(response => {
                setAllListings([...allListings, response.data])
            })
            .catch(err => {
                setListingError(err.response)
            })
    }

    const deleteListing = (id, history) => {

        axios.delete(`http://localhost:3070/listing/${id}`)

            .then(response => {
                setAllListings(allListings)
            })

            .then(() => history.push("/"))

            .catch(err => {
                setListingError(err.response)
            })

    }

    const fetchAllListingsById = (user) => {
        console.log("FETCHING ALL LISTINGS BY THE LISTER OF THIS POST")
        axios.get(`http://localhost:3070/listing/all/${user}`)
            .then(response => {
                console.log(response.data)
                setListingsByCurrent(response.data)
            })
            .catch(err => {
                setListingError(err.response)
            })


    }
    return (
        <ListingContext.Provider value={{
            allListings: allListings,
            selectedListings: selectedListings,
            currentListing: currentListing,
            listingsByCurrent: listingsByCurrent,
            listingError: listingError,
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
