import React from 'react';
import { Route, IndexRoute } from 'react-router';

// stateless components
import App from './components/App.js';
// import NotFound from './components/NotFound/NotFound.js';

// containers
// import TravelInsurancePage from './containers/TravelInsurance/TravelInsurancePage';
import LoginPage from './containers/Login/LoginPage';
// import PlanSelectionPage from './containers/PlanSelection/PlanSelectionPage';
// import CustomerDetailsPage from './containers/CustomerDetails/CustomerDetailsPage';
// import PaymentDetailsPage from './containers/Payment/PaymentDetailsPage';
// import PaymentConfirmationPage from './containers/Payment/PaymentConfirmationPage';
// import RetrieveQuotePage from './containers/RetrieveQuote/RetrieveQuotePage';

import routePaths from './constants/routePaths';

export default (
  <Route>
    <Route path={routePaths.INDEX} component={App}>
      <IndexRoute component={LoginPage} />
      {/*<Route path={routePaths.TRAVEL_INSURANCE} component={TravelInsurancePage}/>
      <Route path={routePaths.PLAN_SELECTION} component={PlanSelectionPage}/>
      <Route path={routePaths.CUSTOMER_DETAILS} component={CustomerDetailsPage}/>
      <Route path={routePaths.PAYMENT_DETAILS} component={PaymentDetailsPage} />
      <Route path={routePaths.PAYMENT_CONFIRMATION} component={PaymentConfirmationPage} />
      <Route path={routePaths.PAYMENT_CONFIRMATION_WITH_PARAMS} component={PaymentConfirmationPage} />
      <Route path={routePaths.RETRIEVE_QUOTE} component={RetrieveQuotePage} />
      <Route path={routePaths.NOT_FOUND} component={NotFound} />*/}
    </Route>
  </Route>
);
