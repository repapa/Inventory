import profileValidator from '../../lib/validators/profileValidator';

export default class Profile {
  constructor(profile) {
    const noOfAdult = +profile.noOfAdult;
    const noOfChild = +profile.noOfChild;

    this.typeOfCover = profile.typeOfCover;
    this.typeOfPlan = profile.typeOfPlan;
    this.region = profile.region;
    this.noOfAdult = noOfAdult > 0 ? noOfAdult : undefined;
    this.noOfChild = noOfChild > 0 ? noOfChild : 0;
    this.departure = profile.departure;
    this.arrival = profile.arrival;
    this.startDate = profile.startDate;
    this.endDate = profile.startDate;
  }

  isValid() {
    const errors = profileValidator(this);
    return Object.keys(errors).length === 0;
  }
}
