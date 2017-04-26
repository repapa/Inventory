import * as types from '../constants/actionTypes';

export const changeCurrency = (value) => {
  return dispatch => dispatch({
    type: types.CURRENCY_CHANGE,
    payload: value
  });
};