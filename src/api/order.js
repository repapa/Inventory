import axios from 'axios';
import config from '../config';
import { getOrderRequestObject } from '../utils/apiUtils';

export const getOrderReference = (profile, selection, policyHolder, travellers) => {
  return axios.post(
    `${config.mwUrl}/order`,
    getOrderRequestObject(profile, selection, policyHolder, travellers)
  );
};

export const getOrderStatus = (orderReference) => {
  return axios.get(`${config.mwUrl}/order/status?referenceNumber=${orderReference}`);
};
