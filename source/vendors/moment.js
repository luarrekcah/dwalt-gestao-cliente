import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

export const isDataExpired = timestamp => {
  const now = moment();
  const expirationTime = moment(timestamp).add(12, 'hours');
  return now.isAfter(expirationTime);
};

export default moment;
