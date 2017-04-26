import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import routePaths from '../../constants/routePaths';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { decode } from '../../lib/util';

import Loader from '../../components/Loader/Loader';
import NotFound from '../../components/NotFound/NotFound';

import Profile from '../TravelInsurance/Profile';
import { updateAll } from '../../actions/profileActions';
import { getQuote } from '../../actions/quoteActions';
import { initializeTravellerForms } from '../../actions/customerDetails/travellerActions';
// import { selectPlan, selectAddOn, expandPlan } from '../../actions/planActions';

class RetrieveQuotePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: props.params.quote,
      isLoading: true,
      isValid: false
    };
  }

  componentWillMount() {
    if (_.has(this.props, 'content.contento.coverages')) {
      this._updateAndRedirect();
    }
  }

  componentWillReceiveProps(props) {
    if (_.has(props, 'content.contento.coverages')) {
      this._updateAndRedirect();
    }
  }

  _showNotFound() {
    this.setState({
      isLoading: false,
      isValid: true
    });
  }

  _updateAndRedirect() {
    const decodedQuote = decode(this.state.quote);

    if (decodedQuote) {
      try {
        const quote = JSON.parse(decodedQuote);

        // update profile data
        const profile = new Profile(quote[0]);
        const selection = quote[1];

        if (profile.isValid()) {
          this.props.updateAll(profile);
          this.props.initializeTravellerForms(profile.noOfAdult, profile.noOfChild);

          // if no plan selected, get list of plans
          // if a plan selected
          if (!selection.planId) {
            this.props.getQuote(profile, true);
          } else {
            // update plan selection
            this.props.getQuote(profile, false);
            browserHistory.push(routePaths.PLAN_SELECTION);
          }
        } else {
          this._showNotFound();
        }
      } catch(e) {
        this._showNotFound();
      }
    } else {
      this._showNotFound();
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    } else {
      return <NotFound />;
    }
  }
}


RetrieveQuotePage.propTypes = {
  content: PropTypes.object,
  params: PropTypes.object,
  updateAll: PropTypes.func,
  getQuote: PropTypes.func,
  initializeTravellerForms: PropTypes.func
};

function mapStateToProps({ content }) {
  return {
    content
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateAll,
    getQuote,
    initializeTravellerForms
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetrieveQuotePage);
