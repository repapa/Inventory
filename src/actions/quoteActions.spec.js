import { expect } from 'chai';
import sinon from 'sinon';
import * as types from '../constants/actionTypes';
import * as quoteActions from './quoteActions';
import * as Quotation from '../api/quotation';

import configuredMockStore from 'redux-mock-store';

describe('Quote Actions', () => {
  afterEach(done => {
    Quotation.getQuotation.restore && Quotation.getQuotation.restore();
    done();
  });

  describe('Get Quotation', () => {
    it('should proceed to GET_QUOTE_SUCCESS action and get quotation data', done => {
      const mockStore = configuredMockStore();
      const store = mockStore({});
      const PROFILING_DATA = {
        region: 'Asia'
      };

      const RESPONSE_QUOTE = { products: [{}, {}] };
      const EXPECTED_ACTION = { type: types.GET_QUOTE_SUCCESS, payload: RESPONSE_QUOTE };

      const dispatch = sinon.spy(store.dispatch);
      sinon.stub(Quotation, 'getQuotation', () => {
        return new Promise(resolve => resolve({ data: { quote: RESPONSE_QUOTE } }));
      });

      quoteActions.getQuote(PROFILING_DATA, true)(dispatch).then(() => {
        const actions = store.getActions();
        expect(dispatch.calledOnce);
        expect(actions[0].type).to.equal(types.GET_QUOTE);
        expect(actions[1].type).to.equal(types.GET_QUOTE_SUCCESS);
        expect(actions[1]).to.deep.equal(EXPECTED_ACTION);
        done();
      });
    });

    it('should proceed to GET_QUOTE_ERROR action when getQuotation fails', done => {
      const mockStore = configuredMockStore();
      const store = mockStore({});

      const dispatch = sinon.spy(store.dispatch);
      sinon.stub(Quotation, 'getQuotation', () => {
        return new Promise((resolve, reject) => reject());
      });

      quoteActions.getQuote(null, true)(dispatch).then(() => {
        const actions = store.getActions();
        expect(dispatch.calledOnce);
        expect(actions[0].type).to.equal(types.GET_QUOTE);
        expect(actions[1].type).to.equal(types.GET_QUOTE_ERROR);
        done();
      });
    });
  });
});
