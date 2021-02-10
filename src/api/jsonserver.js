import axios from 'axios';

const url = 'https://delibeery-api.herokuapp.com';

export const addOrder = async (order) => {
  try {
    const { data } = await axios.post(`${url}/orders`, order);

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

export const fetchOrders = async () => {
  try {
    const { data } = await axios.get(`${url}/orders`);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchSingleOrder = async (id) => {
  try {
    const { data } = await axios.get(`${url}/orders/${id}`);

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

export const deleteOrderById = async (id) => {
  try {
    const { statusText } = await axios.delete(`${url}/orders/${id}`);

    return statusText;
  } catch (err) {
    console.log(err);
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${url}/orders/${id}`, {
      status: status
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

// fetch('https://jsonplaceholder.typicode.com/posts/1', {
//   method: 'PUT',
//   body: JSON.stringify({
//     id: 1,
//     title: 'foo',
//     body: 'bar',
//     userId: 1,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
