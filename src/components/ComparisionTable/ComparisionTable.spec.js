import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import ComparisionTable from './ComparisionTable';

const content = {
  contento: {
    coverages: {
      en: [
        {
          id: 'c1',
          value: 'Kecelakaan Diri'
        },
        {
          id: 'c2',
          value: 'Kecelakaan Diri'
        }
      ],
      id: [
        {
          id: 'c1',
          value: 'Kecelakaan Diri'
        },
        {
          id: 'c2',
          value: 'Kecelakaan Diri'
        }
      ]
    },
    's-l': {
      en: {
        USD: {
          value: '182000',
          coverages: [
            {
              "id": "c1",
              "value": "2,600,000,000"
            },
            {
              "id": "c2",
              "value": "5,200,000,000"
            }
          ]
        }, IDR: {
          value: '182000',
          coverages: [
            {
              "id": "c1",
              "value": "2,600,000,000"
            },
            {
              "id": "c2",
              "value": "5,200,000,000"
            }
          ]
        }
      },
      id: {
        USD: {
          value: '182000',
          coverages: [
            {
              "id": "c1",
              "value": "2,600,000,000"
            },
            {
              "id": "c2",
              "value": "5,200,000,000"
            }
          ]
        }, IDR: {
          value: '182000',
          coverages: [
            {
              "id": "c1",
              "value": "2,600,000,000"
            },
            {
              "id": "c2",
              "value": "5,200,000,000"
            }
          ]
        }
      }
    },
    's-h': {
      en: {
        USD: {
          value: '182000',
          coverages: [
            {
              "id": "c1",
              "value": "2,600,000,000"
            },
            {
              "id": "c2",
              "value": "5,200,000,000"
            }
          ]
        }, IDR: {
          value: '182000',
          coverages: [
            {
              "id": "c1",
              "value": "2,600,000,000"
            },
            {
              "id": "c2",
              "value": "5,200,000,000"
            }
          ]
        }
      },
      id: {
        USD: {
          value: '182000',
          coverages: [
            {
              "id": "c1",
              "value": "2,600,000,000"
            },
            {
              "id": "c2",
              "value": "5,200,000,000"
            }
          ]
        }, IDR: {
          value: '182000',
          coverages: [
            {
              "id": "c1",
              "value": "2,600,000,000"
            },
            {
              "id": "c2",
              "value": "5,200,000,000"
            }
          ]
        }
      }
    }
  }
};

const plans = [
  {
    "planId": "s-l",
    "planName": "Lower Limits",
    "fee": 142.074,
    "addOns": [
      {
        "addOnId": "AO1",
        "addOnName": "Golf Equipment",
        "fee": "1.00"
      },
      {
        "addOnId": "AO2",
        "addOnName": "Sports Equipme",
        "fee": "1.00"
      },
      {
        "addOnId": "AO3",
        "addOnName": "PetCare",
        "fee": "1.00"
      },
      {
        "addOnId": "AO4",
        "addOnName": "Underwater Actvities",
        "fee": "1.00"
      },
      {
        "addOnId": "AO5",
        "addOnName": "Electronics",
        "fee": "1.00"
      },
      {
        "addOnId": "AO6",
        "addOnName": "Home Contents",
        "fee": "1.00"
      },
      {
        "addOnId": "AO7",
        "addOnName": "China Hospital DepositGuarantee",
        "fee": "1.00"
      }
    ]
  },
  {
    "planId": "s-h",
    "planName": "Higher Limits",
    "fee": 234.48,
    "addOns": [
      {
        "addOnId": "AO1",
        "addOnName": "Golf Equipment",
        "fee": "1.00"
      },
      {
        "addOnId": "AO2",
        "addOnName": "Sports Equipme",
        "fee": "1.00"
      },
      {
        "addOnId": "AO3",
        "addOnName": "PetCare",
        "fee": "1.00"
      },
      {
        "addOnId": "AO4",
        "addOnName": "Underwater Actvities",
        "fee": "1.00"
      },
      {
        "addOnId": "AO5",
        "addOnName": "Electronics",
        "fee": "1.00"
      },
      {
        "addOnId": "AO6",
        "addOnName": "Home Contents",
        "fee": "1.00"
      },
      {
        "addOnId": "AO7",
        "addOnName": "China Hospital DepositGuarantee",
        "fee": "1.00"
      }
    ]
  }
];

const i18n = {
  locale: 'en'
};

describe('Comparision Table', () => {
  it('should display for 2 plans', () => {
    const wrapper = mount(
      <ComparisionTable
        currency="USD"
        content={content}
        i18n={i18n}
        plans={plans}
        />
    );

    expect(wrapper.find('.my_planHeader').length > 0).to.equal(true);
  });
});
