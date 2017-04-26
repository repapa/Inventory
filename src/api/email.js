import axios from 'axios';
require('promise.prototype.finally').shim();

import config from '../config';

export const sendPaymentDetails = (details) => {
  return axios.post(`${config.mwUrl}/email/payment`, details);
};

export const sendQuote = (details) => {
  return axios.post(`${config.mwUrl}/email/quote`, details);
};
