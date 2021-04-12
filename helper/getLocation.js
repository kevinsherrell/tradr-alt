const axios = require('axios');
const {GOOGLE_MAPS_API_KEY} = process.env
const getLocation = (user) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${user.zipCode}&sensor=false&key=${GOOGLE_MAPS_API_KEY}`)
        .then(data => {
            console.log(data.data.results)
            const location = data.data.results[0].geometry.viewport

            const cityFilter = data.data.results[0].address_components.filter(component => {
                return component.types.includes("locality")
            })
            const stateFilter = data.data.results[0].address_components.filter(component => {
                return component.types.includes("administrative_area_level_1")
            })
            const cityState = `${cityFilter[0].long_name}, ${stateFilter[0].short_name}`
            // const cityState = `${data.data.results[0].address_components[1].long_name}, ${data.data.results[0].address_components[3].short_name}`
            console.log("CITY_FILTER", cityFilter[0])
            console.log("STATE_FILTER", stateFilter[0])
            user.location = location
            user.cityState = cityState
            user.save()
        })
        .catch(err => console.log(err))

}

module.exports = getLocation