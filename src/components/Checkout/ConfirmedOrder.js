import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

const ConfirmedOrder = (props) => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setOrders([location.response.order]);
  }, [props]);

  if (!orders) {
    return 'Getting your order....';
  }

  const renderedOrderDetails = orders.map((order) => {
    const discountEl = !order.orderDetails.discount
      ? ''
      : `Discount: - ₱ ${order.orderDetails.discount.toFixed(2)}`;

    return (
      <div key={order.orderID}>
        <Typography gutterBottom variant="body3" component="p">
          Order ID: {order.orderId}
        </Typography>
        <Typography gutterBottom variant="body1" component="p">
          {discountEl}
        </Typography>
        <Typography gutterBottom variant="body1" component="p">
          Total: <b>₱{order.orderDetails.totalPrice.toFixed(2)} </b>
        </Typography>
        <Typography gutterBottom variant="body1" component="p">
          Date and Time: {order.date}
        </Typography>
        <Typography gutterBottom variant="body1" component="p">
          Delivery Address: {order.address}
        </Typography>
        <Typography gutterBottom variant="body1" component="p">
          Status:{' '}
          {moment(order.date).format() < moment().format()
            ? 'Delivered'
            : 'Preparing Order ....'}
        </Typography>
        <Typography gutterBottom variant="body3" component="p">
          Estimated Delivery Time:{order.deliveryTime}
        </Typography>
      </div>
    );
  });
  return (
    <div style={{ margin: '10%' }}>
      <div>
        <Typography gutterBottom variant="h3" component="p">
          ORDER CONFIRMED! Cheers!
        </Typography>
        <hr />
        <Typography
          gutterBottom
          variant="h6"
          component="h1"
          style={{ marginTop: '2%' }}>
          {renderedOrderDetails}
        </Typography>
      </div>
    </div>
  );
};

export default ConfirmedOrder;
