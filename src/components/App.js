import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import Header from './Header/Header';
// import Footer from './Footer/Footer';
// import ProgressBar from './ProgressBar/ProgressBar';

// import BannerBackground from './BannerBackground/BannerBackground';

class App extends React.Component {
  render() {
    return (
      <div>
        {/*<Header />*/}
        {/*<BannerBackground />*/}
        {/*<ProgressBar />*/}
        <ReactCSSTransitionGroup
          transitionName="transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={500}>
          {this.props.children}
        </ReactCSSTransitionGroup>
        {/*<Footer />*/}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element

};

function mapStateToProps({ i18n }) {
  return {
    i18n
  };
}

export default connect(mapStateToProps)(App);
