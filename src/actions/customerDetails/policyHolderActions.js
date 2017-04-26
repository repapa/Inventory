import { POLICY_HOLDER_FORM_UPDATE_FIELDS } from '../../constants/actionTypes';

export const updatePolicyHolderFields = (formFields) => {
  return {
    type: POLICY_HOLDER_FORM_UPDATE_FIELDS,
    payload: { formFields }
  };
};
