import React, { Component, PropTypes } from 'react';
// import UserForm from '../../components/UserForm/UserForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { signUpRequest } from '../../actions/signUpActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SignUpPage extends Component {

  _onSubmit(e) {
    e.preventDefault();
    alert('testing _onSubmit');
  }

  render() {
    const { signUpRequest } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignUpForm signUpRequest={signUpRequest}/>
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  signUpRequest: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    signUpRequest
  },dispatch);
}

export default connect(mapDispatchToProps)(SignUpPage);