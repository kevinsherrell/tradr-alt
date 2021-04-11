const axios = require('axios');
const getLocation = (user) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${user.zipCode}&sensor=false&key=AIzaSyAUadBDUI_Mmb2cESddLNwlFB30u1yDER8`)
        .then(data => {
            const location = data.data.results[0].geometry.viewport
            user.location = location
            user.save()
        })
        .catch(err => console.log(err))

}

module.exports = getLocation