import routePaths from '../constants/routePaths';
import { browserHistory } from 'react-router';
import { getOrderStatus } from '../api/order';
import * as types from '../constants/actionTypes';

// deafault: pay now using credit card
export const payNow = () => {
  return (dispatch) => {
    // pay function
    dispatch({ type: 'OK' });

    // redirect to payment confirmation page
    browserHistory.push(routePaths.PAYMENT_CONFIRMATION);
  };
};

export const checkPaymentStatus = (orderReference) => {
  return (dispatch) => {
    return getOrderStatus(orderReference)
      .then(response => {
        dispatch({ type: types.GET_PAYMENT_STATUS, payload: response.data.order.status });
      })
      .catch(error => {
        dispatch({ type: types.GET_PAYMENT_STATUS_ERROR, payload: error });
      });
  };
};
