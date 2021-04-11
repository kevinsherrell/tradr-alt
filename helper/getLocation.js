const axios = require('axios');
const {GOOGLE_MAPS_API_KEY} = process.env
const getLocation = (user) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${user.zipCode}&sensor=false&key=${GOOGLE_MAPS_API_KEY}`)
        .then(data => {
            console.log(data.data.results)
            const location = data.data.results[0].geometry.viewport
            user.location = location
            user.save()
        })
        .catch(err => console.log(err))

}

module.exports = getLocation