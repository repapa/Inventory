import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Visible, Hidden } from 'react-grid-system';

import { changeLanguage } from '../../actions/languageActions';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-main">
          <div className="container">
            <a href="#" className="header-brand">
              <Hidden xs>
                <img className="header-banner" src={require('../../images/header_banner_sm.png')}/>
              </Hidden>
              <Visible xs>
                <img className="header-banner" src={require('../../images/header_banner_xs.png')}/>
              </Visible>
            </a>
            <nav className="nav float-xs-right">
              <Hidden xs>
                <ul className="nav-list">
                  <li className="nav-item">
                    <a href="#" className="nav-link"><i className="glyphicon glyphicon-earphone header-call-icon"></i>1500 733</a>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link header-divider" />
                  </li>
                  <li className="nav-item">
                    <a onClick={() => this.props.changeLanguage('en')} className="nav-link">EN</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => this.props.changeLanguage('id')} className="nav-link">ID</a>
                  </li>
                </ul>
              </Hidden>
              <Visible xs>
                <ul className="nav-list">
                  <li className="nav-item">
                    <a href="#" className="nav-link"><i className="glyphicon glyphicon-earphone header-call-icon"></i></a>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link header-divider" />
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link"><i className="glyphicon glyphicon-menu-hamburger header-call-icon"></i></a>
                  </li>
                </ul>
              </Visible>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  content: PropTypes.object,
  changeLanguage: PropTypes.func
};

function mapStateToProps({ content }) {
  return {
    content
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeLanguage
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
