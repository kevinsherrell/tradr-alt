import React, {useContext, useEffect, useState} from 'react';
import {GoogleMap, Marker} from 'react-google-maps';
import {API_KEY} from 'env-create-react-app'
import ItemListing from "../mainPage/ItemListing";

import image from '../../assets/images/listing-pic.jpg'
import map from '../../assets/images/storelocator_clothing.png'

import axios from "axios";

import {ListingContext} from "../../context/ListingContext";
import {AuthContext} from "../../context/AuthContext";
import Map from "./Map";

const ListingPage = (props) => {
    const apiKey = process.env.REACT_APP_API_KEY
    const apikey2 = process.env.REACT_APP_GMAPS_KEY
    console.log(API_KEY)
    console.log(apiKey)
    console.log(apikey2)
    const {currentListing, listingsByCurrent, fetchAllListingsById, deleteListing} = useContext(ListingContext);
    const {currentUser} = useContext(AuthContext)
    const [state, setState] = useState({
        user: {},
        currentListing: currentListing
    })
    console.log(currentListing)


    const style = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }

    let browserWidth = window.innerWidth

    // const handleSlider = (index, images) => {
    //     if (index < images.length - 1) {
    //         this.setState({
    //             sliderImageIndex: this.state.sliderImageIndex + 1,
    //         })
    //     } else {
    //         this.setState({
    //             sliderImageIndex: 0
    //         })
    //     }
    // }


    const handleDelete = (id, history) => {
        id = currentListing._id
        history = props.history
        if (currentUser._id === state.user._id) {
            deleteListing(id, history)
        }
    }

    const getAllListingDataByUser = (user) => {
        fetchAllListingsById(user)
    }
    const getListingData = async (listingData) => {
        console.log(listingData)

    }
    useEffect(() => {
        console.log(currentListing)
        if (currentListing) {
            let user_id = currentListing.user
            console.log(user_id)
            fetchAllListingsById(user_id)
            console.log("fetching user")
            axios.get(`http://localhost:3070/user/${user_id}`)
                .then(user => {
                    setState((state) => ({
                        user: user.data
                    }))
                })
                .catch(err => console.log(err))
        }


    }, [currentListing])


    let userImage = null
    let deleteMe = null
    if (state.user) {
        if (state.user.image) {
            userImage = `/images/${state.user.image.url}`
        }
        if (state.user._id === currentUser._id) {
            const deleteMe = <p className="listing-page__delete" onClick={handleDelete}>Delete This Post</p>
        }
    }

    if (currentListing) {
        return (
            // <p>hello world</p>
            <div className="listing-page">

                <div className="listing-page__inner-container container">

                    <div className="listing-page__listing-main">

                        <section className="listing-page__listing-image-section">
                            <img className={'listing-page__listing-image'}
                                 src={`/images/${currentListing.images && currentListing.images[0].url}`}
                                 alt=""/>

                            <p className={'listing-page__price-btn'}>{currentListing.price < 1 ? "Trade Only" : `Trade + $${currentListing.price}`}</p>
                            <p className={'listing-page__photo-btn'}>View photos
                                ({currentListing.images && currentListing.images.length})</p>
                        </section>
                        <section className="listing-page__info-section">


                            <div className="listing-page__user-wrapper">
                                <sub className={'listing-page__age'}>Posted 3 days ago by: </sub>
                                <p className={'listing-page__name'}>{state.user && state.user.firstName} {state.user && state.user.lastName}</p>
                                <div className="listing-page__avatar-wrapper">
                                    <img className={'listing-page__avatar-image'}
                                         src={userImage} alt=""/>
                                </div>
                            </div>
                            <h4 className={'listing-page__title'}>{currentListing.title}</h4>
                            {/*<p>Trade + $250</p>*/}
                            {/*<p className={'listing-page__location'}>{location}</p>*/}
                            <h4 className={'listing-page__description-header'}>Description:</h4>
                            <p className={'listing-page__description-text'}>
                                {currentListing.description}
                            </p>
                            <h4 className={'listing-page__wanted-header'}>Will trade for:</h4>
                            <p className={'listing-page__wanted'}>{currentListing.tradeFor}</p>

                            {state.user._id === currentUser._id && (
                                <p className="listing-page__delete" onClick={handleDelete}>Delete This Post</p>
                            )}
                        </section>
                    </div>
                    <div className="listing-page__contact-section">
                        <Map
                            isMarkerShown
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=&v=weekly`}
                            loadingElement={<div style={{height: '100%'}}/>}
                            containerElement={<div style={{height: '400px'}}/>}
                            mapElement={<div style={{height: '100%'}}/>}
                        />
                        <form action="" className="listing-page__offer-form">
                            <textarea className={'listing-page__offer-form-input'} name="makeAnOffer" id="makeAnOffer"
                                      cols="30" rows="10"
                                      placeholder={'Send message or make an offer!'}></textarea>
                            <button className={'listing-page__offer-form-submit'}>Send</button>
                        </form>
                    </div>
                </div>
                <div className="listing-page__other-listings-section">
                    <h4 className={'listing-page__listings-by-user-header container'}>More
                        listings {state.user.firstName} {state.user.lastName}: </h4>

                    <div className="listing-page__listings-by-user-wrapper container">
                        {listingsByCurrent.length > 0 && listingsByCurrent.map(listing => <ItemListing
                            key={listing._id}{...listing}/>)}
                    </div>
                    <h4 className={'listing-page__listings-near-you-header container'}>Similar listings near you:</h4>
                    <div className="listing-page__listings-near-you-wrapper container grid">
                        {/*{this.props.listingData.listingsByLister && listingPageUser.listingData.listingsByLister.map(listing => {*/}
                        {/*    return <ItemListing key={listing._id} {...listing}*/}
                        {/*                        backgroundImage={{backgroundImage: `url(/images/${listing.images[0].url})`}}/>*/}

                        {/*}) }*/}
                    </div>
                </div>


            </div>
        )

    }

}

export default ListingPage
