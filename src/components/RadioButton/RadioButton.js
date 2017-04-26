import React, { PropTypes } from 'react';

const RadioButton = ({ name, labelName, target, update, style }) => {
  return (
    <div style={style}>
      <input id={name}
              className="icon-radio"
              type="radio"
              checked={target === name}
              onChange={() => update()}/>
        <label htmlFor={name}>
          <span className="fa fa-circle-o unchecked"></span>
          <span className="fa fa-check-circle-o checked"></span>
          {labelName}
        </label>
    </div>
  );
};

RadioButton.propTypes = {
  name: PropTypes.string,
  labelName: PropTypes.string,
  target: PropTypes.string,
  update: PropTypes.func,
  style: PropTypes.object
};

export default RadioButton;
