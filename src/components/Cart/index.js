import React from 'react';
import CartItems from './CartItems';
import Appbar from '../Appbar';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const CartPage = ({ cartData, onChangeProduct, cartItemCount }) => {
  return (
    <div>
      <Appbar cartItemCount={cartItemCount} />
      <Paper elevation={3} style={{ minHeight: '85vh', marginTop: '6%' }}>
        <Container maxWidth="lg" style={{ marginTop: '1%' }}>
          <Typography
            variant="h6"
            component="p"
            style={{
              textAlign: 'center',
              color: '#3D3C3A',
              fontSize: 60
            }}>
            Shopping Cart
          </Typography>
          <hr />
          <CartItems cartData={cartData} onChangeProduct={onChangeProduct} />
        </Container>
      </Paper>
    </div>
  );
};

export default CartPage;
