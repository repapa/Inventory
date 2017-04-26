import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class LoginPage extends Component {

    render() {
        return (
            <div className="container center-align">
                <div className="row login-title">
                    <div className="col-md-12 text-center">
                        Login
                    </div>
                </div>
                <div className="row loginForm">
                    <div className="col-md-12">
                        <form role="form">
                            <div className="form-group">
                                <input type="email" className="form-control" id="email" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" id="password" placeholder="Password"/>
                            </div>
                            <button type="submit" className="btn btn-default loginBtn">
                                Login
                            </button>
                            <div className="form-group text-center forgotPass-signUp">
                                <div className="col-md-6">
                                    <a href="#">Forgot Password</a>
                                </div>
                                <div className="col-md-6">
                                    <a href="#">Sign up</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapDispatchToProps)(LoginPage);