import * as types from '../constants/actionTypes';

export const acceptTermsAndConditions = (accepted) => {
  return (dispatch) => {
    dispatch({ type: types.TERMS_AND_CONDITIONS_ACCEPTED, payload: accepted });
  };
};
