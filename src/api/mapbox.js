import axios from 'axios';

export const API_KEY =
  'pk.eyJ1Ijoicm9kbWMxIiwiYSI6ImNra25kNDExdjJvOGcyb243NWs4cjR5eWMifQ.HFkfk18kZnR6MLnu-2aoBg';
const url = 'https://api.mapbox.com';

export const fetchDistanceMatrix = async (coordinates) => {
  try {
    const { data } = await axios.get(
      `${url}/directions-matrix/v1/mapbox/cycling/${coordinates}`,
      {
        params: {
          access_token: API_KEY
        }
      }
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchLocationData = async (longitude, latitude) => {
  try {
    const { data } = await axios.get(
      `${url}/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
      {
        params: {
          limit: 1,
          access_token: API_KEY
        }
      }
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};
