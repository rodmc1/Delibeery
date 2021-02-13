import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardDetails from './CardDetails';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const Cards = ({ menu, onChangeProduct, cartData, cartItemCount }) => {
  const [cartItems, setCartItems] = useState(cartData);
  const [cartTotalCount, setCartTotalCount] = useState(cartItemCount);

  useEffect(() => {
    onChangeProduct(cartItems, cartTotalCount);
  }, [cartItems]);

  const updateCart = (item, index, type) => {
    const newArray = [...cartItems];

    if (newArray[index].quantity === 1 && type === 'REDUCE') {
      newArray.splice(index, 1);
    } else {
      newArray[index] = {
        ...item,
        price:
          type === 'ADD'
            ? (Number(newArray[index].price) + Number(item.price)).toFixed(2)
            : (Number(newArray[index].price) - Number(item.price)).toFixed(2),
        quantity:
          type === 'ADD'
            ? newArray[index].quantity + 1
            : newArray[index].quantity - 1
      };
    }

    setCartItems(newArray);
  };

  const getTotalCartItems = (item, type) => {
    const getItemIndex = cartItems.findIndex((i) => i.id === item.id);
    if (type === 'REDUCE' && getItemIndex !== -1) {
      updateCart(item, getItemIndex, type);
      setCartTotalCount(cartTotalCount - 1);
    }
    if (type === 'ADD') {
      setCartTotalCount(cartTotalCount + 1);
      getItemIndex !== -1
        ? updateCart(item, getItemIndex, type)
        : setCartItems([...cartItems, item]);
    }
  };

  let itemCount = 0;
  const productList = menu.map((product) => {
    itemCount = cartData.find((item) => item.id === product.id);

    return (
      <div key={product.id}>
        <Grid item xs={4} style={{ maxWidth: '300px', margin: '5%' }}>
          <Card>
            <CardDetails
              product={product}
              getTotalCartItems={getTotalCartItems}
              cartItems={cartItems}
              cartTotalCount={cartTotalCount}
              itemCount={itemCount}
            />
          </Card>
        </Grid>
      </div>
    );
  });

  return (
    <Container maxWidth="lg" style={{ marginTop: '1%' }}>
      <Grid container item>
        {productList}
      </Grid>
    </Container>
  );
};

export default Cards;
