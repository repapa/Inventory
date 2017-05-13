import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ name, value, label, type, _onChange, error }) => {
    return (
        <div className={classnames("form-group", { "has-error": error })}>
            <label className="control-label">{label}</label>
            <input type={type} name={name} className="form-control" value={value} onChange={_onChange} />
            {error && <span className="help-block">{error}</span>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    _onChange: PropTypes.func,
    error: PropTypes.string
};

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;