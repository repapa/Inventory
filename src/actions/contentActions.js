import * as types from '../constants/actionTypes';
import { getContent } from '../api/content';

export const updateContent = () => {
  return (dispatch) => {
    return getContent()
    .then(response => {
      dispatch({ type: types.CONTENT_UPDATE_SUCCESS, payload: response.data });
    })
    .catch(() => {
      dispatch({ type: types.CONTENT_UPDATE_ERROR });
    });
  };
};
