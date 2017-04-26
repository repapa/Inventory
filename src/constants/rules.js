export default {
  TRAVEL_INSURANCE: {
    DEPARTURE_MIN_DATE: -1, // must deduct by 1
    DEPARTURE_MAX_DATE: 30,
    ARRIVAL_MIN_DATE: 0,
    ARRIVAL_MAX_DATE: 30,
    START_MIN_DATE: -1,
    START_MAX_DATE: 30,
    YEAR_LENGTH: 1,
    NUM_OF_ADULT_INDIVIDUAL: 5,
    NUM_OF_ADULT_FAMILY: 2,
    NUM_OF_CHILD_FAMILY: 5
  },
  DATE_FORMAT: 'MM/DD/YYYY',
  MAX_STEP: 5,
  CURRENCY: 'PHP',
  TRAVEL_DESTINATIONS: [
    { value: 'asean', label: 'ASEAN' },
    { value: 'asia', label: 'Asia' },
    { value: 'worldwide', label: 'Worldwide' }
  ]
};
