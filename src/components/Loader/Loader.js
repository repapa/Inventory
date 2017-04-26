import React from 'react';
import { I18n } from 'react-redux-i18n';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-inner">
        <div className="loading-spinner is-active">
          <div className="loading-spinner-animation"></div>
          <div className="loading-spinner-caption">{I18n.t('messages.loadingInformation')}</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
