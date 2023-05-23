import axios from 'axios';
import moment from '../vendors/moment';

export const getWeatherData = (latitude, longitude) => {
  return axios.get('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude: latitude,
      longitude: longitude,
      hourly: 'temperature_2m,direct_radiation,weathercode',
      daily: 'sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant',
      timezone: 'auto',
      current_weather: true,
      start_date: moment().format('YYYY-MM-DD'),
      end_date: moment().format('YYYY-MM-DD'),
    },
  });
};
