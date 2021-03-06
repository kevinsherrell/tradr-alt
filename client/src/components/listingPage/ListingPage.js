import React from 'react';
import {connect} from 'react-redux'

import ItemListing from "../mainPage/ItemListing";

import {deleteListing} from "../../actions/listingActions";

import image from '../../assets/images/listing-pic.jpg'
import map from '../../assets/images/storelocator_clothing.png'


class ListingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    style = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }

    browserWidth = window.innerWidth

    handleSlider = (index, images) => {
        if (index < images.length - 1) {
            this.setState({
                sliderImageIndex: this.state.sliderImageIndex + 1,
            })
        } else {
            this.setState({
                sliderImageIndex: 0
            })
        }
    }


    deleteListing = (id, history) => {
        id = this.props.listingData.listingPage.id
        history = this.props.history
        if (this.props.auth.authenticatedUser && this.props.auth.authenticatedUser.id === this.props.listingData.listingPage.user) {
            this.props.deleteListing(id, history)
        }

    }


    render() {

        const {listings, listingPage, listingPageUser} = this.props.listingData
        const {authenticatedUser} = this.props.auth
        return (
            <div className="listing-page">

                <div className="listing-page__inner-container container">

                    <div className="listing-page__listing-main">

                        <section className="listing-page__listing-image-section">
                            <img className={'listing-page__listing-image'}
                                 src={`${listingPage && listingPage.imageUrl}`}
                                 alt=""/>

                            <p className={'listing-page__price-btn'}>{listingPage.price < 1 ? "Trade Only" : `Trade + $${listingPage.price}`}</p>
                            <p className={'listing-page__photo-btn'}>View photos (5)</p>


                        </section>
                        <section className="listing-page__info-section">


                            <div className="listing-page__user-wrapper">
                                <sub className={'listing-page__age'}>Posted 3 days ago by: </sub>
                                <p className={'listing-page__name'}>{listingPageUser && listingPageUser.firstName} {listingPageUser && listingPageUser.lastName}</p>
                                <div className="listing-page__avatar-wrapper">
                                    <img className={'listing-page__avatar-image'}
                                         src={listingPageUser && listingPageUser.imageUrl} alt=""/>
                                </div>
                            </div>
                            <h4 className={'listing-page__title'}>{listingPage.title}</h4>
                            {/*<p>Trade + $250</p>*/}
                            {/*<p className={'listing-page__location'}>{location}</p>*/}
                            <h4 className={'listing-page__description-header'}>Description:</h4>
                            <p className={'listing-page__description-text'}>
                                {listingPage.description}
                            </p>
                            <h4 className={'listing-page__wanted-header'}>Will trade for:</h4>
                            <p className={'listing-page__wanted'}>{listingPage.itemsWanted}</p>

                            {authenticatedUser && authenticatedUser.id === listingPage.user ? (
                                <p className="listing-page__delete" onClick={this.deleteListing}>Delete This Post</p>

                            ) : null}
                        </section>
                    </div>
                    <div className="listing-page__contact-section">


                        <img className={'listing-page__map'} src={map} alt=""/>

                        <form action="" className="listing-page__offer-form">
                            <textarea className={'listing-page__offer-form-input'} name="makeAnOffer" id="makeAnOffer"
                                      cols="30" rows="10"
                                      placeholder={'Send message or make an offer!'}></textarea>
                            <button className={'listing-page__offer-form-submit'}>Send</button>
                        </form>
                    </div>
                </div>
                <div className="listing-page__other-listings-section">
                    <h4 className={'listing-page__listings-by-user-header container'}>More listings from Cloud
                        Strife: </h4>

                    <div className="listing-page__listings-by-user-wrapper container">
                        {listingPageUser.listing ? listingPageUser.listing.map(listing => <ItemListing
                            key={listing.id}{...listing}/>) : undefined}
                    </div>
                    <h4 className={'listing-page__listings-near-you-header container'}>Similar listings near you:</h4>
                    <div className="listing-page__listings-near-you-wrapper container grid">
                        {listingPageUser.listing ? listingPageUser.listing.map(listing => <ItemListing
                            key={listing.id} {...listing}/>) : undefined}
                    </div>
                </div>


            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    listingData: state.listingData
})
export default connect(mapStateToProps, {deleteListing})(ListingPage);
