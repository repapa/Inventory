import axios from 'axios';
import config from '../config';

export const login = (credentials) => {
  
  const requestConfig = {
    headers: {
      entity: config.entity
    }
  };
  return axios.get(`${config.beUrl}/user-accounts/login?username=${credentials.username}&password=${credentials.password}`, requestConfig);
  // return axios.post(`${config.beUrl}/user-accounts/login`, credentials, requestConfig);
};