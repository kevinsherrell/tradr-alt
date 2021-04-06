import React from 'react';
import {connect} from 'react-redux'

import ItemListing from "../mainPage/ItemListing";

import {deleteListing, fetchAllListingsById} from "../../actions/listingActions";

import image from '../../assets/images/listing-pic.jpg'
import map from '../../assets/images/storelocator_clothing.png'
import axios from "axios";


class ListingPage extends React.Component {
    state = {
        user: {},
        authenticatedUser: ""
        // listing: this.props.listingData.listingPage
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
        id = this.props.listingData.listingPage._id
        history = this.props.history
        if (this.state.authenticatedUser === this.state.user._id) {
            this.props.deleteListing(id, history)
        }

    }
    getAllListingDataByUser = (user) => {
        console.log(this.props.listingData.listingPage && this.props.listingData.listingPage)
        this.props.fetchAllListingsById(user)
    }

    componentDidMount = () => {
        this.setState({
            authenticatedUser: this.props.auth.authenticatedUser._id
        })
        console.log(this.props.auth.authenticatedUser._id)

        let user_id = this.props.listingData.listingPage.user
        this.props.fetchAllListingsById(user_id)
        console.log("fetching user")
        axios.get(`http://localhost:3070/user/${user_id}`)
            .then(user => {
                console.log(user)
                this.setState({
                    user: user.data
                }, () => console.log(this.state))
            })
            .catch(err => console.log(err))
    }

    render() {
        const {listings, listingPage, listingPageUser, listingsByLister} = this.props.listingData
        // const {authenticatedUser} = this.props.auth
        const {user, authenticatedUser} = this.state
        let userImage = null
        let deleteMe = null
        if (this.state.user) {
            if (this.state.user.image) {
                userImage = `/images/${this.state.user.image.url}`
            }
            if (this.state.user._id === this.state.authenticatedUser) {
                const deleteMe = <p className="listing-page__delete" onClick={this.deleteListing}>Delete This Post</p>
            }
        }

        return (

            <div className="listing-page">

                <div className="listing-page__inner-container container">

                    <div className="listing-page__listing-main">

                        <section className="listing-page__listing-image-section">
                            <img className={'listing-page__listing-image'}
                                 src={`/images/${listingPage.images && listingPage.images[0].url}`}
                                 alt=""/>

                            <p className={'listing-page__price-btn'}>{listingPage.price < 1 ? "Trade Only" : `Trade + $${listingPage.price}`}</p>
                            <p className={'listing-page__photo-btn'}>View photos
                                ({listingPage.images && listingPage.images.length})</p>


                        </section>
                        <section className="listing-page__info-section">


                            <div className="listing-page__user-wrapper">
                                <sub className={'listing-page__age'}>Posted 3 days ago by: </sub>
                                <p className={'listing-page__name'}>{user && user.firstName} {user && user.lastName}</p>
                                <div className="listing-page__avatar-wrapper">
                                    <img className={'listing-page__avatar-image'}
                                         src={userImage} alt=""/>
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
                            <p className={'listing-page__wanted'}>{listingPage.tradeFor}</p>

                            {this.state.user._id === this.state.authenticatedUser && (
                                <p className="listing-page__delete" onClick={this.deleteListing}>Delete This Post</p>
                            )}
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
                    <h4 className={'listing-page__listings-by-user-header container'}>More
                        listings {this.state.user.firstName} {this.state.user.lastName}: </h4>

                    <div className="listing-page__listings-by-user-wrapper container">
                        {listingsByLister && listingsByLister.map(listing => <ItemListing
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

const mapStateToProps = state => ({
    auth: state.auth,
    listingData: state.listingData
})
export default connect(mapStateToProps, {deleteListing, fetchAllListingsById})(ListingPage);
