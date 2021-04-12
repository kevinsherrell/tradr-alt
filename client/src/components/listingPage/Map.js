import React, {useContext, useEffect, useState} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import loading from '../../assets/images/giphy.gif'

const Map = (props) => {
    // let {user} = props
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({})
    const [location, setLocation] = useState()
    console.log("running outside of useEffect", Date.now())
    console.log(props)
    console.log(props.northeast)
    // useEffect(() => {
    //     console.log("running in useEffect", Date.now())
    //     setLocation(props.user.location)
    //     console.log(location)
    //     const {northeast, southwest} = location
    //     console.log(northeast, southwest)
    //
    // },[location])

    useEffect(() => {
        if (props.northeast) {
            setLoading(false);
        }
    }, [])

    if (loading) {
        return (
            <div>
                <img src={loading} alt=""/>
            </div>
        )
    }
    if (!loading) {
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{
                    lat: props.northeast && props.northeast.lat,
                    // lat: props.northeast && props.northeast.lat ,
                    lng: props.northeast && props.northeast.lng,
                    // lng: props.northeast && props.northeast.lng
                }}
            >
                {props.isMarkerShown && <Marker position={{
                    lat: props.northeast.lat,
                    lng: props.northeast.lng
                }}/>}
            </GoogleMap>

        )
    }


}

export default withScriptjs(withGoogleMap(Map))