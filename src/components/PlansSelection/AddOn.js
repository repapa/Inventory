import React, { PropTypes } from 'react';
import { I18n } from 'react-redux-i18n';

const AddOn = ({ fee, addOn, onSelect, isSelected }) => {
  const selectAddOnBtn = isSelected ?
    (<button onClick={onSelect} className="btn btn-sm btn-danger btn-remove">{I18n.t('buttons.remove')}</button>):
    (<button onClick={onSelect} className="btn btn-sm btn-primary btn-add">{I18n.t('buttons.add')}</button>);

  return (
    <div className="add-on">
      <div className="pull-right">
        {selectAddOnBtn}
      </div>
      <h6>{addOn.addOnName}</h6>
      <div>
        <div className="fee">{fee}</div>
        Description
      </div>
    </div>
  );
};

AddOn.propTypes = {
  addOn: PropTypes.object,
  fee: PropTypes.string,
  onSelect: PropTypes.func,
  isSelected: PropTypes.bool
};

export default AddOn;
