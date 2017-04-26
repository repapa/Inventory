import initialState from '../initialState';
import * as types from '../../constants/actionTypes';
import paths from '../../constants/routePaths';

export default function customerDetailsReducer(state = initialState.customerForm, action) {
  switch (action.type) {

    case types.GO_TO_NEXT_FORM:
      if(state.displayedFormIndex === state.filledFormIndex) {
        return Object.assign({}, state, {
          filledFormIndex: state.filledFormIndex + 1,
          displayedFormIndex: state.displayedFormIndex + 1
        });
      } else if (state.displayedFormIndex < state.filledFormIndex) {
        // Resume to form that is currently being filled after editing
        return Object.assign({}, state, {
          displayedFormIndex: state.filledFormIndex
        });
      }

      return state;

    case types.GO_TO_SELECTED_FORM:
      return Object.assign({}, state, {
        displayedFormIndex: action.payload.selectedFormIndex
      });

    case types.LOCATION_CHANGE:
      const originalState = initialState.customerForm;

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
