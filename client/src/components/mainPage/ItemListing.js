import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {fetchListingById} from "../../actions/listingActions";

function ItemListing(props) {

// console.log(props)

    const getListingData = (id) => {
        props.fetchListingById(id)
        window.scrollTo({
            top: 0,
            left: 0
        })
    }

    let id = props.id;

    const styles = {
        backgroundImage: `url(${props.imageUrl})`,
    }

    return (
        <React.Fragment>
            <Link to={`/listing/${props.id}`} onClick={() => getListingData(id)}>
                <div className="item-listing">
                    <div className="item-listing__image" style={styles}>

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