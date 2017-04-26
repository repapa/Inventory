import { expect } from 'chai';
import travellerDetailsReducer from './travellersReducer';
import * as actions from '../../actions/customerDetails/travellerActions';

describe('Traveller Reducer', () => {
  it('should initialize forms depending on the number of adult and child in profile ' +
    'when passed TRAVELLER_FORM_INIT', () => {
    const expectedState = [
      {
        travellerType: "adult",
        travellerTypeIndex: 0,
        formFields: {},
        isFilled: false
      },
      {
        travellerType: "child",
        travellerTypeIndex: 0,
        formFields: {},
        isFilled: false
      },
      {
        travellerType: "child",
        travellerTypeIndex: 1,
        formFields: {},
        isFilled: false
      }
    ];

    const noOfAdult = "2";
    const noOfChild = "2";
    const action = actions.initializeTravellerForms(noOfAdult, noOfChild);
    const newState = travellerDetailsReducer([], action);

    expect(newState).to.deep.equal(expectedState);
  });

  it('should update state of form fields and set filled status when passed TRAVELLER_FORM_UPDATE_FIELDS', () => {
    const initialState = [
      {
        formFields: {
          firstName: '',
          lastName: ''
        },
        isFilled: false
      }
    ];

    const newFields = {
      firstName: 'John',
      lastName: 'Cena'
    };

    const expectedState = [
      {
        formFields: newFields,
        isFilled: true
      }
    ];

    const formIndex = 0;
    const action = actions.updateTravellerFields(formIndex, newFields);
    const newState = travellerDetailsReducer(initialState, action);

    expect(newState).to.deep.equal(expectedState);
  });
});
