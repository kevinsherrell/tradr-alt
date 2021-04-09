import React, {useState, createContext} from 'react'
import axios from "axios";

export const ListingContext = createContext();
export const ListingProvider = (props) => {


    const [allListings, setAllListings] = useState([])
    const [listingsByPoster, setListingsByPoster] = useState([])
    const [currentListing, setCurrentListing] = useState({})
    const [listingsByCurrentUser, setListingsByCurrentUser] = useState([])
    const [listingError, setListingError] = useState({})
    const fetchAllListings = ()=>{
        axios.get("http://localhost:3070/listing/")
            .then(response=>{
                console.log(response)
                setAllListings(response.data)
            })
            .catch(err=>{
                console.log(err)
                // setListingError(err.response.data)
            })
    }

    return (
        <ListingContext.Provider value={{
            allListings: allListings,
            setListings: setAllListings,
            fetchAllListings: fetchAllListings
        }}

        >

            {props.children}

        </ListingContext.Provider>
    );
}
