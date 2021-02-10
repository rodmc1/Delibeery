import React from 'react';
import Typography from '@material-ui/core/Typography';

const ConfirmedOrder = ({ order }) => {
  if (!order) {
    return 'Getting your order....';
  }

  const discountEl = !order.discount
    ? ''
    : `Discount: - ₱ ${order.discount.toFixed(2)}`;

  const renderedOrderDetails = (
    <div key={order.id}>
      <Typography gutterBottom variant="body3" component="p">
        Order ID: {order.id}
      </Typography>
      <Typography gutterBottom variant="body1" component="p">
        {discountEl}
      </Typography>
      <Typography gutterBottom variant="body1" component="p">
        Total: <b>₱{order.totalPrice.toFixed(2)} </b>
      </Typography>
      <Typography gutterBottom variant="body1" component="p">
        Date and Time: {order.date}
      </Typography>
      <Typography gutterBottom variant="body1" component="p">
        Delivery Address: {order.address}
      </Typography>
      <Typography gutterBottom variant="body1" component="p">
        Status: {order.status}
      </Typography>
      <Typography gutterBottom variant="body3" component="p">
        Estimated Delivery Time:{order.deliveryTime}
      </Typography>
    </div>
  );

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
