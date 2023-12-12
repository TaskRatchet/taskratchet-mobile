import moment from 'moment';

export default function checkDate(date: string): number {
  const today = moment();
  const deadline = moment(date, 'M/D/YYYY, h:mm A');
  const diffDays = deadline.diff(today, 'days');
  return diffDays;
}
