import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import quoteReducer from './quoteReducer';
// import profileReducer from './profileReducer';
// import plansReducer from './plansReducer';
// import selectionReducer from './selectionReducer';
// import customerFormReducer from './customerDetails/customerFormReducer';
// import travellersReducer from './customerDetails/travellersReducer';
// import travellerReducer from './customerDetails/travellerReducer';
// import policyHolderReducer from './customerDetails/policyHolderReducer';
// import orderReducer from './orderReducer';
// import contentReducer from './contentReducer';
// import agreementsReducer from './agreementsReducer';
// import paymentReducer from './paymentReducer';
// import currencyReducer from './currencyReducer';
// import stepReducer from './stepReducer';
// import { i18nReducer } from 'react-redux-i18n';
// import credentialReducer from './credentialReducer';

const rootReducer = combineReducers({
  routing: routerReducer
});

export default rootReducer;
