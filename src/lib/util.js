import _ from 'lodash';
import validator from 'validator';
import { Base64 } from 'js-base64';

import RULES from '../constants/rules';

export function getArrayFromNumber(num, skip) {
  const arr = [];

  let i = 0;
  let max = num;

  if(skip) {
    i++;
  } else {
    max += 2;
  }

  for(; i <= max; i++) {
    arr.push({
      value: i,
      label: i
    });
  }

  return arr;
}

export function formatCurrency(currency, value) {
  try {
    return `${currency} ${parseFloat(Math.round(value * 100) / 100).toFixed(2)}`;
  } catch(e) {
    return '';
  }
}

export function getDestination(value) {
  const destination = _.find(RULES.TRAVEL_DESTINATIONS, { value });
  return destination ? destination.label : '';
}

export function encode(value) {
  if (_.isString(value)) {
    return Base64.encode(value);
  }

  return '';
}

export function decode(encondedValue = '') {
  if (_.isString(encondedValue) && validator.isBase64(encondedValue)) {
    return Base64.decode(encondedValue);
  }

  return '';
}
