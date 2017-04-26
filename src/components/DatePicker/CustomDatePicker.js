import React, { PropTypes } from 'react';
import DateTime from 'react-datetime';
import moment from 'moment';

import RULES from '../../constants/rules';

const CustomDatePicker = ({ selectedDate, labelName, min, max, disabled, update }) => {
  const validDate = (current) => {
    if(disabled) {
      return false;
    }

    if(min && max) {
      return current >= min && current <= max;
    } else if(min) {
      return current >= min;
    } else if(max) {
      return current <= max;
    } else {
      return true;
    }
  };

  return (
    <div className="custom-date-picker">
      <label>{labelName}</label>
      <div>
        <DateTime
          value={moment(selectedDate, RULES.DATE_FORMAT)}
          onChange={(value) => update(moment(value).format(RULES.DATE_FORMAT))}
          closeOnSelect={true}
          closeOnTab={true}
          timeFormat={false}
          dateFormat={RULES.DATE_FORMAT}
          disabled={disabled}
          inputProps={{
            placeholder: 'mm / dd / yyyy',
            disabled: disabled
          }}
          isValidDate={validDate}
        />
      </div>
    </div>
  );
};

CustomDatePicker.propTypes = {
  selectedDate: PropTypes.string,
  labelName: PropTypes.string,
  min: PropTypes.object,
  max: PropTypes.object,
  disabled: PropTypes.bool,
  update: PropTypes.func
};

export default CustomDatePicker;
