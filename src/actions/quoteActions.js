import { browserHistory } from 'react-router';
import { getQuotation } from '../api/quotation';
import * as types from '../constants/actionTypes';
import { getPlanList } from '../selectors/plansSelectors';
import { loadPlansSuccess } from './planActions';
import routePaths from '../constants/routePaths';

export const getQuoteSuccess = (quote) => {
  return { type: types.GET_QUOTE_SUCCESS, payload: quote };
};

/**
 * Get Quotation
 *
 * Request API getQuotation.
 * If success, quote will be stored to state as well as
 * the list plans. quote will have the list of products
 * and products has plans, 'getPlanList' will filter
 * all plans from products and returns the list of plans.
 * @param {object} profileData: profiling data
 */
export const getQuote = (profileData, isRedirect) => {
  return (dispatch) => {
    // init get quote
    dispatch({ type: types.GET_QUOTE });

    return getQuotation(profileData)
      .then(response => {
        dispatch(getQuoteSuccess(response.data.quote));
        dispatch(loadPlansSuccess(getPlanList(response.data.quote.products)));
        // remove profile error
        dispatch({ type: types.PROFILE_VALIDATION_ERROR, payload: { errors: {} } });

        if (isRedirect) {
          browserHistory.push(routePaths.PLAN_SELECTION);
        }
      })
      .catch(() => {
        dispatch({ type: types.GET_QUOTE_ERROR });
      });
  };
};
