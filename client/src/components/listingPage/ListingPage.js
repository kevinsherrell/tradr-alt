import React, {useContext, useEffect, useState} from 'react';
import {connect} from 'react-redux'

import ItemListing from "../mainPage/ItemListing";

import {deleteListing, fetchAllListingsById} from "../../actions/listingActions";

import image from '../../assets/images/listing-pic.jpg'
import map from '../../assets/images/storelocator_clothing.png'
import axios from "axios";
import {ListingContext} from "../../context/ListingContext";
import {AuthContext} from "../../context/AuthContext";


const ListingPage = (props) => {
    const {currentListing, fetchAllListingsById} = useContext(ListingContext);
    // const listingData = useContext(ListingContext);
    const auth = useContext(AuthContext)
    const [state, setState] = useState({
        user: {},
        currentListing: currentListing
        // currentUser: listingData.currentListing
    })
    console.log(currentListing)
    // state = {
    //     user: {},
    //     authenticatedUser: ""
    //     // listing: this.props.listingData.listingPage
    // }

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
        if (auth.currentUser === state.user._id) {
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
        if(currentListing){
            let user_id = currentListing.user
                console.log(user_id)
            fetchAllListingsById(user_id)
        }

        // console.log("fetching user")
        // axios.get(`http://localhost:3070/user/${user_id}`)
        //     .then(user => {
        //
        //         setState({
        //             user: user.data
        //         })
        //
        //     })
        //     .catch(err => console.log(err))
    },[currentListing])


    let userImage = null
    let deleteMe = null
    if (state.user) {
        if (state.user.image) {
            userImage = `/images/${state.user.image.url}`
        }
        if (state.user._id === auth.currentUser._id) {
            const deleteMe = <p className="listing-page__delete" onClick={handleDelete}>Delete This Post</p>
        }
    }

    return (
        <p>hello world</p>
        // <div className="listing-page">
        //
        //     <div className="listing-page__inner-container container">
        //
        //         <div className="listing-page__listing-main">
        //
        //             {/*<section className="listing-page__listing-image-section">*/}
        //             {/*    <img className={'listing-page__listing-image'}*/}
        //             {/*         src={`/images/${listingData.currentListing.images.length > 0 && listingData.currentListing.images[0].url}`}*/}
        //             {/*         alt=""/>*/}
        //
        //             {/*    <p className={'listing-page__price-btn'}>{listingData.currentListing.price < 1 ? "Trade Only" : `Trade + $${listingData.currentListing.price}`}</p>*/}
        //             {/*    <p className={'listing-page__photo-btn'}>View photos*/}
        //             {/*        ({listingData.currentListing.images.length > 0 && listingData.currentListing.images.length})</p>*/}
        //
        //
        //             {/*</section>*/}
        //             <section className="listing-page__info-section">
        //
        //
        //                 <div className="listing-page__user-wrapper">
        //                     <sub className={'listing-page__age'}>Posted 3 days ago by: </sub>
        //                     <p className={'listing-page__name'}>{state.user && state.user.firstName} {state.user && state.user.lastName}</p>
        //                     <div className="listing-page__avatar-wrapper">
        //                         <img className={'listing-page__avatar-image'}
        //                              src={userImage} alt=""/>
        //                     </div>
        //                 </div>
        //                 <h4 className={'listing-page__title'}>{listingData.currentListing.title}</h4>
        //                 {/*<p>Trade + $250</p>*/}
        //                 {/*<p className={'listing-page__location'}>{location}</p>*/}
        //                 <h4 className={'listing-page__description-header'}>Description:</h4>
        //                 <p className={'listing-page__description-text'}>
        //                     {listingData.currentListing.description}
        //                 </p>
        //                 <h4 className={'listing-page__wanted-header'}>Will trade for:</h4>
        //                 <p className={'listing-page__wanted'}>{listingData.currentListing.tradeFor}</p>
        //
        //                 {state.user._id === state.authenticatedUser && (
        //                     <p className="listing-page__delete" onClick={deleteListing}>Delete This Post</p>
        //                 )}
        //             </section>
        //         </div>
        //         <div className="listing-page__contact-section">
        //
        //
        //             <img className={'listing-page__map'} src={map} alt=""/>
        //
        //             <form action="" className="listing-page__offer-form">
        //                     <textarea className={'listing-page__offer-form-input'} name="makeAnOffer" id="makeAnOffer"
        //                               cols="30" rows="10"
        //                               placeholder={'Send message or make an offer!'}></textarea>
        //                 <button className={'listing-page__offer-form-submit'}>Send</button>
        //             </form>
        //         </div>
        //     </div>
        //     <div className="listing-page__other-listings-section">
        //         <h4 className={'listing-page__listings-by-user-header container'}>More
        //             listings {state.user.firstName} {state.user.lastName}: </h4>
        //
        //         <div className="listing-page__listings-by-user-wrapper container">
        //             {listingData.listingsByCurrent && listingData.listingsByCurrent.map(listing => <ItemListing
        //                 key={listing._id}{...listing}/>)}
        //         </div>
        //         <h4 className={'listing-page__listings-near-you-header container'}>Similar listings near you:</h4>
        //         <div className="listing-page__listings-near-you-wrapper container grid">
        //             {/*{this.props.listingData.listingsByLister && listingPageUser.listingData.listingsByLister.map(listing => {*/}
        //             {/*    return <ItemListing key={listing._id} {...listing}*/}
        //             {/*                        backgroundImage={{backgroundImage: `url(/images/${listing.images[0].url})`}}/>*/}
        //
        //             {/*}) }*/}
        //         </div>
        //     </div>
        //
        //
        // </div>
    )

}

export default ListingPage
