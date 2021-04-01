import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {fetchListingById} from "../../actions/listingActions";

function ItemListing(props) {


    const getListingData = (id) => {
        props.fetchListingById(id)
        window.scrollTo({
            top: 0,
            left: 0
        })
    }

    let id = props._id;

    const backgroundImage = {
        backgroundImage: props.images && `url(/images/${props.images[0].url})`,
    }
    return (
        <React.Fragment>
            <Link to={`/listing/${props._id}`} onClick={() => getListingData(id)}>
                <div className="item-listing">
                    <div className="item-listing__image" style={ backgroundImage}>

                    </div>
                    <div className="item-listing__item-info">
                        <p className="item-listing__item-info-title">{props.title} </p>
                        <p className={'item-listing__item-info-price'}>{
                            props.price < 1 ?
                                "Trade" : props.price > 1 ? `Trade + $${props.price}` : undefined}</p>
                        <p className={'item-listing__item-info-location'}>Belleville, IL</p>
                    </div>

                </div>
            </Link>

        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    listingData: state.listingData
})
export default connect(mapStateToProps, {fetchListingById})(ItemListing);