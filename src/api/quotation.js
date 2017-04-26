import axios from 'axios';
import config from '../config';
import { getQuotationRequestObject } from '../utils/apiUtils';

export const getQuotation = (profile) => {
  const requestConfig = {
    headers: {
      entity: config.entity
    }
  };
  return axios.post(`${config.mwUrl}/quote`, getQuotationRequestObject(profile), requestConfig);
};
