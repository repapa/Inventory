import { expect } from 'chai';
import resolveRequest from './resolveRequestUtil';

describe('Resolve Request Util', () => {
  describe('Get resolve data', () => {
    it('should return data after a duration of time', (done) => {
      const delay = 1000;      
      const DATA = {
        status: 200,
        message: 'Success',
        payload: {}
      };
      
      resolveRequest(DATA, delay).then(data => {
        expect(data).to.deep.equal(DATA);
        done();
      });
    });
  });
});
