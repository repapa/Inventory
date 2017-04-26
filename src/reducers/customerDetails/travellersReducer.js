import initialState from '../initialState';
import travellerTypes from '../../constants/travellerTypes';
import * as types from '../../constants/actionTypes';
import paths from '../../constants/routePaths';

export default function travellersReducer(state = initialState.travellers, action) {
  const payload = action.payload;
  switch (action.type) {
    case types.TRAVELLER_FORM_INIT:
      // First adult uses the policy holder form instead of traveller form
      const noOfAdultTravellerForms = + (payload.noOfAdult || 0) - 1;
      const noOfChildTravellerForms = + payload.noOfChild || 0;
      const formCount = noOfAdultTravellerForms + noOfChildTravellerForms;

      const isAdult = (index) => index < noOfAdultTravellerForms;

      return Object.assign(
        [],
        state,
        formCount > 0 ? [...Array(formCount)]
          .map((val, index) => (
            {
              travellerType: isAdult(index) ? travellerTypes.ADULT : travellerTypes.CHILD,
              // Index relative to travellerType (first traveller adult and child has 0 index)
              travellerTypeIndex: isAdult(index) ? index : index - noOfAdultTravellerForms,
              ...initialState.traveller
            }
          )) : []
      );

    case types.TRAVELLER_FORM_UPDATE_FIELDS:
      const { travellerIndex, formFields } = payload;
      return Object.assign([], state,
        {
          [travellerIndex]: Object.assign({}, state[travellerIndex],
            {
              formFields,
              isFilled: true
            }
          )
        }
      );

    case types.LOCATION_CHANGE:
      const originalState = initialState.travellers;

      switch(action.payload.pathname) {
        case paths.INDEX:
          return originalState;
        case paths.TRAVEL_INSURANCE:
          return originalState;
        case paths.PLAN_SELECTION:
          return state;
        case paths.CUSTOMER_DETAILS:
          return state;
        case paths.SUMMARY_DETAILS:
          return state;
        case paths.PAYMENT_DETAILS:
          return state;
        case paths.PAYMENT_CONFIRMATION:
          return state;
        case paths.PAYMENT_ERROR:
          return state;
        default:
          return originalState;
      }

    default:
      return state;
  }
}
