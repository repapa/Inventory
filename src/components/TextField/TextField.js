import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const TextField = ({ type="text", labelName, value, onChange, onBlur, errorText }) => {
  return (
    <FormGroup className="text-field">
      <ControlLabel className="text-field-label">{labelName}</ControlLabel>
      <FormControl
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <HelpBlock className="error-text">{errorText}</HelpBlock>
    </FormGroup>
  );
};

TextField.propTypes = {
  type: PropTypes.string,
  labelName: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  errorText: PropTypes.string
};

export default TextField;
