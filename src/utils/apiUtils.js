import travellerTypes from '../constants/travellerTypes';
import RULES from '../constants/rules';

export const getQuotationRequestObject = (profile) => {

  let startDate, endDate;

  if (profile.typeOfCover === 'singleTrip') {
    startDate = profile.departure;
    endDate = profile.arrival;
  } else {
    startDate = profile.startDate;
    endDate = profile.endDate;
  }

  return {
    profile: {
      destination: profile.region,
      tripType: profile.typeOfCover,
      startDate: startDate,
      endDate: endDate,
      numberOfAdult: + profile.noOfAdult || 0,
      numberOfChild: + profile.noOfChild || 0
    }
  };
};

const getPolicyHolderFieldValues = (policyHolderFields) => ({
  firstName: policyHolderFields.firstName,
  lastName: policyHolderFields.lastName,
  dob: policyHolderFields.dateOfBirth,
  gender: policyHolderFields.gender,
  nationality: policyHolderFields.nationality,
  passport: policyHolderFields.passport,
  email: policyHolderFields.email,
  phoneNumber: policyHolderFields.phoneNumber,
  postCode: policyHolderFields.postCode,
  address: policyHolderFields.address
});

const getTravellerFieldValues = (travellerFields) => ({
  firstName: travellerFields.firstName,
  lastName: travellerFields.lastName,
  dob: travellerFields.dateOfBirth,
  gender: travellerFields.gender,
  nationality: travellerFields.nationality,
  passport: travellerFields.passport
});

const getTravellerObject = (travellers, travellerType) => {
  return travellers
    .filter((traveller) => traveller.travellerType === travellerType)
    .map((traveller) => getTravellerFieldValues(traveller.formFields));
};

export const getOrderRequestObject = (profile, selection, policyHolder, travellers) => ({
  profile: {
    destination: profile.region,
    tripType: profile.typeOfCover,
    startDate: profile.departure,
    endDate: profile.arrival,
    numberOfAdult: + profile.noOfAdult || 0,
    numberOfChildren: + profile.noOfChild || 0
  },
  selection: {
    totalFee: selection.totalFee,
    currency: RULES.CURRENCY,
    planId: selection.planId,
    addOnIds: selection.addOnIds
  },
  policyHolder: getPolicyHolderFieldValues(policyHolder.formFields),
  policyCover: {
    travellingAdults: [getTravellerFieldValues(policyHolder.formFields), ...getTravellerObject(travellers, travellerTypes.ADULT)],
    travellingChildren: getTravellerObject(travellers, travellerTypes.CHILD)
  }
});
