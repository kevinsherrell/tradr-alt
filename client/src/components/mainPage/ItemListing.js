import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import {ListingContext} from "../../context/ListingContext";

function ItemListing(props) {
    const listingData = useContext(ListingContext)

    const getListingData = (id) => {
        listingData.fetchListingById(id)
        window.scrollTo({
            top: 0,
            left: 0
        })
    }

    let id = props._id;

    const backgroundImage = {
        backgroundImage: props.images && `url(${props.images[0].url})`,
    }

    return (
        <>
            <Link to={`/listing/${props._id}`} onClick={() => getListingData(id)}>
                <div className="item-listing">
                    <div className="item-listing__image" style={backgroundImage}>

                    </div>
                    <div className="item-listing__item-info">
                        <p className="item-listing__item-info-title"><strong>{props.title}</strong> </p>
                        <p className={'item-listing__item-info-price'}>{
                            props.price < 1 ?
                                "Trade" : props.price > 1 ? `Trade + $${props.price}` : undefined}</p>
                        <p className={'item-listing__item-info-location'}><i>{props.cityState}</i></p>
                    </div>

                </div>
            </Link>

        </>
    )
}

export default ItemListing