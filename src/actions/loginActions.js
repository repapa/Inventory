import { browserHistory } from 'react-router';
import { login } from '../api/login';
import routePaths from '../constants/routePaths';

export const authenticate = (credentials) => {
  return login(credentials).then(res => {
    if (res.data.access.status === 401) {
      browserHistory.push(routePaths.INDEX);
    } else {
      browserHistory.push(routePaths.USER_LIST);
    }
  });
};