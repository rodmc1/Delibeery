import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { addOrder, applyCoupon } from '../../api/jsonserver';
import CouponInput from './Coupon';

const OrdeDetails = ({ estimatedDeliveryTime, cartData, pinnedLoc }) => {
  const history = useHistory();
  const [couponDiscount, setDiscount] = useState(0);
  const disableButton = !pinnedLoc ? true : false;
  const deliveryFee = 50;
  let subtotal = 0;

  cartData.forEach((i) => (subtotal = Number(subtotal) + Number(i.price)));

  const renderCartItems = cartData.map((product) => {
    return (
      <Typography gutterBottom variant="body2" component="p">
        {product.name} - x{product.quantity}{' '}
        <b>₱ {Number(product.price).toFixed(2)}</b>
      </Typography>
    );
  });

  const handleCoupon = (couponCode) => {
    applyCoupon(couponCode).then((discount) => {
      if (discount.discount) {
        setDiscount(discount.discount);
      }
    });
  };

  const fetchedDiscount = !couponDiscount ? null : (
    <Typography gutterBottom variant="body2" component="p">
      Dicount: - ₱ {couponDiscount.toFixed(2)}
    </Typography>
  );

  const onOrderConfirm = async () => {
    if (!pinnedLoc) {
      return false;
    }

    const orderData = {
      orderId: Date.now(),
      address: pinnedLoc,
      deliveryTime: estimatedDeliveryTime,
      status: 'Delivered',
      date: moment().format('DD-MMM-YYYY h:mm:ss a'),
      orderDetails: {
        orders: cartData,
        discount: couponDiscount,
        totalPrice: subtotal + deliveryFee - couponDiscount
      }
    };

    const response = await addOrder(orderData);
    history.push({ pathname: '/checkout/confirmed', response, couponDiscount });
  };

  return (
    <div style={{ marginTop: '10%' }}>
      {renderCartItems}
      <hr />
      <Typography
        gutterBottom
        variant="h6"
        component="p"
        style={{ marginTop: 25 }}>
        Subtotal: ₱ {subtotal.toFixed(2)}
      </Typography>
      <Typography gutterBottom variant="h6" component="p">
        Delivery fee: ₱ {deliveryFee.toFixed(2)}
      </Typography>
      {fetchedDiscount}
      <Typography gutterBottom variant="body2" component="p">
        Delivery Address:
        {!pinnedLoc ? <b> Please Pin your address</b> : <b> {pinnedLoc}</b>}
      </Typography>
      <Typography gutterBottom variant="body2" component="p">
        Estimated Delivery Time:
        {!estimatedDeliveryTime ? <b>--</b> : estimatedDeliveryTime}
      </Typography>
      <hr />
      <Typography gutterBottom variant="h6" component="p">
        Total (incl. VAT): ₱{' '}
        {(subtotal + deliveryFee).toFixed(2) - Number(couponDiscount)}
      </Typography>
      <Button
        disabled={disableButton}
        size="large"
        color="secondary"
        variant="contained"
        style={{ marginTop: 25, marginBottom: 25 }}
        onClick={() => onOrderConfirm()}>
        Confirm Order
      </Button>
      <CouponInput handleCoupon={handleCoupon} />
    </div>
  );
};

export default OrdeDetails;
