import axios from 'axios';
import config from '../config';

export const getContent = () => {
  return axios.get(`${config.mwUrl}/contento/all`);
};

export const getReferenceData = () => {
  return axios.get(`${config.mwUrl}/reference/all`);
};
