const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateLoginInput = data =>{
     // data is referring to req.
    let errors = {};

    //
    data.body = !isEmpty(data.body) ? data.body: '';
    data.title = !isEmpty(data.title) ? data.title: '';
    data.category = !isEmpty(data.category) ? data.category: '';
    data.description = !isEmpty(data.description) ? data.description: '';
    data.tradeFor = !isEmpty(data.tradeFor) ? data.tradeFor: '';
    data.location = !isEmpty(data.location) ? data.location: '';
    // listing validation

    // empty body (request object)
    if(Validator.isEmpty(data.body)){
        errors.body = "Cannot be empty";
    };

    // empty title
    if(Validator.isEmpty(data.title)){
        errors.title = "Cannot be empty";
    }
    // empty category
    if(Validator.isEmpty(data.category)){
        errors.title = "Cannot be empty";
    }
    // empty description
    if(Validator.isEmpty(data.description)){
        errors.title = "Cannot be empty";
    }
    // empty tradeFor
    if(Validator.isEmpty(data.tradeFor)){
        errors.title = "Cannot be empty";
    }
    // empty location
    if(Validator.isEmpty(data.location)){
        errors.title = "Cannot be empty";
    }
    return{
        errors, isValid: isEmpty(errors)
    }
}

module.exports = validateLoginInput;