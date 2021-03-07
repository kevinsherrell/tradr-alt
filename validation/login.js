const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateLoginInput = data =>{
    let errors = {};

    // if data.email or data.password are empty "isEmpty" return boolean.
    data.email = !isEmpty(data.email) ? data.email: '';
    data.password = !isEmpty(data.password) ? data.password: '';

    // email empty
    if(!Validator.isEmail(data.email)){
        errors.email = 'Invalid email please try again';
    };
    if(Validator.isEmpty(data.email)){
        errors.email = "Email is required";
    };

    // password
    if(Validator.isEmpty(data.password)){
        errors.password = "Password is required";
    };

    return{
        errors, isValid: isEmpty(errors)
    }
}

module.exports = validateLoginInput;