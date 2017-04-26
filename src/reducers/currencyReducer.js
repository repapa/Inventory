import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function currencyReducer(state = initialState.currency, action) {
  switch (action.type) {
    case types.CURRENCY_CHANGE:
      return action.payload;

    default:
      return state;
  }
}
