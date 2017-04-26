import axios from 'axios';

import config from '../config';

export const paymentNow = (referenceNumber) => {
  return axios.get(`${config.mwUrl}/payment`, referenceNumber);
};
