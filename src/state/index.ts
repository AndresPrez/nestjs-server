import moment from 'moment';

class ServerState {
  public readonly startTime: moment.Moment;

  constructor() {
    this.startTime = moment();
  }

  get upTime(): moment.Duration {
    return moment.duration(moment().diff(this.startTime));
  }
}

export const state = new ServerState();
