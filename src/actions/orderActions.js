import { browserHistory } from 'react-router';
import { getOrderReference } from '../api/order';
import * as types from '../constants/actionTypes';
import routePaths from '../constants/routePaths';
import { getSelectionData } from '../utils/planSelectionUtil';

export function purchaseOrder(profile, selectedPlan, policyHolder, travellers) {

  return (dispatch) => {
    let selectionData = getSelectionData(selectedPlan);

    dispatch({ type: types.GET_ORDER });

    return getOrderReference(profile, selectionData, policyHolder, travellers)
      .then(response => {
        dispatch({ type: types.GET_ORDER_REFERENCE, payload: response.data.order.referenceNumber });
        browserHistory.push(routePaths.PAYMENT_DETAILS);
      })
      .catch(error => {
        dispatch({ type: types.GET_ORDER_REFERENCE_ERROR, payload: error });
      });
  };
}
