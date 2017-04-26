import moment from 'moment';
import RULES from '../../constants/rules';

const validateProfile = (profile) => {
  let errors = {};

  if(!profile.typeOfCover) {
    errors.typeOfCover = 'Value Required!';
  }

  if(!profile.typeOfPlan) {
    errors.typeOfPlan = 'Value Required!';
  }

  if(!profile.region) {
    errors.region = 'Value Required!';
  }

  if(typeof profile.noOfAdult === 'undefined') {
    errors.noOfAdult = 'Value Required!';
  }

  if(profile.typeOfPlan === 'family' && typeof profile.noOfChild === 'undefined') {
    errors.noOfChild = 'Value Required!';
  }

  if (profile.typeOfCover === 'multiTrip') {
    if(!profile.startDate || !moment(profile.startDate, RULES.DATE_FORMAT).isValid()) {
      errors.startDate = 'Please select correct date!';
    }

    if(!profile.endDate || !moment(profile.endDate, RULES.DATE_FORMAT).isValid()) {
      errors.endDate = 'Please select correct date!';
    }
  } else {
    if(!profile.departure || !moment(profile.departure, RULES.DATE_FORMAT).isValid()) {
      errors.departure = 'Please select correct date!';
    }

    if(!profile.arrival || !moment(profile.arrival, RULES.DATE_FORMAT).isValid()) {
      errors.arrival = 'Please select correct date!';
    }
  }

  return errors;
};

export default validateProfile;
