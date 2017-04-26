import objectAssign from 'object-assign';

import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function profileReducer(state = initialState.quote, action) {
  switch (action.type) {
    case types.GET_QUOTE:
      return objectAssign({}, state, {
        isLoading: true
      });

    case types.GET_QUOTE_SUCCESS:
      return objectAssign({}, state, action.payload, {
        isLoading: false
      });

    case types.GET_QUOTE_ERROR:
      return objectAssign({}, state, {
        isLoading: false
      });

    case types.REFERENCE_UPDATE_SUCCESS:
      return objectAssign({}, state, {
        isLoading: false
      });

    default:
      return state;
  }
}
