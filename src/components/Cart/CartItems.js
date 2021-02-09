import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 250,
    margin: 10
  },
  media: {
    height: 100
  }
}));

const CartItems = ({ cartData, onChangeProduct }) => {
  const [cartItems, setCartItems] = useState([...cartData]);
  let newCartCount = 0;
  let cartTotalPrice = 0;
  cartItems.forEach((i) => (newCartCount = newCartCount + i.quantity));

  const [cartTotalCount, getCartTotalCount] = useState(newCartCount);
  const classes = useStyles();
  const updateCart = (item, index, type) => {
    const newArray = [...cartItems];

    if (newArray[index].quantity === 1 && type === 'REDUCE') {
      newArray.splice(index, 1);
    } else {
      newArray[index] = {
        ...item,
        price:
          type === 'ADD'
            ? (
                Number(newArray[index].price) +
                Number(item.price / item.quantity)
              ).toFixed(2)
            : (
                Number(newArray[index].price) -
                Number(item.price / item.quantity)
              ).toFixed(2),
        quantity:
          type === 'ADD'
            ? newArray[index].quantity + 1
            : newArray[index].quantity - 1
      };
    }

    setCartItems(newArray);
  };

  useEffect(() => {
    onChangeProduct(cartItems, cartTotalCount);
  }, [cartItems]);

  const getTotalCartItems = (item, type) => {
    const getItemIndex = cartItems.findIndex((i) => i.id === item.id);

    if (type === 'REDUCE' && getItemIndex !== -1) {
      updateCart(item, getItemIndex, type);
      getCartTotalCount(cartTotalCount - 1);
    }
    if (type === 'ADD') {
      getCartTotalCount(cartTotalCount + 1);
      getItemIndex !== -1
        ? updateCart(item, getItemIndex, type)
        : setCartItems([...cartItems, item]);
    }
  };

  const noItemsInCart = (
    <div>
      <h1>Your Cart is empty</h1>
    </div>
  );

  const cartItemList = cartItems.map((product) => {
    cartTotalPrice = cartTotalPrice + Number(product.price);

    return (
      <Grid item xs={6} style={{ maxWidth: '300px', margin: '1%' }}>
        <Card className={classes.root} key={product.id}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={product.img}
              title={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h6">
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Total ₱ {product.price}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            style={{
              backgroundColor: 'lightgrey',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}>
            <Button
              size="small"
              color="default"
              variant="contained"
              onClick={() => getTotalCartItems(product, 'REDUCE')}
              style={{ backgroundColor: 'white', height: '20px' }}>
              <RemoveRoundedIcon />
            </Button>
            <Typography
              variant="body2"
              component="p"
              style={{
                backgroundColor: '#E5E4E2',
                borderRadius: 5,
                width: '10%',
                textAlign: 'center',
                color: '#3D3C3A'
              }}>
              {product.quantity}
            </Typography>
            <Button
              size="small"
              color="default"
              variant="contained"
              onClick={() => getTotalCartItems(product, 'ADD')}
              style={{ backgroundColor: 'white', height: '20px' }}>
              <AddRoundedIcon />
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });

  return !cartItems.length ? (
    noItemsInCart
  ) : (
    <div>
      <Grid container spacing={2} style={{ marginTop: '1%' }}>
        <Grid item xs={6} md={4} lg={4} alignItems="center">
          {cartItemList}
        </Grid>
        <Grid item xs={6} md={2} lg={2}>
          <Typography gutterBottom variant="h5" component="h6">
            Order Details:
          </Typography>
        </Grid>
        <Grid item xs={6} md={4} lg={4}>
          <Typography
            gutterBottom
            variant="h6"
            component="p"
            style={{ marginBottom: 20 }}>
            Subtotal: ₱ {cartTotalPrice.toFixed(2)}
          </Typography>
          <Link
            to="/checkout"
            style={{
              color: 'inherit',
              textDecoration: 'inherit'
            }}>
            <Button size="large" color="secondary" variant="contained">
              Proceed To Checkout
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartItems;
