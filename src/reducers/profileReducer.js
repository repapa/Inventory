import objectAssign from 'object-assign';
import _ from 'lodash';

import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function profileReducer(state = initialState.profile, action) {
  switch (action.type) {
    case types.PROFILE_FORM_UPDATE:
      const { name, value } = action.payload;

      return objectAssign({}, state, {
        [name]: value
      }, {
        errors: _.omit(state.errors, [name])
      });

    case types.PROFILE_FORM_UPDATE_ALL:
      return objectAssign({}, state, action.payload, {
        errors: _.omit(state.errors, [name])
      });

    case types.PROFILE_VALIDATION_ERROR:
      return objectAssign({}, state, action.payload);

    case types.CONTENT_UPDATE_SUCCESS:
      return objectAssign({}, state, { isLoading: false });

    default:
      return state;
  }
}
