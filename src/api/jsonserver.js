import axios from 'axios';

const url = 'https://my-json-server.typicode.com/rodmc1/delibeery-api';

export const addOrder = async (order) => {
  try {
    const { data } = await axios.post(`${url}/orders`, {
      order
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMenu = async () => {
  try {
    const { data } = await axios.get(`${url}/products`);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const applyCoupon = async (couponCode) => {
  try {
    const { data } = await axios.get(`${url}/coupons?code=${couponCode}`);

    return data[0] ? data[0] : 0;
  } catch (err) {
    console.log(err);
  }
};
