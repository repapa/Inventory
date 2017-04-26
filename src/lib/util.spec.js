import * as utils from './util';
import { expect } from 'chai';
import validator from 'validator';

describe('Format Currency Function', () => {
  it('should return correct currency', () => {
    const currency = utils.formatCurrency('PHP', 20);
    expect(currency).to.equal('PHP 20.00');
  });

  it('should round down currency', () => {
    const currency = utils.formatCurrency('PHP', 21.123);
    expect(currency).to.equal('PHP 21.12');
  });

  it('should round up currency', () => {
    const currency = utils.formatCurrency('PHP', 21.456);
    expect(currency).to.equal('PHP 21.46');
  });
});

describe('Get Destination function', () => {
  it('should get destination by value', () => {
    const destination = utils.getDestination('worldwide');
    expect(destination).to.equal('Worldwide');
  });
});

describe('Encode function', () => {
  it('should encode string', () => {
    const encode = utils.encode('test');

    expect(validator.isBase64(encode)).to.be.true;
  });

  it('should return empty string', () => {
    const encode = utils.encode();
    expect(encode).to.equal('');
  });

  it('should return empty string when encoding object', () => {
    const encode = utils.encode({ test: 'test' });
    expect(encode).to.equal('');
  });
});

describe('Decode function', () => {
  it('should decode string', () => {
    const decode = utils.decode('dGVzdA==');

    expect(decode).to.equal('test');
  });

  it('should return empty string', () => {
    const decode = utils.decode();
    expect(decode).to.equal('');
  });

  it('should return empty string when decoding object', () => {
    const decode = utils.decode({ test: 'test' });
    expect(decode).to.equal('');
  });
});
