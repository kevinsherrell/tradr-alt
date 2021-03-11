const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateSignupInput = data => {
    // data is referring to req.
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    // firstName
    if(Validator.isEmpty(data.firstName)){
        errors.firstName = "Must enter first name";
    }
    // lastName
    if(Validator.isEmpty(data.lastName)){
        errors.lastName = "Must enter last name";
    }
    // zipCode
    if(Validator.isEmpty(data.zipCode)){
        errors.zipCode = "Must enter zip code";
    }
    // email
    if(Validator.isEmpty(data.email)){
        errors.email = "Must enter an email";
    }else if(!Validator.isEmail(data.email)){
        errors.email = "Must enter a valid email";
    }
    // password
    if(Validator.isEmpty(data.password)){
        errors.password = "Must enter a password";
    }else if(!Validator.isLength(data.password, {min: 8})){
        errors.password = "Password must be at least 8 characters";
    }
    // password confirmation
    if(Validator.isEmpty(data.confirmPassword)){
        errors.confirmPassword = "Please confirm password";
    }else if(!Validator.equals(data.password, data.confirmPassword)){
        errors.confirmPassword = "Passwords do not match";
    }

    return {
        errors, isValid: isEmpty(errors)
    }
}

module.exports = validateSignupInput;