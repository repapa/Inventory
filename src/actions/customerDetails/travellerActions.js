import {
  TRAVELLER_FORM_INIT,
  TRAVELLER_FORM_UPDATE_FIELDS
} from '../../constants/actionTypes';

export const initializeTravellerForms = (noOfAdult, noOfChild) => (
  {
    type: TRAVELLER_FORM_INIT,
    payload: { noOfAdult, noOfChild }
  }
);

export const updateTravellerFields = (travellerIndex, formFields) => (
  {
    type: TRAVELLER_FORM_UPDATE_FIELDS,
    payload: { travellerIndex, formFields }
  }
);
