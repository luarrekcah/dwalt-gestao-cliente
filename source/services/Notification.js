import axios from 'axios';

export const createNotification = (title, body, key, to) => {
  if (!title || !body || !key || !to) {
    return console.warn('Missing params');
  } else {
    const params = new URLSearchParams({
      title,
      body,
      key,
      to,
    }).toString();

    axios
      .post(`https://connect.dlwalt.com/api/v1/notification?${params}`)
      .then(r => {
        console.log(r.data);
      });
  }
};
