import React, { PropTypes } from 'react';

const Toastr = ({ isShow = false, title, body, type = 'success' }) => {
  return (
    isShow &&
    <div className="toastr">
      <div className={`alert alert-${type}`} role="alert">
        <strong>{title}</strong> {body}
      </div>
    </div>
  );
};

Toastr.propTypes = {
  isShow: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  type: PropTypes.string
};

export default Toastr;
