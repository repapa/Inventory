import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export const validateSignUpInputs = (payload) => {
    console.log(`${payload.password} - ${payload.confirmPassword}`);
    
    let errors = {};

    if (Validator.isEmpty(payload.username)) {
        errors.username = 'Username is required';
    }

    if (Validator.isEmpty(payload.email)) {
        errors.email = 'Email is required';
    } else if (!Validator.isEmail(payload.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(payload.password)) {
        errors.password = 'Password is required';
    }

    if (Validator.isEmpty(payload.confirmPassword)) {
        errors.confirmPassword = 'Confirm Password is required';
    }

    if (!Validator.equals(payload.password, payload.confirmPassword)) {
        errors.confirmPassword = 'Password did not match';
    }

    if (Validator.isEmpty(payload.timezone)) {
        errors.timezone = 'Timezone is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};