import moment from 'moment';

import RULES from '../../constants/rules';

const validateTraveller = (fields) => {
  const errors = {};

  if (!fields.firstName) {
    errors.firstName = 'Value Required!';
  }

  if (!fields.lastName) {
    errors.lastName = 'Value Required!';
  }

  if (!fields.dateOfBirth || !moment(fields.dateOfBirth, RULES.DATE_FORMAT).isValid()) {
    errors.dateOfBirth = 'Please select date!';
  }

  if (!fields.gender) {
    errors.gender = 'Value Required!';
  }

  if (!fields.nric) {
    errors.nric = 'Value Required!';
  }

  if (!fields.nationality) {
    errors.nationality = 'Value Required!';
  }

  if (!fields.passport) {
    errors.passport = 'Value Required!';
  }

  return errors;
};

export default validateTraveller;
