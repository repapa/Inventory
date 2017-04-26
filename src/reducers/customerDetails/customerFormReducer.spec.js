import { expect } from 'chai';
import customerFormReducer from './customerFormReducer';
import * as actions from '../../actions/customerDetails/customerFormActions';

describe('Customer Form Reducer', () => {
  it('should increment form Indexes by 1 when passed GO_TO_NEXT_FORM', () => {
    const initialState = {
      filledFormIndex: 0,
      displayedFormIndex: 0
    };

    const expectedState = {
      filledFormIndex: 1,
      displayedFormIndex: 1
    };

    const action = actions.goToNextForm();
    const newState = customerFormReducer(initialState, action);

    expect(newState).to.deep.equal(expectedState);
  });

  it('should set displayedFormIndex to selected form when passed GO_TO_SELECTED_FORM', () => {
    const initialState = {
      filledFormIndex: 2,
      displayedFormIndex: 2
    };

    const expectedState = {
      filledFormIndex: 2,
      displayedFormIndex: 1
    };

    const action = actions.goToSelectedForm(1);
    const newState = customerFormReducer(initialState, action);

    expect(newState).to.deep.equal(expectedState);
  });
});
