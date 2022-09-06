import moment from 'moment';

const useDate = () => {
  const dateDiff = {
    timeAgos: (time) => {
      return moment(new Date(time).toLocaleString()).fromNow();
    },

    isHours: (start, end) => {
      return moment(end).diff(moment(start), 'hours');
    },
    isDays: (start, end) => {
      return moment(end).diff(moment(start), 'days');
    },
  };
  return { dateDiff };
};

export default useDate;
